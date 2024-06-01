import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSpecial,
  specialHasProductid,
  updateSpecial,
} from "../data/repository";
import MessageContext from "../context/MessageContext";
import { Button } from "react-bootstrap";

function EditSpecial() {
  // useNaviagte hook to navigate to pages
  const navigate = useNavigate();
  // useParams to get special id from params
  const { specialId } = useParams();
  // Context msg
  const { message, setMessage } = useContext(MessageContext);

  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState({});
  const [originalFields, setOriginalFields] = useState(null);

  useEffect(() => {
    const fetchSpecial = async () => {
      const special = await getSpecial(parseInt(specialId, 10));

      // Set fields
      if (special) {
        setFields({
          discountedPrice: special.discounted_price,
          startDate: special.start_date,
          endDate: special.end_date,
          id: special.id,
        });
        setOriginalFields(special);
      }
    };

    fetchSpecial();
  }, [specialId]);

  // Input change handeler
  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  // Submit handeler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    const validationResults = handleSpecialValidation(fields);
    const { errors, isValid } = validationResults;
    setErrors(errors);

    if (!isValid) return;

    // Check if ID has changed and if a special already exists for the new ID
    if (originalFields.id !== parseInt(fields.id, 10)) {
      const specialExists = await specialHasProductid(parseInt(fields.id, 10));
      if (specialExists) {
        setErrors({
          ...errors,
          id: "A special product offer already exists for this product.",
        });
        return;
      }
    }

    const updatedSpecial = {
      discounted_price: parseFloat(fields.discountedPrice),
      start_date: fields.startDate,
      end_date: fields.endDate,
      id: parseInt(fields.id, 10),
    };

    // Remove undefined fields
    Object.keys(updatedSpecial).forEach(
      (key) => updatedSpecial[key] === undefined && delete updatedSpecial[key]
    );

    // Update special
    const updatedSpecialId = await updateSpecial(
      parseInt(specialId, 10),
      updatedSpecial
    );

    // Success message.
    setMessage(
      <>
        Special id <strong>{updatedSpecialId.special_id}</strong> has been
        successfully updated.
      </>
    );

    navigate("/specials");
  };

  const handleSpecialValidation = (fields) => {
    const errors = {};

    // Discounted price
    if (
      fields.discountedPrice === null ||
      fields.discountedPrice === undefined
    ) {
      errors.discounted_price = "Discounted price is required.";
    } else if (
      isNaN(parseFloat(fields.discountedPrice)) ||
      parseFloat(fields.discountedPrice) <= 0
    ) {
      errors.discountedPrice = "Discounted price must be a positive number.";
    }

    // Start date
    if (!fields.startDate) {
      errors.startDate = "Start date is required.";
    } else if (isNaN(Date.parse(fields.startDate))) {
      errors.startDate = "Start date must be a valid date.";
    }

    // End date
    if (!fields.endDate) {
      errors.endDate = "End date is required.";
    } else if (isNaN(Date.parse(fields.endDate))) {
      errors.endDate = "End date must be a valid date.";
    } else if (
      fields.startDate &&
      new Date(fields.endDate) <= new Date(fields.startDate)
    ) {
      errors.endDate = "End date must be after the start date.";
    }

    // ID
    if (!fields.id) {
      errors.id = "Product ID is required.";
    } else if (isNaN(parseInt(fields.id))) {
      errors.id = "Product ID must be a valid integer.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  if (fields == null) return null;
  return (
    <div>
      <h1 className="text-start display-4">Edit Special</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Main container */}
        <div className="container">
          {/* Fields container */}
          <div className="row">
            {/* Column for input fields */}
            <div className="col-md-6">
              {/* Discounted Price */}
              <div className="mb-3">
                <label className="row form-label text-start">
                  Discounted Price:
                </label>
                <input
                  className={`form-control ${
                    errors.discountedPrice ? "is-invalid" : ""
                  }`}
                  placeholder="Enter discounted price"
                  type="number"
                  name="discountedPrice"
                  onChange={handleChange}
                  value={fields.discountedPrice || ""}
                />
                {errors.discountedPrice && (
                  <div className="alert alert-danger">
                    {errors.discountedPrice}
                  </div>
                )}
              </div>
              {/* Start Date */}
              <div className="mb-3">
                <label className="row form-label text-start">Start Date:</label>
                <input
                  className={`form-control ${
                    errors.startDate ? "is-invalid" : ""
                  }`}
                  placeholder="Enter start date"
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  value={fields.startDate || ""}
                />
                {errors.startDate && (
                  <div className="alert alert-danger">{errors.startDate}</div>
                )}
              </div>
              {/* End Date */}
              <div className="mb-3">
                <label className="row form-label text-start">End Date:</label>
                <input
                  className={`form-control ${
                    errors.endDate ? "is-invalid" : ""
                  }`}
                  placeholder="Enter end date"
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  value={fields.endDate || ""}
                />
                {errors.endDate && (
                  <div className="alert alert-danger">{errors.endDate}</div>
                )}
              </div>
              {/* product id */}
              <div className="mb-3">
                <label className="row form-label text-start">Product ID:</label>
                <input
                  className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  placeholder="Enter Product Id"
                  type="number"
                  name="id"
                  onChange={handleChange}
                  value={fields.id || ""}
                />
                {errors.id && (
                  <div className="alert alert-danger">{errors.id}</div>
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

export default EditSpecial;
