async function seedProducts(db) {
  const productCount = await db.product.count();
  if (productCount === 0) {
    await db.product.bulkCreate([
      {
        id: 1,
        name: "milk",
        price: 3.5,
        description: "1 litre, Fresh Cow milk",
        image: "milk.png",
      },
      {
        id: 2,
        name: "Tomatoes",
        price: 4.0,
        description: "1kg, Juicy Tomatoes",
        image: "tomatoes.png",
      },
      {
        id: 3,
        name: "Carrots",
        price: 1.5,
        description: "1kg, Fresh Carrots",
        image: "carrot.png",
      },
      {
        id: 4,
        name: "Spinach",
        price: 2.0,
        description: "Per pack",
        image: "spinach.png",
      },
      {
        id: 5,
        name: "Broccoli",
        price: 2.5,
        description: "each",
        image: "broccoli.png",
      },
      {
        id: 6,
        name: "Potatoes",
        price: 5.5,
        description: "1 kg",
        image: "potatoes.png",
      },
      {
        id: 7,
        name: "Onions",
        price: 4.0,
        description: "Per kg",
        image: "onions.png",
      },
      {
        id: 8,
        name: "Soya Milk",
        price: 3.5,
        description: "1 litre (lactose free)",
        image: "soya-milk.png",
      },
      {
        id: 9,
        name: "Pulses",
        price: 4.0,
        description: "Per kg",
        image: "pulses.png",
      },
      {
        id: 10,
        name: "Flour",
        price: 4.9,
        description: "Per kg",
        image: "flour.png",
      },
      {
        id: 11,
        name: "Almond",
        price: 9.0,
        description: "Per kg",
        image: "almond.png",
      },
      {
        id: 12,
        name: "Eggs",
        price: 9.0,
        description: "12 Cage Free Eggs",
        image: "egg.png",
      },
      {
        id: 13,
        name: "Blueberries",
        description: "Special discount on blueberries!",
        price: 4.05,
        image: "Blueberries.png",
      },
      {
        id: 14,
        name: "Cottage Cheese",
        description: "Special offer on cottage cheese (per pack)",
        price: 5.55,
        image: "CottageCheese.png",
      },
      {
        id: 15,
        name: "Strawberries",
        description: "Special deal on strawberries!",
        price: 4.05,
        image: "Strawberries.png",
      },
      {
        id: 16,
        name: "Avocado",
        description: "Limited time offer on fresh avocados",
        price: 2.1,
        image: "Avocado.png",
      },
      {
        id: 17,
        name: "Apples",
        description: "Fresh and crisp apples, great for snacking.",
        price: 3.05,
        image: "Apples.png",
      },
      {
        id: 18,
        name: "Bananas",
        description: "Fresh and sweet bananas",
        price: 4.0,
        image: "Bananas.png",
      },
    ]);
  }
}
// async function seedSpecialProducts(db) {
//   await db.specialProduct.bulkCreate([
//     {
//       id: 16,
//       special_id: 1,
//       discounted_price: 1.5,
//       start_date: "2024-05-12",
//       end_date: "2024-06-18",
//     },
//     {
//       id: 15,
//       special_id: 2,
//       discounted_price: 3.05,
//       start_date: "2024-05-12",
//       end_date: "2024-06-18",
//     },
//     {
//       id: 14,
//       special_id: 3,
//       discounted_price: 4.05,
//       start_date: "2024-05-12",
//       end_date: "2024-06-18",
//     },
//     {
//       id: 13,
//       special_id: 4,
//       discounted_price: 3.05,
//       start_date: "2024-05-12",
//       end_date: "2024-06-18",
//     },
//   ]);
// }
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
    ]);
  }
}
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
async function seedreview(db) {
  const reviewCount = await db.review.count();
  if (reviewCount === 0) {
    await db.review.bulkCreate([
      {
        rating: 3,
        productId: 1,
        comment:"good quality",
        user_id: 1,
      },
      {
        rating: 3,
        productId: 2,
        comment:"good quality",
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
