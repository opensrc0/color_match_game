let config = {};
let globalV = {};

config.timerStart = 10;
config.color = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'darkBlue'];

globalV.topRandomColor = '';
globalV.bottomRandomColor = '';
globalV.totalScore = 0;
globalV.isPlayingGame = false;

startTimer = () => {
    let i = config.timerStart;
    let clearTimer = setInterval(() => {
        i--;
        document.querySelector('#timer').innerHTML = i;
        document.querySelector('#progressBar').value = config.timerStart - i;
        if (i <= 0) {
            globalV.isPlayingGame = false;
            displayGameOver();
            clearInterval(clearTimer);
        }
        if (getHeightestScore() < globalV.totalScore) setHeightestScore();
    }, 1000);
}

getRandomColor = () => {
    let colorIndex = Math.floor(Math.random() * config.color.length);
    return config.color[colorIndex];
}

getHeightestScore = () => {
    return localStorage.getItem('highestScore') || 0;
}

setHeightestScore = () => {
    localStorage.setItem('highestScore', globalV.totalScore);
}

incrementScore = () => {
    globalV.totalScore = globalV.totalScore + 2;
}

decrementScore = () => {
    globalV.totalScore = globalV.totalScore - 1;
}

cardMatched = () => {
    if (globalV.topRandomColor === globalV.bottomRandomColor) {
        incrementScore();
    } else {
        decrementScore();
    }
    displayScore();
    displayTopBottomCardColor();
}

cardNotMatched = () => {
    if(globalV.topRandomColor === globalV.bottomRandomColor) {
        decrementScore();
    } else {
        incrementScore();
    }
    displayScore();
    displayTopBottomCardColor();
}

// Ui Display Functions start here
displayTopBottomCardColor = () => {
    globalV.topRandomColor = getRandomColor();
    globalV.bottomRandomColor = getRandomColor();
    document.querySelector('#topCard').innerHTML = globalV.topRandomColor;
    document.querySelector('#bottomCard').innerHTML = globalV.bottomRandomColor;
}

displayHighestScore = () => {
    document.querySelector('#highestScore').innerHTML = getHeightestScore();
}

displayScore = () => {
    document.querySelector('#score').innerHTML = globalV.totalScore;
}

displayTimer = () => {
    document.querySelector('#timer').innerHTML = config.timerStart;
}

displayProgressBar = () => {
    document.querySelector('#progressBar').setAttribute('max', config.timerStart);
}

displayGameSectionOnly = () => {
    document.querySelector('#userInfo').classList.add('hide');
    document.querySelector('#gameStart').classList.remove('hide');
}

displayGameOver = () => {
    document.querySelector('#userInfo').classList.add('hide');
    document.querySelector('#gameStart').classList.add('hide');
    document.querySelector('#gameOver').classList.remove('hide');
}
// Ui display functions ends here

document.querySelector('#matched').addEventListener('click', () => {
    cardMatched();
});

document.querySelector('#notMatched').addEventListener('click', () => {
    cardNotMatched();
});

document.querySelector('#startAgain').addEventListener("click", () => {
    document.location.reload(true);
});

document.addEventListener('keydown', (event) => {
    if(globalV.isPlayingGame) {
        let event = window.event ? window.event : e;
        if (event.keyCode === 37) {
            cardNotMatched();
        }

        if(event.keyCode === 39) {
            cardMatched();
        }
    }
})

document.querySelector('#startGame').addEventListener("click", () => {
    globalV.isPlayingGame = true;
    displayGameSectionOnly();
    displayTimer();
    displayProgressBar();
    displayScore();
    displayHighestScore();
    displayTopBottomCardColor();
    startTimer();
});