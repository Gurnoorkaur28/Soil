/*
Code taken from Week 4 Activity 1: Validating email Information
Regular expression for expiry validation taken from Black box AI
luhs algoritm from https://youtu.be/ugDRoGmt3dk?si=kj7TogGS0euoiAFK
*/

//vadlidate name on card
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z\s'.-]+$/.test(values.name)) {
    errors.name = "Name on card must contain only letters and spaces";
  }
  //validating mobile number of user
  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d+$/.test(values.mobile)) {
    errors.mobile = "Mobile number must contain only digits";
  }
  if (!values.address) {
    errors.address = "Address is required";
  }
  //card number is required and validating via luh's algo
  if (!values.cardNumber) {
    errors.cardNumber = "Card number is required";
  } else if (!validateCreditCardNumber(values.cardNumber.replace(/\s/g, ""))) {
    errors.cardNumber = "Invalid card number";
  }
  //validating expiratation
  if (!values.cardExpiry) {
    errors.cardExpiry = "Card expiry is required";
  } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(values.cardExpiry)) {
    errors.cardExpiry = "Invalid card expiry";
  } else {
    const expiryParts = values.cardExpiry.split("/");
    const expiryYear = parseInt(expiryParts[1], 10);
    const currentYear = new Date().getFullYear() % 100; // get the last two digits of the current year

    if (
      parseInt(expiryParts[0], 10) < 1 ||
      parseInt(expiryParts[0], 10) > 12 ||
      expiryYear < currentYear
    ) {
      errors.cardExpiry = "Invalid card expiry";
    } else if (
      expiryYear === currentYear &&
      parseInt(expiryParts[0], 10) < new Date().getMonth() + 1
    ) {
      errors.cardExpiry = "Card has already expired";
    }
  }
  //validating cvc
  if (!values.cardCvc) {
    errors.cardCvc = "Card CVC is required";
  } else if (!/^[0-9]{3,4}$/.test(values.cardCvc)) {
    errors.cardCvc = "Invalid card CVC";
  }
  return errors;
};
//luh's algorithm
const validateCreditCardNumber = (input) => {
  let creditCardInt = input.split("").map((number) => parseInt(number));

  for (let i = creditCardInt.length - 2; i >= 0; i -= 2) {
    let tempValue = creditCardInt[i];
    tempValue *= 2;
    if (tempValue > 9) {
      tempValue = (tempValue % 10) + 1;
    }
    creditCardInt[i] = tempValue;
  }

  let total = 0;
  for (let i = 0; i < creditCardInt.length; i++) {
    total += creditCardInt[i];
  }

  return total % 10 === 0;
};

export default validate;
