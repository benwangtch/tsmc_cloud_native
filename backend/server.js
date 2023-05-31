const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Conncet Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Documentation API.' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/shared', require('./routes/shared'));
app.use('/api/department', require('./routes/department'));
app.use('/api/histories', require('./routes/histories'));

// Serve static assets in production
if (process.env.NODE_ENV === 'default') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
