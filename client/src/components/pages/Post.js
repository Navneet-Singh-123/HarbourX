import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useAlert } from "react-alert";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Alert } from "react-bootstrap";
import Moment from "react-moment";

const Post = ({ match: { params: id } }) => {
  const alert = useAlert();
  const [media, setMedia] = useState(null);

  const [post, setPost] = useState(null);

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const [log, setlog] = useState({ text: "" });

  const getMedia = async () => {
    try {
      const data = await axios.get(
        `http://localhost:5000/media/${post["mediaFiles"][0]}`,
        { responseType: "blob" }
      );
      setMedia(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const myPost = await axios.post(
        "http://localhost:5000/post/viewSinglePosts",
        { postId: id },
        config
      );
      setPost(myPost.data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(media);
  }, [media]);

  useEffect(() => {
    console.log(post);
    getMedia();
  }, [post]);

  useEffect(() => {
    getPost();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isAutheticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  };
  const addComment = async (e) => {
    const token = isAutheticated();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { postId: id, comment: log["text"] };
    try {
      const myData = await axios.post(
        "http://localhost:5000/post/comment",
        body,
        config
      );
      console.log(myData);
      showAlert("Commented", "success");
      console.log("Done");
    } catch (error) {
      console.log(error);
      showAlert(error.response, "error");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="single-post-container">
        <div className="post-content">
          {post !== null && media !== null && (
            <Card
              style={{ width: "30rem", marginTop: "2rem", marginLeft: "2rem " }}
            >
              <Card.Img variant="top" src={URL.createObjectURL(media)} />
              <Card.Body>
                <Card.Title>{post["description"]}</Card.Title>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Card.Text>Created By: {post["user"]["name"]}</Card.Text>
                  <Moment fromNow>{post["createdAt"]}</Moment>
                </div>
                <div style={{ display: "flex" }}>
                  <i className="fas fa-thumbs-up"></i>{" "}
                  <span>{post["likes"]}</span>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>

        <div className="post-comment-container">
          <h3 style={{ paddingTop: "1rem" }}>Add Comments</h3>

          <form
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              style={{
                outline: "none",
                marginRight: "4rem",
                marginLeft: "4rem",
                marginBottom: "1rem",
              }}
              onChange={handleChange}
              name="text"
              value={log["text"]}
            ></input>{" "}
            <button
              className="form-butt"
              style={{ marginLeft: "4rem" }}
              onClick={(e) => {
                addComment(e);
              }}
            >
              Submit
            </button>
          </form>
          <h3 style={{ paddingTop: "1rem" }}>Comments</h3>
          {post !== null &&
            media !== null &&
            post["postcomments"].map((comment, idx) => (
              <div>
                <Card
                  body
                  style={{
                    width: "70%",
                    marginLeft: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  {comment["comment"]} - {comment["user"]["name"]}
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
