var readLineSync = require("readline-sync")
const chalk = require('chalk');

var score = 0;
var numberOfWrongAttempts = 0;

// data of high score
var highScores = [
  {
    name: "Debo",
    score: 3,
  },
  {
    name: "Neeti",
    score: 3,
  },
  {
    name: "Arun",
    score: 3,
  }
]

// Greets user with Good morning / Good afternoon/ Good evening depending on the current time
function greetingMessage(){
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330;   // IST offset UTC +5:30 
  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  // ISTTime now represents the time in IST coordinates

  var hours = ISTTime.getHours()

  if (hours < 12 && hours >4) {
    console.log(chalk.bold("Good morning!"));
  }else if(hours > 12 && hours< 18) {
    console.log(chalk.bold("Good afternoon!"));
  }else{
    console.log(chalk.bold("Good evening!"));
  }
}

function welcomeMessage(){
  console.log("\nWelcome to "+chalk.bold.inverse("JAVACSRIPT") +  " Quizz")
  var userName = readLineSync.question(chalk.bold.bgBlue.inverse("\nWhat's your name? "));
  console.log(chalk.bgCyan("\n Hello " + userName + "! let's check how much you are familiar with Javscript"));
  console.log(chalk.cyan("\nNote:- For every right answer, your will be getting +1 points and game ends when you attempted two wrong answers"))
  console.log("\n Good luck!")
}

//Set of questions and answers
var questions = [
  {
    question: 'Which type of JavaScript language is ___\n  a.Object-Oriented \n  b.Object-Based \n  c.Assembly-language\n  d.High-level\n',
    answer: 'b'
  },
  {
    question: 'The "function" and " var" are known as: \n  a.Keywords \n  b.Data types \n  c.Declaration statements\n  d.Prototypes\n',
    answer: 'c'
  },
  {
    question: 'Which of the following number object function returns the value of the number? \n  a.toString() \n  b.valueOf() \n  c.toLocaleString()\n  d.toPrecision()\n',
    answer: 'b'
  },
  {
    question: 'Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters? \n  a.slice() \n  b.split() \n  c.substr()\n  d.search()\n',
    answer: 'c'
  },
  {
    question: 'In JavaScript the x===y statement implies that: \n  a.Both x and y are equal in value, type and reference address as well. \n  b.Both are x and y are equal in value only. \n  c.Both are equal in the value and data type.\n  d.Both are not same at all.\n',
    answer: 'c'
  },
  {
    question: 'Suppose we have a text "human" that we want to convert into string without using the "new" operator. Which is the correct way from the following to do so: \n  a.toString() \n  b.String(human)\n  c.String newvariable="human"\n  d.Both human.toString() and String(human)\n',
    answer: 'd'
  },
  {
    question: 'What we will get if we compare the "one" with "8" using the less than operator ("one"<8)? \n  a.False \n  b.True \n  c.NaN\n  d.Undefined\n',
    answer: 'a'
  },
  {
    question: 'Which one of the following is not a keyword: \n  a.if \n  b.with \n  c.debugger\n  d.use strict\n',
    answer: 'd'
  },
  {
    question: 'In JavaScript, do the functions always return a value? \n  a.Yes, functions always returns a value \n  b.No, it is not necessary \n  c.A number of functions return values by default\n  d.some functions do not return any value\n',
    answer: 'c'
  },

];

function playGame(){
  for(let i=0; i< questions.length; i++){
    // Whenever user give two wrong attempts, game ends
    if(numberOfWrongAttempts>=2){
      console.log(chalk.bgRed("\nYou attempted two wrong answers! Game Over!"));
      break;
    }
    var currentQuestion = questions[i];
    console.log(chalk.bold("\nQuestion no. "+ (i+1) + "-"))
    quizz(currentQuestion);
  }
  showfinalResult();
}

function quizz(currentQuestion){
  var answer = readLineSync.question(chalk.yellow(currentQuestion.question))
    if( answer.toUpperCase() === currentQuestion.answer.toUpperCase()){
      score++;
      console.log(chalk.green("You are right!"))
      console.log("Your's current Score:" + score)
    }else{
      console.log(chalk.red("Opps! You are wrong!"))
      console.log("Your's current Score: " + score)
      numberOfWrongAttempts ++;
    }
}

function showfinalResult(){
  console.log("\n--------------------------------");
  console.log(chalk.bold.bgBlue.inverse("Total Score: "+ score + "\n"));
  displayDeveloperRank();
   console.log("--------------------------------");
  console.log(chalk.bgCyan("Check out the high scores, if you should be there ping me on insta @robinh.dev and I'll update it :)\n"));
  highScores.map(score => console.log(chalk.bgMagenta(score.name)+ " : "+ chalk.inverse(score.score)));
}

function displayDeveloperRank(){
  if(score == questions.length){
    console.log("You are a ninja Js Developer!");
  }else if(score > questions.length/2){
    console.log("You are a intermediate Js Developer!");
  }else{
     console.log("You are a newbie Js Developer!");
  }
}

greetingMessage();
welcomeMessage();
playGame();