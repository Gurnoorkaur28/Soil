// Some concept of this code/design were taken from RMIT - COSC2758 Wk10 Lec Code

import { useContext, useEffect, useState } from "react";
import { deleteProducts, fetchProducts } from "../data/repository";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import MessageContext from "../context/MessageContext";

function Products() {
  // Navigate to pages
  const navigate = useNavigate();

  // Context
  const { message, setMessage } = useContext(MessageContext);

  const [products, setProducts] = useState(null);

  // Fetch products and sets them in state
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const products = await fetchProducts();
    setProducts(products);
  };

  // To navigate to create product page
  const handleCreate = () => navigate("/createProduct");
  // To navigate to edit product page
  const handleEdit = (id) => navigate(`/editProduct/${id}`);

  // Deletes product
  const handleDelete = async (product) => {
    const productName = product.name;
    const deleted = await deleteProducts(product.id);

    // Referesh page and set msg after delete
    if (deleted) {
      await getProducts();
      setMessage(
        <>
          Product <strong>{productName}</strong> has been successfully deleted.
        </>
      );
    }
  };

  if (products == null) return null;
  return (
    <div>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <h1 className="text-start display-4">Products</h1>
      <div className="d-flex justify-content-end">
        <Button variant="outline-success squareBtn" onClick={handleCreate}>
          +
        </Button>
      </div>
      <table className="table table-hover">
        {/* Head */}
        <thead>
          <tr className="table-primary">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {/* Map Users */}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.image}</td>
              <td>
                <Button
                  variant="outline-primary w-100"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </Button>
              </td>
              <td>
                {" "}
                <Button
                  variant="outline-danger w-10"
                  onClick={() => handleDelete(product)}
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
export default Products;
