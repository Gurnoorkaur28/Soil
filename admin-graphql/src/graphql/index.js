// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");

// Create and track a GraphQL PubSub.
const pubsub = new PubSub();
const REVIEW_ADDED_TRIGGER = "REVIEW_ADDED";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  # ! indicates they are non-nullable.

  type User {
    id: Int!
    email: String!
    password_hash: String!
    full_name: String!
    join_date: String!
    is_blocked: Boolean!
  }

  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    image: String!
  }

  type SpecialProduct {
    special_id: Int!
    discounted_price: Float!
    start_date: String!
    end_date: String!
    id: Int!
  }

  type Review {
    id: Int!
    rating: Int
    comment: String!
    productId: Int!
    user_id: Int!
    is_blocked: Boolean!
  }

  # Input Type
  input CreateProductInput {
    name: String!
    description: String!
    price: Float!
    image: String!
  }

  input UpdateProductInput {
    id: Int!
    name: String
    description: String
    price: Float
    image: String
  }

  input CreateSpecialProductInput {
    discounted_price: Float!
    start_date: String!
    end_date: String!
    id: Int!
  }

  input UpdateSpecialProductInput {
    special_id: Int!
    discounted_price: Float
    start_date: String
    end_date: String
    id: Int
  }

  input CreateReviewInput {
    rating: Int!
    comment: String!
    productId: Int!
    user_id: Int!
  }

  # Queries
  type Query {
    # user
    all_users: [User]

    # product
    all_products: [Product]
    product(id: Int): Product

    # special product
    all_specialproducts: [SpecialProduct]
    specialProduct(special_id: Int): SpecialProduct
    special_has_productid(id: Int): Boolean

    # review
    all_reviews: [Review]
  }

  # Mutations
  type Mutation {
    # user
    is_blocked_user(id: Int!, is_blocked: Boolean!): User

    # product
    create_product(input: CreateProductInput): Product
    update_product(input: UpdateProductInput): Product
    delete_product(id: Int!): Boolean

    # special product
    create_special_product(input: CreateSpecialProductInput): SpecialProduct
    update_special_product(input: UpdateSpecialProductInput): SpecialProduct
    delete_special_product(special_id: Int!): Boolean

    # review
    create_review(input: CreateReviewInput): Review
    delete_review(id: Int!): Boolean
  }

  type Subscription {
    review_added: Review!
  }
