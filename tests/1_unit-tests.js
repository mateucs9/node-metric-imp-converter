const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Read whole number input', () => {
    assert.equal(convertHandler.getNum('50L'), 50)
  })
  test('Read decimal number input', () => {
    assert.equal(convertHandler.getNum('50.5L'), 50.5)
  })
  test('Read fractional input', () => {
    assert.equal(convertHandler.getNum('2/4L'), 0.5)
  })
  test('Read fractional input with decimal', () => {
    assert.equal(convertHandler.getNum('2.5/5L'), 0.5)
  })
  test('Error double fractional', () => {
    assert.equal(convertHandler.getNum('3/4/4L'), 'invalid input')
  })
  test('Default to input of 1 if not provided', () => {
    assert.equal(convertHandler.getNum('L'), 1)
  })
  test('Read each valid input unit', () => {
    let validUnits = ['gal', 'L', 'mi', 'km', 'kg', 'lbs']
    for (const unit of validUnits) {
      assert.equal(convertHandler.getUnit(`50${unit}`), unit)
    }

  })
  test('Error invalid input unit', () => {
    assert.equal(convertHandler.getUnit('50PES'), 'invalid unit')
  })
  test('Return correct unit for each valid input unit', () => {
    let units = { 'gal': 'L', 'L': 'gal', 'mi': 'km', 'km': 'mi', 'kg': 'lbs', 'lbs': 'kg' }
    for (const unit of Object.keys(units)) {
      assert.equal(convertHandler.getReturnUnit(unit), units[unit])
    }

  })
  test('Correct spelled-out string for each valid unit', () => {
    let unitsSpelled = { 'gal': 'gallons', 'L': 'liters', 'mi': 'miles', 'km': 'kilometers', 'kg': 'kilograms', 'lbs': 'pounds' }
    for (const unit of Object.keys(unitsSpelled)) {
      assert.equal(convertHandler.spellOutUnit(unit), unitsSpelled[unit])
    }
  })
  test('Convert gal to L', () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
  })
  test('Convert L to gal', () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417)
  })
  test('Convert mi to km', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
  })
  test('Convert km to mi', () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137)
  })
  test('Convert lbs to kg', () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
  })
  test('Convert kg to lbs', () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462)
  })


});