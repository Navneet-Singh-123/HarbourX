import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../resources/css/index.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const [journeymodalShow, setJourneyModal] = useState(false);
  const [postmodalShow, setPostModal] = useState(false);

  const listItems = [
    ["All Journeys", "/all-journeys"],
    ["All Posts", "/all-posts"],
    ["Create a Journey", "/create-journey"],
    ["Create a Post", "/create-post"],
  ];

  const JourneyModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create your Journey
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Journey Creation Form</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const PostModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Post Creation Form</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-list-content">
        <div className="list-container">
          <Link to="/all-journeys" className="profile-list-items">
            All Journeys
          </Link>
          <Link to="/all-posts" className="profile-list-items">
            All Posts
          </Link>
          <div
            className="profile-list-items"
            style={{ cursor: "pointer" }}
            onClick={() => setJourneyModal(true)}
          >
            Create a Journey
          </div>
          <JourneyModal
            show={journeymodalShow}
            onHide={() => setJourneyModal(false)}
          />
          <div
            className="profile-list-items"
            style={{ cursor: "pointer" }}
            onClick={() => setPostModal(true)}
          >
            Create a Post
          </div>
          <PostModal show={postmodalShow} onHide={() => setPostModal(false)} />
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
  );
};

export default Profile;
