import express from "express";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

app.use(express.static('public'))

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use('/', bookRoutes);
app.listen(3000, () => console.log('Server running on port 3000.'))
