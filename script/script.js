document.addEventListener('DOMContentLoaded', function() {
  const btnOpenMpadl = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const modalWrap = document.querySelector('.modal');
  const sendButton = document.querySelector('#send');
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
    const finalAnswers = [];


    let numberQuestion = 0;
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('anseers-item', 'd-flex', 'justify-content-center');
        answerItem.innerHTML = `
        <div class="answers-item d-flex flex-column">
        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
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

      if(numberQuestion >=0 && numberQuestion <= questions.length-1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);

        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      }

      if(numberQuestion === 0) {
        prevButton.classList.add('d-none');
        sendButton.classList.add('d-none');
      }

      if(numberQuestion === questions.length - 1) {
        nextButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
        console.log('check1');
      }

      if(numberQuestion === questions.length) {
        console.log('check2');
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');
        formAnswers.innerHTML = `
          <div class="form-group">
            <label for="numberPhone">Enter phone</label>
            <input type="phone" class="form-control" id="numberPhone">
          </div>
        `;
      }

      if(numberQuestion === questions.length + 1) {
        console.log('check3');
        formAnswers.textContent == "Спасибо!";
        setTimeout(()=>{
          modalBlock.classList.remove('d-block');
        }, 3000);
      }
    };
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
      inputs.forEach((input, index)=>{
        if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if(numberQuestion === questions.length) {
          obj['Phone'] = input.value;
        }
      });
      finalAnswers.push(obj);
      console.log(finalAnswers);
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    }
  };
});