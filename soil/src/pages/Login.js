// Some Code/concept was taken from Rmit/Canvas/2412/wk4/Lec

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useForm from "../hooks/useForm.js";
import validate from "../utils/formValidator.js";
import { getUserName, verifyUser } from "../data/repository.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate,
    "login"
  );
  // Hook to set user exist error msg
  const [userWrongError, setWrongUserExistsError] = useState("");
  // Hook to set succes account creation msg
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  async function login() {
    // Verify user and sets user if success
    if (await verifyUser(values.email, values.password)) {
      // Clear error msg
      setWrongUserExistsError("");

      // Passes current user to pages
      props.loginUser(values.email);

      const userName = await getUserName(values.email);

      // Show usr confirmation msg
      setSuccessMessage(`Welcome, ${userName}!\nPlease wait while we redirect`);

      // Delay function take from - https://stackoverflow.com/questions/42089548/how-to-add-delay-in-react-js
      setTimeout(() => {
        // Travels to profile page
        navigate("/profile");
      }, 2950);
    } else {
      setWrongUserExistsError(
        "Username and / or password is invalid, please try again."
      );
    }
  }

  return (
    // Alligns content in center of page
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
    >
      <div className="loginContainer">
        {/* Border, 3 width and rounded*/}
        <Row className="border border-dark-subtle border-3 rounded-5 p-5 loginFormSizing">
          {/* Login Forum */}
          <form onSubmit={handleSubmit} noValidate>
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
              <label className="form-label paddingBottom">Password:</label>
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

            {/* Display error msg's */}
            {userWrongError && (
              <p className="alert alert-danger">{userWrongError}</p>
            )}

            {/* Display success msg's */}
            {successMessage && (
              <p className="alert alert-success">{successMessage}</p>
            )}

            {/* Submit Button */}
            <div className="d-grid gap-2">
              <Button variant="outline-primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Row>
      </div>
    </Container>
  );
}

export default Login;
