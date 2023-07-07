import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FirstForm = (props) => {
  const [images, setImages] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");


  

  return (
    <div className="formprovider">
      <h2 className="text-center mt-2">Application Form</h2>

      <Form
        method="post"
        className="col-md-8 mx-auto mb-2"
        style={{}}

      >
        <Form.Group>
          <Form.Label>Choose an image:</Form.Label>
          <Form.Control
            name="images"
            type="file"
            onChange={(e) => {
              let reader = new FileReader();
              let file = e.target.files[0];

              reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
              };

              reader.readAsDataURL(file);
              setImages(file);
            }}
          />
          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
          )}
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FirstForm;
