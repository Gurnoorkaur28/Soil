import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteSpecial, fetchSpecials } from "../data/repository";

import MessageContext from "../context/MessageContext";

function Specials() {
  // Navigate to pages
  const navigate = useNavigate();

  // Context
  const { message, setMessage } = useContext(MessageContext);

  const [specials, setSpecials] = useState(null);

  // Fetch products and sets them in state
  useEffect(() => {
    getSpecials();
  }, []);

  const getSpecials = async () => {
    const specials = await fetchSpecials();
    setSpecials(specials);
  };

  // To navigate to create special page
  const handleCreate = () => navigate("/createSpecial");
  // To navigate to edit product page
  const handleEdit = (specialId) => navigate(`/editSpecial/${specialId}`);

  // Deletes product
  const handleDelete = async (special) => {
    const specialId = special.special_id;
    const deleted = await deleteSpecial(special.special_id);

    // Referesh page and set msg after delete
    if (deleted) {
      await getSpecials();
      setMessage(
        <>
          Special <strong>{specialId}</strong> has been successfully deleted.
        </>
      );
    }
  };

  if (specials == null) return null;
  return (
    <div>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <h1 className="text-start display-4">Specials</h1>
      <div className="d-flex justify-content-end">
        <Button variant="outline-success squareBtn" onClick={handleCreate}>
          +
        </Button>
      </div>
      <table className="table table-hover">
        {/* Head */}
        <thead>
          <tr className="table-primary">
            <th>Special ID</th>
            <th>Discounted Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Product ID</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {/* Map Users */}
          {specials.map((special) => (
            <tr key={special.special_id}>
              <td>{special.special_id}</td>
              <td>{special.discounted_price}</td>
              <td>{special.start_date}</td>
              <td>{special.end_date}</td>
              <td>{special.id}</td>
              <td>
                <Button
                  variant="outline-primary w-50"
                  onClick={() => handleEdit(special.special_id)}
                >
                  Edit
                </Button>
              </td>
              <td>
                {" "}
                <Button
                  variant="outline-danger w-50"
                  onClick={() => handleDelete(special)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Specials;
