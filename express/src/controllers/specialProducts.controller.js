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


