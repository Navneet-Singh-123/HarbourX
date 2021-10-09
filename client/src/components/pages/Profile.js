import React from "react";
import { Link } from "react-router-dom";
import "../../resources/css/index.css";
import IMG from "../../resources/images/profile.png";

const Profile = () => {
  const listItems = [
    ["All Journeys", "/all-journeys"],
    ["All Posts", "/all-posts"],
    ["Create a Journey", "/create-journey"],
    ["Create a Post", "/create-post"],
  ];

  const displayList = () =>
    listItems.map((item) => (
      <div className="list-container">
        <Link to={item[1]} className="profile-list-items">
          {item[0]}
        </Link>
      </div>
    ));

  return (
    <div className="profile-container">
      <ul className="profile-list-content">{displayList()}</ul>
      <div className="profile-content">
        <div className="profile-content-container">
          <div className="profile-pic">
            <div className="profile-pic-content"></div>
          </div>
          <div className="profile-content-main">Profile Content</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
