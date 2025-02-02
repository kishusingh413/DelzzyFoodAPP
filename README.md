# Food-Delivery Service

This document provides instructions for setting up and running the Food-Delivery service backend on your local environment. The backend is built using Node.js and Express and uses PostgreSQL for data storage.

## Prerequisites

- Node.js (LTS version recommended)
- npm (usually comes with Node.js)
- PostgreSQL

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kishusingh413/DelzzyFoodAPP.git
   cd food-delivery
   ```

2. **Install dependencies:**
   Navigate to the root directory of the project and run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory of the project. This file should contain:

   ```bash
   DATABASE_URL=postgres://[User]:[Password]@localhost:5432/[DatabaseName]
   PORT=3000
   ```

   Replace `[User]`, `[Password]`, and `[DatabaseName]` with your PostgreSQL user, password, and database name, respectively.

4. **Database Setup:**

   - **Download and Install PostgreSQL:**

     - Visit [PostgreSQL Download Page](https://www.postgresql.org/download/) and download the appropriate installer for your operating system.
     - Follow the installation instructions provided by PostgreSQL for your specific operating system.

   - **Using Command-Line Interface (CLI):**

     - **Open Command Line Interface (CLI):**
       - **Windows:** Open Command Prompt as Administrator.
       - **Linux/Mac:** Open Terminal.
     - **Log in to PostgreSQL:**
       ```bash
       psql -U postgres
       ```
     - **Create Database:**
       ```sql
       CREATE DATABASE food_delivery;
       ```
     - **Connect to the Newly Created Database:**
       ```sql
       \c food_delivery
       ```
     - **Create Tables:**

       ```sql
       CREATE TABLE organizations (
           id SERIAL PRIMARY KEY,
           name VARCHAR(100) NOT NULL
       );

       CREATE TABLE items (
           id SERIAL PRIMARY KEY,
           type VARCHAR(20) NOT NULL,
           description TEXT NOT NULL
       );

       CREATE TABLE pricings (
           id SERIAL PRIMARY KEY,
           organization_id INTEGER REFERENCES organizations(id) NOT NULL,
           item_id INTEGER REFERENCES items(id) NOT NULL,
           zone VARCHAR(20) NOT NULL,
           base_distance_in_km INTEGER NOT NULL,
           km_price INTEGER NOT NULL,
           fix_price INTEGER NOT NULL
       );
       ```

   - **Using pgAdmin (Graphical Interface):**
     - **Open pgAdmin:**
       Launch pgAdmin from the Start menu (Windows) or Applications folder (Linux/Mac).
     - **Connect to a PostgreSQL Server:**
       - Click on the "Add New Server" icon.
       - Enter server details (host, port, username, password) and save.
     - **Create Database:**
       - Right-click on "Databases" and select "Create" > "Database".
       - Enter "food_delivery" as the database name and click "Save".
     - **Navigate to the Newly Created Database:**
       - Double-click on the "food_delivery" database to connect to it.
     - **Create Tables:**
       - Right-click on "Tables" under the "food_delivery" database and select "Create" > "Table".
       - Define table columns and properties as specified in the previous section.

5. **Inserting Dummy Data:**
   After creating the tables, insert dummy data using SQL queries provided in the README. This will populate the tables with sample data for testing and development purposes.

   - **Generate Dummy Data for Organizations:**
     ```sql
     INSERT INTO organizations (name) VALUES
     ('Fast Food Express'),
     ('Fresh Grocery Store'),
     ('Healthy Bites Cafe');
     ```
   - **Generate Dummy Data for Items:**
     ```sql
     INSERT INTO items (type, description) VALUES
     ('Perishable', 'Fresh vegetables'),
     ('Perishable', 'Seafood'),
     ('Non-Perishable', 'Canned goods'),
     ('Perishable', 'Dairy products'),
     ('Non-Perishable', 'Packaged snacks'),
     ('Perishable', 'Fresh fruits'),
     ('Non-Perishable', 'Dry pasta'),
     ('Perishable', 'Bakery items'),
     ('Non-Perishable', 'Bottled beverages'),
     ('Perishable', 'Meat');
     ```
   - **Generate Dummy Data for Pricings:**
     ```sql
     INSERT INTO pricings (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES
     -- Dummy data for organization 1 (Fast Food Express)
     (1, 1, 'central', 5, 2.5, 15.75),
     (1, 2, 'central', 5, 3, 12.50),
     (1, 3, 'central', 5, 2, 19.25),
     (1, 4, 'central', 5, 2.75, 11.30),
     (1, 5, 'central', 5, 4.5, 14.20),
     (1, 1, 'north', 7, 2.75, 16.50),
     (1, 2, 'north', 7, 3.25, 14.75),
     (1, 3, 'north', 7, 2.5, 18.20),
     (1, 4, 'north', 7, 3, 10.90),
     (1, 5, 'north', 7, 4, 12.40),
     -- Dummy data for organization 2 (Fresh Grocery Store)
     (2, 6, 'north', 7, 1.75, 18.50),
     (2, 7, 'north', 7, 2.25, 10.90),
     (2, 8, 'north', 7, 3.5, 9.80),
     (2, 9, 'north', 7, 1.25, 16.75),
     (2, 10, 'north', 7, 4.25, 13.60),
     (2, 6, 'east', 8, 2.5, 20.50),
     (2, 7, 'east', 8, 3, 15.25),
     (2, 8, 'east', 8, 4, 11.70),
     (2, 9, 'east', 8, 1.75, 19.40),
     (2, 10, 'east', 8, 3.75, 17.80),
     -- Dummy data for organization 3 (Healthy Bites Cafe)
     (3, 1, 'east', 8, 3, 17.90),
     (3, 2, 'east', 8, 4, 10.25),
     (3, 3, 'east', 8, 2.75, 18.40),
     (3, 1, 'south', 6, 3.25, 15.60),
     (3, 2, 'south', 6, 4.25, 11.90),
     (3, 3, 'south', 6, 3, 17.25);
     ```

6. **Run the server:**
   To start the server on your local machine, run:

   ```bash
   npm start
   ```

   The server should now be running on [http://localhost:3000](http://localhost:3000).

7. **API Documentation:**
   To access the Swagger API documentation, navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after starting the server.

## Running Tests

- To run the test suite, execute:
  ```bash
  npm test
  ```

## API Endpoints

- **POST /api/v1/pricing/calculate-price:** Calculate the delivery price based on organization, item, zone, and distance.

## Notes

- Ensure the PostgreSQL service is running before starting the application.
- In case of changes to the database schema, update the respective model files.
