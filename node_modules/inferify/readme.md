inferify
===

[![Build Status](https://travis-ci.org/AvnerCohen/inferify.png)](https://travis-ci.org/AvnerCohen/inferify)

Module can be used to return the common datatype for an array of provided objects.

This can be used to infer datatypes of values from data that does not support datatype declerations, such as CSV.

A possible use case would be:

* Select few random rows from a CSV.
* Send for inspection.
* Continue process CSV based on now-known, data types.
	
Usage:

````
var dt = inferify(["banana", "juice"]);
//dt = "string"
````

````
var dt = inferify([0.5, 0.4, 0.6);
//dt = "float"
````

````
var dt = inferify([12, 7, 8, 9]);
//dt = "integer"
````

````
var dt = inferify(["10/10/2010", "12/12/2012", "30/12/2001"]);
//dt = "date"
````

````
var dt = inferify(["true", "false" , "false"]);
//dt = "date"
````

One may also pass objects in the array, in which inferify
will infer each attribute.

```
var dt = inferify([
  { a: "true", b: "hello", c: "12/12/2012" },
  { a: "false", b: "goodbye", c: "30/12/2012" },
]);
//dt = { a: "boolean", b: "string", c: "date" }
```

Returned Data Type can be a string with one of the following values:

* string
* date
* integer
* float
* number
