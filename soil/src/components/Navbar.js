import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
const Navbar = (props) => {
  //state for modals of about and contact
  const [isModalOpen, setModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleOpenContactModal = () => setContactModalOpen(true);
  const handleCloseContactModal = () => setContactModalOpen(false);

  return (
    <div className="navbar">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/specials">
          Specials
        </Link>
      </li>
      <li className="nav-item"></li>
      <li className="nav-item">
        <Link className="nav-link" to="/backyard-vegetable-gardening">
          Gardening Information
        </Link>
      </li>
      <li className="nav-item">
        <a href="#" onClick={handleOpenModal}>
          About
        </a>
      </li>
      <li className="nav-item">
        <a href="#" onClick={handleOpenContactModal}>
          Contact Us
        </a>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/mealPlan">
          Meal Plan
        </Link>
      </li>
      {props.username === null ? null : (
        <li className="nav-item">
          <Link className="nav-link" to="/detailsPreference">
            Details/Preference
          </Link>
        </li>
      )}
      {/* Modal for About us*/}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>About SOIL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            SOIL is a long-term organic food grocer with several store locations
            around Melbourne. We focus on bringing premium, organic fresh food
            to the community. In addition to being food grocers, We also offer
            face-to-face seminars on diet, nutrition, and small-scale organic
            farming. Now we are online.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Close
          </button>
        </Modal.Footer>
        {/* Modal for Contact us*/}
      </Modal>
      <Modal show={isContactModalOpen} onHide={handleCloseContactModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>If you have any questions, please feel free to contact us:</p>
          <ul>
            <li>Phone: 123-456-7890</li>
            <li>Email: contact@soilstore.com</li>
            <li>Visit our stores .</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleCloseContactModal}
            className="btn btn-secondary"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Navbar;
