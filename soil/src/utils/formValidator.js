// Some Code/concept was taken from Rmit/Canvas/2412/wk4/Practicle

// 2 parameters values to validate and formType so we can use same function for both login and signup
export default function validate(values, formType) {
  let errors = {};

  // Email Regex taken from - https://stackoverflow.com/questions/60282362/regex-pattern-for-email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password Regex
  const minOneCharUppercase = /.*[A-Z].*/;
  const minOneCharLowecase = /.*[a-z].*/;
  const minOneSpecialChar = /.*[\W_].*/;
  const minOneNumber = /.*\d.*/;

  /**
   * Ensures the name starts with at least one letter.
   * Allows for any number of additional words that may start with a space
   */
  const nameRegex = /^[A-Za-z]+([ \-'][A-Za-z]+)*$/;

  // Validation signup/ login
  if (formType === "signup" || formType === "login") {
    emailValidation();
    passwordValidation();
    if (formType === "signup") {
      nameValidation();
      confirmPasswordValidation();
    }
  }

  // Validation profile
  if (formType === "updateProfile") {
    if ("name" in values) {
      nameValidation();
    }
    if ("email" in values) {
      emailValidation();
    }
    if ("password" in values) {
      passwordValidation();
    }
  }

  // Validation detailsPreferences
  if (formType === "detailsPreferences") {
    genderGoal();
    ageValidation();
    weightValidation();
    heightValidation();
    activityLevel();
    dietaryPreference();
    healthGoal();
  }

  // Name Validation
  function nameValidation() {
    if (!values.name) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "Name must only contain letters";
    } else if (values.name.length > 30) {
      errors.name = "Name must be less than 30 characters";
    }
  }

  // Email Validation
  function emailValidation() {
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  }

  // Password Validation
  function passwordValidation() {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must 8 characters long";
    } else if (!minOneCharUppercase.test(values.password)) {
      errors.password = "At least 1 uppercase letter";
    } else if (!minOneCharLowecase.test(values.password)) {
      errors.password = "At least 1 lowercase letters";
    } else if (!minOneNumber.test(values.password)) {
      errors.password = "At least 1 number";
    } else if (!minOneSpecialChar.test(values.password)) {
      errors.password = "At least 1 special character.";
    }
  }

  // Confirm Password Validation
  function confirmPasswordValidation() {
    if (!values.password) {
      errors.confirmPassword = "Confirm Password in required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword =
        "Your password dosen't matches with confirm password";
    }
  }

  // Age Validation
  function ageValidation() {
    if (!values.age) {
      errors.age = "Age is required";
    } else if (!/^\d+$/.test(values.age)) {
      errors.age = "Age must be a number";
    } else if (values.age < 10 || values.age > 120) {
      errors.age = "Please enter a valid age (10-120)";
    }
  }

  // Weight Validation
  function weightValidation() {
    if (!values.weight) {
      errors.weight = "Weight is required";
    } else if (!/^\d+(\.\d+)?$/.test(values.weight)) {
      errors.weight = "Weight must be a number";
    } else if (values.weight < 20) {
      errors.weight = "Weight has to be min 20kg";
    } else if (values.weight > 400) {
      errors.weight = "Weight cant be more than 400kg";
    }
  }

  // Height Validation
  function heightValidation() {
    if (!values.height) {
      errors.height = "Height is required";
    } else if (!/^\d+(\.\d+)?$/.test(values.height)) {
      errors.height = "Height must be a number";
    } else if (values.height < 50) {
      errors.height = "Height cant be less than 50cm";
    } else if (values.height > 280) {
      errors.height = "Height cant be greather than 280cm";
    }
  }

  // Activity Level Validation
  function activityLevel() {
    if (!values.activityLevel) {
      errors.activityLevel = "Activity Level is required";
    }
  }

  // Dietary Preference Validation
  function dietaryPreference() {
    if (!values.dietaryPreference) {
      errors.dietaryPreference = "Dietary Preference is required";
    }
  }

  // Health Goal Validation
  function healthGoal() {
    if (!values.healthGoal) {
      errors.healthGoal = "Health Goal is required";
    }
  }

  // Gender Validation
  function genderGoal() {
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
  }

  return errors;
}
