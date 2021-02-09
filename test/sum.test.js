const sum = require('sum')

test('Sum 2 + 1 + 3 equal 6', function () {
    expect(sum(2, 1, 3)).toBe(6)
})
