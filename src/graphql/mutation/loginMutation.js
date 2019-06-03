import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation Login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
        name
        email
        avatar
      }
    }
  }
`;
