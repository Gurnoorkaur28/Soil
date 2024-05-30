// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
const { buildSchema } = require("graphql");
const db = require("../database");
const { where } = require("sequelize");

const graphql = {};

// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  #GraphQL types

  # user schema id, email ... fields corrospond to coloums in sequilizer model
  # ! indicates they are non-nullable.

  type User {
    id: Int!,
    email: String!,
    password_hash: String!,
    full_name: String!,
    join_date: String!,
    is_blocked: Boolean!
  }

  type Product {
    id: Int!,
    name: String!,
    description: String!,
    price: Float!,
    image: String!
  }

  type SpecialProduct {
    special_id: Int!,
    discounted_price: Float!,
    start_date: String!,
    end_date: String!,
    id: Int!
  }

  # Input Type
  input CreateProductInput {
    name: String!,
    description: String!,
    price: Float!,
    image: String!
  }

  input UpdateProductInput {
    id: Int!,
    name: String,
    description: String,
    price: Float,
    image: String
  }

  input CreateSpecialProductInput {
    discounted_price: Float!,
    start_date: String!,
    end_date: String!,
    id: Int!
  }

  input UpdateSpecialProductInput {
    special_id: Int!,
    discounted_price: Float,
    start_date: String,
    end_date: String,
    id: Int
  }

  # Queries
  type Query {
    # user
    all_users: [User],

    # product
    all_products: [Product],

    # special product
    all_specialproducts: [SpecialProduct]
  }

  # Mutations
  type Mutation {
    # user
    is_blocked_user(id: Int!, is_blocked: Boolean!): User
    
    # product
    create_product(input: CreateProductInput): Product,
    update_product(input: UpdateProductInput): Product,
    delete_product(id: Int!): Boolean


    # special product
    create_special_product(input: CreateSpecialProductInput): SpecialProduct,
    update_special_product(input: UpdateSpecialProductInput): SpecialProduct,
    delete_special_product(special_id: Int!): Boolean
  }

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries

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
  // Returns list of all special Products
  all_specialproducts: async () => {
    try {
      return await db.specialProduct.findAll();
    } catch (error) {
      throw new Error("Failed to fetch special products");
    }
  },

  // Mutations
  // Updates if user is blocked or not
  is_blocked_user: async (args) => {
    try {
      const user = await db.user.findByPk(args.id);

      if (!user) {
        throw new Error("User not found");
      }

      user.is_blocked = args.is_blocked;
      await user.save();

      return user;
    } catch (error) {
      throw new Error("Error updating user status");
    }
  },

  // Creates a new product
  create_product: async (args) => {
    try {
      // Validate
      if (
        !args.input.name ||
        !args.input.price ||
        !args.input.description ||
        !args.input.image
      ) {
        throw new Error("Name, price, dec and image are required.");
      }
      if (args.input.price < 0) {
        throw new Error("Invalid value for price must be non-negative.");
      }

      // Create Product
      const product = await db.product.create(args.input);
      return product;
    } catch (error) {
      throw new Error(`Error creating new product: ${error.message}`);
    }
  },

  // Updates product description
  update_product: async (args) => {
    try {
      const product = await db.product.findByPk(args.input.id);

      if (!product) {
        throw new Error("Product not found");
      }

      if (args.input.price < 0) {
        throw new Error("Invalid value for price must be non-negative.");
      }

      await product.update(args.input);
      await product.save();

      return product;
    } catch (error) {
      throw new Error("Error updating product");
    }
  },

  // Deletes prduct by id: - pk
  delete_product: async (args) => {
    try {
      const product = await db.product.findByPk(args.id);

      if (!product) return false;

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
  create_special_product: async (args) => {
    try {
      // Validate required fields
      if (
        !args.input.discounted_price ||
        !args.input.start_date ||
        !args.input.end_date ||
        !args.input.id
      ) {
        throw new Error(
          "Discounted price, start date, end date, and product ID are required."
        );
      }

      // Check for existing special
      const existingSpecialProduct = await db.specialProduct.findOne({
        where: { id: args.input.id },
      });

      if (existingSpecialProduct) {
        throw new Error(
          "A special product offer already exists for this product."
        );
      }

      // Create the special product
      const specialProduct = await db.specialProduct.create(args.input);
      return specialProduct;
    } catch (error) {
      throw new Error(`Error creating new special product: ${error.message}`);
    }
  },

  // Updates special product description
  update_special_product: async (args) => {
    try {
      const specialProduct = await db.specialProduct.findByPk(
        args.input.special_id
      );

      if (!specialProduct) {
        throw new Error("Special product not found");
      }

      // If id is being changed we check if it dosent already exist
      if (args.input.id) {
        const existingSpecialProduct = await db.specialProduct.findOne({
          where: { id: args.input.id },
        });

        if (existingSpecialProduct) {
          throw new Error(
            "A special product offer already exists for this product."
          );
        }
      }

      await specialProduct.update(args.input);
      await specialProduct.save();

      return specialProduct;
    } catch (error) {
      throw new Error("Error updating special product");
    }
  },

  // Deletes special product by id: - pk
  delete_special_product: async (args) => {
    try {
      const specialProduct = await db.specialProduct.findByPk(args.special_id);

      if (!specialProduct) return false;

      // Delete special product
      await specialProduct.destroy();

      // Return true when deleted
      return true;
    } catch (error) {
      throw new Error("Failed to delete special product: " + error.message);
    }
  },
};

module.exports = graphql;
