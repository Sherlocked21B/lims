const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const donenv = require("dotenv");
donenv.config();

//importing the routes
const animalRoute = require("./routes/animal");
const methodRoute = require("./routes/method");
const authRoute = require("./routes/auth");
const customerRoute = require("./routes/Customer");
const reagentRoute = require("./routes/Reagent");
const sampleRoute = require("./routes/Sample");
const testRoute = require("./routes/Test");
const resultRoute = require("./routes/Result");
const usedReagent = require("./routes/usedReagent");
const equipmentRoute = require("./routes/Equipment");
const testRequestRoute = require("./routes/TestRequest");
const referenceRoute = require("./routes/Reference");
const reagentUsageRoute = require("./routes/ReagentUsage");
const statementRoute = require("./routes/Statement");
const requisitionRoute = require("./routes/Requisition");

//milldleware imports
const isStaff = require("./middlewares/isStaff");

const isStafforAccountant = require("./middlewares/isStafforAccountant");
const isStafforInventory = require("./middlewares/isStafforInventory");

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
	() => console.log("we are connected to the database"),
);

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB Connection established SUcessfully");
});

//backend routes
app.use("/", authRoute);
app.use("/customer", isStafforAccountant, customerRoute);
app.use("/reagent", isStafforInventory, reagentRoute);
app.use("/sample", isStafforAccountant, sampleRoute);
app.use("/reference", isStafforAccountant, referenceRoute);
app.use("/reagentUsage", isStafforAccountant, reagentUsageRoute);
app.use("/test", isStaff, testRoute);
app.use("/result", isStaff, resultRoute);
app.use("/usedReagent", isStaff, usedReagent);
app.use("/equipment", isStafforAccountant, equipmentRoute);
app.use("/testRequest", isStaff, testRequestRoute);
app.use("/animal", isStaff, animalRoute);
app.use("/method", isStaff, methodRoute);
app.use("/statement", isStafforAccountant, statementRoute);
app.use("/requisition", isStaff, requisitionRoute);

app.listen(process.env.PORT, () => console.log("server has started"));
