document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-btn')
  const nextButton = document.getElementById('next-btn')
  const questionContainerElement = document.getElementById('question-container')
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
  const animalImageElement = document.getElementById('animal-image')
  const progressBarElement = document.getElementById('progress-bar')
  const progressTextElement = document.getElementById('progress-text')
  const progressContainerElement = document.getElementById('progress-container')
  const scoreElement = document.getElementById('score')
  const scoreValueElement = document.getElementById('score-value')
  const quizContainer = document.querySelector('.quiz-container')

  let shuffledQuestions, currentQuestionIndex, score
  let allScores = []

  startButton.addEventListener('click', startGame)
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })

  function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')
    answerButtonsElement.classList.remove('hide')
    progressContainerElement.classList.remove('hide')
    scoreElement.classList.remove('hide')
    setNextQuestion()
  }

  function setNextQuestion() {
    resetState()
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion(shuffledQuestions[currentQuestionIndex])
      updateProgress()
    } else {
      showResult()
    }
  }

  function showQuestion(question) {
    questionElement.innerText = question.question
    animalImageElement.src = question.image
    animalImageElement.alt = question.imageAlt
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
    })
  }

  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
      score++
      scoreValueElement.textContent = score
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      nextButton.innerText = 'Finish'
      nextButton.classList.remove('hide')
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100
    progressBarElement.style.width = `${progress}%`
    progressTextElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`
  }

  function showResult() {
    questionContainerElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')
    progressContainerElement.classList.add('hide')
    scoreElement.classList.add('hide')
    nextButton.classList.add('hide')

    allScores.push(score)

    const resultContainer = document.createElement('div')
    resultContainer.id = 'result-container'
    resultContainer.innerHTML = `
      <h2>Quiz Completed!</h2>
      <p id="final-score">Your score: ${score} out of ${questions.length}</p>
      <div id="all-scores">
        <h3>All Scores:</h3>
        <ul>
          ${allScores.map((s, index) => `<h1>Attempt ${index + 1}: ${s} out of ${questions.length}</li>`).join('')}
        </h1>
      </div>
      <p>Do you want to try again?</p>
      <button id="try-again-btn" class="btn">Yes, Try Again</button>
      <button id="exit-btn" class="btn">No, Exit</button>
    `
    quizContainer.appendChild(resultContainer)

    document.getElementById('try-again-btn').addEventListener('click', () => {
      quizContainer.removeChild(resultContainer)
      startGame()
    })
    document.getElementById('exit-btn').addEventListener('click', () => {
      document.location = 'ask.html'
    })
  }

  const questions = [
    {
      question: 'What shape is a ball?',
      image: 'ball.png',
      imageAlt: 'Silhouette of a ball',
      answers: [
        { text: 'Square', correct: false },
        { text: 'Triangle', correct: false },
        { text: 'Circle', correct: true },
        { text: 'Rectangle', correct: false }
      ]
    },
    {
      question: 'What shape is a watermelon fruit?',
      image: 'watermelon.png',
      imageAlt: 'Image of a watermelon',
      answers: [
        { text: 'Square', correct: false },
        { text: 'Circle', correct: true },
        { text: 'Rectangle', correct: false },
        { text: 'Triangle', correct: false }
      ]
    },
    {
      question: 'What shape is a slice of pizza?',
      image: 'pizza.png',
      imageAlt: 'Image of a pizza slice',
      answers: [
        { text: 'Triangle', correct: true },
        { text: 'Circle', correct: false },
        { text: 'Square', correct: false },
        { text: 'Rectangle', correct: false }
      ]
    },
    {
      question: 'What shape is a coin?',
      image: 'coin.png',
      imageAlt: 'Image of a coin',
      answers: [
        { text: 'Circle', correct: true },
        { text: 'Square', correct: false },
        { text: 'Triangle', correct: false },
        { text: 'Rectangle', correct: false }
      ]
    },
    {
      question: 'What shape is a door?',
      image: 'door.png',
      imageAlt: 'Image of a door',
      answers: [
        { text: 'Rectangle', correct: true },
        { text: 'Circle', correct: false },
        { text: 'Triangle', correct: false },
        { text: 'Oval', correct: false }
      ]
    },
    {
      question: 'What shape is the sun?',
      image: 'sun.png',
      imageAlt: 'Image of the sun',
      answers: [
        { text: 'Circle', correct: true },
        { text: 'Triangle', correct: false },
        { text: 'Square', correct: false },
        { text: 'Rectangle', correct: false }
      ]
    },
    {
      question: 'What shape is a table top?',
      image: 'table.png',
      imageAlt: 'Image of a table top',
      answers: [
        { text: 'Rectangle', correct: true },
        { text: 'Triangle', correct: false },
        { text: 'Circle', correct: false },
        { text: 'Oval', correct: false }
      ]
    },
    {
      question: 'What shape is a TV screen?',
      image: 'tv.png',
      imageAlt: 'Image of a TV screen',
      answers: [
        { text: 'Rectangle', correct: true },
        { text: 'Circle', correct: false },
        { text: 'Triangle', correct: false },
        { text: 'Oval', correct: false }
      ]
    },
    {
      question: 'What shape is a slice of bread?',
      image: 'bread.png',
      imageAlt: 'Image of a slice of bread',
      answers: [
        { text: 'Square', correct: true },
        { text: 'Circle', correct: false },
        { text: 'Triangle', correct: false },
        { text: 'Rectangle', correct: false }
      ]
    },
    {
      question: 'What shape is a wheel?',
      image: 'wheel.png',
      imageAlt: 'Image of a wheel',
      answers: [
        { text: 'Circle', correct: true },
        { text: 'Triangle', correct: false },
        { text: 'Rectangle', correct: false },
        { text: 'Square', correct: false }
      ]
    }
  ]
})