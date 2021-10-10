import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import Moment from "react-moment";

const DisplayPosts = () => {
  const [posts, setPost] = useState([]);
  const [media, setMedia] = useState([]);
  const alert = useAlert();

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const getAllPosts = async () => {
    try {
      const posts = await axios.get("http://localhost:5000/post/viewAllPosts");
      setPost(posts.data.posts);
    } catch (error) {
      console.log(error);
      showAlert("Something went wrong", "error");
    }
  };

  const getMedias = () => {
    try {
      posts.map(async (post) => {
        const data = await axios.get(
          `http://localhost:5000/media/${post["mediaFiles"][0]}`,
          { responseType: "blob" }
        );
        setMedia((pre) => [...pre, data.data]);
      });
    } catch (error) {
      showAlert("Something went wrong", "error");
    }
  };

  useEffect(() => {
    console.log("Media: ", media);
  }, [media]);

  useEffect(() => {
    console.log("Posts: ", posts);
    getMedias(posts);
  }, [posts]);

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="home-posts-container">
      {media.length == posts.length &&
        posts.map((post, index) => (
          <>
            <Card style={{ width: "30rem", marginTop: "2rem" }}>
              <Card.Img variant="top" src={URL.createObjectURL(media[index])} />
              <Card.Body>
                <Card.Title>{post["description"]}</Card.Title>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Card.Text>Created By: {post["user"]["name"]}</Card.Text>
                  
                  <Moment fromNow>{post["createdAt"]}</Moment>
                </div>
              </Card.Body>
            </Card>
          </>
        ))}
    </div>
  );
};

export default DisplayPosts;
