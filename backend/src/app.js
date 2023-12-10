import express from "express";
import morgan from "morgan";
import cors from 'cors';

import uploadsRoutes from "./routes/uploads.routes.js";

const app = express();

app.use(morgan("dev"));

// Here put the URL of where the requests will be made, as in this example we are using Angular, we will put this one. Note: If you simply want to avoid problems with CORS put a * between the quotes and it will accept requests from anywhere.
app.use(cors({ origin: [ 'http://localhost:4200' ] }))

app.use(uploadsRoutes);

export default app;
