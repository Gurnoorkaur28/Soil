import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../data/repository";
import MessageContext from "../context/MessageContext";
import { Button } from "react-bootstrap";

// Constants
import { IMAGE_REGEX } from "../utils/constants";

function EditProduct() {
  // useNaviagte hook to navigate to pages
  const navigate = useNavigate();
  // useParams to get product id from params
  const { id } = useParams();
  // Context msg
  const { message, setMessage } = useContext(MessageContext);

  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = parseInt(id, 10);
      const product = await getProduct(productId);

      if (product) setFields(product);
    };

    fetchProduct();
  }, [id]);

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

    const updatedProduct = {
      name: fields.name,
      description: fields.description,
      price: parseFloat(fields.price),
      image: fields.image,
    };

    // Update product
    await updateProduct(parseInt(id, 10), updatedProduct);

    // Success message.
    setMessage(
      <>
        Product <strong>{fields.name}</strong> has been successfully updated.
      </>
    );

    navigate("/products");
  };

  // Validation before submitting
  const handleProductValidation = (fields) => {
    const errors = {};

    if (!fields.name) {
      errors.name = "Product name is required.";
    } else if (fields.name.length > 100) {
      errors.name = "Product name cannot exceed 100 characters.";
    }

    if (!fields.description) {
      errors.description = "Description is required.";
    }

    if (fields.price === null || fields.price === undefined) {
      errors.price = "Price is required.";
    } else if (
      isNaN(parseFloat(fields.price)) ||
      parseFloat(fields.price) <= 0
    ) {
      errors.price = "Price must be a positive number.";
    }

    if (!fields.image || fields.image.trim() === "") {
      errors.image = "Image URL is required.";
    } else if (!IMAGE_REGEX.test(fields.image.trim())) {
      errors.image =
        "Image must end with one of the following formats: JPEG, JPG, GIF, PNG, or SVG.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  if (fields == null) return null;
  return (
    <div>
      <h1 className="text-start display-4">Edit Product</h1>
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
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
