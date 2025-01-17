const jars = document.querySelectorAll('.jar');
const balls = document.querySelectorAll('.ball');
let activeBalls = [];
let allBallsInSelectedJar = [];

jars.forEach(jar => {
    jar.addEventListener("click", (e) => {

        jar.classList.toggle('selected');
        insertBalls(jar);
    });
});

balls.forEach(ball => {
    ball.addEventListener("click", () => {
        ball.classList.toggle('selected');
        activeBalls.push(ball);
    });
});

function insertBalls(jar){
    // console.log(activeBalls);
    jar.appendChild(activeBalls[activeBalls.length - 1]);

    const allBallsInJar = jar.querySelectorAll('.ball');
    allBallsInSelectedJar = allBallsInJar;
    console.log(allBallsInSelectedJar);

    // if(!jar.querySelector('.ball')){
    //     console.log("here")
    //     jar.appendChild(activeBalls[activeBalls.length - 1]);
    // }else{
    //     console.log("false")
    //     const allBallsInJar = jar.querySelectorAll('.ball');
    //     console.log(allBallsInJar)
    // }

    const balls = jar.querySelectorAll('.ball');
    balls.forEach((ball,index) => {
        ball.classList.add('position');
        ball.style.bottom = `${30 * index}px`;
    });
}

// function changeBalls(jar){
//     jar.appendChild(allBallsInSelectedJar[allBallsInSelectedJar.length - 1]);
// }