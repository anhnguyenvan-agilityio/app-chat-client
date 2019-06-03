import { graphql, compose } from "react-apollo";
import HomePage from "../HomePage";
import gql from "graphql-tag";
import { getLocalUser } from "../../helpers/loginHelper";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      avatar
    }
  }
`;

const HomePageContainer = compose(
  graphql(GET_USERS, {
    options: props => ({
      fetchPolicy: "cache-and-network"
    }),
    props: props => {
      return {
        loading: props.data.loading,
        error: props.data.error,
        users: props.data.getUsers
          ? props.data.getUsers.filter(item => {
              const user = getLocalUser();
              return item.id !== user.id;
            })
          : []
      };
    }
  })
)(HomePage);

export default HomePageContainer;
