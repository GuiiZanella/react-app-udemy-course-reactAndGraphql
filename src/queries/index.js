import { gql } from "apollo-boost";

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      category
      likes
      createdDate
    }
  }
`;

export const GET_USER = gql `
query{
  getUser(
    id: "00867296-4212-457e-8088-77eca8f308d9",
  ){
    id
    firstName
    lastName
    email
    
  }
}
`;

/* Recipes Mutations */

/* User Queries */
export const GET_CURRENT_USER = gql `
query{
  getCurrentUser {
    username,
    joinDate,
    email
  }
}

`;
/* User Mutations */
export const SIGNIN_USER = gql `
mutation($username:String!, $password:String!){
  signinUser(username: $username, password: $password){
    token
  }
}
`;
export const SIGNUP_USER = gql `
mutation($username:String!, $email:String!, $password:String!){
  signUpUser(username: $username, email: $email, password: $password){
    token
  }
}
`;