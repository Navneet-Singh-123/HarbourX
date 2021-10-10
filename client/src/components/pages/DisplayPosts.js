import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const DisplayPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPost] = useState([]);
  const [media, setMedia] = useState([]);
  const alert = useAlert();
  const [liked, setLiked] = useState(false);

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const getAllPosts = async () => {
    try {
      const posts = await axios.get("http://localhost:5000/post/viewAllPosts");
      setPost(posts.data.posts);
    } catch (error) {
      console.log(error);
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
        setLoading(false);
      });
    } catch (error) {}
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

  const isAutheticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  };

  const inLike = async (id) => {
    if (!liked) {
      const token = isAutheticated();

      try {
        const body = { postId: id };
        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post("http://localhost:5000/post/like", body, config);
        setLiked(true);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      showAlert("You have already liked this post");
    }
  };
  return (
    <>
      {!loading && (
        <div className="home-posts-container">
          {media.length >= posts.length &&
            posts.map((post, index) => (
              <>
                <Card style={{ width: "30rem", marginTop: "2rem" }}>
                  <Card.Img
                    variant="top"
                    src={URL.createObjectURL(media[index])}
                  />
                  <Card.Body>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/all-journeys/${post["id"]}`}
                    >
                      <Card.Title>{post["description"]}</Card.Title>
                    </Link>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Text>Created By: {post["user"]["name"]}</Card.Text>
                      <Moment fromNow>{post["createdAt"]}</Moment>
                    </div>
                    <div style={{ display: "flex" }}>
                      <i
                        className="fas fa-thumbs-up"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          inLike(post["id"]);
                        }}
                      ></i>{" "}
                      <span>{post["likes"]}</span>
                    </div>
                  </Card.Body>
                </Card>
              </>
            ))}
        </div>
      )}
    </>
  );
};

export default DisplayPosts;
