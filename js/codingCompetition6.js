//*****************Question1 1
//let arr = [1,2,4,591,392,"392",391,2,5,10,2,"1","1",1,20,20,"20","20"];

function createArray(arrSz,prctStr,arrMx) {
let j = 0;
let i = 0
let min = 0;
let max = arrMx;
let arr = [];
let randnum = 0;
let nbrStrings = (prctStr/100)*arrSz;
while(j < arrSz)
  {
    randnum = Math.floor(Math.random()*(max));
    if(i<nbrStrings){
      randnum = randnum.toString();
    }
    i++;
    arr.push(randnum);
    j++;
  }
let groupByArr = _.groupBy(arr, function(val){ return typeof(val); } );
//requires underscore.js package
let output = Object.values(groupByArr);//gets rid of useless indexes
let subDiv = _.map(output, function (nested) {
    return  _.groupBy(nested, function(element){return element;});
});

let cleaned = _.map(subDiv, function (nests) {
  return Object.values(nests);
});
let numArr = cleaned[1];
let strArr = cleaned[0];
console.log("numbers: ", numArr);

let flattened = cleaned.reduce(function(prev, curr) {
  return prev.concat(curr);
});
//I want to convert this to a single function:
let slctFlatNum = _.map(numArr, function(group){
  if(group.length===1){
  return group[0];
  }
  else{
  return group;
  }
});
let slctFlatStr = _.map(strArr, function(group){
  if(group.length===1){
  return group[0];
  }
  else{
  return group;
  }
});
let displayNbr = "Number arrays: <br>" + JSON.stringify(slctFlatNum, null, 4)+ "<br>";
let displayStr = "String arrays: <br>" + JSON.stringify(slctFlatStr, null, 4)+ "<br>";
/* let displaytxt ="<br>"+displayNbr+displayStr+"The complete array: <br>"+JSON.stringify(slctFlat, null, 4)+"<br>"; */
let rawStr = "<br>The raw array: <br>"+JSON.stringify(arr, null, 4)+"<br>";
let grouped = "<br>The rough grouped array: <br>"+JSON.stringify(cleaned, null, 4)+"<br>"
let displaytxt =rawStr + displayNbr + displayStr;
//why did the step above result in curly brackets?
/* console.log("Sorted by typeof: ", output);
console.log("Subdivided groups: ",subDiv); */
console.log("The raw array: ",arr)
document.getElementById("result1").innerHTML=displaytxt;
}

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
    result = 'rgb('+r+','+g+','+b+')';
    //document.getElementById("result").innerHTML = result;
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
document.getElementById("arraySizeBtn").addEventListener("click", function(){
  let prctStr=document.getElementById("q1slide").value;
  let arrSz=document.getElementById("arraySize").value;  
  let arrMx=document.getElementById("arrayMax").value;
    //  document.getElementById("result2").innerHTML=validateFormat(input);
  createArray(arrSz,prctStr,arrMx);
});
document.getElementById("q1slide").addEventListener("input", function(){
  let prctStr=document.getElementById("q1slide").value;
  document.getElementById("chosen").innerHTML=prctStr+"%"
});