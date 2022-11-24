const speed = 2000;
const appearance = 800;
const holes = document.querySelectorAll('main article');
let currentHole = null;
let molesWhacked = 0;
let currentTime = 60;
let hits = 0;

// Append listener

holes.forEach(hole => {
    hole.addEventListener('click', (e) => {
        let whackedHole = hole.getAttribute('data-id');
        if(parseInt(whackedHole) === currentHole) {
            // Hit!
           // +1 on score
            molesWhacked++

            // Update whacked moles gui
            document.querySelector('.moleswhacked b').innerHTML = molesWhacked;

            // add class to show hit
            document.querySelector(`[data-id="${whackedHole}"]`).classList.add('hit');
            setTimeout(() => {
                document.querySelector(`[data-id="${whackedHole}"]`).classList.remove('hit');
            }, appearance);
        }
    })
});

let gameLoop = setInterval(() => {
    // Empty holes
    holes.forEach(hole => hole.classList.remove('mole'));

    // Pick random hole to pop up
    let randomId = Math.floor(Math.random() * holes.length);
    
    // register as current Hole
    currentHole = randomId;

    let el = document.querySelector(`[data-id="${randomId}"]`);
    el.classList.add('mole');

    // Just make the apperance short
    setTimeout(() => {

        holes.forEach(hole => hole.classList.remove('mole'));
        currentHole = null

    }, appearance)
}, speed);

let timer = setInterval(() => {
     // Check if time left
     if(currentTime >= 0) {

        // Update timer in gui
        document.querySelector('.timeleft b').innerHTML = `${currentTime}s`;

        // count down current time
        currentTime--;

    } else {
        // Game over
        clearInterval(timer)
        clearInterval(gameLoop)

        alert(`You whacked ${molesWhacked} moles in 60 sec.`)
    }
}, 1000);