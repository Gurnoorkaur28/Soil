// Some concept of this code/design were taken from RMIT - COSC2758 Wk10 Lec Code

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../data/repository";

import MessageContext from "../context/MessageContext";
import { Button } from "react-bootstrap";

//Constant
import { IMAGE_REGEX } from "../utils/constants";

function CreateProduct() {
  // useNaviagte hook to navigate to pages
  const navigate = useNavigate();
  // Context msg
  const { message, setMessage } = useContext(MessageContext);

  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  // Input change handeler
  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Submit handeler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    const validationResults = handleProductValidation(fields);
    const { errors, isValid } = validationResults;
    setErrors(errors);

    if (!isValid) return;

    // Create product
    const product = await createProducts({
      name: fields.name,
      description: fields.description,
      price: parseFloat(fields.price),
      image: fields.image,
    });

    // Success message.
    setMessage(
      <>
        Product <strong>{product.name}</strong> has been successfully created.
      </>
    );

    // Navigate to products page.
    navigate("/products");
  };

  // Validation before submitting
  const handleProductValidation = (fields) => {
    const errors = {};

    // Name
    if (!fields.name) {
      errors.name = "Product name is required.";
    } else if (fields.name.length > 100) {
      errors.name = "Product name cannot exceed 100 characters.";
    }

    // Description
    if (!fields.description) {
      errors.description = "Description is required.";
    }

    // Price
    if (fields.price === null || fields.price === undefined) {
      errors.price = "Price is required.";
    } else if (
      // isNaN js func that checks wheather value is not a number
      // then we check if price is less then or equals 0
      isNaN(parseFloat(fields.price)) ||
      parseFloat(fields.price) <= 0
    ) {
      errors.price = "Price must be a positive number.";
    }

    // Validate image URL
    if (!fields.image || fields.image.trim() === "") {
      errors.image = "Image URL is required.";
    } else if (!IMAGE_REGEX.test(fields.image.trim())) {
      errors.image =
        "Image must end with following format JPEG, JPG, GIF, PNG, or SVG ";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return (
    <div>
      <h1 className="text-start display-4">Create Product</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Main container */}
        <div className="container">
          {/* Fields container */}
          <div className="row">
            {/* Column for input fields */}
            <div className="col-md-6">
              {/* Name */}
              <div className="mb-3">
                <label className="row form-label text-start">Name:</label>
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={fields.name || ""}
                />
                {errors.name && (
                  <div className="alert alert-danger">{errors.name}</div>
                )}
              </div>
              {/* Description */}
              <div className="mb-3">
                <label className="row form-label text-start">
                  Description:
                </label>
                <input
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="Enter description"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={fields.description || ""}
                />
                {errors.description && (
                  <div className="alert alert-danger">{errors.description}</div>
                )}
              </div>
              {/* Price */}
              <div className="mb-3">
                <label className="row form-label text-start">Price:</label>
                <input
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  placeholder="Enter price"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={fields.price || ""}
                />
                {errors.price && (
                  <div className="alert alert-danger">{errors.price}</div>
                )}
              </div>
              {/* Image */}
              <div className="mb-3">
                <label className="row form-label text-start">Image:</label>
                <input
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  placeholder="Enter image"
                  type="text"
                  name="image"
                  onChange={handleChange}
                  value={fields.image || ""}
                />
                {errors.image && (
                  <div className="alert alert-danger">{errors.image}</div>
                )}
              </div>
            </div>

            {/* Column for submit button */}
            <div className="col-md-3 d-flex align-items-center justify-content-center">
              <Button variant="outline-primary" type="submit">
                Create
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
