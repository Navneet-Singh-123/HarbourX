import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../resources/css/index.css";
import Navbar from "../layout/Navbar";
import Post from "../Post";

const AllJourneys = () => {
  const [allJourneys, setAllJourneys] = useState([]);
  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };
  const getAllUserJourneys = async () => {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const data = await axios.get(
        "http://localhost:5000/journey/viewAllUserJourney",
        config
      );
      if (data.data.journeys) setAllJourneys(data.data.journeys);
    } catch (error) {}
  };

  useEffect(() => {
    getAllUserJourneys();
  }, []);
  useEffect(() => {
    console.log(allJourneys);
  }, [allJourneys]);
  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center", paddingTop: "1rem" }}>All Journeys</h2>
      <div className="row" style={{ margin: "0 auto" }}>
        {allJourneys.map((journey) => {
          return (
            <div
              className="col col-sm-12"
              style={{
                marginTop: "2rem",
                maxWidth: "70%",
                margin: "0 auto",
                padding: "1rem",
                backgroundColor: "#d8dfe8",
                borderRadius: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#e6ebf2",
                }}
              >
                <h5 style={{}}>
                  {journey.title && journey.title}{" "}
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Create Post
                  </button>
                </h5>
                <span>
                  {journey.startLocation && journey.startLocation}(
                  {journey.startDate &&
                    new Date(journey.startDate).toLocaleDateString()}
                  ) to {journey.endLocation && journey.endLocation}(
                  {journey.endDate &&
                    new Date(journey.endDate).toLocaleDateString()}
                  ){" "}
                </span>
                <p style={{ marginBottom: "1rem" }}>
                  {journey.description && journey.description}
                </p>
                <ul class="timeline">
                  {journey.posts.map((post, index) => {
                    return <Post post={post} index={index} />;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllJourneys;
