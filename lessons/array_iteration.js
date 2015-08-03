/**
 * Arrays are special Object Literals in Javascript. 
 * They are storage containers that can hold any other data type, including other arrays.
 * The contents of an array are held between enclosing brackets. Thus the array itself is represented by
 * two enclosing brackets 
 * ex: 
 */

/*
  console.log([]);
  console.log(typeof []);
*/

// be careful, the brackets only represent an array if they are not next to any other characters, only
// when they stand by themselves. objName['prop']; ...See bracket notation for objects. 


/**
 * Think of an array as a list of things that are held in storage. Each item in the list must be separated by a comma
 */

/*

console.log(['item1', 'item2', 'item3']);
 */


/**
 * arrays can hold any type in javascript
 */

/*

var thingsILike = ['steak', 'beer', 'sleeping in'];

console.log([null, false, 'hello', 1, function(){}, {}, [], thingsILike]);
 */

/**
 * items stored in an array can be accessed individually by an index number. this number is assigned interally and is 
 * based upon the order of the items. The index is zero based, meaning the first postion is index 0
 */

/*

var thingsIHate = ['black licorice', 'waking up early', 'anything without cheese'];

console.log(thingsIHate[0]);
 */

/**
 * arrays being objects, have properties and methods attached to them built interally in the language. The most important of these is the length property.
 * Every time an array's length changes, the length property is updated to reflect the current length of the array, and this number is not zero based.
 * Meaning, an array with one item will have a length of 1, but that one item wil be accessed by its index position, '0'. The length property can be very
 * useful for finding the last item in an array.
 */


/*
var moviesILike = ['Usual Suspects', 'Super Bad', 'Ghostbusters'];

console.log(moviesILike.length);
console.log(moviesILike[0]);
console.log(moviesILike[moviesILike.length - 1]);
 */

/**
 * Adding additional values to an array can be done by doing the following:
 */

/*

var bobs = ['Bob Hope', 'Bob Dole', 'Bob for Apples'];

bobs[bobs.length] = 'Bob-Ra Anne';
console.log(bobs);
 */


/**
 * This works, but it's clunky. Fortunately, Javascript has a method (a method is just a function attached to an object, remember Arrays are objects)
 * for adding new values onto the end of an array, it's called push. There are many more methods, but the most basic are pop, shift, unshift and they 
 * all perform similar actions.  
 */



/*

var james = ['King James', 'James Joyce'];
james.push('Rick James');

console.log(james); 
 */



/**
 * Why would you hold information in an Array?
 *
 * 1. If it is not neccessary to associate each value in the array with a distinct property, you can just put it in and forget it.
 * 2. Arrays are always guaranteed to be kept in order unlike objects, unless it's done by programmer error :-) 
 * 3. Arrays can be treated as stacks or queues, (Look up these data structures for more information) but for performance reasons, they work slightly faster as stacks
 * 4. Because arrays hold references to all of their values in a contiguous block of memory, they are fast to search through. This is called iteration.
 *
 * iteration is the main way to access an array. You generally start at the beginning and search through it until you find the value you want, and
 * you rarely access properties indivdually because you either often don't know what is at any given index or wish to perform the same operation
 * on all of the array's values. 
 */

/**
 * There are a few ways to search through an array, the most common of which is the loop. A loop runs a set of code until a condition is met.
 * while loops are the simpelest types of loops.
 */

/*

var i = 0;
while(i < 10){
  console.log(i);
  i = i + 1;
}
 */

/**
 * the breakdown of the while loop is this "as long as(this evaluates to true){ do this}", meaning as long as the bit in the parenthesis is true, do the
 * bit in the curly braces. the above can be re written with the ++ operator, which means "take the existing value and increment it up by one."
 * Let's write it like that but instead we'll have it stop when it reaches the length of our array.
 */

/*

var i = 0;
var littleList = ['ball', 'cat', 'toy']; 
while(i < littleList.length){
  console.log(i);
  i++;
}
 */

/**
 * If you haven't guessed, we're going to use that ever changing number to access our array values, but first let's abandon the while loop. The  
 * for loop has all of those individual parts that the while loop requires, except built right in. While loops are useful, but generally you use for loops
 * for array iteration
 */

/*
  
var bedrock = ['Fred', 'Barney', 'Wilma', 'Betty'];

for(var i = 0; i < bedrock.length; i++){
  console.log(bedrock[i]);
}
 */

