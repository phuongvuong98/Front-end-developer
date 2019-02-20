///////////////////////////////////////
// Lecture: Hoisting

/*
age = 1998;
var calculateAge = function(year) {
    console.log('TCL: age', age)    
    console.log(2018 - year);
}
calculateAge(1998);
var age;

*/

///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain


// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         third()
//     }
// }

// function third() {
//     var d = 'John';
//     //console.log(a + b + c + d);
//     console.log(a);
// }




///////////////////////////////////////
// Lecture: The this keyword

var vuong = {
    name: 'Vuong',
    yearOfBirth: 1998,
    calculateAge: function() {
        console.log(this);
        console.log(this.yearOfBirth);
        inner();
        function inner() {
            console.log(this);
        }
    }
}

vuong.calculateAge();

var tu = {
    name: 'Tu',
    yearOfBirth: 1998
}

tu.calculateAge = vuong.calculateAge;
tu.calculateAge();







