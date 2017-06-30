var assert = require('assert');

module.exports = p_assert;

function p_assert(message, should, actual) {
    var userMessage = message + ", should return: " + should;

    try {
        assert.deepEqual(actual, should);
        pass("\t*Passed*:\t " + userMessage);
    } catch (e) {
        fail("\t*Failed*:\t" + userMessage + ". Instead got: " + actual + ".");
        console.log(Array(30).join("#"));
        console.log(e);
        console.log(Array(30).join("#"));
    }
}

function fail(str) {
    var red = "\x1B[31m";
    console.log(red + str + "\x1B[0m");
}

function pass(str) {
    var green = "\x1B[32m";
    console.log(green + str + "\x1B[0m");
}