const express = require('express');
const mongoose = require('mongoose');
const serialRoutes = require('./src/routes/serialRoutes');

const app = express();
const port = 3000;

const uri = "mongodb+srv://fedeveron2:SGk3iFXPrJkrk5Hi@sysgestion.jv83i.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/serial', serialRoutes);

app.listen(port, () => {
  console.log(`Servidor listening in http://localhost:${port}`);
});