// alert("js is loaded")

//IIFE Immediately Invoked Function Expression
(function () {

//================ IPO Approach below - Input Process Output ============ //    
    // Constant Data - data that doesnt change

    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const LOOKUP = {
        '1': 'X',
        '-1': 'O',
        'null': ''
    };

    // Variables (application state)- data that changes
    let turn, winner, gameboard;


    // Cached element references- elements from html that we are selecting
    const messageEl = document.querySelector('h2');
    const gameboardEl = document.getElementById('gameboard');
    const squareEls = document.querySelectorAll('.square');
    const buttonEl = document.querySelector('button');


    // Event listeners
    gameboardEl.addEventListener('click', handleClick);
    buttonEl.addEventListener('click', init);


    // Functions
    //start the game upon initial load and whenever the reset button is clicked
    init();

    function init() {
        //pick and set turn
        turn = 1; // X will go first
        //set winner to false
        winner = false;
        //set up the in-memory gameboard to empty
        // gameboard = [null, null, null, null, null, null, null, null, null];
        gameboard = new Array(9).fill(null); //this is the same as line above
        //visualize a new game to the DOM
        render();
    };

    function checkWinner() {
        //needs to loop over the combos array and check each collection of combination values against corresponding values inside gameboard array
        for (let i = 0; i < COMBOS.length; i++) {
            if (Math.abs(gameboard[COMBOS[i][0]] +
                    gameboard[COMBOS[i][1]] +
                    gameboard[COMBOS[i][2]]) === 3) {
                return gameboard[COMBOS[i][0]];
            }
        }
        if (gameboard.includes(null)) return false;
        return "Tie";
    }

    //.dataset is referring to the data identifyer in the html- so when you click on a box, it will consolelog the index number of the box you clicked

    function handleClick(event) {
        // console.log(event.target.dataset.index)
        const position = event.target.dataset.index;
        if (winner || gameboard[position] !== null) return; //this stops ability to change x/o 
        gameboard[position] = turn;
        turn *= -1;
        winner = checkWinner();
        render();
        // console.log(gameboard)
    };

    function render() {
        //transfer the state of the game to the DOM
        squareEls.forEach(function (square, position) {
            square.textContent = LOOKUP[gameboard[position]];
        });
        if (!winner) {
            messageEl.textContent = `player ${LOOKUP[turn]}'s turn`
        } else if (winner === 'Tie') {
            messageEl.textContent = `Tie Game`
        } else {
            messageEl.textContent = `Player ${LOOKUP[winner]} Wins`
        }
    };

})()