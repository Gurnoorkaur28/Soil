// Some Code/concept was taken from Rmit/Canvas/2412/wk4/Practicle

import { useEffect } from "react";
import { MEALS } from "../utils/constants";

const USERS_KEY = "users";
const USER_KEY = "user";

// Gets users from local storage and returns them
function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  if (data) {
    // Convert data to objects.
    return JSON.parse(data);
  }
  return [];
}

// Checks if unique user with the following credentials exists
function uniqueUserExists(email) {
  const users = getUsers();
  for (const user of users) {
    if (email === user.email) {
      return false;
    }
  }

  return true;
}

// Checks if user with the following credentials exists
function userExists(email, password) {
  const users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  for (const user of users) {
    if (lowerCaseEmail === user.email && password === user.password) {
      return true;
    }
  }

  return false;
}

// Compare users stored in local storage and sets current user
function verifyUser(email, password) {
  if (userExists(email, password)) {
    setUser(email);
    return true;
  }
  return false;
}

// Adds new user to local storage
function addUser(name, email, password) {
  const users = getUsers();
  const dateOfJoining = new Date().toISOString();
  const lowerCaseEmail = email.toLowerCase();
  const newUser = { name, email: lowerCaseEmail, password, dateOfJoining };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setUser(email);
}

// Stores the specified username as the current user in local storage.
function setUser(email) {
  const lowerCaseEmail = email.toLowerCase();
  localStorage.setItem(USER_KEY, lowerCaseEmail);
}

// Returns stored current user
function getUser() {
  return localStorage.getItem(USER_KEY);
}

// Removes curretn logged user from local storage
function removeUser() {
  localStorage.removeItem(USER_KEY);
}

// Returns full name of user
function getUserName(email) {
  if (email === null) return null;

  const users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  for (const user of users) {
    if (lowerCaseEmail === user.email) {
      return user.name;
    }
  }
  return null;
}

// Returns join date of current user
function getUserJoinDate(email) {
  const users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  for (const user of users) {
    if (lowerCaseEmail === user.email) {
      return user.dateOfJoining;
    }
  }
  return null;
}

/**
 * Delets usr from localstorage
 * Gets the current list of users then
 * Finds the index of user if no user is found it returns -1
 * Then user is Deleted and list is updated in localstorage */
function deleteSpecificUser(email) {
  let users = getUsers();
  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

// User profile update functions
function updateUserName(email, newName) {
  let users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  const userIndex = users.findIndex((user) => user.email === lowerCaseEmail);

  if (userIndex !== -1) {
    users[userIndex].name = newName;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

function updateUserEmail(oldEmail, newEmail) {
  let users = getUsers();
  const lowerCaseOldEmail = oldEmail.toLowerCase();
  const lowerCaseNewEmail = newEmail.toLowerCase();
  const userIndex = users.findIndex((user) => user.email === lowerCaseOldEmail);

  if (userIndex !== -1 && uniqueUserExists(lowerCaseNewEmail)) {
    users[userIndex].email = lowerCaseNewEmail;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    // Update the current user key if the updated email belongs to the logged-in user
    if (getUser() === lowerCaseOldEmail) {
      setUser(lowerCaseNewEmail);
    }
    return true;
  }
  return false;
}

function updateUserPassword(email, newPassword) {
  let users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  const userIndex = users.findIndex(
    (user) => user.email === lowerCaseEmail.toLowerCase()
  );

  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

// Add or updates user personalized details
function addOrUpdatePersonalisedProfiles(
  email,
  gender,
  age,
  weight,
  height,
  activityLevel,
  dietaryPreference,
  healthGoal
) {
  let users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  const userIndex = users.findIndex((user) => user.email === lowerCaseEmail);

  const userProfile = {
    gender: gender,
    age: age,
    weight: weight,
    height: height,
    activityLevel: activityLevel,
    dietaryPreference: dietaryPreference,
    healthGoal: healthGoal,
  };

  if (userIndex !== -1) {
    // Update existing user profile
    const updatedUser = { ...users[userIndex], userDetails: userProfile };
    users[userIndex] = updatedUser;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
// Gets the user profile details by email
function getUserProfile(email) {
  if (email === null) return null;

  const users = getUsers();
  const lowerCaseEmail = email.toLowerCase();
  for (const user of users) {
    if (lowerCaseEmail === user.email) {
      return user.userDetails || null;
    }
  }
  return null;
}

// Checks if a user is currently logged in
function isLoggedIn() {
  return localStorage.getItem(USER_KEY) !== null;
}

// Gets meal according to diet preference
function getMealAccordPreference(preference) {
  const meals = JSON.parse(localStorage.getItem("meals"))[preference];
  return meals;
}

// Store constants in local storage
function InitializeConstants() {
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(MEALS));
  }, []);

  return null;
}

export {
  uniqueUserExists,
  addUser,
  verifyUser,
  getUser,
  removeUser,
  getUserName,
  getUserJoinDate,
  isLoggedIn,
  deleteSpecificUser,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  addOrUpdatePersonalisedProfiles,
  getUserProfile,
  getMealAccordPreference,
};

export default InitializeConstants;
