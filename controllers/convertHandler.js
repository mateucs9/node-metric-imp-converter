function ConvertHandler() {
  let unitsAdmitted = ['gal', 'L', 'mi', 'km', 'kg', 'lbs']

  this.getNum = function(input) {
    let result

    if (input.split('/').length > 2) {
      return 'invalid input'
    } else if (input.split('/').length == 2) {
      result = input.split('/')
      result = parseFloat(result[0]) / parseFloat(result[1])
    } else if (isNaN(parseFloat(input))) {
      return 1
    } else {
      result = parseFloat(input);

    }

    result = Number(parseFloat(result).toFixed(5).replace(/\.?0+$/, ''))

    return result
  };

  this.getUnit = function(input) {
    let result;

    if (input.split('/').length >= 2) {
      result = input.split('/')
      result = result[result.length - 1]
      result = result.replace(parseFloat(result), '')
    } else {
      result = input.replace(this.getNum(input), '');
    }

    if (result == "L" || result == 'l') {
      result = result.toUpperCase()
    } else {
      result = result.toLowerCase()
    }

    if (unitsAdmitted.indexOf(result) == -1) {
      result = 'invalid unit'
    }


    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    if (initUnit == 'gal') {
      result = 'L'
    } else if (initUnit == 'L') {
      result = 'gal'
    } else if (initUnit == 'mi') {
      result = 'km'
    } else if (initUnit == 'km') {
      result = 'mi'
    } else if (initUnit == 'kg') {
      result = 'lbs'
    } else if (initUnit == 'lbs') {
      result = 'kg'
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    if (unit == 'gal') {
      result = 'gallons'
    } else if (unit == 'L') {
      result = 'liters'
    } else if (unit == 'mi') {
      result = 'miles'
    } else if (unit == 'km') {
      result = 'kilometers'
    } else if (unit == 'kg') {
      result = 'kilograms'
    } else if (unit == 'lbs') {
      result = 'pounds'
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit == 'gal') {
      result = initNum * galToL
    } else if (initUnit == 'L') {
      result = initNum / galToL
    } else if (initUnit == 'mi') {
      result = initNum * miToKm
    } else if (initUnit == 'km') {
      result = initNum / miToKm
    } else if (initUnit == 'kg') {
      result = initNum / lbsToKg
    } else if (initUnit == 'lbs') {
      result = initNum * lbsToKg
    }

    result = Number(parseFloat(result).toFixed(5).replace(/\.?0+$/, ''))
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let result;
    if (initUnit == 'invalid unit' && initNum == 'invalid input') {
      result = 'invalid number and unit'
    } else if (initUnit == 'invalid unit') {
      result = 'invalid unit'
    } else if (initNum == 'invalid input') {
      result = 'invalid number'
    } else {
      result = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(this.getReturnUnit(initUnit))}`
      };
    }

    return result;
  };

}

module.exports = ConvertHandler;
