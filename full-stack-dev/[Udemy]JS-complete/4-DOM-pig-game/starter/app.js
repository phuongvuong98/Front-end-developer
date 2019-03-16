/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, playGame, diceScores;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (playGame === true){
        // Create dice random
        var dice0 = Math.floor(Math.random() * 6 + 1);
        var dice1 = Math.floor(Math.random() * 6 + 1);
        
        diceScores = dice0 + dice1;

        // Condition for dice to turn round
        if (!(dice0 === 1 || dice1 === 1)) {
            roundScore += diceScores;

            document.querySelector('#dice-0').style.display = 'block';
            document.querySelector('#dice-1').style.display = 'block';
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

            document.querySelector('#dice-0').src = "dice-" + dice0 + ".png";
            document.querySelector('#dice-1').src = "dice-" + dice1 + ".png";
        }
        else {
            switchTurn();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (playGame === true){
        // Update score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check final game
        var limitedScore = document.querySelector("#limited-score").value;
        console.log(limitedScore);
        if (scores[activePlayer] >= limitedScore) {
            // Update UI
            var nameDOM = document.querySelector('#name-' + activePlayer);
            nameDOM.textContent = 'WINNER!';
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector('#dice-0').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';

            // Lock for all when end game
            playGame = false;
        } else {
            switchTurn();
        }
    }
})

function switchTurn() {
    // Update UI
    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#current-' + activePlayer).textContent = 0;

    // Switch round
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // toggle: set class true if it have false
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

function initGame(){
    playGame = true; 
    diceScores = 0;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;


    document.querySelector("#name-0").textContent = 'Player 1';    
    document.querySelector("#name-1").textContent = 'Player 2';    
    document.querySelector(".player-0-panel").classList.remove("winner");    
    document.querySelector(".player-1-panel").classList.remove("winner");   

    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

}

document.querySelector('.btn-new').addEventListener('click', initGame);


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/