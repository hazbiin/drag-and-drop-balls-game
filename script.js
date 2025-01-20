const startBtn = document.getElementById('start-btn');
const screens = document.querySelectorAll('.screen');
const jars = document.querySelectorAll('.jar');
const balls = document.querySelectorAll('.ball');
const ballsContainer = document.querySelector('.balls-container');

const restartBtn = document.getElementById('restart-btn');


let activeBall = null;
let lastInteractedJar = null;

// startBtn.addEventListener("click", () => {
//     screens[0].classList.add('up');
// });

balls.forEach((ball) => {
    ball.addEventListener("click", (e) => {
        e.stopPropagation();
        if(!activeBall && !ball.classList.contains('disable-click')){
            activeBall = ball;
        }
    });
});
jars.forEach((jar) => {
    jar.addEventListener("click", (e) => {
        const ballsInJar = jar.querySelectorAll('.ball');
        const ballsCount = ballsInJar.length;
        topMostBallInJar = ballsInJar[ballsInJar.length - 1];
        
        if(activeBall){
            if(ballsCount < 4){
                jar.appendChild(activeBall);
                activeBall.classList.add('disable-click');

                const ballsInJar = jar.querySelectorAll('.ball');
                ballsInJar.forEach( (ballInJar,index) => {
                    ballInJar.classList.add('position');
                    if(window.innerWidth >= 768){
                        ballInJar.style.bottom = `${50 * index}px`
    
                    }else {
                        ballInJar.style.bottom = `${40 * index}px`
                    }
                    
                });

                activeBall = null;
                lastInteractedJar = jar;
            }else {
                window.alert('the jar is full, choose another jar to insert the ball');
            }
        }else if(topMostBallInJar){

            activeBall = topMostBallInJar;
            lastInteractedJar = jar;
        }else {
            lastInteractedJar = jar
        }
    });
}); 
ballsContainer.addEventListener("click",() => {

    if(lastInteractedJar){
        console.log(lastInteractedJar)
        const ballsInLastClickedJar = lastInteractedJar.querySelectorAll('.ball');
        const topMostBallInLastClickedJar = ballsInLastClickedJar[ballsInLastClickedJar.length - 1];
        console.log(topMostBallInLastClickedJar)

        if(topMostBallInLastClickedJar && !ballsContainer.contains(topMostBallInLastClickedJar)){
            ballsContainer.appendChild(topMostBallInLastClickedJar);
            topMostBallInLastClickedJar.classList.remove('position');
            topMostBallInLastClickedJar.classList.remove('disable-click');

            const remainingBallsInJar = lastInteractedJar.querySelectorAll('.ball');
            remainingBallsInJar.forEach((remainingBall, index) =>{
                if(window.innerWidth >= 768){
                    remainingBall.style.bottom = `${50 * index}px`;

                }else {
                    remainingBall.style.bottom = `${40 * index}px`;
                }
               
            });

            activeBall = null;
        }
    }
});

restartBtn.addEventListener("click", () => {
    activeBall = null;
    lastInteractedJar = null;

    jars.forEach((jar) => {
        const ballsInJar = jar.querySelectorAll('.ball');
        ballsInJar.forEach((ball) => {
            ballsContainer.appendChild(ball);

            ball.classList.remove('position', 'disable-click');
            ball.style.bottom = '';
        });
    })
});