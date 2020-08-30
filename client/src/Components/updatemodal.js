import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Updatemodal(props) {
  const [task, settask] = useState(null);

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          placeholder="Enter note here..."
          value={task}
          onChange={(e) => settask(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.updateItem(props.id, task);
            settask(null);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
