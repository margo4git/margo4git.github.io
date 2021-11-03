const startBtn = document.querySelector(".start");
const board = document.querySelector(".screen");
const answearList = document.querySelector(".answear-list");
let color = 0;
let userPoints = 0;
const gradientColor = [
  "gradient-primary",
  "gradient-secondary",
  "gradient-tertiary",
];
const questions = [
  {
    id: "1f",
    question: "Как зовут родителей Невилла Долгопупса?",
    answers: [
      { id: "a1", answer: "Фрэнк и Алиса.", correct: true, points: 3 },
      { id: "a2", answer: "Артур и Молли", correct: false, points: 2 },
      { id: "a3", answer: "Арчибальд и Агнес", correct: false, points: 1 },
    ],
  },
  {
    id: "2f",
    question:
      "Кто из этих персонажей не присутствовал на первом собрании клуба Слизнорта?",
    answers: [
      { id: "a1", answer: "Перси Уизли", correct: true, points: 3 },
      { id: "a2", answer: "Невилл Долгопупс", correct: false, points: 2 },
      { id: "a3", answer: "Блейз Забини", correct: false, points: 1 },
    ],
  },
  {
    id: "3f",
    question: "Какой из этих ингредиентов не входит в состав оборотного зелья?",
    answers: [
      { id: "a1", answer: "Настойка полыни", correct: true, points: 3 },
      { id: "a2", answer: "Шкура бумсланга", correct: false, points: 2 },
      {
        id: "a3",
        answer: "Частица того, в которого вы хотите превратиться",
        correct: false,
        points: 1,
      },
    ],
  },
  {
    id: "4f",
    question: "Сколько сиклей в галлеоне?",
    answers: [
      { id: "a1", answer: "17", correct: true, points: 3 },
      { id: "a2", answer: "12", correct: false, points: 2 },
      { id: "a3", answer: "21", correct: false, points: 1 },
    ],
  },
  {
    id: "5f",
    question: "Какой запах не чувствовала Гермиона, вдыхая аромат амортенции?",
    answers: [
      {
        id: "a1",
        answer: "Запах мятной зубной пасты",
        correct: true,
        points: 3,
      },
      { id: "a2", answer: "Запах волос Рона", correct: false, points: 2 },
      { id: "a3", answer: "Запах скошенной травы", correct: false, points: 1 },
      { id: "a4", answer: "Запах пергамента", correct: false, points: 0 },
    ],
  },
];
let copyArray = [...questions];
const randomQuestion = () => {
  if (copyArray.length === 0) {
    copyArray = [...questions];
  }
  let randomId = Math.floor(Math.random() * copyArray.length);
  return copyArray.splice(randomId, 1)[0];
};
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
const gradientColorAdd = (id) => {
  if (color < gradientColor.length) {
    document.getElementById(id).classList.add(gradientColor[color]);
    color++;
  } else {
    color = 0;
    gradientColorAdd(id);
  }
};
const show = (result) => {
  board.innerHTML = `<p>${result.question}</p>`;
  let copyAnswers = [...result.answers];
  shuffle(copyAnswers);
  answearList.innerHTML = "";
  copyAnswers.forEach((answer, index) => {
    let liLast = document.createElement("button");
    liLast.innerHTML = `${answer.answer}`;
    answearList.append(liLast);
    liLast.classList.add("answear");
    liLast.id = answer.id;
    gradientColorAdd(answer.id);
    liLast.onclick = () => {
      // document.querySelector(
      //   ".result"
      // ).innerHTML = `Correct: ${answer.correct}`;
      userPoints += answer.points;
      console.log(userPoints);
      if (!finalResult(copyArray)) {
        result = randomQuestion();
        show(result);
      }
    };
  });
};
const finalResult = (copyArray) => {
  if (copyArray.length === 0) {
    startBtn.innerHTML = "RESTART";
    board.innerHTML = `<p>YOUR SCORE: ${userPoints}</p>`;
    answearList.innerHTML = "";
    userPoints = 0;
    return true;
  }
};
const result = randomQuestion();
show(result);
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  startBtn.innerHTML = "SKIP";
  const result = randomQuestion();
  show(result);
  finalResult(copyArray);
});
