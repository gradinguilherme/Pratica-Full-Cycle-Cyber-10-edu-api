// CODIGO DE TESTE
// DISCIPLINA: SEGURANÇA NO PROCESSO DE DESENVOLVIMENTO DE SOFTWARE
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Rota de emissão de token (permanece disponível para testes)
const SECRET_KEY = process.env.SECRET_KEY || 'edu_learn_secret';
app.get('/token', (req, res) => {
  const user = req.query.user || 'guest';
  const role = req.query.role || 'professor';
  const payload = { sub: user, role };
  const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EduLearn User Service (vulnerável) rodando na porta ${PORT}`);
});
