const request = require('supertest');
const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎'
      }, done);
  });
});

describe('POST /api/v1', () => {
  it('responds with a message', async () => {
    const response = await request(app)
      .post('/api/v1/')
      .send({ name: 'john' })
      .set('Accept', 'application/json');

    response.status.should.eq(400);
    response.body.errors[0].msg.should.be.eq('Events cannot be blank');
  });
});
