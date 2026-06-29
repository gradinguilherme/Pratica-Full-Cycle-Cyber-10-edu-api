const request = require('supertest');
const app = require('./services/index');

describe('GET /calc', () => {
  it('soma dois números', async () => {
    const res = await request(app).get('/calc?a=2&b=3&op=+');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it('subtração', async () => {
    const res = await request(app).get('/calc?a=10&b=4&op=-');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(6);
  });

  it('multiplicação', async () => {
    const res = await request(app).get('/calc?a=3&b=7&op=*');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(21);
  });

  it('divisão', async () => {
    const res = await request(app).get('/calc?a=10&b=2&op=/');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it('divisão por zero retorna null', async () => {
    const res = await request(app).get('/calc?a=5&b=0&op=/');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBeNull();
  });

  it('operador inválido retorna 400', async () => {
    const res = await request(app).get('/calc?a=5&b=2&op=%');
    expect(res.statusCode).toBe(400);
  });

  it('parâmetros faltando retorna 400', async () => {
    const res = await request(app).get('/calc');
    expect(res.statusCode).toBe(400);
  });
});