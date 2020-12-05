import { quizData } from './data.js'
const container = document.querySelector('.container')
const questionEl = document.getElementById('question')
const answersEl = document.querySelectorAll('.answer')
const boxQuestionEl = document.querySelector('.box-question')
const correctAnswersEl = document.getElementById('correct-answer')
const incorrectAnswersEl = document.getElementById('incorrect-answer')
const numberQuestionEl = document.getElementById('number-question')
const numberRemainingEl = document.getElementById('number-remaining')
const questionA = document.getElementById('question-a')
const questionB = document.getElementById('question-b')
const questionC = document.getElementById('question-c')
const questionD = document.getElementById('question-d')
const submitBtn = document.getElementById('btnSend')

let currentQuiz = 0
let correct = 0
let incorrect = 0

loadQuiz()
function loadQuiz() {
	deselectAnswers()
	const currentQuizData = quizData[currentQuiz]
	questionEl.innerText = currentQuizData.question
	questionA.innerText = currentQuizData.a
	questionB.innerText = currentQuizData.b
	questionC.innerText = currentQuizData.c
	questionD.innerText = currentQuizData.d
	numberQuestionEl.innerText = currentQuiz + 1
	numberRemainingEl.innerText = quizData.length
}
function score() {
	correctAnswersEl.innerText = correct
	incorrectAnswersEl.innerText = incorrect
}
function tryAgain() {
	currentQuiz = 0
	correct = 0
	incorrect = 0
	score()
	loadQuiz()
	submitBtn.style.display = 'block'
}
function selectedAnswer() {
	let answer = undefined
	answersEl.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id
		}
	})
	return answer
}
function deselectAnswers() {
	answersEl.forEach((answerEl) => {
		answerEl.checked = false
	})
}
submitBtn.addEventListener('click', () => {
	const answer = selectedAnswer()
	if (answer) {
		if (answer === quizData[currentQuiz].correct) {
			correct++
		} else {
			incorrect++
		}
		currentQuiz++
		if (currentQuiz < quizData.length) {
			loadQuiz()
			score()
		} else {
			score()
			deselectAnswers()
			const text = document.createElement('h2')
			text.innerHTML = `
				<h2 class="final-score">Your score is ${correct} / ${quizData.length} 🥳🔥🥳🔥</h2>
			`
			boxQuestionEl.appendChild(text)
			submitBtn.style.display = 'none'
			const btnTryAgain = document.createElement('button')
			btnTryAgain.innerText = 'Try Again'
			container.appendChild(btnTryAgain)
			btnTryAgain.addEventListener('click', () => {
				btnTryAgain.style.display = 'none'
				boxQuestionEl.removeChild(text)
				tryAgain()
			})
		}
	}
})
