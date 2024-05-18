const db = require("../database");

// Fetch all products with potential special offers
exports.all = async (req, res) => {
    try {
        const products = await db.product.findAll({
            include: [{
                model: db.specialProduct,
                required: false,  // LEFT OUTER JOIN to include products even without special offers
                where: {
                    start_date: {
                        [db.Op.lte]: new Date() // Ensure the special is currently valid
                    },
                    end_date: {
                        [db.Op.gte]: new Date()
                    },
                    
                }
            }]
        });

        // Calculate discounted price if there's a special offer
        const productsWithDiscounts = products.map(product => {
            const productJSON = product.toJSON();
            if (productJSON.specialProduct) {
                productJSON.discountedPrice = productJSON.specialProduct.discounted_price;
            }
            return productJSON;
        });

        res.json(productsWithDiscounts);
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

