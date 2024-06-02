# s3991487-s3842316-a2
# express
It contains the middle of project using Rest api
To bootup run : npm install
then: node server.js
Under src folder it has sequelize ,node js etc
It has folders controller.js
which has 5 controller.js file
1. cart.controller.js - controller file for cart related functions
2. follow.controller.js - for following unfollow user
3. products.controller.js - getting products
4. specailProducts.controller.js - special products
5. user.controller.js - user related functions
Under database :
models folder has 5 files:
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
Components folder contains all the react components
The data folder contains 
1. productData.js 
2. reposistory.js 
# These contains functions that make HTTP requests to an API using axios.
The pages folder contains all pages shown in front end
# the hooks folder contains all the hooks
useCart.js - contains hooks for cart
useReviewHandler - handles the reviews functions
# The unit tests are under Tests folder 
CartItem.test.js:verifies if products are correctly added to the cart, displayed, and if the prices are calculated correctly
cartPrice.test.js : verifies if the total price is calculated correctly based on different scenarios (regular priced items, discounted items, mixed items, and multiple quantities).
quanity.test.js:verifies quantity handler functions
Review.test.js:it verfies that the comment feature in reviews should take comment of 100 words
The Tests cart component provides a straightforward way to test the useCart hook without needing a complete page component.
Cart.test.js and cartPrice.test.js utilizes test component
