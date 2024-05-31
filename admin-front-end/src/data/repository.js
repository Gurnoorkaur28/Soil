import { request, gql } from "graphql-request";

// Backedn url
const GRAPH_QL_URL = "http://localhost:8080/graphql";

// All Users
async function fetchUsers() {
  const query = gql`
    {
      all_users {
        id
        email
        full_name
        join_date
        is_blocked
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
}

// Block/unblock users
async function blockUnblockUser(userId, isBlocked) {
  const query = gql`
    mutation ($id: Int!, $is_blocked: Boolean!) {
      is_blocked_user(id: $id, is_blocked: $is_blocked) {
        id
      }
    }
  `;

  const variables = {
    id: userId,
    is_blocked: isBlocked,
  };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.is_blocked_user;
}

// All Products
async function fetchProducts() {
  const query = gql`
    {
      all_products {
        id
        name
        description
        price
        image
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);
  return data.all_products;
}

// Gets specific product by id
async function getProduct(id) {
  const query = gql`
    query ($id: Int) {
      product(id: $id) {
        id
        name
        description
        price
        image
      }
    }
  `;

  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.product;
}

// Create Products
async function createProducts(product) {
  const query = gql`
    mutation (
      $name: String!
      $description: String!
      $price: Float!
      $image: String!
    ) {
      create_product(
        input: {
          name: $name
          description: $description
          price: $price
          image: $image
        }
      ) {
        name
      }
    }
  `;

  const variables = product;
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_product;
}

// Update Product
async function updateProduct(id, product) {
  const query = gql`
    mutation (
      $id: Int!
      $name: String
      $description: String
      $price: Float
      $image: String
    ) {
      update_product(
        input: {
          id: $id
          name: $name
          description: $description
          price: $price
          image: $image
        }
      ) {
        id
        name
        description
        price
        image
      }
    }
  `;

  const variables = { id, ...product };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_product;
}

// Delete Product
async function deleteProducts(id) {
  const query = gql`
    mutation ($id: Int!) {
      delete_product(id: $id)
    }
  `;

  const variables = { id };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_product;
}

export {
  fetchUsers,
  blockUnblockUser,
  fetchProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProducts,
};
