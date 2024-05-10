import { useNavigate } from "react-router-dom";
import { useState } from "react";
import validate from "../utils/checkoutValidate";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//hook to handle form state and validation
const useForm = (callback, validate, navigate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validate(values);
    if (Object.keys(validationResult).length === 0) {
      // Handle form submission here
      callback();
    } else {
      setErrors(validationResult);
    }
  };
  // Handles input changes
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    navigate,
  };
};
// CheckoutPage component
const CheckoutPage = () => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, errors } = useForm(
    () => {
      // Handle form submission here
      navigate("/summary");
    },
    validate,
    {
      name: "",
      mobile: "",
      address: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    }
  );

  return (
    //form for checkout
    <div className="containerCheckout">
      <div className="formDiv">
        <Form
          onSubmit={handleSubmit}
          style={{
            padding: "2rem",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          <Form.Label style={{ color: "gray", fontSize: "2.2rem" }}>
            Please fill the following and procced payment
          </Form.Label>
          {/*mobile number */}
          <Form.Group className="mb-3" controlId="formMobile">
            <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
              Mobile
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            />
            {errors.mobile && (
              <div style={{ color: "red" }}>{errors.mobile}</div>
            )}
          </Form.Group>
          {/* user address */}
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
              Address
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={values.address}
              onChange={handleChange}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            />
            {errors.address && (
              <div style={{ color: "red" }}>{errors.address}</div>
            )}
            <Form.Label style={{ color: "gray", fontSize: "1.7rem" }}>
              Payment
            </Form.Label>
          </Form.Group>
          {/*Name on card */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
              Name on Card
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={values.name}
              onChange={handleChange}
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </Form.Group>
          {/* card Number */}
          <Form.Group className="mb-3" controlId="formCardNumber">
            <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
              Card Number
            </Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                placeholder="0000 0000 0000 0000"
                name="cardNumber"
                value={values.cardNumber}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              />
              <img
                src="/images/creditIcon.png"
                alt="Credit card icon"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "1rem",
                  transform: "translateY(-50%)",
                }}
              />
              <img
                src="/images/credit.png"
                alt="Credit card icon"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "4rem",
                  transform: "translateY(-50%)",
                }}
              />
              <img
                src="/images/visa.png"
                alt="Credit card icon"
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "7rem",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
            {errors.cardNumber && (
              <div style={{ color: "red" }}>{errors.cardNumber}</div>
            )}
          </Form.Group>
          {/* card expiry */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCardExpiry">
              <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
                Card Expiry
              </Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  name="cardExpiry"
                  value={values.cardExpiry}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
              </div>
              {errors.cardExpiry && (
                <div style={{ color: "red" }}>{errors.cardExpiry}</div>
              )}
            </Form.Group>
            {/*cvc */}
            <Form.Group as={Col} controlId="formCardCvc">
              <Form.Label style={{ color: "gray", fontSize: "1.2rem" }}>
                Card CVC
              </Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type="text"
                  placeholder="Enter card CVC"
                  name="cardCvc"
                  value={values.cardCvc}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
                <img
                  src="/images/cvc.png"
                  alt="Credit card icon"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
              {errors.cardCvc && (
                <div style={{ color: "red" }}>{errors.cardCvc}</div>
              )}
            </Form.Group>
          </Row>
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: "black",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 2rem",
            }}
          >
            Place order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
