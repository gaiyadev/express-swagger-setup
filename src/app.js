const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json'); // Load your Swagger JSON file

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// Sample data (in-memory database)
let items = [];

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CRUD operations
app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  items = items.map(item => (item.id === itemId ? updatedItem : item));
  res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  items = items.filter(item => item.id !== itemId);
  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.json({message: "HEELOO"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
