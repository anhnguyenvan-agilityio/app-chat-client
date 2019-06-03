import React from "react";

const MessageItem = props => {
  return (
    <div>
      {props.host ? (
        <div className="d-flex justify-content-end mb-4">
          <div className="msg_cotainer_send">
            <p style={{ marginBottom: "0px" }}>{props.content}</p>
            <span className="msg_time_send">{props.time}</span>
          </div>
          <div className="img_cont_msg">
            <img
              src={props.image}
              className="rounded-circle user_img_msg"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-start mb-4">
          <div className="img_cont_msg">
            <img
              src={props.image}
              className="rounded-circle user_img_msg"
              alt=""
            />
          </div>
          <div className="msg_cotainer">
            <p style={{ marginBottom: "0px" }}>{props.content}</p>
            <span className="msg_time">{props.time}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
