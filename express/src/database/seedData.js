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
    ]);
  }
}
async function seedSpecialProducts(db) {
  await db.specialProduct.bulkCreate([
      { id: 16, special_id:1,discounted_price: 1.5, start_date: '2024-05-012', end_date: '2024-06-18' },
      { id: 15, special_id:2,discounted_price: 3.05, start_date: '2024-05-012', end_date: '2024-06-18' },
      { id: 14, special_id:3,discounted_price: 4.05, start_date: '2024-05-012', end_date: '2024-06-18' },
      { id: 13, special_id:4,discounted_price: 3.05, start_date: '2024-05-012', end_date: '2024-06-18' },
  ]);
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
        id: 1,
        email: "test@user1",
        password_hash: passwordHash,
        full_name: "testuser one",
        join_date: joinDate,
      },
      {
        id: 1,
        email: "test@user2",
        password_hash: passwordHash,
        full_name: "testuser two",
        join_date: joinDate,
      },
    ]);
  }
}

module.exports = {
  seedProducts,
  seedSpecialProducts,
  seedUsers,
};
