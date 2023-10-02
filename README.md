# How To Install

## Step 1: Install Dependencies

Before installing the this project, we need to make sure that our system has all the required dependencies installed. We will need to install the following dependencies:

-   node 16.20.0 or higher
-   npm 8.19.4 or higher


## Step 2: Go To project directory and npm install

- first go to the project directory

```bash
cd project-name
```

- Then install npm

```bash
npm install
```
## Step 3: Now create a mysql database and change the db credentials and exprt the sql file in the db

```bash
const db = mysql.createConnection({
  host: 'your_db_host',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name',
});
```

## Step 4: Now serve your application using this command

```bash
npm run dev
```

## Step 5: You can check the api through postman

- Get All products
```bash
GET: {BASE_URL}products
```

- Add a product
```bash
POST: {BASE_URL}products

{
    "name": "Demo Product",
    "description": "Demo Description",
    "price": 30,
    "image": "www.demo_link.com"
}
```

- Get single product
```bash
GET: {BASE_URL}products/{id}
```

- Delete a product

```bash
DELETE: {BASE_URL}products/{id}
```
- Update a product
```bash
PUT: {BASE_URL}products/{id}

{
    "name": "Demo Product",
    "description": "Demo Description",
    "price": 30,
    "image": "www.demo_link.com"
}
```