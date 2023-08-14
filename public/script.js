// Pseudocode for each section
// GET all pets
// Import necessary modules (express, postgresql client, etc.)
// Connect to the database
// Define a GET route for '/api/v1/pets'
//  Create a query to SELECT all pets from the 'pets' table in the database
//  Execute the query
//  If successful, send the result as a response
//  Else, send an error message as a response

const express = require('express');
const app = express();

app.get('/api/v1/pets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pets');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET pet by name
// Define a GET route for '/api/v1/pets/:name'
//  The rest is the same as above

app.get('/api/v1/pets/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const result = await pool.query('SELECT * FROM pets WHERE name = $1', [name]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET pet by owner's name
// Define a GET route for '/api/v1/pets/owner'
//  The rest is the same as above

app.get('/api/v1/pets/owner', async (req, res) => {
    const ownerName = req.query.ownerName;
  
    try {
      const result = await pool.query('SELECT * FROM pets WHERE owner_name = $1', [ownerName]);
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({ message: 'Pets not found for given owner' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Serve a static index.html file - '/'
// Define a GET route for '/'
//  Use express static file serving method to serve the 'index.html' from a defined 'public' directory

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting the server

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});