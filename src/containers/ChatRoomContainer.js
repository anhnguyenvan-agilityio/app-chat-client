import { graphql, compose } from "react-apollo";
import ChatRoom from "../components/ChatRoom";
import gql from "graphql-tag";
import { getLocalUser } from "../helpers/loginHelper";

const GET_USER = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      name
      email
      avatar
    }
  }
`;

const GET_CONVERSATION = gql`
  query GetConversation($clientOne: String!, $clientTwo: String!) {
    getConversation(clientOne: $clientOne, clientTwo: $clientTwo) {
      conversationID
      contentChat {
        conversationID
        author
        content
        createdAt
      }
    }
  }
`;

const CHAT = gql`
  mutation Chat($message: MessageInput!) {
    chat(message: $message)
  }
`;

const ChatRoomContainer = compose(
  graphql(GET_USER, {
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    }),
    props: props => {
      return {
        loadingGetUser: props.data.loading,
        errorGetUser: props.data.error,
        user: props.data.getUser || [],
        hitory: props.hitory
      };
    }
  }),
  graphql(GET_CONVERSATION, {
    options: props => {
      return {
        variables: {
          clientOne: getLocalUser().id,
          clientTwo: props.match.params.id
        }
      };
    },
    props: props => {
      return {
        loadingGetConversation: props.data.loading,
        errorGetConversation: props.data.error,
        contentChat:
          (props.data.getConversation &&
            props.data.getConversation.contentChat) ||
          [],
        conversationID:
          (props.data.getConversation &&
            props.data.getConversation.conversationID) ||
          [],
        subscribeToMore: props.data.subscribeToMore
      };
    }
  }),
  graphql(CHAT, {
    props: props => ({
      chat: messageInput => {
        return props.mutate({
          variables: {
            message: messageInput
          }
        });
      }
    })
  })
)(ChatRoom);

export default ChatRoomContainer;