/**
 * This is the basics of Array iteration, but it gets more complicated. Let's actually do something with our search.
 */

/*
var honeyMooners = ['Alice', 'Ralph', 'Ed', 'Trixie'];

for(var i = 0; i < honeyMooners.length; i++){
  var value = honeyMooners[i];
  if(value === 'Ed' || value === 'Trixie'){
    value = value + ' Norton';
  }else if(value === 'Ralph' || value === 'Alice'){
    value = value + ' Kramden';
  }
  honeyMooners[i] = value;
}

console.log(honeyMooners);
 */

/**
 * What if we took our for loop and put it inside function, so that we could call it on any array that's passed into the function?
 * That way we wouldn't have to keep writing the loop definition again and again?
 */

/*

var coolPlaces = ['New York', 'Seattle', 'London'];


var myLoopFunction = function(array){
  for(var i = 0; i < array.length; i++){
    array[i] = array[i] + ' is cool';
  }
}; 

myLoopFunction(coolPlaces);

console.log(coolPlaces);

var horriblePlaces = ['North Korea', 'The Sudan', 'The DMV'];

myLoopFunction(horriblePlaces);

console.log(horriblePlaces);
 */

/**
 * uh-oh. Well, that doesn't work because we can't change what we do with the array items inside the function, even when we know the DMV is not a cool
 * place to be. We could just put that stuff inside of a function too. But then that would have to be a different function every time we want to 
 * do something different. What we could do is pass that function along with the array as an argument, and say "iterate through this array and execute 
 * this function in the loop." A function that is passed as an argument to another function is called a callback function. Let's pass along additional 
 * values just to make sure the callback has everything it needs.
 */


/*

var myNewLoopFunction = function(array, callback){
  for(var i = 0, len = array.length; i < len; i++){
    callback(array[i], i, array);
  }
};

var coolPeople = ['Mike', 'Sean', 'Mr. T'];
var badPeople = ['Stalin', 'Pol Pot', 'The guy who invented the vuvuzela'];

var coolFunction = function(value, i, array){
  array[i] = value + ' is cool';
};

var badFunction = function(value, i, array){
  array[i] = value + ' is bad';
};

myNewLoopFunction(coolPeople, coolFunction);
myNewLoopFunction(badPeople, badFunction);

console.log(coolPeople);
console.log(badPeople);
*/

/**
 * Phew, that took a while. We can make it easier on ourselves by just passing an un-named function through without going through the extra code
 * of defining our function callback. This is called an anonymous function and is often used when providing a callback argument.
 */

/*

var myFinalLoopFunction = function(array, callback){
  for(var i = 0, len = array.length; i < len; i++){
    callback(array[i], i, array);
  }
};

var numbers = [1, 2, 3, 4];

myFinalLoopFunction(numbers, function(num, iterator, collection){
  collection[iterator] = num + 100;
});

console.log(numbers);
 */

/**
 * fortunately, Javasrcipt has array methods that do this exact same thing. There are also third party helper libraries and frameworks 
 * (see underscore, lodash, jquery, and angular) that do very similar things with built-in methods. Here's the native JS one, it is accessed just
 * like the push method above. 
 */

/*

var myLastArray = ['Mr. Ed', 'Mr. Rogers', 'Mr. Belvedere'];

myLastArray.forEach(function(name, i, arr){
  arr[i] = name + ' had his own show';
});

console.log(myLastArray);
 */

/**
 * take note and take advantage of the forEach method. It's a huge time saver and will improve your code readability and change how you 
 * program if you use it enough. See also these other array methods: pop, push, shift, unshift, splice, slice, every, some, reduce, map,
 * reduceRight, filter. There are probably others that I've fogotten but just find them in MDN.
 *
 * Other notes for things not mentioned above: 
 * 
 * Do NOT use a for...in loop for arrays, only for objects.
 * Do NOT store custom properties in your array like you do objects-- 
 *    var myArray = [];
 *    myArray['propName'] = 'value'
 *    Just because you can, doesn't mean you should.
 * 
 * ALWAYS start your for loop with var i = ..., never leave out 'var'
 * ALWAYS assign variable names like 'len' and 'length' to the array length, never array.length -1
 * be aware of the difference between i++ and ++i
 * be careful if nesting for loops especially if you're reusing iterator variables.
 * Understand how arrays and objects are assigned to variables by reference and not duplicated by value 
 */

