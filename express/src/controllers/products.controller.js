const db = require("../database");

exports.all = async (req, res) => {
    try {
        const products = await db.product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send("Failed to fetch products: " + error.message);
    }
};

exports.create = async (req, res) => {
    try {
        const product = await db.product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        });
        res.json(product);
    } catch (error) {
        res.status(500).send("Failed to create product: " + error.message);
    }
};
