# s3991487-s3842316-a2

## Project Overview
Soil is an online grocery store specializing in organic products. This application is designed to provide a seamless and efficient user experience for managing grocery items, user interactions, and purchase processes. The application utilizes a React frontend, with a backend powered by Express, Sequelize, Node.js, and MySQL hosted on the cloud. The application also features Admin site backend powered by apollo-server-express and React for frontend

### Group Details
- **Sahibjeet Singh** - s3842316
- **Gurnoor Kaur** - s3991487

[GitHub Repository](https://github.com/rmit-fsd-2024-s1/s3991487-s3842316-a2)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

``bash
npm install npm@latest -g
``

## Starting the application

### Starting the user backend (express):
>``cd express``
``npm install``
``npm start``


### Starting the user frontend (soil):
>``cd soil``
``npm install``
``npm start``

### Starting the Admin backend (admin-graphql):
>``cd admin-graphql``
``npm install``
``npm start``

### Starting the Admin frontend (admin-front-end):
>``cd admin-front-end``
``npm install``
``npm start``

## Project Structure Overview

### `express/`

Contains Express server and API logic. Key directories:

-   **src/**: Source code for server logic.
    -   **database/**: Sequelize setup and models for database interaction.
    -   **controllers/**: Business logic for handling API requests.
    -   **routes/**: Definitions of API endpoints.

### `soil/`

Frontend code for the main user interface of the grocery store. Includes:

-   **public/**: Static assets such as images and HTML files.
-   **src/**: React source files.
    -   **components/**: Reusable UI components.
    -   **hooks/**: Custom hooks for managing state and side effects.
    -   **pages/**: Components for each major page within the application.
    -   **data/**: Includes modules that perform HTTP requests for data fetching and sending to the backend.

### `admin-graphql/`

This directory contains the backend for the admin interface, managing database interactions for administrative tasks:

-   **server.js**: The main server file.
-   **src/**:
    -   **database/**: Database integration and models.
    -   **graphql/**: GraphQL schema definitions and resolvers for admin-related data.
    -   **utils/**: Utility functions used across the admin backend.
    
### `admin-front-end/`

Contains all code for the admin dashboard. It includes:

-   **public/**: Static files like HTML and icons.
-   **src/**: React application source files.
    -   **context/**: Contexts for state management across components.
    -   **components/**: UI components for the admin interface.
    -   **apollo/**: Apollo Client setup for GraphQL integration.
    -   **pages/**: React components representing different pages.
    - **data/**: Contains utility files that handle data fetching, management, and integration with the backend GraphQl.



# Review Module Explanation

## Overview
The `Reviews` component in this code is designed to manage user reviews within a web application. It integrates functionalities such as fetching, displaying, filtering, and deleting reviews, as well as handling pagination and real-time updates for new reviews using GraphQL subscriptions.

## Key Features
- **Context API**: Uses `MessageContext` to provide feedback to the user.
- **GraphQL Subscriptions**: Listens for new review events and updates the UI in real-time.
- **Pagination**: Manages review display in batches to improve performance and usability.
- **Obscenity Filtering**: Uses the `obscenity` package to filter out inappropriate language in reviews.

## Inappropriate Reviews Handling

### Why Consider a Review Inappropriate?
It is essential to maintain a respectful and professional environment within any community-driven platform. Reviews containing inappropriate content can detract from the user experience, promote negativity, or even harm the reputation of the platform.

### Scenarios of Inappropriate Reviews
1. **Profanity or Offensive Language**: Utilizes the `obscenity` package to detect and flag reviews containing explicit language, which are then visually distinguished (red color) 

3. **Hate Speech or Discriminatory Language**: Any review that promotes hate or discrimination based on race, gender, religion, or other characteristics should be considered inappropriate.


### Implementation Strategy
Words that are blacklisted in `obscenity` package are flagged visually (red color) then ADMIN can take appropriate action on deleting them. 


## Metrics Visualization Explanation

### Overview
The `Metrics` component in the application visualizes crucial data regarding user engagement and product ratings. These visualizations are implemented using React-Chart.js, which provides interactive and dynamic charts such as bar and line graphs.

### Chosen Metrics

#### 1. Average Product Rating Over Time
- **Description**: This metric is represented through a line chart which displays the average rating of each product over time. It helps in understanding how product ratings evolve, indicating quality and customer satisfaction.
- **Justification**: Monitoring the average rating over time enables businesses to gauge product performance and identify trends. It can highlight products that consistently receive high ratings and those that may require improvements. This insight is crucial for product management and marketing strategies.

### 2. User Engagement with Products
- **Description**: This metric is represented using a bar chart that shows the number of reviews each product has received. It reflects how actively users interact with different products by submitting reviews.
- **Justification**: High engagement levels can indicate a strong interest in the product, which might correlate with higher sales or product visibility. Conversely, products with few reviews may need additional promotional activities or improvements based on customer feedback. This metric is essential for understanding which products are engaging users effectively.

### Utility and Relevance
These visual representations provide a quick and intuitive way to understand complex datasets, making them invaluable for business decisions. By presenting these metrics graphically, stakeholders can easily comprehend trends and anomalies without delving into raw data.


## Librarys Used for HD Part 

>### [obscenity](https://www.npmjs.com/package/obscenity?activeTab=readme)
 - Lib used to filter profanity's
 - We used Obscenity presets, which are sets of blacklisted terms, whitelisted terms, and transformers. [english.ts](https://github.com/jo3-l/obscenity/blob/824b4a067152be84b0d3a64a61e81b2142a90615/src/preset/english.ts)

>### [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
 - Lib used to draw line and bar graph for the Metrics

