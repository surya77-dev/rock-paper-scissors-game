let score =  JSON.parse(localStorage.getItem
    ('score')) || {
     wins: 0,
     losses: 0,
     ties: 0
    };
    
    let isAutoplaying = false;
    let intervalId;
    if(!isAutoplaying){
      function AutoPlay() {
        intervalId = setInterval(function() {
          const playerMove = pickComputerMove();
          scoreIndicator();
          playerGame(playerMove);
        }, 2000);

        isAutoplaying = true;
      }
    } else {
      clearInterval(intervalId);
      isAutoplaying = false;
      scoreIndicator();
    }

    document.querySelector('.js-rock-button')
      .addEventListener('click', () => {
        playerGame('Rock')
      });
    
    document.querySelector('.js-paper-button')
      .addEventListener('click', () => {
        playerGame('Paper')
      });

    document.querySelector('.js-scissors-button')
      .addEventListener('click', () => {
        playerGame('Scissors')
      });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playerGame('Rock')
      } else if (event.key === 'p') {
        playerGame('Paper')
      } else if (event.key === 's') {
        playerGame('Scissors')
      }
    })  
  


    
    scoreIndicator();

    let computerMove = '';
    function pickComputerMove() {
         const random = Math.floor((Math.random()*3)+1)

         if (random >= 0 && random == 1) {
         computerMove = 'Rock';

         } else if(random == 2 && random < 3){
         computerMove= 'Paper';
         } else{
         computerMove='scissors';
         }

         console.log(computerMove);
       } 

       
       function scoreIndicator() {
             document.querySelector('.js-score')
               .innerHTML =`wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`;
             }

       let result = '';
       function playerGame(playerMove) {
         pickComputerMove();
         
           if(playerMove === 'Paper'){
             if(computerMove === 'Rock'){
           result = 'You win';
           } else if(computerMove === 'Paper'){
           result = 'Tie';
           } else{
           result = 'You lose';
           }                  
         }
         else if(playerMove === 'Rock'){
           pickComputerMove();

               if(computerMove === 'Rock'){
               result = 'Tie';
               } else if(computerMove === 'Paper'){
               result = 'You lose';
               } else{
               result = 'You win';
               }
                        
             }
         else if(playerMove === 'Scissors'){
           pickComputerMove();       
                 if(computerMove === 'Rock'){
                 result = 'You lose';
                 } else if(computerMove === 'Paper'){
                 result = 'You win';
                 } else{
                 result = 'Tie';
                }
                           
             }  
             if(result === 'You win'){
                       score.wins += 1;
             } else if(result === 'You lose'){
                       score.losses += 1;
             } else if (result === "Tie"){
                       score.ties +=1;
             } 

             localStorage.setItem('score', JSON.stringify(score));
             
             scoreIndicator();
             
             document.querySelector('.js-result')
               .innerHTML = result;

             document.querySelector('.js-moves')
               .innerHTML = `You
                             <img src="images/${playerMove}-emoji.png"
                             class="move-icon">
                             <img src="images/${computerMove}-emoji.png"
                             class="move-icon">
                             Computer`                             
}