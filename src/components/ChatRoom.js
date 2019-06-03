import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import UserInfoCard from "../components/UserInfoCard";
import MessageItem from "../components/MessageItem";
import { getLocalUser } from "../helpers/loginHelper";
import { formatDate } from "../helpers/dateTime";

const CHAT_ADDED = gql`
  subscription chatAdded($channel: String!) {
    chatAdded(channel: $channel) {
      conversationID
      author
      content
      createdAt
    }
  }
`;

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      contentChat: []
    };
    this.host = getLocalUser();
    this.conversationID = "";
  }

  componentWillReceiveProps(nextProps) {
    // Render user
    if (!nextProps.loadingGetUser && nextProps.user) {
      this.setState({
        user: {
          name: nextProps.user.name,
          avatar: nextProps.user.avatar
        }
      });
    }
    // Get content chat
    let contentChat = [];
    if (!nextProps.loadingGetConversation) {
      this.conversationID = nextProps.conversationID;
      if (this.sub) {
        this.sub();
      }
      this.sub = this.props.subscribeToMore({
        document: CHAT_ADDED,
        variables: {
          channel: this.conversationID
        },
        updateQuery: (prev, { subscriptionData }) => {
          return {
            getConversation: {
              contentChat: [
                ...prev.getConversation.contentChat,
                subscriptionData.data.chatAdded
              ],
              conversationID: this.conversationID,
              __typename: "GetConversationResponse"
            }
          };
        }
      });

      contentChat = nextProps.contentChat.map(item => ({
        host: this.host.id === item.author,
        content: item.content,
        avatar:
          this.host.id === item.author
            ? this.host.avatar
            : nextProps.user.avatar,
        createdAt: formatDate(item.createdAt)
      }));
    }

    this.setState(
      {
        contentChat
      },
      () => {
        this.refs.scroll.scrollTop =
          this.refs.scroll.scrollHeight - this.refs.scroll.clientHeight;
      }
    );
  }
  renderListChat = () => {
    return this.state.contentChat.map((item, index) => (
      <MessageItem
        host={item.host}
        image={item.avatar}
        content={item.content}
        time={item.createdAt}
        key={index}
      />
    ));
  };

  submitChat = event => {
    event.preventDefault();
    if (this.refs.contentChat.value && this.conversationID) {
      this.props.chat({
        conversationID: this.conversationID,
        author: this.host.id,
        content: this.refs.contentChat.value
      });
    }
    this.refs.contentChat.value = "";
  };

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <div className="card-header msg_head">
          <UserInfoCard
            image={user.avatar}
            name={user.name}
            logout={() => {
              localStorage.clear();
              this.props.history.push("/");
            }}
          />
        </div>
        <div className="card-body msg_card_body" ref="scroll">
          {this.renderListChat()}
        </div>
        <form className="card-footer">
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text attach_btn">
                <i className="fas fa-paperclip" />
              </span>
            </div>
            <input
              ref="contentChat"
              name=""
              className="form-control type_msg"
              placeholder="Type your message..."
            />
            <div className="input-group-append">
              <button
                className="input-group-text send_btn"
                type="submit"
                onClick={this.submitChat}
              >
                <i className="fas fa-location-arrow" />
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}
