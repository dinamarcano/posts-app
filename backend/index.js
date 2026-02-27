const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// almacenamiento en memoria
let posts = [];

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// GET /posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// POST /posts
app.post("/posts", (req, res) => {
  const { imageUrl, title, description } = req.body;

  const newPost = {
    id: Date.now(),
    imageUrl,
    title,
    description,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// DELETE /posts/:id
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter((post) => post.id !== id);

  res.json({ message: "Post eliminado" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});