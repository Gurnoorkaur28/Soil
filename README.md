# s3991487-s3842316-a2
### Description
Soil is an online grocer specializing in organic products. The application is built using React for the frontend, with a backend powered by Express, Sequelize, Node.js, and MySQL on the cloud. This combination provides a seamless and efficient user experience for managing grocery items, user interactions, and purchase processes.
### Group Details
- Shaibjeet Singh - (s3842316)
- Gurnoor Kaur - (s3991487)
## Reposistory
Github reposistory (https://github.com/rmit-fsd-2024-s1/s3991487-s3842316-a2)
# express

# Description
This backend uses REST API architecture to handle requests related to cart, products, user management, and more.

### Installation
To set up and run the backend:
1. Install dependencies:npm install
2. Start server by : node server.js
In express:
Under - `src` folder it has sequelize ,node js etc
It has folders - `controllers`
which has 5 controller.js file
1. cart.controller.js - controller file for cart related functions
2. follow.controller.js - for following unfollow user
3. products.controller.js - getting products
4. specailProducts.controller.js - special products
5. user.controller.js - user related functions
- `database `: has models under it
- `models` folder has 5 files:
which contains modals for cart,cartItem,follow,products, special products,reviews,user
Index.js -contains all relationships of modals
Config: contains the server details
Server : acts act as entry point( To use env variables using - npm install dotenv)
Seed data contains seed data needed to added into database.
The routes folder contains the rotuter for controller files

# React front end - soil
To bootup run :npm install then npm run
The public folder under images contains all the images
The src folder contains all the react front end files
 - `Components` folder contains all the react components
The data folder contains 
1. productData.js 
2. reposistory.js 
# These contains functions that make HTTP requests to an API using axios.
The pages folder contains all pages shown in front end
 1. CartPage: where cart items are displayed could accessed via cart logo in header
 2. checkoutPage: where bank details are entered 
 3. Home : the landing page where products are displayed
 4. loginPage: where user can login
 5. Review page : where reviews are submitted , it uses ReviewForm.js(comopents),useReviewHandler,
 To submit rating click on lower stars and the above ones are for display
 5. Summary after purchase
# the hooks folder contains all the hooks
 -`hooks`
useCart.js - contains hooks for cart
useReviewHandler - handles the reviews functions
# The unit tests are under Tests folder 
For testing react testing libraries are used
- `Tests`: contain unit tests
CartItem.test.js:verifies if products are correctly added to the cart, displayed, and if the prices are calculated correctly
cartPrice.test.js : verifies if the total price is calculated correctly based on different scenarios (regular priced items, discounted items, mixed items, and multiple quantities).
quanity.test.js:verifies quantity handler functions
Review.test.js:it verfies that the comment feature in reviews should take comment of 100 words
The Tests cart component(under utils) provides a straightforward way to test the useCart hook without needing a complete page component.
Cart.test.js and cartPrice.test.js utilizes test component
# The App.js where every thing is tied together
- `utils` Provided utility functions and  contants including form validator ,helper ,TestCartComponemt -helper function
for testing
- `App.css` contains css

# admin-front-end
The admin-front-end folder contains the admin dashboard
### Installation
npm install
npm start
