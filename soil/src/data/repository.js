// Some Code/concept was taken from Rmit/Canvas/2412/wk4/Practicle

import { useEffect } from "react";
import axios from "axios";
import { API_USERS } from "../utils/constants";

const USERS_KEY = "users";
const USER_KEY = "user";

// Gets users from 
async function getUsers() {
  try {
    const response = await axios.get(API_USERS);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

// Get user id
async function getUserId(usrEmail) {
  try {
    const email = usrEmail.toLowerCase();
    const response = await axios.get(API_USERS + "id/", {
      params: { email },
    });
    return response.data.userId;
  } catch (error) {
   // console.error("Failed to fetch user id:", error);
    return null;
  }
}
 // Checks if unique user with the following credentials exists
async function uniqueUserExists(email) {
  try {
    const users = await getUsers();
    return !users.some((user) => user.email === email);
  } catch (error) {
    console.error("Error checking if unique user exists:", error);
    return false;
  }
}

// Checks if user with the following credentials exists
async function userExists(email, password) {
  try {
    const response = await axios.get(API_USERS + "login", {
      params: { email, password },
    });
    return response.data ? true : false;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
}

// Compare users stored in database and sets current user
async function verifyUser(email, password) {
  const lowerCaseEmail = email.toLowerCase();
  if (await userExists(lowerCaseEmail, password)) {
    setUser(lowerCaseEmail);
    return true;
  }
  return false;
}

// Adds new user 
async function addUser(name, email, password) {
  try {
    const lowerCaseEmail = email.toLowerCase();
    const newUser = {
      fullName: name,
      email: lowerCaseEmail,
      password: password,
    };

    const response = await axios.post(API_USERS, newUser);
    setUser(lowerCaseEmail);
    return response.data;
  } catch (error) {
    console.error("Failed to add user:", error);
  }
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

// Get user by email
async function getUserByEmail(usrEmail) {
  try {
    const email = usrEmail.toLowerCase();
    const response = await axios.get(API_USERS + "select/", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get user by email:", error);
    return null;
  }
}

// Returns full name of user
async function getUserName(email) {
  const user = await getUserByEmail(email);
  return user ? user.full_name : null;
}

// Returns join date of current user
async function getUserJoinDate(email) {
  const user = await getUserByEmail(email);
  return user ? user.join_date : null;
}
//check if user is blocked
async function getUserBlockedStatus(email) {
  const user = await getUserByEmail(email);
  return user ? user.is_blocked : null;
}

//Delets usr by email
async function deleteSpecificUser(email) {
  try {
    const response = await axios.delete(API_USERS, {
      params: { email },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

// Update function
async function updateUserDetails(email, updates) {
  try {
    const response = await axios.put(
      `${API_USERS}?email=${encodeURIComponent(email)}`,
      updates
    );
    return response.data;
  } catch (error) {
    return false;
  }
}

// User profile update functions
// function updateUserName(email, newName) 
async function updateUserName(email, newName) {
  const updates = { full_name: newName };
  return await updateUserDetails(email, updates);
}

// function updateUserEmail(oldEmail, newEmail) 
async function updateUserEmail(oldEmail, newEmail) {
  if (await uniqueUserExists(newEmail)) {
    const updates = { email: newEmail.toLowerCase() };
    const result = await updateUserDetails(oldEmail, updates);
    if (result) {
      if (getUser() === oldEmail.toLowerCase()) {
        setUser(newEmail.toLowerCase());
      }
      return true;
    }
  }
  return false;
}

// function updateUserPassword(email, newPassword) {
async function updateUserPassword(email, newPassword) {
  const updates = { password_hash: newPassword };
  return await updateUserDetails(email, updates);
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
  //return meals;
}

// Store constants in local storage
function InitializeConstants() {
  useEffect(() => {
    //localStorage.setItem("meals", JSON.stringify(MEALS));
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
  getUserId,
  getUserBlockedStatus,
};

export default InitializeConstants;
