const db = require("../database");
// Fetching all special products with associated product details
exports.all = async (req, res) => {
    try {
        const specialProducts = await db.specialProduct.findAll({
            include: [{
                model: db.product,
                attributes: ['name', 'description', 'price', 'image'] 
            }]
        });

        res.json(specialProducts);
    } catch (error) {
        res.status(500).send("Failed to fetch special products: " + error.message);
    }
};


// Create a new special product
exports.create = async (req, res) => {
    try {
        const { product_id, discounted_price, start_date, end_date } = req.body;
        const newSpecialProduct = await db.specialProduct.create({
            product_id,
            discounted_price,
            start_date,
            end_date
        });
        res.status(201).json(newSpecialProduct);
    } catch (error) {
        res.status(500).send("Failed to create special product: " + error.message);
    }
};

