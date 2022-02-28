const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  // disabled based on whether username has a value
  saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
  e.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  // Add score to highscores
  highScores.push(score)

  // Sort high scores again
  highScores.sort((a,b) => {
    return b.score - a.score
  })

  // Remove the high score in 6th place due to max limit
  highScores.splice(MAX_HIGH_SCORES)

  // sets the high scores in local storage to the new updated list
  localStorage.setItem('highScores', JSON.stringify(highScores))
  // Takes you to home screen (index.html)
  window.location.assign('/')
}