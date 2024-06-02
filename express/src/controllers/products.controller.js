const db = require("../database");

// Fetch all products with potential special offers
exports.all = async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: [
        {
          model: db.specialProduct,
          required: false, // LEFT OUTER JOIN to include products even without special offers
          where: {
            start_date: {
              [db.Op.lte]: new Date(), // Ensure the special is currently valid
            },
            end_date: {
              [db.Op.gte]: new Date(),
            },
          },
        },
      ],
    });

    // Calculate discounted price if there's a special offer
    const productsWithDiscounts = products.map((product) => {
      const productJSON = product.toJSON();
      if (productJSON.specialProduct) {
        productJSON.discountedPrice =
          productJSON.specialProduct.discounted_price;
      }
      return productJSON;
    });

    res.json(productsWithDiscounts);
  } catch (error) {
    res.status(500).send("Failed to fetch products: " + error.message);
  }
};


// Find product by primary key
exports.id = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.id, {
      include: [
        {
          model: db.specialProduct,
          required: false, // LEFT OUTER JOIN to include products even without special offers
          where: {
            start_date: {
              [db.Op.lte]: new Date(), // Ensure the special is currently valid
            },
            end_date: {
              [db.Op.gte]: new Date(),
            },
          },
        },
      ],
    });

    if (product) {
      const productJSON = product.toJSON();
      if (productJSON.specialProduct) {
        productJSON.discountedPrice =
          productJSON.specialProduct.discounted_price;
      }
      res.json(productJSON);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Failed to fetch product: " + error.message);
  }
};
