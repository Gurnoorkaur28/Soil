// Concept was taken from Rmit/Canvas/2412/wk4/Lec

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useForm from "../hooks/useForm.js";
import validate from "../utils/formValidator.js";
import { uniqueUserExists, addUser } from "../data/repository.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    signUp,
    validate,
    "signup"
  );
  // Hook to set user exist error msg
  const [userExistsError, setUserExistsError] = useState("");
  // Hook to set succes account creation msg
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  async function signUp() {
    // Check's for user does not already exists in local storage
    if (await uniqueUserExists(values.email)) {
      // Adds new user to local storage and sets current user
      await addUser(values.name, values.email, values.password);

      // Clear error msg
      setUserExistsError("");

      // Passes current user to pages
      props.loginUser(values.email);

      // Show usr confirmation msg
      setSuccessMessage(
        "Account created Successful! Please wait while we log you in"
      );

      // Delay function take from - https://stackoverflow.com/questions/42089548/how-to-add-delay-in-react-js
      setTimeout(() => {
        // Travels to home page
        navigate("/");
      }, 3000);
    } else {
      setUserExistsError(
        "User already exists. Please login on or use a different credentials."
      );
    }
  }

  return (
    // Alligns content in center of page
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      {/* Border, 3 width and rounded*/}
      <Row className="border border-dark-subtle border-3 rounded-5 p-5 signUpFormSizing">
        {/* Signup Forum */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label paddingBottom">Full Name:</label>
            <input
              className={"input ${errors.name} form-control"}
              placeholder="Enter full name"
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name || ""}
              required
            ></input>
            {errors.name && <p className="alert alert-danger">{errors.name}</p>}
          </div>

          {/* Email Address*/}
          <div className="mb-3">
            <label className="form-label paddingBottom">Email Address:</label>
            <input
              className={"input ${errors.email} form-control"}
              placeholder="Enter email address"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              required
            ></input>
            {errors.email && (
              <p className="alert alert-danger">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-lalabelble paddingBottom">Password:</label>
            <input
              className={"input ${errors.password} form-control"}
              placeholder="Enter password"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              required
            ></input>
            {errors.password && (
              <p className="alert alert-danger">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Confirm Password:
            </label>
            <input
              className={"input ${errors.confirmPassword} form-control"}
              placeholder="Enter password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword || ""}
              required
            ></input>
            {errors.confirmPassword && (
              <p className="alert alert-danger">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Display error msg's */}
          {userExistsError && (
            <p className="alert alert-danger">{userExistsError}</p>
          )}

          {/* Display success msg's */}
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <Button variant="outline-primary" type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </Row>
    </Container>
  );
}

export default SignUp;
