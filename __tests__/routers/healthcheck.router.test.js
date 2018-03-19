const app = require('../../src/app');
const request = require('supertest');
let server;

describe('Healthcheck controller', async () => {
  it('responds with OK', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK');
  });
});
