require('dotenv').config();
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/membersRoutes');
const { swaggerDocs, swaggerUi } = require('./config/swaggerConfig');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
