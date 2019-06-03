import React from "react";
import ContactCard from "../components/ContactCard";
import CustomLink from "../components/CustomLink";

const ListContact = props => {
  const listUser = props.users.map((item, index) => (
    <CustomLink to={`${props.match.url}/${item.id}`} key={index}>
      <ContactCard
        image={item.avatar}
        status="online"
        name={item.name}
        content={`${item.name} is active`}
      />
    </CustomLink>
  ));
  return (
    <div className="card-body contacts_body">
      <div className="contacts">{listUser}</div>
    </div>
  );
};

export default ListContact;
