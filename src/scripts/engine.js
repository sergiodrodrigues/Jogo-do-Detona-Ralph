const state = {

    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesCount: document.getElementById("livesCount"),
    },

    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 61,
        livesLost: 3,
    },

    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

};


function refreshGame(){

    alert("Game Over! O seu resultado foi: " + state.values.result);

    setTimeout(()=>{state.view.livesCount.textContent = "x3";},500);
    setTimeout(()=>{state.view.score.textContent = "0";},500);

    state.values= {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 61,
        livesLost: 3,
    };

}

function countDown(){

    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if(state.values.currentTime <= 0){

        refreshGame()
        
    }
}

function playSound(audioName){

    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();

}

function randomSquare(){
    state.view.squares.forEach((square)=>{

        square.classList.remove("enemy");

    });
    
    let randomNumber = Math.floor(Math.random() * 23);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("click", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");

            }else{
                state.values.livesLost--;
                state.view.livesCount.textContent = "x"+state.values.livesLost;
                if(state.values.livesLost === 0){
                    refreshGame();
                }
            }
        });
    });
}


function init(){

    addListenerHitBox();

}

init();