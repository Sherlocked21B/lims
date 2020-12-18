const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const donenv = require('dotenv');
donenv.config();

//importing the routes
const authRoute = require('./routes/auth');
const customerRoute = require('./routes/Customer');
const reagentRoute = require('./routes/Reagent');
const sampleRoute = require('./routes/Sample');
const testRoute = require('./routes/Test');

//milldleware imports
const isStaff = require('./middlewares/isStaff');
const isInventoryManager = require('./middlewares/isInventoryManager');
const isStafforAccountant = require('./middlewares/isStafforAccountant');

app.use(cors());
app.use(express.json());

//connecting to the mongo db
mongoose.connect(
	process.env.db_name,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	() => console.log('we are connected to the database')
);

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB Connection established SUcessfully');
});

//backend routes
app.use('/', authRoute);
app.use('/customer', isStafforAccountant, customerRoute);
app.use('/reagent', isInventoryManager, reagentRoute);
app.use('/sample', isStaff, sampleRoute);
app.use('/test', isStaff, testRoute);

app.listen(3000, () => console.log('server has started'));
