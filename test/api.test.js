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
  it('responds with a bad request if events not sent', async () => {
    const response = await request(app)
      .post('/api/v1/')
      .set('Accept', 'application/json');

    response.status.should.eq(400);
    return response.body.errors[0].msg.should.be.eq('Events cannot be blank');
  });

  it('responds with message if successful', async () => {
    const payload = {
      events: [
        {
          t: 'lift-off',
          engines: 4,
          fuel: 78,
          successful: true,
          temperature: {
            engine: 80,
            cabin: 31
          },
          timestamp: 1595244264059,
          'lat-lon': [
            -16.270183,
            168.110748
          ]
        },
        {
          t: 'landing',
          engines: 1,
          fuel: 26,
          successful: true,
          temperature: {
            engine: 80,
            cabin: 31
          },
          timestamp: 1595524813145,
          'lat-lon': [
            51.769455,
            182.818610
          ],
        }
      ]
    };
    const expected = 'Thanks for contacting Spaceship\nThanks for contacting Spaceship\n\nhello from M0nit0r\nhello from M0nit0r\n\nthis is skyanalytics\nthis is skyanalytics\n';

    const response = await request(app)
      .post('/api/v1/')
      .set('Accept', 'application/json')
      .send(payload);

    response.status.should.be.eq(200);
    response.body.message.should.be.eq(expected);
  }).timeout('5s');
});
