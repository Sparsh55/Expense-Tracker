import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectUsingMongoose from "./config/Moongoose.db.js";
import ErrHandling from "./Middlewares/errorHandling.js";
import Authrouter from "./routes/authroutes.js";
import Expenserouter from "./routes/expenseroute.js";

dotenv.config();

const app = express();

//CORS policy
app.use(cors());
//parsing incoming requests
app.use(bodyParser.json());

// error handling
app.use(ErrHandling);

app.use('/api/auth', Authrouter); 
app.use('/api/expenses', Expenserouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

//listening to server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectUsingMongoose();
});
