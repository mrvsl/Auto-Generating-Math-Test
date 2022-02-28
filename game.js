const question = document.querySelector('#question')
// Choices - 4 of these. 
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  
]

const SCORE_POINTS = 100
let numQuestions = localStorage.getItem('numQuestions')

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

/*
Generate random new question. Question text and choices are replaced by the new question.
*/
getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }

  questionCounter ++
  // Change progress text to match question number
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  // Calculate which question currently on, update width of progress bar accordingly
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
  // Generate random index for the NEW question
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  // get new question from newly generated index
  currentQuestion = availableQuestions[questionsIndex]
  // change text of question header to the new question
  question.innerText = currentQuestion.question

  // loop through choices, change each choice to be the option from the questions array
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)
  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    // needs to be accepting answers
    if(!acceptingAnswers) return

    acceptingAnswers = false
    // the object for the choice clicked on
    const selectedChoice = e.target
    // Answer choice clicked on (number between 1, 2, 3, 4)
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    // This should do the flash green/red for a short time upon clicking a question
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()