//*****************Question1 1
let arr = [1,2,4,591,392,"392",391,2,5,10,2,"1","1",1,20,20,"20","20"];
let groupByArr = _.groupBy(arr, function(val){ return typeof(val); } );
//requires underscore.js package
let output = Object.values(groupByArr);//gets rid of useless indexes
let subDiv = _.map(output, function (nested) {
    return  _.groupBy(nested, function(element){return element;});
});

let cleaned = _.map(subDiv, function (nests) {
  return Object.values(nests);
});
let numArr = Object.values(subDiv[0]);
let strArr = Object.values(subDiv[1]);
console.log("numbers: ", numArr);
let displayNbr = "Number arrays: <br>" + JSON.stringify(numArr, null, 4)+ "<br>";
let displayStr = "String arrays: <br>" + JSON.stringify(strArr, null, 4)+ "<br>";
let flattened = cleaned.reduce(function(prev, curr) {
  return prev.concat(curr);
});
// reinsert selective flattening here using map and return either group or group[0] - if it has only one element
let slctFlat = _.map(flattened, function(group){
  if(group.length===1){
  return group[0];
  }
  else{
  return group;
  }
});
function updateSlider(slideAmount) {
  //get the element
  let strPrct = document.getElementById("chosen");
  //show the amount
  display.innerHTML=slideAmount + "%";
  let pic = document.getElementById("pic");
  //set the dimensions
  pic.style.width=slideAmount+"%";
  pic.style.height=slideAmount+"%";
}
function createArray(slideAmount) {
  //get the element
  alert("You set array to " + strPrct + "% string.")
}
let displaytxt ="<br>"+displayNbr+displayStr+"The complete array: <br>"+JSON.stringify(slctFlat, null, 4)+"<br>";
//why did the step above result in curly brackets?
console.log("Sorted by typeof: ", output);
console.log("Subdivided groups: ",subDiv);
document.getElementById("result1").innerHTML=displaytxt;
//I was able to selectively flatten groups with single numbers when typeof did not matter.
//trying to selectively flatten arrays with single elements - I had headaches working with array of objects created by separating strings and number

//***************** Question 2

let arr2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
function getAddends(input){
  let myVal = parseInt(input);
  slicer = Math.floor(myVal/2)+1
  let slicedArr = arr2.slice(0,slicer);//need + 1 bc arrays start with index = 0
  //could also create the shortened array with filter, but this is easier
  //don't know which is faster
  console.log("Sliced array:",slicedArr);
  let addPairs=_.map(slicedArr, function(a){
    return[a,input-a];
  })
  let cleaned2 = _.map(addPairs, function (nests) {
    return Object.values(nests);
  });
  //addPairs = Object.values(addPairs);
  return JSON.stringify(cleaned2, null, 4);
}
function validateFormat(input){ 
  //alert("checking input format");
  if (isNaN(input) == true)
   {
      alert("Value must be a number.");
      document.getElementById("targetinput").focus();
      document.getElementById("targetinput").select();
   }
  else {
    return getAddends(input);
  }

}
//***************** Question 3
//Really - can't compete with this: https://www.rapidtables.com/convert/color/rgb-to-hex.html
//convert hex to rgb
function hex2rgb(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    result = 'rgba('+r+','+g+','+b+')';
    document.getElementById("result").innerHTML = result;
    return result;
}
function detectFormat(input){ 
  if(input.includes("rgb")){
    return rgb2hex(input);
  }
  else if(input.includes("#")){
     return hex2rgb(input);
  }
  else{
  alert("The value you entered is not correctly formatted. Make sure it starts with '#' for hex values or 'rgb' for rgb values");
  }
}
//Function to convert rgb to hex
function rgb2hex(rgb){  
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  result = (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  //document.getElementById("result").innerHTML=result;
  return result;
}
//add event listener for button click
//***************** event listeners
document.getElementById("convertbutton").addEventListener("click", function(){
  let input=document.getElementById("colorinput").value
   document.getElementById("result3").innerHTML=detectFormat(input);
});
document.getElementById("addendbutton").addEventListener("click", function(){
  let input=document.getElementById("targetinput").value
   document.getElementById("result2").innerHTML=validateFormat(input);
});