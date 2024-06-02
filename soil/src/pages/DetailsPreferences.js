import useForm from "../hooks/useForm";
import { useState } from "react";
import validate from "../utils/formValidator";
import { addOrUpdatePersonalisedProfiles } from "../data/repository";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function DetailsPreferences(props) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    updateDetailsPreferences,
    validate,
    "detailsPreferences"
  );

  // Shows success msg on profile details update
  const [successMessage, setSuccessMessage] = useState("");

  function updateDetailsPreferences() {
    addOrUpdatePersonalisedProfiles(
      props.username,
      values.gender,
      values.age,
      values.weight,
      values.height,
      values.activityLevel,
      values.dietaryPreference,
      values.healthGoal
    );

    setSuccessMessage("Success! Your details are now been added /or updated");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  return (
    // Alligns content in center of page
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      {/* Border, 3 width and rounded*/}
      <Row className="border border-dark-subtle border-3 rounded-5 p-5 detailsAndPrefSizing">
        {/* Login Forum */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Gender level */}
          <div className="mb-3">
            <label className="form-label paddingBottom">Select Gender:</label>
            <select
              className={"input ${errors.gender} form-select"}
              name="gender"
              onChange={handleChange}
              value={values.gender || ""}
            >
              <option value="">Select Gender</option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
            {errors.gender && (
              <p className="alert alert-danger">{errors.gender}</p>
            )}
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="form-lalabelble paddingBottom">Add Age:</label>
            <input
              className={"input ${errors.age} form-control"}
              placeholder="Enter age"
              type="text"
              name="age"
              onChange={handleChange}
              value={values.age || ""}
            ></input>
            {errors.age && <p className="alert alert-danger">{errors.age}</p>}
          </div>

          {/* weight */}
          <div className="mb-3">
            <label className="form-lalabelble paddingBottom">Add Weight:</label>
            <input
              className={"input ${errors.weight} form-control"}
              placeholder="Enter weight"
              type="text"
              name="weight"
              onChange={handleChange}
              value={values.weight || ""}
            ></input>
            {errors.weight && (
              <p className="alert alert-danger">{errors.weight}</p>
            )}
          </div>

          {/* height */}
          <div className="mb-3">
            <label className="form-lalabelble paddingBottom">Add Height:</label>
            <input
              className={"input ${errors.height} form-control"}
              placeholder="Enter height"
              type="text"
              name="height"
              onChange={handleChange}
              value={values.height || ""}
            ></input>
            {errors.height && (
              <p className="alert alert-danger">{errors.height}</p>
            )}
          </div>

          {/* Activity level */}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Add Activity Level:
            </label>
            <select
              className={"input ${errors.activityLevel} form-select"}
              name="activityLevel"
              onChange={handleChange}
              value={values.activityLevel || ""}
            >
              <option value="">Select Activity Level</option>
              <option value="sedentry">Sedentry</option>
              <option value="lightlyActive">Lightly active</option>
              <option value="moderatelyActive">Moderately active</option>
              <option value="veryActive">Very active</option>
              <option value="extremelyActive">Extremely Active</option>
            </select>
            {errors.activityLevel && (
              <p className="alert alert-danger">{errors.activityLevel}</p>
            )}
          </div>

          {/* Dietary preference */}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Add Dietary Preference:
            </label>
            <select
              className={"input ${errors.dietaryPreference} form-select"}
              name="dietaryPreference"
              onChange={handleChange}
              value={values.dietaryPreference || ""}
            >
              <option value="">Select Dietary Preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="glutenFree">Gluten-free</option>
              <option value="dairyFree">Dairy-free</option>
              <option value="keto">Keto</option>
            </select>
            {errors.dietaryPreference && (
              <p className="alert alert-danger">{errors.dietaryPreference}</p>
            )}
          </div>

          {/* Health goal */}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Select Health Goal:
            </label>
            <select
              className={"input ${errors.healthGoal} form-select"}
              name="healthGoal"
              onChange={handleChange}
              value={values.healthGoal || ""}
            >
              <option value="">Select Health Goal</option>
              <option value="loseWeight">Lose Weight</option>
              <option value="slowlyLoseWeight">Slowly Lose Weight</option>
              <option value="maintainWeight">Maintain Weights</option>
              <option value="slowlyGainWeight">Slowly Gain Weight</option>
              <option value="GainWeight">Gain Weight</option>
            </select>
            {errors.healthGoal && (
              <p className="alert alert-danger">{errors.healthGoal}</p>
            )}
          </div>

          {/* Display success msg's */}
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <Button variant="outline-primary" type="submit">
              Add /or Update
            </Button>
          </div>
        </form>
      </Row>
    </Container>
  );
}

export default DetailsPreferences;
