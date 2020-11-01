const geonames = require('../src/server/server');

describe("Testing the geonames api call", () => {
    test("Testing the geonames() function", () => {
        expect(geonames).toBeDefined();
    })
});