`;

const resolvers = {
  Query: {
    // Returns list of all users
    all_users: async () => {
      try {
        return await db.user.findAll();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },

    // Returns list of all products
    all_products: async () => {
      try {
        return await db.product.findAll();
      } catch (error) {
        throw new Error("Failed to fetch products");
      }
    },

    // Returns product by pk id
    product: async (_, { id }) => {
      try {
        return await db.product.findByPk(id);
      } catch (error) {
        throw new Error("Failed to fetch product");
      }
    },

    // Returns list of all special Products
    all_specialproducts: async () => {
      try {
        return await db.specialProduct.findAll();
      } catch (error) {
        throw new Error("Failed to fetch special products");
      }
    },

    // Returns special product by pk id
    specialProduct: async (_, { special_id }) => {
      try {
        return await db.specialProduct.findByPk(special_id);
      } catch (error) {
        throw new Error("Failed to fetch special product");
      }
    },

    // Returns true of a special has product id else false
    special_has_productid: async (_, { id }) => {
      try {
        const special = await db.specialProduct.findOne({
          where: { id: id },
        });
        return special !== null;
      } catch (error) {
        throw new Error("Failed to fetch special product");
      }
    },

    // Retrns all reviews
    all_reviews: async () => {
      try {
        return await db.review.findAll();
      } catch (error) {
        throw new Error("Failed to fetch reviews");
      }
    },
  },

  // Mutations
  Mutation: {
    // Updates if user is blocked or not
    is_blocked_user: async (_, { id, is_blocked }) => {
      try {
        const user = await db.user.findByPk(id);

        if (!user) {
          throw new Error("User not found");
        }

        user.is_blocked = is_blocked;
        await user.save();

        return user;
      } catch (error) {
        throw new Error("Error updating user status");
      }
    },

    // Creates a new product
    create_product: async (_, { input }) => {
      try {
        // Validate
        if (!input.name || !input.price || !input.description || !input.image) {
          throw new Error("Name, price, description, and image are required.");
        }
        if (input.price < 0) {
          throw new Error("Invalid value for price must be non-negative.");
        }

        // Create Product
        const product = await db.product.create(input);

        return product;
      } catch (error) {
        throw new Error(`Error creating new product: ${error.message}`);
      }
    },

    // Updates product description
    update_product: async (_, { input }) => {
      try {
        const product = await db.product.findByPk(input.id);
        if (!product) {
          throw new Error("Product not found");
        }
        if (input.price < 0) {
          throw new Error("Invalid value for price must be non-negative.");
        }

        await product.update(input);
        await product.save();

        return product;
      } catch (error) {
        throw new Error("Error updating product");
      }
    },

    // Deletes prduct by id: - pk
    delete_product: async (_, { id }) => {
      try {
        const product = await db.product.findByPk(id);

        if (!product) {
          return false;
        }
        // Delete special product then product
        await db.specialProduct.destroy({ where: { id: product.id } });
        await product.destroy();

        // Return true when deleted
        return true;
      } catch (error) {
        throw new Error("Failed to delete product: " + error.message);
      }
    },

    // Creates a new special product
    create_special_product: async (_, { input }) => {
      try {
        // Validate required fields
        if (
          !input.discounted_price ||
          !input.start_date ||
          !input.end_date ||
          !input.id
        ) {
          throw new Error(
            "Discounted price, start date, end date, and product ID are required."
          );
        }

        // Check for existing special
        const existingSpecialProduct = await db.specialProduct.findOne({
          where: { id: input.id },
        });

        if (existingSpecialProduct) {
          throw new Error(
            "A special product offer already exists for this product."
          );
        }

        // Create the special product
        const specialProduct = await db.specialProduct.create(input);
        return specialProduct;
      } catch (error) {
        throw new Error(`Error creating new special product: ${error.message}`);
      }
    },

    // Updates special product description
    update_special_product: async (_, { input }) => {
      try {
        const specialProduct = await db.specialProduct.findByPk(
          input.special_id
        );

        if (!specialProduct) {
          throw new Error("Special product not found");
        }

        // If id is being changed we check if it dosent already exist
        if (input.id && input.id !== input.special_id) {
          const existingSpecialProduct = await db.specialProduct.findOne({
            where: { id: input.id },
          });

          if (
            existingSpecialProduct &&
            existingSpecialProduct.special_id !== input.special_id
          ) {
            throw new Error(
              "A special product offer already exists for this product."
            );
          }
        }

        await specialProduct.update(input);
        await specialProduct.save();

        return specialProduct;
      } catch (error) {
        throw new Error("Error updating special product");
      }
    },

    // Deletes special product by id: - pk
    delete_special_product: async (_, { special_id }) => {
      try {
        const specialProduct = await db.specialProduct.findByPk(special_id);
        if (!specialProduct) {
          return false;
        }
        await specialProduct.destroy();
        return true;
      } catch (error) {
        throw new Error("Failed to delete special product: " + error.message);
      }
    },

    // Creates a new product
    create_review: async (_, { input }) => {
      try {
        // Validate
        if (
          !input.rating ||
          !input.comment ||
          !input.productId ||
          !input.user_id
        ) {
          throw new Error(
            "Rating, comment, productId, and user_id are required."
          );
        }

        // Create Review
        const review = await db.review.create(input);

        // Sub trigger
        pubsub.publish(REVIEW_ADDED_TRIGGER, { review_added: review });

        return review;
      } catch (error) {
        throw new Error(`Error creating new review: ${error.message}`);
      }
    },
    // Delete Review
    delete_review: async (_, { id }) => {
      try {
        const review = await db.review.findByPk(id);
        if (!review) {
          return false;
        }
        review.rating = null;
        review.comment = "**** This review has been deleted by the admin ***";
        review.is_blocked = true;

        await review.save();

        return true;
      } catch (error) {
        throw new Error("Error deleting review");
      }
    },
  },

  // Subscription
  Subscription: {
    review_added: {
      subscribe: () => pubsub.asyncIterator([REVIEW_ADDED_TRIGGER]),
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
