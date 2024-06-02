
// Data for vegetable gardening information
// Description of each vegetable is taken from chatgpt
const VEGETABLEGARDENINGINFO = [
  {
    id: 1,
    name: "Tomatoes",
    description:
      "Tomatoes are easy to grow in containers or small garden beds. They require full sun and regular watering. You can start with tomato seedlings or seeds.",
    image: "/images/gtomato.png",
  },
  {
    id: 2,
    name: "Lettuce",
    description:
      "Lettuce is a cool-season crop that can be grown in small spaces. It prefers partial shade and well-drained soil. You can harvest lettuce leaves as they grow for continuous supply.",
    image: "/images/lettuce.png",
  },
  {
    id: 3,
    name: "Radishes",
    description:
      "Radishes are fast-growing vegetables perfect for beginners. They can be grown in pots or directly in the ground. Radishes prefer cooler weather and consistent moisture.",
    image: "/images/raddish.png",
  },
  {
    id: 4,
    name: "Cucumbers",
    description:
      "Cucumbers are a great choice for backyard gardens. They prefer warm weather and plenty of water. You can train them to grow up a trellis to save space.",
    image: "/images/cucumber.png",
  },
  {
    id: 5,
    name: "Peppers",
    description:
      "Peppers are easy to grow and come in a variety of colors and flavors. They require full sun and well-drained soil. You can start with pepper seedlings or seeds.",
    image: "/images/pepper.png",
  },
  {
    id: 6,
    name: "Carrots",
    description:
      "Carrots are a classic backyard vegetable. They prefer loose, well-drained soil. You can sow carrot seeds directly in the ground in the spring or fall.",
    image: "/images/gcarrot.png",
  },
];

const API_HOST = "http://localhost:4000";
const API_USERS = API_HOST + "/api/users/";

export {
  VEGETABLEGARDENINGINFO,
  API_HOST,
  API_USERS,
};
