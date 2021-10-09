import React from "react";
import Navbar from "../layout/Navbar";

const Home = () => {
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
