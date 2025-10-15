import mysql from "mysql2";
import "dotenv/config";

// Use pool para conexões eficientes e automáticas
const connection = mysql.createPool({
  host: process.env.DB_HOST || "mysql-db",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "dockerNode",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Valida ligação inicial (log amigável)
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL");
  conn.release();
});

export default connection;
 
// Garante a existência da tabela necessária para o exemplo
const ensureSchemaSql = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

connection.query(ensureSchemaSql, (err) => {
  if (err) {
    console.error("Erro ao criar/verificar tabela 'users':", err);
  } else {
    console.log("✅ Tabela 'users' pronta");
  }
});