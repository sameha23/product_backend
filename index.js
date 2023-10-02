const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(cors());
// Create a MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'grocery_db',
// });
//server
const db = mysql.createConnection({
  host: 'bznjtjdoyxhzlo4tha04-mysql.services.clever-cloud.com',
  user: 'ui3mo70zfmr8nauy',
  password: 'HxfglihS8GEBrVrujHfc',
  database: 'bznjtjdoyxhzlo4tha04',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// Configure Multer for handling file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the directory where you want to save uploaded files
  filename: function (req, file, callback) {
    // Generate a unique filename for each uploaded file
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const fetchImageUrl = async (image) => {
  try {
    const response = await axios.get(image); // Replace with your API endpoint
    console.log('Fetching image URL from API:', response.status);
    if(response.status !== 200) {
      throw new Error('Invalid image URL');
    }else{
      return image;
    }
  } catch (error) {
    console.error('Error fetching image URL from API:', error);
    throw error;
  }
};

// Create a new product
app.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price,image } = req.body;

  try {
    // Fetch the image URL from the API
    const imageUrl = await fetchImageUrl(image);

    // Extract the filename from the image URL
    const filename = imageUrl.split('/').pop();

    // Generate a unique filename based on the current timestamp and the extracted filename
    const uniqueFilename = `${Date.now()}-${filename}`;
    
    // Create the complete save path with the unique filename
    const savePath = path.join('uploads', uniqueFilename);

    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      // Insert product data into the database, including the image path
      const sql = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
      const values = [name, description, price, savePath];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error creating a product:', err);
          res.status(500).json({ error: 'Error creating a product' });
          return;
        }
        res.status(201).json({ id: result.insertId });
      });
    });

    writer.on('error', (err) => {
      console.error('Error saving downloaded image:', err);
      res.status(500).json({ error: 'Error saving downloaded image' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get all products
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
      return;
    }
    res.json(results);
  });
});

// Get a product by ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error fetching a product:', err);
      res.status(500).json({ error: 'Error fetching a product' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(result[0]);
  });
});

// Update a product by ID
app.put('/products/:id', upload.single('image'), async (req, res) => {
  const productId = req.params.id;
  const { name, description, price,image } = req.body;
  const sql = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
  const values = [name, description, price, productId];

  try {
    if (image) {
      // If a new image is provided, update the image as well
      const imageUrl = await fetchImageUrl(image); // Fetch the new image URL from the API
      const filename = imageUrl.split('/').pop(); // Extract the filename from the URL
      const uniqueFilename = `${Date.now()}-${filename}`; // Generate a unique filename
      const savePath = path.join(__dirname, 'uploads', uniqueFilename);

      const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);

      writer.on('finish', () => {
        // Update the product data in the database, including the new image path
        const updateSql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?';
        const updateValues = [name, description, price, savePath, productId];

        db.query(updateSql, updateValues, (err, result) => {
          if (err) {
            console.error('Error updating a product:', err);
            res.status(500).json({ error: 'Error updating a product' });
            return;
          }
          if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
          }else{
            res.status(204).end();
          }
        });
      });

      writer.on('error', (err) => {
        console.error('Error saving downloaded image:', err);
        res.status(500).json({ error: 'Error saving downloaded image' });
      });
    } else {
      // If no new image is provided, update the product data without changing the image
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error updating a product:', err);
          res.status(500).json({ error: 'Error updating a product' });
          return;
        }
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        res.status(204).end();
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting a product:', err);
      res.status(500).json({ error: 'Error deleting a product' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
