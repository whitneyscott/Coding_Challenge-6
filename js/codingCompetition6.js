//*****************Question1 1
//let arr = [1,2,4,591,392,"392",391,2,5,10,2,"1","1",1,20,20,"20","20"];

function createArray(arrSz,prctStr,arrMx) {
  // alert("Array size: "+arrSz+"\n Percent string: "+prctStr+"\n Array Max value: "+arrMx);
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
document.getElementById("result1").value=displaytxt;
document.getElementById("profile").src = "http://aslexpress.net/codingCompetition6/img/Inspiration.png";

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
//***************** Question 3b
  function hexFromRGB(r, g, b) {
        r=Math.floor((r/100)*255);
        g=Math.floor((g/100)*255);
        b=Math.floor((b/100)*255);
        let rgb = [r,g,b];
        let hex = [
          r.toString( 16 ),
          g.toString( 16 ),
          b.toString( 16 )
        ];
        $.each( hex, function( nr, val ) {
          if ( val.length === 1 ) {
            hex[ nr ] = "0" + val;
          }
        });
        let codes = [hex,rgb]
        //return hex.join( "" ).toUpperCase();
        
        return(codes);
      }

function onnumber(obj,n)
  {
    let r=$("#r").val();
    let g=$("#g").val();
    let b=$("#b").val();
    if( n==1 )
      $("#red").slider("value", r);
    else if( n==2 )
      $("#green").slider("value", g);
    else
      $("#blue").slider("value", b);
    //refreshSwatch();
    //calc();
  }
function refreshSwatch() {
  let sourceFormat =$('input[name=colorformat]:checked').val();
/*     if(!selected.val()){
        alert('No color selected!')
    }
    else{
        var selectedValue = selected.val();
        var selectedName = selected.siblings().text();
        alert("Color format: " + selectedName + "\r\nValue: " + selectedValue );
    } */
  let red = document.querySelector('#sliderRed').value;
  let green = document.querySelector('#sliderGreen').value;
  let blue = document.querySelector('#sliderBlue').value;
  let clrcodes =  hexFromRGB( red, green, blue ); 
  let hex = clrcodes[0].join( "" ).toUpperCase();
  let rgb = clrcodes[1].join();
  
  $( "#swatch" ).css( "background-color", "#" + hex );
  document.querySelector("#r").value = red;
  document.querySelector("#g").value = green;
  document.querySelector("#b").value = blue;
if(sourceFormat==="RGB"){
document.getElementById("source").value = "RGB("+rgb+")";
document.getElementById("source").innerHTML = "("+rgb+")";
}
else{
document.getElementById("source").value = "#"+hex;
document.getElementById("source").innerHTML = "#"+hex;
}
document.getElementById("rgb").value = "RGB("+rgb+")";
document.getElementById("rgb").innerHTML = "("+rgb+")";
document.getElementById("hex").value = "#"+hex;
document.getElementById("hex").innerHTML = "#"+hex;
}


function calc(){
  alert("RGB: "+rgb + " HEX: " +hex);
}

//****************** The following is no longer really needed, could just hide and show the RGB and HEX elements, but for the purposes of this competition I'm including a calculation method:

function hex2rgb(hex){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    result = 'rgba('+r+','+g+','+b+')';
    return result;
}
//Function to convert rgb to hex
function rgb2hex(rgb){  
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  result = (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  return result;
}
function detectFormat(input){ 
  if(input.includes("RGB")){
    return rgb2hex(input);
  }
  else if(input.includes("#")){
     return hex2rgb(input);
  }
  else{
  alert("The value you entered is not correctly formatted. Make sure it starts with '#' for hex values or 'rgb' for rgb values");
  }
}

function changeImage1(id,src1,src2){
 var img=document.getElementById(id);
 if (img){
  var src=img.src,p=src.slice(0,src.lastIndexOf('/'))+'/';
  if (src==p+src1){
   img.src=p+src2;
  }
  else {
   img.src=p+src1;
  }
 }
}
let elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function () {
       let img=document.getElementById("profile");
       img.src="http://aslexpress.net/codingCompetition6/img/Thinking.png";
    }
}
//***************** event listeners
document.getElementById("addendbutton").addEventListener("click", function(){
  let input=document.getElementById("targetinput").value
   document.getElementById("result2").innerHTML=validateFormat(input);
   document.getElementById("profile").src = "http://aslexpress.net/codingCompetition6/img/Inspiration.png";
});
document.getElementById("arraySizeBtn").addEventListener("click", function(){  
  let prctStr=document.getElementById("q1slide").value;
  let arrSz=document.getElementById("arraySize").value;  
  let arrMx=document.getElementById("arrayMax").value;
  createArray(arrSz,prctStr,arrMx);
});
document.getElementById("q1slide").addEventListener("input", function(){
  let prctStr=document.getElementById("q1slide").value;
  document.getElementById("chosen").innerHTML=prctStr;
});
document.getElementById("sliderRed").addEventListener("change", function(){
    refreshSwatch();
});
document.getElementById("sliderGreen").addEventListener("change", function(){
    refreshSwatch();
});
document.getElementById("sliderBlue").addEventListener("change", function(){
    refreshSwatch();
});
document.getElementById("convertbtn").addEventListener("click", function(){
    let input=document.getElementById("source").value
    document.getElementById("converted").value=detectFormat(input);
    document.getElementById("profile").src = "http://aslexpress.net/codingCompetition6/img/Inspiration.png";
});
function callback(e) {
    var e = window.e || e;

    if (e.target.tagName !== 'A'){
      return;
    }
   else{
    e.target.src = "http://aslexpress.net/codingCompetition6/img/Thinking.png";
    return;
   }    
}

if (document.addEventListener)
    document.addEventListener('click', callback, false);
else
    document.attachEvent('onclick', callback);