const startBtn = document.getElementById('start-btn');
const screens = document.querySelectorAll('.screen');
const jars = document.querySelectorAll('.jar');
const balls = document.querySelectorAll('.ball');
const ballsContainer = document.querySelector('.balls-container');

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
        topMostBallInJar = ballsInJar[ballsInJar.length - 1];

        if(activeBall){
            jar.appendChild(activeBall);
            activeBall.classList.add('disable-click');

            const ballsInJar = jar.querySelectorAll('.ball');
            ballsInJar.forEach( (ballInJar,index) => {
                ballInJar.classList.add('position');
                ballInJar.style.bottom = `${30 * index}px`
            });

            activeBall = null;
            lastInteractedJar = jar;
        }else if(topMostBallInJar){

            activeBall = topMostBallInJar;
            lastInteractedJar = jar;
        }
    });
}); 
ballsContainer.addEventListener("click",() => {

    if(lastInteractedJar){
        const ballsInLastClickedJar = lastInteractedJar.querySelectorAll('.ball');
        const topMostBallInLastClickedJar = ballsInLastClickedJar[ballsInLastClickedJar.length - 1];

        if(topMostBallInLastClickedJar && !ballsContainer.contains(topMostBallInLastClickedJar)){
            ballsContainer.appendChild(topMostBallInLastClickedJar);
            topMostBallInLastClickedJar.classList.remove('position');
            topMostBallInLastClickedJar.classList.remove('disable-click');

            const remainingBallsInJar = lastInteractedJar.querySelectorAll('.ball');
            remainingBallsInJar.forEach((remainingBall, index) =>{
                remainingBall.style.bottom = `${30 * index}px`;
            });

            activeBall = null;
        }
    }
});