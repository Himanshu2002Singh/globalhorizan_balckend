require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sequelize = require("./config/database");
const { Blog } = require("./Models");
const fs = require("fs");

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});
app.use("/api", require("./routes"));

// Debug route: list blog ids, slugs and titles for quick verification
app.get("/api/debug/blogs", async (_req, res, next) => {
  try {
    const items = await Blog.findAll({
      attributes: ["id", "slug", "title", "created_at"],
    });
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

app.use((_req, res) => res.status(404).json({ message: "Route not found." }));
app.use((error, _req, res, _next) => {
  console.error(error);

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ message: "This record already exists." });
  }
  if (error.name === "SequelizeValidationError") {
    return res
      .status(400)
      .json({ message: error.errors.map((item) => item.message).join(", ") });
  }
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }

  return res
    .status(500)
    .json({ message: error.message || "Internal server error." });
});

async function startServer() {
  try {
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });
    await sequelize.authenticate();
    // In development, apply model changes to the database to avoid migration pain.
    if (process.env.NODE_ENV !== "production") {
      console.log("Syncing database schema (alter mode)");
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }

    app.listen(port, () =>
      console.log(`API running at http://localhost:${port}`),
    );
  } catch (error) {
    console.error("Unable to connect to MySQL:", error.message);
    process.exit(1);
  }
}

if (require.main === module) startServer();

module.exports = app;
