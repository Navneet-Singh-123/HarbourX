import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../resources/css/index.css";
import Navbar from "../layout/Navbar";
import JourneyForm from "./forms/JourneyForm";
import PostForm from "./forms/PostForm";

const Profile = () => {
  const [journeymodalShow, setJourneyModal] = useState(false);
  const [postmodalShow, setPostModal] = useState(false);

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-list-content">
          <div className="list-container">
            <Link to="/all-journeys" className="profile-list-items">
              All Journeys
            </Link>

            <div
              className="profile-list-items"
              style={{ cursor: "pointer" }}
              onClick={() => setJourneyModal(true)}
            >
              Create a Journey
            </div>
            <JourneyForm
              show={journeymodalShow}
              onHide={() => setJourneyModal(false)}
            />
            <PostForm show={postmodalShow} onHide={() => setPostModal(false)} />
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-content-container">
            <div className="profile-pic">
              <div className="profile-pic-content"></div>
            </div>
            <div className="profile-content-main">Profile Content</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
