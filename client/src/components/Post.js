import axios from "axios";
import React, { useState, useEffect } from "react";

const Post = ({ post, index }) => {
  const [media, setMedia] = useState(null);
  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };
  const getMedia = async (fileName) => {
    const token = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const data = await axios.get(`http://localhost:5000/media/${fileName}`, {
        responseType: "blob",
      });
      setMedia(URL.createObjectURL(data.data));
    } catch (error) {}
  };
  useEffect(() => {
    if (post.mediaFiles)
      if (post.mediaFiles.length !== 0) getMedia(post.mediaFiles[0]);
  }, []);
  return (
    <li className={index % 2 === 0 ? "timeline" : "timeline-inverted"}>
      <div class="timeline-badge">
        {post.createdAt && new Date(post.createdAt).getDate()}
      </div>
      <div class="timeline-panel">
        <div class="timeline-heading">
          <h4 class="timeline-title">{post.description && post.description}</h4>
          <p>
            <small class="text-muted">{post.location && post.location}</small>
          </p>
        </div>
        <div class="timeline-body" style={{ height: "300px" }}>
          <img
            src={media}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </li>
    // <div
    //   className="col col-lg-3 col-md-4 col-sm-6"
    //   style={{ height: "300px", backgroundColor: "#e6ebf2", margin: "1rem" }}
    // >
    //   <img
    //     src={media}
    //     alt=""
    //     style={{ width: "100%", height: "100%", objectFit: "cover" }}
    //   />
    // </div>
  );
};

export default Post;
