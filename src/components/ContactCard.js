import React from "react";

const ContactCard = props => (
  <li className={props.active === true ? "active" : ""}>
    <div className="d-flex bd-highlight">
      <div className="img_cont">
        <img src={props.image} className="rounded-circle user_img" alt="" />
        <span
          className={`online_icon ${
            props.status === "online" ? "" : "offline"
          }`}
        />
      </div>
      <div className="user_info">
        <span>{props.name}</span>
        <p>{props.content}</p>
      </div>
    </div>
  </li>
);

export default ContactCard;
