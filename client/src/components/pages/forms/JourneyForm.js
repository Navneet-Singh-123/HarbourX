import React, { useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useAlert } from "react-alert";
import axios from "axios";

const JourneyForm = (props) => {
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    startLocation: "",
    endLocation: "",
  });
  const alert = useAlert();

  const { startDate, endDate, startLocation, endLocation } = data;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const showAlert = (msg, type) => {
    alert.show(msg, { type });
  };

  const isAutheticated = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return null;
  };

  const handleSubmit = async (e) => {
    const token = isAutheticated();
    e.preventDefault();
    if (!startDate || !endDate || !startLocation || !endLocation) {
      showAlert("Please fill all the credentials", "error");
    } else if (!token) {
      showAlert("Please Login/Signup", "error");
    } else {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const myData = await axios.post(
          "http://localhost:5000/journey/create",
          data,
          config
        );
        showAlert(myData.data.message, "success");
      } catch (error) {
        console.log(error);
        showAlert(error.response, "error");
      }
    }
  };

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <label for="startDate">Start Date: </label>
          <br />
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleChange}
            style={{ outline: "none", marginTop: "0.5rem" }}
          />
          <br />
          <br />
          <label for="endDate">End Date: </label>
          <br />
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleChange}
            style={{ outline: "none", marginTop: "0.5rem" }}
          />
          <br />
          <br />
          <label for="startLocation">Start Location: </label>
          <br />
          <input
            type="string"
            id="startLocation"
            name="startLocation"
            value={startLocation}
            onChange={handleChange}
            style={{ outline: "none", marginTop: "0.5rem" }}
          />
          <br />
          <br />
          <label for="endLocation">End Location: </label>
          <br />
          <input
            type="string"
            id="endLocation"
            name="endLocation"
            value={endLocation}
            onChange={handleChange}
            style={{ outline: "none", marginTop: "0.5rem" }}
          />
          <br />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <input type="submit" className="btn btn-primary my-1" />
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default JourneyForm;
