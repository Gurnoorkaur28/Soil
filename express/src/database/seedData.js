//Seed data for products
async function seedProducts(db) {
  const productCount = await db.product.count();
  if (productCount === 0) {
    await db.product.bulkCreate([
      {
        name: "milk",
        price: 3.5,
        description: "1 litre, Fresh Cow milk",
        image: "milk.png",
      },
      {
        name: "Tomatoes",
        price: 4.0,
        description: "1kg, Juicy Tomatoes",
        image: "tomatoes.png",
      },
      {
        name: "Carrots",
        price: 1.5,
        description: "1kg, Fresh Carrots",
        image: "carrot.png",
      },
      {
        name: "Spinach",
        price: 2.0,
        description: "Per pack",
        image: "spinach.png",
      },
      {
        name: "Broccoli",
        price: 2.5,
        description: "each",
        image: "broccoli.png",
      },
      {
        name: "Potatoes",
        price: 5.5,
        description: "1 kg",
        image: "potatoes.png",
      },
      {
        name: "Onions",
        price: 4.0,
        description: "Per kg",
        image: "onions.png",
      },
      {
        name: "Soya Milk",
        price: 3.5,
        description: "1 litre (lactose free)",
        image: "soya-milk.png",
      },
      {
        name: "Pulses",
        price: 4.0,
        description: "Per kg",
        image: "pulses.png",
      },
      {
        name: "Flour",
        price: 4.9,
        description: "Per kg",
        image: "flour.png",
      },
      {
        name: "Almond",
        price: 9.0,
        description: "Per kg",
        image: "almond.png",
      },
      {
        name: "Eggs",
        price: 9.0,
        description: "12 Cage Free Eggs",
        image: "egg.png",
      },
      {
        name: "Blueberries",
        description: "Special discount on blueberries!",
        price: 4.05,
        image: "Blueberries.png",
      },
      {
        name: "Cottage Cheese",
        description: "Special offer on cottage cheese (per pack)",
        price: 5.55,
        image: "CottageCheese.png",
      },
      {
        name: "Strawberries",
        description: "Special deal on strawberries!",
        price: 4.05,
        image: "Strawberries.png",
      },
      {
        name: "Avocado",
        description: "Limited time offer on fresh avocados",
        price: 2.1,
        image: "Avocado.png",
      },
      {
        name: "Apples",
        description: "Fresh and crisp apples, great for snacking.",
        price: 3.05,
        image: "Apples.png",
      },
      {
        name: "Bananas",
        description: "Fresh and sweet bananas",
        price: 4.0,
        image: "Bananas.png",
      },
    ]);
  }
}
//seed data for special products
async function seedSpecialProducts(db) {
  const specialProductCount = await db.specialProduct.count();
  if (specialProductCount === 0) {
    await db.specialProduct.bulkCreate([
      {
        id: 18,
        discounted_price: 2.5,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 17,
        discounted_price: 2.5,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 16,
        discounted_price: 1.5,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 16,
        discounted_price: 1.5,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 15,
        discounted_price: 3.05,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 14,
        discounted_price: 4.05,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
      {
        id: 13,
        discounted_price: 3.05,
        start_date: "2024-05-12",
        end_date: "2024-08-18",
      },
    ]);
  }
}

const argon2 = require("argon2");
const joinDate = new Date().toISOString();

// Seed test users into database
async function seedUsers(db) {
  const userCount = await db.user.count();
  if (userCount === 0) {
    passwordHash = await argon2.hash("Test1234#", { type: argon2.argon2id });
    await db.user.bulkCreate([
      {
        email: "testusr1@gmail.com",
        password_hash: passwordHash,
        full_name: "testuser one",
        join_date: joinDate,
      },
      {
        email: "testusr2@gmail.com",
        password_hash: passwordHash,
        full_name: "testuser two",
        join_date: joinDate,
      },
      {
        email: "testusr3@gmail.com",
        password_hash: passwordHash,
        full_name: "testuser three",
        join_date: joinDate,
      },
    ]);
  }
}
// Seed data for cart to add to database
async function seedcart(db) {
  const cartCount = await db.cart.count();
  if (cartCount === 0) {
    await db.cart.bulkCreate([
      {
        user_id: 1,
        cart_id: 1,
      },
      {
        user_id: 2,
        cart_id: 2,
      },
      {
        user_id: 3,
        cart_id: 3,
      },
    ]);
  }
}
async function seedCartItems(db) {
  const cartItemCount = await db.cartItem.count();
  if (cartItemCount === 0) {
    await db.cartItem.bulkCreate([
      {
        cart_id: 1,
        productId: 1,
        quantity: 2,
      },
      {
        cart_id: 2,
        productId: 2,
        quantity: 3,
      },
    ]);
  }
}
//seed reviews
async function seedreview(db) {
  const reviewCount = await db.review.count();
  if (reviewCount === 0) {
    await db.review.bulkCreate([
      {
        rating: 3,
        productId: 1,
        comment: "good quality",
        user_id: 1,
      },
      {
        rating: 3,
        productId: 2,
        comment: "good quality",
        user_id: 1,
      },
      {
        rating: 5,
        productId: 2,
        comment: "Like this product alot",
        user_id: 2,
      },
      {
        rating: 3,
        productId: 3,
        comment: "Love this product",
        user_id: 1,
      },
      // Review containing profanity
      {
        rating: 3,
        productId: 3,
        comment: "Fu this product",
        user_id: 2,
      },
      // Review containing profanity
      {
        rating: 5,
        productId: 4,
        comment: "ass",
        user_id: 1,
      },
      // Review containing profanity
      {
        rating: 1,
        productId: 4,
        comment: "shit product",
        user_id: 2,
      },
      {
        rating: 4,
        productId: 1,
        comment: "Love This product",
        user_id: 3,
      },
      {
        rating: 5,
        productId: 1,
        comment: "Very good",
        user_id: 3,
      },
      {
        rating: 5,
        productId: 17,
        comment: "Fantastic",
        user_id: 3,
      },
      {
        rating: 1,
        productId: 8,
        comment: "bad do not recommend",
        user_id: 3,
      },
      {
        rating: 1,
        productId: 8,
        comment: "Hate this product",
        user_id: 2,
      },
      {
        rating: 1,
        productId: 8,
        comment: "Waste pf money",
        user_id: 1,
      },
    ]);
  }
}
module.exports = {
  seedProducts,
  seedSpecialProducts,
  seedUsers,
  seedCartItems,
  seedcart,
  seedreview,
};
