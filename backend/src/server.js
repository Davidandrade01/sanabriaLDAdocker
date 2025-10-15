import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor está a funcionar 🚀");
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error("Erro ao inserir utilizador:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.status(201).json({ message: "Utilizador criado com sucesso!", id: results.insertId });
  });
});

app.listen(4000, () => {
  console.log("✅ Servidor backend a correr em http://localhost:4000");
});
