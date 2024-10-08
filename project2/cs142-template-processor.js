'use strict';
// cs142-template-processor.js

function Cs142TemplateProcessor(template) {
    this.template = template; 
}

Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
    return this.template.replace(/{{(.*?)}}/g, (match, p1) =>
        dictionary[p1.trim()] !== undefined ? dictionary[p1.trim()] : ''
    );
};
var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
var dateTemplate = new Cs142TemplateProcessor(template);

var dictionary = {month: "July", day: "1", year: "2016"};
var str = dateTemplate.fillIn(dictionary);
console.log(str); // "My favorite month is July but not the day 1 or the year 2016"

var dictionary2 = {day: "1", year: "2016"};
var str2 = dateTemplate.fillIn(dictionary2);
console.log(str2); // "My favorite month is  but not the day 1 or the year 2016"
