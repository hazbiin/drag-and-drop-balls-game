const jars = document.querySelectorAll('.jar');
const balls = document.querySelectorAll('.ball');
const ballsContainer = document.querySelector('.balls-container');

let activeBall = null;
let topMostBallInJar = null;

balls.forEach((ball) => {
    ball.addEventListener("click", (e) => {
        e.stopPropagation();
        activeBall = ball;
    });
});

jars.forEach((jar,index) => {
    jar.addEventListener("click", (e) => {

        if(activeBall){
            jar.appendChild(activeBall);
            activeBall.classList.add('disable-click');

            const ballsInJar = jar.querySelectorAll('.ball');
            ballsInJar.forEach( (ballInJar,index) => {
                ballInJar.classList.add('position');
                ballInJar.style.bottom = `${30 * index}px`
            });

            activeBall = null;
        }

        if(!e.target.classList.contains('ball')){
            const ballsInJar = jar.querySelectorAll('.ball');
            topMostBallInJar = ballsInJar[ballsInJar.length - 1];
        }

        if(topMostBallInJar){
            jar.appendChild(topMostBallInJar);
            // if(e.target !== jar){
            //     console.log(topMostBallInJar)
                
            // }
        }
    });
}); 

ballsContainer.addEventListener("click",() => {
    if(topMostBallInJar && !ballsContainer.contains(topMostBallInJar)){
        ballsContainer.appendChild(topMostBallInJar);
        topMostBallInJar.classList.remove('position');
        topMostBallInJar.classList.remove('disable-click');
        topMostBallInJar = null;
    }
});



































// let activeBalls = [];
// let allBallsInSelectedJar = [];

// jars.forEach(jar => {
//     jar.addEventListener("click", (e) => {

//         jar.classList.toggle('selected');
//         insertBalls(jar);
//     });
// });

// balls.forEach(ball => {
//     ball.addEventListener("click", (e) => {
//         e.stopPropagation();
        
//         ball.classList.toggle('selected');
//         activeBalls.push(ball);
//     });
// });

// function insertBalls(jar){
//     // console.log(activeBalls);
//     jar.appendChild(activeBalls[activeBalls.length - 1]);

//     const allBallsInJar = jar.querySelectorAll('.ball');
//     allBallsInSelectedJar = allBallsInJar;
//     console.log(allBallsInSelectedJar);

//     // if(!jar.querySelector('.ball')){
//     //     console.log("here")
//     //     jar.appendChild(activeBalls[activeBalls.length - 1]);
//     // }else{
//     //     console.log("false")
//     //     const allBallsInJar = jar.querySelectorAll('.ball');
//     //     console.log(allBallsInJar)
//     // }

//     const balls = jar.querySelectorAll('.ball');
//     balls.forEach((ball,index) => {
//         ball.classList.add('position');
//         ball.style.bottom = `${30 * index}px`;
//     });
// }

// // function changeBalls(jar){
// //     jar.appendChild(allBallsInSelectedJar[allBallsInSelectedJar.length - 1]);
// // }