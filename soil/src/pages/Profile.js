import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import useForm from "../hooks/useForm.js";
import validate from "../utils/formValidator.js";
import {
  deleteSpecificUser,
  getUserJoinDate,
  getUserName,
  uniqueUserExists,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
} from "../data/repository.js";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    updateProfile,
    validate,
    "updateProfile",
    true
  );

  // Shows msg when user is deleted
  const [errorMessage, setErrorMessage] = useState("");
  // Shows success msg on profile details update
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  function updateProfile() {
    setErrorMessage("");
    let successMsg = "";
    let updatedFields = [];

    // First check's if a new email is unique else function stops
    if (values.email && !uniqueUserExists(values.email)) {
      setErrorMessage("Email already exists. Please choose another email.");
      return;
    }

    if (values.name) {
      if (updateUserName(props.username, values.name)) {
        updatedFields.push("name");
        // Updates current user state
        props.loginUser(props.username);
      } else {
        setErrorMessage("Unknow error occured");
      }
    }
    if (values.password) {
      if (updateUserPassword(props.username, values.password)) {
        updatedFields.push("password");
      } else {
        setErrorMessage("Unknow error occured");
      }
    }
    if (values.email) {
      if (updateUserEmail(props.username, values.email)) {
        updatedFields.push("email");
        // Updates current user state
        props.loginUser(values.email);
      } else {
        setErrorMessage("Unknow error occured");
      }
    }

    // Create the message based on the number of fields updated
    if (updatedFields.length > 0) {
      successMsg = "Your  ";
      if (updatedFields.length === 1) {
        successMsg += updatedFields[0];
      } else if (updatedFields.length === 2) {
        successMsg += updatedFields[0] + " and " + updatedFields[1];
      } else if (updatedFields.length === 3) {
        successMsg +=
          updatedFields[0] +
          ", " +
          updatedFields[1] +
          ", and " +
          updatedFields[2];
      }
      successMsg += " is now updated";
    }

    if (values) {
      // Sets confirmation msg after succesful update
      setSuccessMessage(successMsg);
      // Delay function take from - https://stackoverflow.com/questions/42089548/how-to-add-delay-in-react-js
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }

  function deleteUser() {
    // Sets confirmation msg after deleting user
    setErrorMessage(
      "You'r profile is being deleted! Please wait while we redirect you"
    );

    // Delay function take from - https://stackoverflow.com/questions/42089548/how-to-add-delay-in-react-js
    setTimeout(() => {
      // Logs user out
      props.logoutUser();
      // deletes user from localstorage
      deleteSpecificUser(props.username);
      // Travels to home page
      navigate("/");
    }, 3000);
  }

  return (
    // Alligns content in center of page
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bottomPadding10"
    >
      {/* Border, 3 width and rounded*/}
      <Row className="border border-dark-subtle border-3 rounded-5 p-5 profileFormSizing">
        {/* User details section */}
        <div className="d-flex justify-content-center">
          {/* Displays current user's name */}
          <div className="me-auto">Name: {getUserName(props.username)}</div>

          {/* Email */}
          <div className="me-auto">Email: {props.username}</div>

          {/**
           * Date concept/some code taken from -
           * https://www.altcademy.com/blog/how-to-format-datetime-in-reactjs/#:~:text=Here's%20how%20you%20can%20format,formatted%20date%20as%20the%20Moment.
           */}
          <div>
            Join Date:{" "}
            {format(new Date(getUserJoinDate(props.username)), "dd MMMM yyyy")}
          </div>
        </div>

        {/* Profile Update Forum */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Change Full Name:
            </label>
            <input
              className={"input ${errors.name} form-control"}
              placeholder="Enter name"
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name || ""}
            ></input>
            {errors.name && <p className="alert alert-danger">{errors.name}</p>}
          </div>

          {/* Email Address*/}
          <div className="mb-3">
            <label className="form-label paddingBottom">
              Change Email Address:
            </label>
            <input
              className={"input ${errors.email} form-control"}
              placeholder="Enter email address"
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
            ></input>
            {errors.email && (
              <p className="alert alert-danger">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-lalabelble paddingBottom">
              Change Password:
            </label>
            <input
              className={"input ${errors.password} form-control"}
              placeholder="Enter password"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
            ></input>
            {errors.password && (
              <p className="alert alert-danger">{errors.password}</p>
            )}
          </div>

          {/* Display Deletion success msg's */}
          {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

          {/* Display success msg's on profile detail update */}
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}

          <div className="d-flex gap-2">
            {/* Delete Update Button */}
            <Button
              variant="outline-danger"
              type="button"
              onClick={deleteUser}
              className="w-100"
            >
              Delete Profile
            </Button>

            {/* Profile Update Button */}
            <Button variant="outline-primary" type="submit" className="w-100">
              Update details
            </Button>
          </div>
        </form>
      </Row>
    </Container>
  );
}

export default Profile;
