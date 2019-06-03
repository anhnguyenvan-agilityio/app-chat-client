import React from "react";

import "./styles/HomePage.css";

import SearchInput from "../components/SearchInput";

import ChatRoomContainer from "../containers/ChatRoomContainer";
import ListContact from "../components/ListContact";
import PrivateRoute from "../components/PrivateRoute";

const HomePage = props => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
            <SearchInput />
            <ListContact match={props.match} users={props.users} />
          </div>
        </div>
        <div className="col-md-8 col-xl-6 chat">
          <div className="card">
            <PrivateRoute
              path={`${props.match.url}/:id`}
              component={ChatRoomContainer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
