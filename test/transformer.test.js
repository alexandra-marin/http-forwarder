const flattenObject = require('../src/transformations/flattenObject');
const buildUrlParam = require('../src/transformations/buildUrlParam');
const capitalizeKeys = require('../src/transformations/capitalizeKeys');

describe('Transformations', () => {
  it('spaceship requires a flat object', () => {
    const payload = {
      engines: 4,
      temperature: {
        engine: 80,
        cabin: 31,
        types: {
          c: true,
          f: false,
        }
      },
      'lat-lon': [
        51.769455,
        182.818611
      ]
    };
    const expected = {
      engines: 4,
      'temperature.engine': 80,
      'temperature.cabin': 31,
      'temperature.types.c': true,
      'temperature.types.f': false,
      'lat-lon': '51.769455,182.818611',
    };

    const result = flattenObject(payload);

    result.should.deep.equal(expected);
  });

  it('monitor requires extracted timestamp param', () => {
    const payload = {
      timestamp: 1595244264059,
      engines: 4,
    };
    const expected = { param: 1595244264059, payload: { engines: 4 } };

    const result = buildUrlParam(payload, 'timestamp');

    result.should.deep.equal(expected);
  });

  it('analytics requires capitalization (except t)', () => {
    const payload = {
      t: 'landing',
      engines: 1,
      temperature: {
        engine: 80,
        cabin: 31
      },
      'lat-lon': [
        51.769455,
        182.818610
      ],
    };
    const expected = {
      t: 'landing',
      Engines: 1,
      Temperature: {
        Engine: 80,
        Cabin: 31
      },
      'Lat-lon': [
        51.769455,
        182.818610
      ],
    };

    const result = capitalizeKeys(payload, 't');

    result.should.deep.equal(expected);
  });
});
