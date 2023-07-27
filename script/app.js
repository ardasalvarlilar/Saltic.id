// selectors
const table = document.getElementById('table')
const row = document.getElementById('selectRow')
const col = document.getElementById('selectCol')
const btn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const showResult = document.querySelector('.message-container')

// Main function to start the game and some style settings for table
const startGame = () =>{
  table.style.display = 'grid'
  table.style.justifyContent = 'center'
  table.style.gridTemplateRows = `repeat(${row.value},40px)`
  table.style.gridTemplateColumns = `repeat(${col.value},50px)`
  if(innerWidth < 640){
    table.style.gridTemplateColumns = `repeat(${col.value}, 30px)`
    table.style.gridTemplateRows = `repeat(${row.value}, 30px)`
    table.style.padding = '10px'
  }
  generateDivs()
  hideDivs()
}

let firstIndex = undefined
let lastIndex = undefined
let eventFirstIndex 
let eventlastIndex 
let numbersArray = []
let eventArr = []

// generating divs between 0 and 225 depends the rows and cols number that the user selected 
const generateDivs = () => {
  let numbers = []
  const totalDivs = col.value * row.value; // generates divs 
  
  while (numbers.length < totalDivs) { // keeps generating divs until reachs user selected value. Pushes the random div to numbers array to make sure that every div is unique. And some style settings
    let randomNum = Math.floor(Math.random() * totalDivs)
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum)
      const div = document.createElement('button')
      div.textContent = randomNum
      numbersArray.push(div.textContent)
      eventArr.push(div)
      div.classList.add('number')
      div.id = randomNum
      table.appendChild(div)
      div.style.border = '1px solid black'
      div.style.fontSize = '1.7rem'
      div.style.fontWeight = '900'
      table.style.gap = '0.3rem'
      table.style.padding = '5px 0'
      table.style.border = '2px solid black'
      
      if(innerWidth < 640){
        div.style.fontSize = '1rem'
      }
    }
  }

  // adds event listeners to every number to change the background colors
  table.addEventListener('click', function(e){
    const numberDivs = document.getElementsByClassName('number');
    for (let i = 0; i < numberDivs.length; i++) {
      numberDivs[i].addEventListener('click', handleClick);
    }
    }
  )
  let sorted = numbersArray.sort((a,b) => a-b)
  console.log(sorted)
  firstIndex = Number(sorted[0])
  lastIndex = sorted.length - 1


  let sortedEventArr = eventArr.sort((a,b)=> a.textContent - b.textContent)
  eventFirstIndex = sortedEventArr[0]
  lastIndex = sortedEventArr.length - 1
  eventlastIndex = sortedEventArr[lastIndex]
  console.log(eventFirstIndex)
  console.log(eventlastIndex)
  eventFirstIndex.addEventListener('click', myChoronometer.start())
  eventlastIndex.addEventListener('click',()=>{
    showResult.style.visibility = 'visible'
    myChoronometer.stop()
  })
}



// expected number is for check the next value. It's staring from zero because first expected value is zero when the user click zero which is the true result, after that the next true value is one, so expected number increase itself one by one. If clicked number matches with expected number;the clicked numbers backgrounds turns green, otherwise turns red for a moment to show that it was a wrong click.
let expectedNumber = 0;
function handleClick() {
  const clickedNumber = parseInt(this.textContent);
  if (clickedNumber === expectedNumber) {
    expectedNumber++;
    console.log(expectedNumber)
    this.style.backgroundColor = 'green';
    this.style.color = 'white'
    this.disabled = true
  } else{
    console.log('a')
    this.style.backgroundColor = 'red';
    setTimeout(transparent.bind(null,this),100)
  
  }
  if(expectedNumber ===  eventlastIndex){
    stopBtn.style.display = 'block'
  }
}


// this function block is turns the background color to the default color after wrong click.
function transparent(a){
  a.style.backgroundColor = 'transparent'
}

// hides rows cols input divs and the stop btn. Shows the finish btn
const hideDivs = () =>{
document.getElementById('numberInputDiv').style.display = "none"
btn.style.display = 'none'
}

// shows the result after user clicked the finish btn
const p = document.querySelector('#message')
// chronometer function to show the user how many seconds or minutes spend to solve the game
function chronometer() {
  let seconds = 0;
  let intervalId;
  // start chronometer
  this.start = function() {
    intervalId = setInterval(function() {
      seconds++;
      // if user solves the game less than 60 seconds shows only as seconds but it's kind to impossible🥲
      if (seconds < 60) {
        p.textContent = `Your time is ${seconds} seconds`;
      } else {
        // if user solves the game more than 60 seconds shows the result as minutes and seconds
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        p.textContent = `Your time is ${minutes} minutes ${remainingSeconds} seconds`;
      }
    }, 1000);
  };

  // stop the chronometer
  this.stop = function(){
    clearInterval(intervalId)
    // using myChoronometer.stop() funtion to stop the chorometer
  }

  // reset the chronometer
  this.reset = function(){
    seconds = 0
  }
}
const myChoronometer = new chronometer()//declered it as a object to use myChoronometerStart() and myChronometer.Stop() functions

// btn.addEventListener('click',myChoronometer.start) // event listener to start chronometer
// stopBtn.addEventListener('click',myChoronometer.stop) // event listener to stop the chronometer


col.addEventListener('keydown',(e)=>{ // if user presses the enter key after selecting a different value from cols input starts game
  if(e.keyCode == 13){
    startGame()
  }
})
row.addEventListener('keydown',(e)=>{ // if user presses the enter key after selecting a different value from rows input starts game
  if(e.keyCode == 13){
    startGame()
  }
})

btn.addEventListener('click', startGame)// main event listener to start the game