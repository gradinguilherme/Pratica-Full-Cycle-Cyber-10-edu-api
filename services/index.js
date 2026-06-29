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

app.get('/calc', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const op = req.query.op;

  if (isNaN(a) || isNaN(b) || !op) {
    return res.status(400).json({ error: 'Parâmetros inválidos. Use: ?a=2&b=3&op=+' });
  }

  const ops = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => y !== 0 ? x / y : null,
  };

  if (!ops[op]) {
    return res.status(400).json({ error: 'Operador inválido. Use: +, -, *, /' });
  }

  res.json({ result: ops[op](a, b) });
});
