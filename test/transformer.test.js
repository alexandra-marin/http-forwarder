const flattenObject = require('../src/transformations/flattenObject');

// const payload = {
//   events: [
//     {
//       t: 'lift-off',
//       engines: 4,
//       fuel: 78,
//       successful: true,
//       temperature: {
//         engine: 80,
//         cabin: 31
//       },
//       timestamp: 1595244264059,
//       'lat-lon': [
//         -16.270183,
//         168.110748
//       ]
//     },
//     {
//       t: 'landing',
//       engines: 1,
//       fuel: 26,
//       successful: true,
//       temperature: {
//         engine: 80,
//         cabin: 31
//       },
//       timestamp: 1595524813145,
//       'lat-lon': [
//         51.769455,
//         182.818610
//       ],
//     }
//   ]
// };

// describe('Transformations', () => {
//   it('spaceship monitor', () => {
//     const payload = {
//       temperature: {
//         engine: 80,
//         cabin: 31
//       }
//     };
//     const o1 = Object.assign(
//       {},
//       ...(function _flatten(o, nestedProp) {
//         return [].concat(...Object.keys(o)
//           .map((k, index) => (typeof o[k] === 'object'
//             ? _flatten(o[k], Object.keys(index))
//             : ({ [k]: o[k] }))));
//       }(payload))
//     );
//     console.log(o1);
//     (1).should.equal(1);
//   });
// });

describe('Transformations', () => {
  it('spaceship monitor requires a flat object', () => {
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
});
