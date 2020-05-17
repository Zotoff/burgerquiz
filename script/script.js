document.addEventListener('DOMContentLoaded', function() {
  const btnOpenMpadl = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const modalWrap = document.querySelector('.modal');

  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  const burgerBtn = document.querySelector('#burger');
  burgerBtn.style.display = 'none';

  let clientWidth = document.documentElement.clientWidth;

  let burgerName = 'Стандарт';
  let answerImageSrc = './image/burger.png';

  const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];


  if(clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }


  window.addEventListener('resize', ()=>{
    cliendWidth = document.documentElement.clientWidth;
    if(clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', ()=>{
    burgerBtn.classList.remove('active');
    modalBlock.classList.add('d-block');
    playTest();
  });

  btnOpenMpadl.addEventListener('click', ()=>{
    modalBlock.classList.add('d-block');
    playTest();
  });
  closeModal.addEventListener('click', ()=>{
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', function(event) {
    if(!event.target.closest('.modal-dialog') && !event.target.closest('.openModalButton') && !event.target.closest('.burger')) {
      modalBlock.classList.remove('d-block');
    }
  });

  const playTest = ()=>{
    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('anseers-item', 'd-flex', 'flex-column');
        answerItem.innerHTML = `
        <div class="answers-item d-flex flex-column">
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${answer.url}" alt="burger">
          <span class="burgerName">${answer.title}</span>
        </label>
        </div>
        `;
        formAnswers.appendChild(answerItem);
      });
    };
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = ''; // remove all questions when modal renders
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    };
    renderQuestions(numberQuestion);

    nextButton.onclick = () => {
      numberQuestion++;
      if(numberQuestions === (questions.length - 1)) {
        nextButton.classList.add('d-none');
      } else {
        nextButton.classList.remove('d-none');
      }
      renderQuestions(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      if(numberQuestion === 0) {
        prevButton.classList.add('d-none');
      } else {
        prevButton.classList.remove('d-none');
      }
      renderQuestions(numberQuestion);
    };
  };
});