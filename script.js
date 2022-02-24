//https://www.youtube.com/watch?v=GVuU25pGaYo&ab_channel=Frankslaboratory

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d') //Umožňuje kreslit v canvas tvary, obrázky, texty
console.log(ctx)
canvas.height = 540 //Nastavení výšky podle velikosti okna
canvas.width = 960 //Nastavení šířky podle velikosti okna

//Načtení obrázků
let images = {} //Objekt, který bude obsahovat všechny obrázky
images.background1 = new Image()
images.background1.src = 'etc/sprites/sheets/bg-001.png'
images.background2 = new Image()
images.background2.src = 'etc/sprites/sheets/bg-002.png'
images.background3 = new Image()
images.background3.src = 'etc/sprites/sheets/bg-003.png'
images.background4 = new Image()
images.background4.src = 'etc/sprites/sheets/bg-004.png'
images.deathstar = new Image()
images.deathstar.src = 'etc/sprites/sheets/death-star.png'
images.player = new Image() //Přidá nový objekt obrázku s názvem player do objektu images
images.player.src = 'etc/sprites/sheets/at-st-sprites-2.png' //Nastavení src pro vytvořený obrázek

let playerCols = 32
let playerRows = 2

/*Nastavení charakteru*/
const playerHeight = 650
const playerWidth = 650
let playerFrameX = 0 //Vybere který frame z obrázku (sheets) se má načíst (na tomto obrázku začíná chůze 4 framem)
let playerFrameY = 0 //Vybere který frame z obrázku (sheets) se má načíst (framy s chůzí doprava)
let playerX = 860 //Vybere pozici, na kterou se má vykreslit obrázek charakteru
let playerY = 275 //Vybere pozici, na kterou se má vykreslit obrázek charakteru
//const playerSpeed = 0.7
const playerSpeed = 1

let pause = 0

//Vykreslení obrázku (sprites)
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
   //img vybere obrázek k vykreslení
   //další 4 atributy vybírají konkrétní obrázek (sourceX, sourceY)
   //poslední 4 atributy slouží k pozici vykreslení obrázku
   ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH) //Vykreslení obrázku do canvas
   
}





//Aimation loop
//Bude se spouštět pořád dokola každý frame
function animate() {
   //na začátku každé animace musíme vyčistit předchozí načtení
   ctx.clearRect(0, 0, canvas.width, canvas.height)

   ctx.drawImage(images.background1, 0, 0, canvas.width, canvas.height)
   ctx.drawImage(images.deathstar, 500, 175, 115, 115)
   

   /************************** */
   //načtení funkce pro vykreslení obrázku
   drawSprite(images.player,
      playerWidth * playerFrameX,
      playerHeight * playerFrameY,
      playerWidth,
      playerHeight,
      playerX,
      playerY,
      150,
      150
   )

   /************************ */

   ctx.drawImage(images.background2, 0, 0, canvas.width, canvas.height)
   ctx.drawImage(images.background3, 0, 0, canvas.width, canvas.height)
   ctx.drawImage(images.background4, 0, 0, canvas.width, canvas.height)


   writeText('Star Wars Quiz', 175, 100)

   if(pause == 1) {
      return false
   }

   /*Animate Sprites */
   if(playerFrameX < 31) {
      playerFrameX++

   } else {
      playerFrameX = 15
      
   }

   /*Move Character*/
   if (playerX < canvas.width + playerWidth) {
      playerX -= playerSpeed // Move to left (+= pro Move to right)
      
   } else {
      playerX = 0 + playerWidth
      
   }

   if (playerX <= 0) {
      playerX = 860;
      console.log('něco se děje..')
   }

   

}

/*Pokud bychom nyní spustili requestAnimationFrame, animace by běžela příliš rychle.
Používá se technika, která zajistí, aby framerate byl na každém pc odpovídal frames per second.
Zde, ale použijeme pouze klasický interval.*/
window.onload = setInterval(animate, 1000/30)

/* Pauza hry při stisknutí ENTER */
/*
document.body.addEventListener('keydown', function(event) {
   console.log('ahoj');
   if (event.keyCode === 13) {
      pause = 1
   } else {
      pause = 0
   }
})*/


function writeText(txt,x,y) {
   ctx.font = '75px starwars';
   ctx.fillStyle = "#ffe918";
   /*var txt = 'line 1\nline 2\nthird line..';
   var x = 30;
   var y = 30;*/

   var txt = txt;
   var x = x;
   var y = y;
   var lineheight = 65;
   var lines = txt.split('\n');

   for (var i = 0; i<lines.length; i++)
   ctx.fillText(lines[i], x, y + (i*lineheight) );
}


/*GameContent*/
const startButton = document.querySelector('#startButton')
const nextButton = document.querySelector('#nextButton')
const questionContainerElement = document.querySelector('#questionContainer')
const questionElement = document.querySelector('#question')
const answerButtonsElement = document.querySelector('#answerButtons')
let shuffledQuestions, currentQuestionIndex
let gameContent = document.querySelector('#gameContent')
const rightAnswersBox = document.querySelector('#rightAnswers')
let correctAnswers = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
   currentQuestionIndex++
   setNextQuestion()
})

