import express from "express";
import cors from "cors";
import Plan from "./routes/Plan.js";
import Problem from "./routes/Problem.js";
// import RecordRoutes from "./routes/Records.js";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/planandorder", Plan);
app.use("/problemandassessment", Problem);