const startBtn=document.querySelector('.start-btn');
const popupInfo=document.querySelector('.popup-info');
const exitBtn=document.querySelector('.exit-btn');
const main=document.querySelector('.main');
const continueBtn=document.querySelector('.continue-btn');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');

const goHomeBtn=document.querySelector('.goHome-btn');

const wrapper=document.querySelector('.wrapper');
const registerLink=document.querySelector('.register-link');
const loginLink=document.querySelector('.login-link');
const btnPopup=document.querySelector('.btnLogin-popup');
const iconClose=document.querySelector('.icon-close');

registerLink.onclick = () =>{
  wrapper.classList.add('active');
}
loginLink.onclick = () =>{
    wrapper.classList.remove('active');
  }

btnPopup.onclick = () =>{
    wrapper.classList.add('active-popup');
  }

  iconClose.onclick = () =>{
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
  }
startBtn.onclick=()=>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick=()=>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick=()=>{
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}



goHomeBtn.onclick=()=>{
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount=0;
    questionNmb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNmb);

   
}

let questionCount=0;
let questionNmb=1;
let userScore=0;
const nextBtn=document.querySelector('.next-btn');

nextBtn.onclick=()=>{
    if (questionCount<questions.length-1){
        questionCount++;
        showQuestions(questionCount);

        questionNmb++;
        questionCounter(questionNmb);

        nextBtn.classList.remove('active');

    }
    else{
        
        showResultBox();
    }
}

const optionList=document.querySelector('.option-list');


function showQuestions(index){
    const questionText=document.querySelector('.question-text');
    questionText.textContent=`${questions[index].numb}.${questions[index].question}`;

    let optionTag= `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML=optionTag;

    const option=document.querySelectorAll('.option');
    for (let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer=answer.textContent;
    let correctAnswer=questions[questionCount].answer;
    let allOptions=optionList.children.length;

    if(userAnswer==correctAnswer){
        
        answer.classList.add('Correct');
        userScore+=1;
        headerScore();
    }
    else{
        
        answer.classList.add('Incorrect');

        
    }

    for (let i=0;i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

}

function questionCounter(index){
    const questionTotal=document.querySelector('.question-total');
    questionTotal.textContent=`${index} of ${questions.length}Questions`;
}

function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${userScore}/${questions.length}`;
}

function showResultBox(){
    const quizBoxes = document.querySelector('.quiz-box');
    quizBoxes.style.display = 'none';
    resultBox.classList.add('active');

    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress=document.querySelector('.circular-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userScore/questions.length)*100;
    let speed=20;

    let progress=setInterval(() =>{
        progressStartValue++;
        //console.log(progressStartValue);
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    },speed);



}