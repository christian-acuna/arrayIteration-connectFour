/**
 * one important topic to understand, is assignment of variables to values and variables to data structures
 * (ie. arrays, objects, and functions) and to other variables, as well as measuring equality between all of 
 * these things, can be a tricky thing to learn. If this seems difficult to understand, I'll
 * break it down in simpler terms:
 */


/**
 * when you assign a variable to a string or number, it will be equal to something in a mathmatical sense, much like how 
 * 1+1 is equal to 2, meaning that the value of 2 and 1+1 have equality, but they exist as two seperate entities. 
 */

var entity = 2;
var otherEntity = 1 + 1;

console.log(entity === otherEntity);

/**
 * because entity and otherEntity have equality of value but they aren't the same value that exists in the program memory,
 * we can define values in different ways(like above), and they will still have equality. The same thing can be done
 * with strings as well.  
 */

var letters = '1' + '1';
var otherLetters = '11';
var thirdLetters = otherLetters;
console.log(letters === otherLetters);
console.log(thirdLetters === otherLetters);

/**
 * Basically, it doesn't matter how we obtain our string or integer value, what matters is the value is the same as the others. 
 * Now, the interesting part is that these values are all considered to be what's called "immutable", meaning they cannot be changed.
 * 2 will always be 2, and nothing can ever change that. The only way you can change a value of a variable is through reassignment 
 * of the variable, which DOES NOT change the actual value itself, but simply reassigns the variable to a new value.
 */

var first = 1;
var second = first;
second = second + 1;
console.log(second);

/**
 * As you see here, second was equal to first(by value), but then second's value was reassigned to 1 plus its original value. 
 * Nothing changed for first. 1 is still one, but second is now two. I understand this seems really simple but it can become confusing.
 * The above can be rewritten like so:
 */

var myAwesomeNumber = 11;
var myOtherAwesomeNumber = myAwesomeNumber;
myOtherAwesomeNumber++;
console.log(myOtherAwesomeNumber);

/**
 * the reassignment of myOtherAwesomeNumber was implicity written with the "++" operator. Javascript did this interally, but the
 * re-assignment did happen.
 */


/**
 * Where this all becomes confusing is Arrays, objects, and functions do not work this way. In fact, they have no actual value to them per se.
 * When they are assigned, re-assigned and compared, they are done so by reference. Meaning "whether this is the same exact thing that was 
 * declared before." Javascript won't care if it looks the same but only if it IS the same. It doesn't matter what's in them, or how much is 
 * there, but only if it's talking about the same object array or function that exists in memory. Example:
 */

console.log({} === {});
var firstObj = {'hi' : true};
var secondObj = {'hi' : true};
console.log(firstObj === secondObj);

console.log(function(){} === function(){});
var firstFunc = function(){ return false; };
var secondFunc = function(){ return false; };
console.log(firstFunc === secondFunc);

console.log([] === []);
firstArr = [1,2];
secondArr = [1,2];
console.log(firstArr === secondArr);

/**
 * So, the only way we can get an array, object, or function to have equality is to assign it to a variable and then assign that variable
 * to another variable. Basically, we must reference the same object array or function, not duplicate it or its functionality, but point to
 * the same thing that was declared previously.
 */

var originalObj = {};
var duplicateObj = originalObj;
console.log(originalObj === duplicateObj);

var myObjectFunction = function(obj) {
  console.log(obj === originalObj);
};

myObjectFunction(originalObj);


/**
 * Where this becomes confusing and problematic is that if you assign a variable to another variable and they both refernce the same 
 * object or array, then what happens to one, happens to the other. This is possible specifically because arrays and objects are mutable, 
 * meaning they can change over time, they have no set composition or value, and so reassignment or the variable is not necessary. 
 */

var originalArray = [];
var duplicateArray = originalArray;
duplicateArray.push('hello there');
console.log(originalArray);

var otherObjectFunction = function(obj) {
  obj.greet = 'hello';
};

var myObject = {};
otherObjectFunction(myObject);
console.log(myObject);

/**
 * The major hurdles to programming with objects and arrays, is that you can have unintended side-effects due to mutability. When you
 * sort an array or change a property in an object, the consequence could be that you break a piece of code elsewhere that relies on 
 * that original composition. Therefore, it's best to structure your functions if they take in objects and arrays as inputs, to duplicate
 * the array or function and reassign them to another variable. The array .slice() method is handy for this: 
 */

var myArraySorter = function(arr){
  var copy = arr.slice();
  return copy.sort();
};

var shoppingList = ['apples', 'donuts', 'sugar', 'coffee', 'crackers'];

var mySortedList = myArraySorter(shoppingList);
console.log(mySortedList, shoppingList);
console.log(mySortedList === shoppingList);


/**
 * unfortunately, there is no method for objects that allows us to do this(in ES5 at least). So what we have to do is write a mixin,
 * which is a function that takes all the properties on one object and copies them to another. 
 */

var myObjectMixin = function(dest, src) {
  for(var prop in src){
    dest[prop] = src[prop];
  }
  return dest;
};

var myOriginalObject = {'hello': true, 'pinNumber': 12345};

var cloneObject = myObjectMixin({}, myOriginalObject);

console.log(cloneObject, myOriginalObject);
console.log(cloneObject === myOriginalObject);


/**
 * There are libraries and frameworks such as lodash, underscore, Angular, and many others that can duplicate this functionality,
 * and there are some that even perform what's called 'deep copy', which will copy arrays inside of arrays and objects inside of 
 * objects. You don't want to have duplicate references for those.
 */

var myLastArray = [];
var myLastCopy = myLastArray;
myLastArray.push(1);
myLastArray.push('this will get weird');
myLastArray.push(myLastCopy);
console.log(myLastArray);