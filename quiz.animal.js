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
  const resultContainerElement = document.getElementById('result-container')
  const finalScoreElement = document.getElementById('final-score')
  const allScoresElement = document.getElementById('all-scores')
  const tryAgainButton = document.getElementById('try-again-btn')
  const exitButton = document.getElementById('exit-btn')

  let shuffledQuestions, currentQuestionIndex, score
  let allScores = []

  startButton.addEventListener('click', startGame)
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
  })
  tryAgainButton.addEventListener('click', startGame)
  exitButton.addEventListener('click', () => {
    document.location = 'ask.html'
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
    resultContainerElement.classList.add('hide')
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
      showResult()
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
    resultContainerElement.classList.remove('hide')
    
    allScores.push(score)
    finalScoreElement.textContent = `Your score: ${score} out of ${questions.length}`
    
    let allScoresHTML = '<h3>All Scores:</h3><ul>'
    allScores.forEach((s, index) => {
      allScoresHTML += `<h1>Attempt ${index + 1}: ${s} out of ${questions.length}</li>`
    })
    allScoresHTML += '</h1>'
    allScoresElement.innerHTML = allScoresHTML
  }

  const questions = [
    {
      question: 'What animal is this?',
      image: 'elephant.png',
      imageAlt: 'Silhouette of an elephant',
      answers: [
        { text: 'Elephant', correct: true },
        { text: 'Lion', correct: false },
        { text: 'Giraffe', correct: false },
        { text: 'Monkey', correct: false }
      ]
    },
    {
      question: 'What sound does a cat make?',
      image: 'cat.png',
      imageAlt: 'Cartoon image of a cat',
      answers: [
        { text: 'Woof', correct: false },
        { text: 'Meow', correct: true },
        { text: 'Moo', correct: false },
        { text: 'Quack', correct: false }
      ]
    },
    {
      question: 'Which animal lives in water?',
      image: 'fish.png',
      imageAlt: 'Underwater scene with various animals',
      answers: [
        { text: 'Dog', correct: false },
        { text: 'Cat', correct: false },
        { text: 'Fish', correct: true },
        { text: 'Bird', correct: false }
      ]
    },
    {
      question: 'Which animal has a long neck?',
      image: 'giraffle.png',
      imageAlt: 'Silhouette of a giraffe',
      answers: [
        { text: 'Elephant', correct: false },
        { text: 'Giraffe', correct: true },
        { text: 'Lion', correct: false },
        { text: 'Zebra', correct: false }
      ]
    },
    {
      question: 'What color is a polar bear?',
      image: 'bear.png',
      imageAlt: 'Cartoon image of a polar bear',
      answers: [
        { text: 'Brown', correct: false },
        { text: 'Black', correct: false },
        { text: 'White', correct: true },
        { text: 'Gray', correct: false }
      ]
    },
    {
      question: 'Which animal can fly?',
      image: 'bird.png',
      imageAlt: 'Silhouette of various animals including a bird',
      answers: [
        { text: 'Fish', correct: false },
        { text: 'Dog', correct: false },
        { text: 'Bird', correct: true },
        { text: 'Cat', correct: false }
      ]
    },
    {
      question: 'What animal has a trunk?',
      image: 'elephant.png',
      imageAlt: 'Close-up of an elephant\'s trunk',
      answers: [
        { text: 'Lion', correct: false },
        { text: 'Elephant', correct: true },
        { text: 'Giraffe', correct: false },
        { text: 'Hippo', correct: false }
      ]
    },
    {
      question: 'Which animal has stripes?',
      image: 'zebra.png',
      imageAlt: 'Close-up of zebra stripes',
      answers: [
        { text: 'Elephant', correct: false },
        { text: 'Lion', correct: false },
        { text: 'Zebra', correct: true },
        { text: 'Giraffe', correct: false }
      ]
    },
    {
      question: 'What animal says "moo"?',
      image: 'cow.png',
      imageAlt: 'Cartoon image of a cow',
      answers: [
        { text: 'Pig', correct: false },
        { text: 'Sheep', correct: false },
        { text: 'Horse', correct: false },
        { text: 'Cow', correct: true }
      ]
    },
    {
      question: 'Which animal has a shell?',
      image: 'turtle.png',
      imageAlt: 'Silhouette of a turtle',
      answers: [
        { text: 'Fish', correct: false },
        { text: 'Turtle', correct: true },
        { text: 'Bird', correct: false },
        { text: 'Rabbit', correct: false }
      ]
    }
  ]
})