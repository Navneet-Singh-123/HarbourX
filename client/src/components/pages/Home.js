import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";

const Home = () => {
  const [posts, setPost] = useState([]);

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const getAllPosts = async () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="home-background">
          <div className="home-background-content">
            <h1 className="home-background-head">TraVlog</h1>
            <p
              style={{
                margin: "0",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              VLog your travel and experiences
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
