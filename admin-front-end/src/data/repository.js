import { request, gql } from "graphql-request";

// Backedn url
const GRAPH_QL_URL = "http://localhost:8080/graphql";

// Users
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

export { fetchUsers, blockUnblockUser };
