const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const donenv = require('dotenv');
donenv.config();

//importing the routes
const authRoute = require('./routes/auth');
const customerRoute = require('./routes/Customer');

app.use(cors());
app.use(express.json());

//connecting to the mongo db
mongoose.connect(
	process.env.db_name,
	{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
	() => console.log('we are connected to the database')
);

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB Connection established SUcessfully');
});

//middlewares
app.use('/', authRoute);
app.use('/customer', customerRoute);

app.listen(3000, () => console.log('server has started'));
