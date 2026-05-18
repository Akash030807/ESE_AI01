const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/ai", aiRoutes);


// ERROR MIDDLEWARE
app.use(errorMiddleware);


app.get("/", (req, res) => {
  res.send("Employee Analytics API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});