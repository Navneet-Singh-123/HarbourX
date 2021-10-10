import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../resources/css/index.css";
import Navbar from "../layout/Navbar";
import JourneyForm from "./forms/JourneyForm";
import PostForm from "./forms/PostForm";
import axios from "axios";

const Profile = () => {
  const [journeymodalShow, setJourneyModal] = useState(false);
  const [postmodalShow, setPostModal] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [userJourneys, setUserJourneys] = useState(0);

  const isAutheticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  };

  const getUser = useCallback(async () => {
    const token = isAutheticated();
    if (token) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const user = await axios.get(
          "http://localhost:5000/getUserInfo",
          config
        );
        console.log(user.data);
        setUserDetails({
          name: user.data.user.name,
          email: user.data.user.email,
        });
        console.log(userDetails);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const getJourneys = async () => {
    const token = isAutheticated();
    if (token) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const journeys = await axios.get(
          "http://localhost:5000/journey/viewAllUserJourney",
          config
        );
        setUserJourneys(journeys.data.journeys.length);
        console.log(journeys);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, [userDetails, userJourneys]);

  useEffect(() => {
    getUser();
    getJourneys();
  }, []);

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
            <div className="profile-content-main ">
              {userDetails && (
                <>
                  <div>
                    <span>
                      <b>Name: </b>
                    </span>
                    <span>{userDetails.name}</span>
                  </div>
                  <br />
                  <div>
                    <span>
                      <b>Email: </b>{" "}
                    </span>
                    <span>{userDetails.email}</span>
                  </div>
                  <br />
                  {userJourneys !== 0 && (
                    <div>
                      <span>
                        <b>Number of Journeys: </b>
                      </span>
                      <span>{userJourneys}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
