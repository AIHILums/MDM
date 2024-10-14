import express from "express";
// import {getRecords, createRecord, deleteRecord, searchRecords, viewRecord, editRecord , getFields, getSortedRecords} from "../controllers/Record.js";
// import multer from 'multer';
import ReplicateRunProblem from "../controllers/problemandassessment.js";
// import uploadFile from "../controllers/File2.js";

// const upload = multer({ dest: 'uploads/' });

const app = express.Router();
app.post("/replicate", ReplicateRunProblem);

export default app;