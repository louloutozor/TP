//Send in an array (or single object) and return back the common data
//type for the provided Object array.
module.exports = inferify;

//Redundant but used to clearly present data types supported.
var DATA_TYPES = {
    string: "string",
    date: "date",
    float: "float",
    integer: "integer",
    number: "number",
    boolean : "boolean"
};

function inferify(objArr) {
    if (!objArr) return null; // be nice

    if (!Array.isArray(objArr)) {
        throw new Error('Expecting an `Array` of either scalars or objects');
    }

    if (objArr.length === 0) {
        throw new Error('At least one value is required');
    }

    //If the array contains objects (and not scalars), infer
    //types of all attributes and return an 'types' object
    var firstValue = objArr[0];
    if (typeof firstValue === 'object' && firstValue.constructor !== Date) {
        return infer_types(objArr);
    }

    var returnDataType = DATA_TYPES.string;
    //Normalize to make inference more straight forward
    var strArray = normalizeArray(objArr);

    //Run tests for booleans
    var all_booleans = executeRegExp(strArray, /true|false|^$/);
    if (all_booleans) {
        return DATA_TYPES.boolean;
    }

    //Run test - INTEGERS
    var all_ints = executeRegExp(strArray, /^(\d)*$/);
    if (all_ints) {
        return DATA_TYPES.integer;
    }

    var all_floats = executeRegExp(strArray, /^([-]?((([0-9]+(\.)+)|([0-9]*\.[0-9]+))?))$/);
    if (all_floats) {
        return DATA_TYPES.float;
    }

    var all_dates = executeRegExp(strArray, /[\d]{1,2}\/[\d]{1,2}\/[\d]{2,4}/);
    if (all_dates){
      return DATA_TYPES.date;
    }

    var all_numbers = executeRegExp(strArray, /^[-]?(\d*)(\.)?(\d)*$/);
    if (all_numbers){
      return DATA_TYPES.number;
    }

    return returnDataType;
}


function normalizeArray(objArr) {
    var arr = [];
    for (var i = 0; i < objArr.length; i++) {
        var value = objArr[i] || "";
        arr.push(value.toString().toLowerCase());
    }
    return arr;
}

function executeRegExp(objArr, regexp) {
    var fullmatch = false;
    for (var i = 0; i < objArr.length; i++) {
        fullmatch = regexp.test(objArr[i]);
        if (!fullmatch) break;
    }

    return fullmatch;
}

function infer_types(data) {
    var samples = {}; // <-- array of sample values for each attribute

    //Go over 10 items (or less) and collect samples per field
    for (var i = 0; i < Math.min(data.length, 10); ++i) {
        var item = data[i];
        Object.keys(item).forEach(function(attr) {
            var value = item[attr];
            if (typeof value === 'undefined') return; // skip
            if (!samples[attr]) samples[attr] = [];
            samples[attr].push(value);
        });
    }

    //Now that we have samples for each attribute, use inferify to infer
    //the data type for each of them.
    var types = {};
    Object.keys(samples).forEach(function(attr) {
        types[attr] = inferify(samples[attr]);
    });

    return types;
}