function startGame() {
   console.log('Started')
   startButton.classList.add('hide')
   shuffledQuestions = questions.sort(() => Math.random() - .5)
   currentQuestionIndex = 0
   questionContainerElement.classList.remove('hide')
   setNextQuestion()
}

function setNextQuestion() {
   resetState()
   showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
   questionElement.innerText = question.question
   question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('button')
      if(answer.correct) {
         button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
   })
}

function resetState() {
   nextButton.classList.add('hide')
   while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
   }
}

function selectAnswer(e) {
   const selectedButton = e.target
   
   /*const correct = selectedButton.dataset.correct*/
   const buttons = document.querySelectorAll('#answerButtons .button')
   /*rightAnswersCounter(document.body, correct)
   Array.from(answerButtonsElement.children).forEach(button => {
      rightAnswersCounter(button, button.dataset.correct)
   })*/
   //nextButton.classList.remove('hide')

   buttons.forEach((button) => {
      button.disabled = true
   })
   
   if(shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
   } else {
      startButton.innerText = 'Začít znovu'
      startButton.classList.remove('hide')
   }

   //console.log(e.target.getAttribute('data-correct'))
   if(selectedButton.getAttribute('data-correct') == 'true') {
      correctAnswers += 1
      rightAnswersBox.innerHTML = 'Skóre\n' + correctAnswers + '/' + questions.length
      console.log(correctAnswers)
      this.classList.add('correct')
   } else {
      this.classList.add('wrong')
      rightAnswersBox.innerHTML = 'Skóre\n' + correctAnswers + '/' + questions.length
   }
   
}
/*
function setStatusClass(element, correct) {
   clearStatusClass(element)
   if(correct) {
      element.classList.add('correct')
   } else {
      element.classList.add('wrong')
      //pause = 1
   }
}

function clearStatusClass(element) {
   element.classList.remove('correct')
   element.classList.remove('wrong')

}
*/

/*Questions & answers*/
const questions = [
   {
      question: 'Strach vede k hněvu, hněv vede k nenávisti, nenávist vede.. k čemu?',
      answers: [
         {text: 'K utrpení', correct: true},
         {text: 'K boji', correct: false},
         {text: 'K depresi', correct: false},
         {text: 'Ke smrti', correct: false},
      ]
   },
   {
      question: 'Jaká epizoda byla natočena jako první?',
      answers: [
         {text: 'První', correct: false},
         {text: 'Třetí', correct: false},
         {text: 'Čtvrtá', correct: true},
         {text: 'Šestá', correct: false},
      ]
   },
   {
      question: 'Kdo měl fialový meč?',
      answers: [
         {text: 'Anakin Skywallker', correct: false},
         {text: 'kapitán Picard', correct: false},
         {text: 'Mr. Yoda', correct: false},
         {text: 'Mace Windu', correct: true},
      ]
   },
   {
      question: 'Podle které postavy je ve druhé epizodě vytvořena armáda klonů?',
      answers: [
         {text: 'Boba Fett', correct: false},
         {text: 'Jango Fett', correct: true},
         {text: 'Valdo Fett', correct: false},
         {text: 'Mando Fett', correct: false},
      ]
   },
   {
      question: 'Jaké číslo měl rozkaz, který nařídil klonovým vojákům popravit všechny rytíře Jedi?',
      answers: [
         {text: '44', correct: false},
         {text: '55', correct: false},
         {text: '66', correct: true},
         {text: '69', correct: false},
      ]
   },
   {
      question: 'Na kterou planetu odletěl Luke Skywallker hledat Mr. Yodu?',
      answers: [
         {text: 'Tatooine', correct: false},
         {text: 'Dagobah', correct: true},
         {text: 'Bespin', correct: false},
         {text: 'Mustafar', correct: false},
      ]
   },
   {
      question: 'Kdo vymyslel jméno Jar Jar?',
      answers: [
         {text: 'George Lucas', correct: false},
         {text: 'Harrison Ford', correct: true},
         {text: 'Syn George Lucase', correct: false},
         {text: 'Carrie Fisher', correct: false},
      ]
   },
   {
      question: 'Jak se měl původně jmenovat Luke Skywalker?',
      answers: [
         {text: 'Luke Mandalorian', correct: false},
         {text: 'Luke Starkiller', correct: true},
         {text: 'Luke Starlord', correct: false},
         {text: 'Liam Skywallker', correct: false},
      ]
   },
   {
      question: 'Jak se jmenovala teta a strýc Luka Skywallkera?',
      answers: [
         {text: 'Ove a Keira', correct: false},
         {text: 'Sabé a Yoda', correct: false},
         {text: 'Owen a Beru', correct: true},
         {text: 'Jon a Sansa', correct: false},
      ]
   },
   {
      question: 'Jak získala Leia titul princezna?',
      answers: [
         {text: 'Svatbou s princem', correct: false},
         {text: 'Státním převratem na Alderanu', correct: true},
         {text: 'Přidělila jí ho matka', correct: false},
         {text: 'Díky adoptivnímu otci', correct: true},
      ]
   }
]