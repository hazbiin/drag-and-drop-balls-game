const jarsContainer = document.querySelector('.jars-container');
const ballsContainer = document.querySelector('.balls-container');
const restartBtn = document.getElementById('restart-btn');

const numJars = 3;
const numBalls = 9;

let activeBall = null;
let lastInteractedJar = null;
let jarClickedOnce = false;

for(let i = 0; i < numJars; i++){
    const jar = document.createElement('div');
    jar.classList.add('jar');
    jarsContainer.appendChild(jar);

    jar.addEventListener("click", (e) => {
        const ballsInJar = jar.querySelectorAll('.ball');
        const ballsCount = ballsInJar.length;
        topMostBallInJar = ballsInJar[ballsInJar.length - 1];
        
        if(activeBall){
            if(ballsCount < 4){
                jar.appendChild(activeBall);
                activeBall.classList.add('disable-click');
                activeBall.classList.remove('on-move','was-moved');

                const updatedBallsInJar = jar.querySelectorAll('.ball');
                updatedBallsInJar.forEach( (ballInJar,index) => {
                    ballInJar.style.animationPlayState = 'paused';
                    ballInJar.classList.add('position');
                    if(window.innerWidth >= 768){
                        ballInJar.style.bottom = `${55 * index}px`
    
                    }else {
                        ballInJar.style.bottom = `${45 * index}px`
                    }
                });

                activeBall = null;
                lastInteractedJar = jar;
                jarClickedOnce = true;
            }else {
                window.alert('Oops! this container is full, choose another contianer to insert the ball!');
            }
        }else if(topMostBallInJar){
            
            activeBall = topMostBallInJar;
            activeBall.classList.add('on-move');
            lastInteractedJar = jar;
            jarClickedOnce = true;
        }else {
            lastInteractedJar = jar
            jarClickedOnce = true;
        }
    });
}


for(let i = 1; i <= numBalls; i++){
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = i;
    ballsContainer.appendChild(ball);

    ball.addEventListener("click", (e) => {
        e.stopPropagation();
        if(!activeBall && !ball.classList.contains('disable-click')){
            activeBall = ball;
            activeBall.classList.add('on-move');
        }
    });
}

ballsContainer.addEventListener("click",() => {
    if(lastInteractedJar && jarClickedOnce){
        const ballsInLastClickedJar = lastInteractedJar.querySelectorAll('.ball');
        let topMostBallInLastClickedJar = ballsInLastClickedJar[ballsInLastClickedJar.length - 1];

        if(topMostBallInLastClickedJar && !ballsContainer.contains(topMostBallInLastClickedJar)){
            ballsContainer.appendChild(topMostBallInLastClickedJar);
            topMostBallInLastClickedJar.classList.remove('position','disable-click','on-move');
            topMostBallInLastClickedJar.classList.add('was-moved');

            const remainingBallsInJar = lastInteractedJar.querySelectorAll('.ball');
            remainingBallsInJar.forEach((remainingBall, index) =>{
                if(window.innerWidth >= 768){
                    remainingBall.style.bottom = `${55 * index}px`;

                }else {
                    remainingBall.style.bottom = `${45 * index}px`;
                }
            });

            activeBall = null;
            jarClickedOnce = false;
            topMostBallInLastClickedJar = null;
        }
    }
});

restartBtn.addEventListener("click", () => {
    activeBall = null;
    lastInteractedJar = null;
    jarClickedOnce = false;

    jarsContainer.querySelectorAll('.jar').forEach((jar) => {
        const ballInJar = jar.querySelectorAll('.ball');
        ballInJar.forEach((ball) => {
            ball.remove();
        });
    });

    ballsContainer.innerHTML = '';

    for(let i = 1; i <= numBalls; i++){
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = i;
        ballsContainer.appendChild(ball);

        ball.addEventListener("click", (e) => {
            e.stopPropagation();
            if(!activeBall && !ball.classList.contains('disable-click')){
                activeBall = ball;
                activeBall.classList.add('move-on');
            }
        });
    }
});