const app = require('../../src/app');
const request = require('supertest');
const {
  register,
  login,
} = require('../mocks/validation-errors');
const { User } = require('../../src/models');

describe('Auth controller', () => {
  let server;

  beforeAll(async () => {
    await User.remove({});
  });
  afterAll(async () => {
    await User.remove({});
  });

  describe('POST /auth/register (register new user)', () => {
    it('responds with APIError (without: email, nickname, password)', async () => {
      const response = await request(app).post('/auth/register');
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(register.emptyEmailNicknamePassword);
    });

    it('responds with APIError (wrong: email; without: nickname, password)', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test' });
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(register.wrongEmail_emptyNicknamePassword);
    });

    it('responds with APIError (wrong: nickname; without: password)', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@gmail.com', nickname: 'A' });
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(register.wrongNickname_emptyPassword);
    });

    it('responds with APIError (wrong: password)', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@gmail.com', nickname: 'Albert', password: '123' });
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(register.wrongPassword);
    });

    it('creates new user ({ email: "test@gmail.com", nickname: "Albert", password: "1234567" })', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@gmail.com', nickname: 'Albert', password: '1234567' });
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('_id');
      expect(response.body.user).toHaveProperty('email');
      expect(response.body.user).toHaveProperty('nickname');
      expect(response.body.user).toHaveProperty('password');
      expect(response.body.user).toHaveProperty('createdAt');
      expect(response.body.user).toHaveProperty('updatedAt');
      expect(response.body.user).toHaveProperty('salt');
      expect(response.body).toHaveProperty('token');
    });

    it('responds with APIError (wrong: Email already exists)', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@gmail.com', nickname: 'Albert', password: '1234567' });
      expect(response.body.code).toBe(409);
      expect(response.body.message).toEqual(register.emailAlreadyExists.message);
      expect(response.body.errors).toEqual(register.emailAlreadyExists.errors);
    });
  });

  describe('POST /auth/login (login user)', () => {
    it('responds with APIError (without: email, password)', async () => {
      const response = await request(app)
        .post('/auth/login');
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(login.emptyEmailPassword);
    });

    it('responds with APIError (wrong: email; without: password)', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test' });
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(login.wrongEmail_emptyPassword);
    });

    it('responds with APIError (wrong: password)', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@gmail.com', password: '1234' });
      expect(response.body.code).toBe(400);
      expect(response.body).toEqual(login.wrongPassword);
    });

    it('Unauthorized', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'blabla@gmail.com', password: 'blablabla' });
      expect(response.statusCode).toBe(401);
    });

    it('responds with JWT token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@gmail.com', password: '1234567' });
      expect(response.body).toHaveProperty('token');
    });
  });
});
