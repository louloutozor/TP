var p_assert = require("./plain-assert");
var inferify = require('../lib/inferify');


var stringArray = "moshe david yalla haim".split(" ");
p_assert("An array of strings", "string", inferify(stringArray));


var integerArray = [1,5,6,3,5,7,11111];
p_assert("An array of integers", "integer", inferify(integerArray));


var booleanArray = "true false true true".split(" ");
p_assert("An array of booleans", "boolean", inferify(booleanArray));

var mixedBooleanWithEmptyString = "true false true  true".split(" ");
p_assert("Mixed boolean with empty string", "boolean", inferify(mixedBooleanWithEmptyString));


var floatArray = [0.5,0.6,0.2,111.1];
p_assert("An array of floats", "float", inferify(floatArray));


var dateArray = ["10/10/2010", "12/12/2012", "30/12/2001"];
p_assert("An array of dates", "date", inferify(dateArray));


var numberArray = [1,5.55,6,3,5,-7,111.11]; //Mixed negative, float and integer
p_assert("Mixed negative, float and integer", "number", inferify(numberArray));


var objectsArray = [
  { a: 1, b: 'string', c: "10/10/2010" },
  { a: '77', b: 'hello', c: "12/12/2012" },
];
p_assert(
  "Array of objects, infer all attributes",
  { a: 'integer', b: 'string', c: 'date' },
  inferify(objectsArray)
);