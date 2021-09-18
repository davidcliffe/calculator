//define consts for number buttons
const num_0 = document.querySelector('.digit-0');
const num_1 = document.querySelector('.digit-1');
const num_2 = document.querySelector('.digit-2');
const num_3 = document.querySelector('.digit-3');
const num_4 = document.querySelector('.digit-4');
const num_5 = document.querySelector('.digit-5');
const num_6 = document.querySelector('.digit-6');
const num_7 = document.querySelector('.digit-7');
const num_8 = document.querySelector('.digit-8');
const num_9 = document.querySelector('.digit-9');
const screenDisplay = document.querySelector('.display-window');
const clearDisplay = document.querySelector('.button-cancel');
const plusButton = document.querySelector('.plus');
const minusButton = document.querySelector('.minus');
const multButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');
const equalsButton = document.querySelector('.equals');
const operDisplay = document.querySelector('.display-operator');

var firstNum = null;
var secondNum = null;
var operatorSymbol = '';

//define function to clear display and reset variables
const clearScreen = function() {
  screenDisplay.textContent = '0';
  operDisplay.textContent = '';
  firstNum = null;
  secondNum = null;
  operatorSymbol = '';
}

clearDisplay.addEventListener('click', function(){
  clearScreen();
})

//form an array for numbers
digitArray = [num_0,num_1,num_2,num_3,num_4,num_5,num_6,num_7,num_8,num_9];

digitArray.forEach(element => {element.addEventListener('click', function(){    
    displayDigit(element.textContent);
  })  
});

const displayDigit = function(digit) {

  // the branching below covers cases for single and continuous calculations
    if(firstNum === null && operatorSymbol === '' && secondNum === null){     
      if (screenDisplay.textContent === '0'){
        screenDisplay.textContent = digit;
      }  else {
        screenDisplay.textContent = screenDisplay.textContent + digit;
      }  

  } else if (firstNum != null && operatorSymbol === '' && secondNum === null)  { 
      screenDisplay.textContent = digit;
      firstNum = Number(digit);      
      console.log('in first elseif') 

  } else if (firstNum != null && operatorSymbol != '' && secondNum === null)  { 
      screenDisplay.textContent = digit;
      operDisplay.textContent ='';
      secondNum = Number(digit);      
      console.log('in second elseif') 

  } else if (firstNum != null && operatorSymbol != '' && secondNum != null){
      screenDisplay.textContent = screenDisplay.textContent + digit;
      secondNum = Number(screenDisplay.textContent);
      console.log('in last elseif') 
      }     
    };


// define array for performing operations on numbers
operatorArray = [plusButton, minusButton, multButton, divideButton];

operatorArray.forEach(element => {element.addEventListener('click', function(){
  
  if (firstNum != null && operatorSymbol != '' && secondNum != null) {    
    calculate();
    operatorSymbol = '';  
    operDisplay.textContent = '';      
    secondNum = null;      
  } else if (firstNum != null && operatorSymbol != '' && secondNum === null){
    secondNum = Number(screenDisplay.textContent); 
  } else if (firstNum === null && operatorSymbol === '' && secondNum === null){
    firstNum = Number(screenDisplay.textContent); 
  } else {console.log('invalid option')
  }

    switch(element.textContent){
      case '+':
        operatorSymbol = '+';  
        operDisplay.textContent = operatorSymbol;
        break;
      case '-':
        operatorSymbol = '-';  
        operDisplay.textContent = operatorSymbol;
        break;
      case 'x':
        operatorSymbol = 'x';  
        operDisplay.textContent = operatorSymbol;
        break;
      case '/':
        operatorSymbol = '/';  
        operDisplay.textContent = operatorSymbol;
        break;      
     }
  })
})
;


equalsButton.addEventListener('click', function(){

  //there is a number and operator entered already
  if (firstNum && operatorSymbol && !secondNum) {
      secondNum = Number(screenDisplay.textContent);        
      calculate();      
  }else if(firstNum && operatorSymbol && secondNum){
      calculate();
  } else {
    return
  }
      operatorSymbol = '';  
      operDisplay.textContent = '';      
      secondNum = null;
    }    
);


const calculate = function(){
  switch(operatorSymbol){
    case '+': 
      var result = firstNum + secondNum; 
      screenDisplay.textContent = String(result); 
      firstNum = result;
      break;
    case '-':
      var result = firstNum - secondNum; 
      screenDisplay.textContent = String(result); 
      firstNum = result;          
      break;
    case 'x':
      var result = firstNum * secondNum; 
      if (result % Math.floor(result) != 0) {
          screenDisplay.textContent = result.toFixed(3);      
      } else {screenDisplay.textContent = String(result); 
        } 
      firstNum = result;          
      break;
    case '/': 
      var result = firstNum / secondNum;         
      if (result % Math.floor(result) != 0) {
        screenDisplay.textContent = result.toFixed(3);      
      } else {screenDisplay.textContent = String(result); 
      } 
      firstNum = result;          
      break;  
  }
}