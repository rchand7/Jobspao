import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";  // Make sure 'path' module is imported

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://jobspao-8.onrender.com',
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

//***************** code for deployment *********/
if (process.env.NODE_ENV === "production") {
    const dirpath = path.resolve();

    // Serve static files from frontend/dist
    app.use(express.static(path.join(dirpath, "frontend", "dist")));

    // Serve index.html for all other routes in production
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirpath, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
