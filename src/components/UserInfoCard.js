import React from "react";

const UserInfoCard = props => {
  return (
    <div className="d-flex bd-highlight">
      <div className="img_cont">
        <img src={props.image} className="rounded-circle user_img" alt="" />
        <span className="online_icon" />
      </div>
      <div className="user_info">
        <span>Chat with {props.name}</span>
      </div>
      <div className="video_cam">
        <span>
          <i className="fas fa-video" />
        </span>
        <span>
          <i className="fas fa-phone" />
        </span>
      </div>
      <span
        id="action_menu_btn"
        style={{ marginRight: "20px", lineHeight: "70px" }}
        onClick={props.logout}
      >
        Log out
      </span>
    </div>
  );
};

export default UserInfoCard;
