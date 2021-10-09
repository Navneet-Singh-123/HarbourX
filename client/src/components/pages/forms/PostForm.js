import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const PostForm = (props) => {
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

export default PostForm;
