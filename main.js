const questions = [
  {
    question: 'Какой язык работает в браузере?',
    answers: ['Java', 'C', 'Python', 'JavaScript'],
    correct: 4,
  },
  {
    question: 'Что означает CSS?',
    answers: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    correct: 2,
  },
  {
    question: 'Что означает HTML?',
    answers: [
      'Hypertext Markup Language',
      'Hypertext Markdown Language',
      'Hyperloop Machine Language',
      'Helicopters Terminals Motorboats Lamborginis',
    ],
    correct: 1,
  },
  {
    question: 'В каком году был создан JavaScript?',
    answers: ['1996', '1995', '1994', 'все ответы неверные'],
    correct: 2,
  },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const btnSubmit = document.querySelector('#submit');

let questionsIndex = 0;
let score = 0;

clearPage();
showQuestion();
btnSubmit.onclick = checkAnswers;

function clearPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    '%title%',
    questions[questionsIndex]['question']
  );
  headerContainer.innerHTML = title;

  let answerNumber = 1;
  for (let answerText of questions[questionsIndex]['answers']) {
    const answerTempalate = `<li>
          <label>
            <input value="%number%" type="radio" class="answer" name="answer" />
            <span>%answers%</span>
          </label>
        </li>`;
    const answersHtml = answerTempalate
      .replace('%answers%', answerText)
      .replace('%number%', answerNumber);

    listContainer.innerHTML += answersHtml;
    answerNumber++;
  }
}

function checkAnswers() {
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
  if (!checkRadio) {
    btnSubmit.blur();
    return;
  }

  const userAnswer = +checkRadio.value;
  if (userAnswer === questions[questionsIndex]['correct']) {
    score++;
  }

  if (questionsIndex !== questions.length - 1) {
    questionsIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultTemplate = ` <h2 class="title">%title%</h2>
          <h3 class="summary">%message%</h3>
          <p class="result">%result%</p>`;

  let title, message;

  if (score === questions.length) {
    title = 'Поздравляем!👏';
    message = 'Вы ответили на все вопросы верно! 😎👍';
  } else if ((score * 100) / questions.length >= 50) {
    title = 'Неплохой результат! 😉';
    message = 'Вы дали более половины правильных ответов 👍';
  } else {
    title = 'Стоит постараться 😕';
    message = 'Пока у вас меньше половины правельных ответов';
  }

  let result = `${score} из ${questions.length}`;

  const finalMessage = resultTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%result%', result);

  headerContainer.innerHTML = finalMessage;

  btnSubmit.blur();
  btnSubmit.innerHTML = 'Начать снова';
  btnSubmit.onclick = () => history.go();
}
