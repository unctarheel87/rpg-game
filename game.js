//character data
const characters = [
{
  name: 'Mario',
  healthPoints: 220,
  attackPower: 6,
  counterAttackPower: 12,
  wasBeaten: false
},
{
  name: 'Donkey Kong',
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 18,
  wasBeaten: false
},
{
  name: 'Bowser',
  healthPoints: 220,
  attackPower: 6,
  counterAttackPower: 24,
  wasBeaten: false
},
{
  name: 'Wario',
  healthPoints: 170,
  attackPower: 8,
  counterAttackPower: 10,
  wasBeaten: false
}
]

// health points
let marioHp = $('.mario-hp');
let donkeykongHp = $('.donkeykong-hp');
let bowserHp = $('.bowser-hp');
let warioHp = $('.wario-hp');

function initGame() {
  marioHp.text(characters[0].healthPoints + ' HP');
  donkeykongHp.text(characters[1].healthPoints + ' HP');
  bowserHp.text(characters[2].healthPoints + ' HP');
  warioHp.text(characters[3].healthPoints + ' HP');

  myChar = '';
  myEnemy = '';
  myCharData = null;
  myEnemyData = null;
  myRemainingHP = '';
  enemyRemainingHP = '';
  baseAP = '';
  charWasChosen = false;
  
  for(let char of characters) {
    char.wasBeaten = false;
  }

  $('.char').animate({ top: 0, left: 0 }).removeClass('defender-char enemy').off('click');
  $('.restart').remove();
  $('.your-attack').text('');
}

//choice char data
let myChar = '';
let myEnemy = '';
let myCharData = null;
let myEnemyData = null;
let myRemainingHP = '';
let enemyRemainingHP = '';
let baseAP = '';
let charWasChosen = false;
let defenderWasChosen = false;

$(document).ready(function() {
  
  //choose char
  function chooseChar() {
    if(charWasChosen) {
      return false
    } else {
      let xCord = $(this).position().left - 15;
      $(this).animate({ top: '+=205px', left: '-=' + xCord }, 'normal');
      $('.char').not(this).each(function( i ) {
        let eachXCord = $(this).position().left - 15 - (i * 200);
        $(this).animate({ top: '+=410px', left: '-=' + eachXCord }, 'normal').addClass('enemy');
      }).off('click'); 
      myChar = $(this).attr('data-char');
      
      //find current char loop
      for(let char of characters) {
        if(myChar == char.name) {
          myCharData = Object.assign({ }, char)
        }
      }
      myRemainingHP = myCharData.healthPoints;
      baseAP = myCharData.attackPower;
      charWasChosen = true;
    }
  }
  
  $('body').on('click', '.char', chooseChar);

  //chose enemy to fight
  $('body').on('click', '.enemy', function() {
    if(!myEnemy) {
      let xCord = $(this).position().left - 15;
      $(this).animate({ top: '+=285px', left: '-=' + xCord }, 'normal').addClass('defender-char').removeClass('enemy');
      $('.enemy').not(this).each(function( i ) {
        let eachXCord = $(this).position().left - 15 - (i * 200);
        $(this).animate({ left: '-=' + eachXCord }, 'normal');
      });
      myEnemy = $(this).attr('data-char'); 

      //find current defender loop & sort data
      for(let char of characters) {
        if(myEnemy == char.name) {
          myEnemyData = Object.assign({ }, char)
        }
      }
      enemyRemainingHP = myEnemyData.healthPoints;
    }
  });

  //attack button
  $('body').on('click', '#attack', attack);

  function attack() {
    if(myCharData && myEnemyData) { 
      $('.your-attack').text('You hit ' + myEnemyData.name + ' for ' + myCharData.attackPower + ' damage.')
      $('.enemy-attack').text(myEnemyData.name + ' hit you back for ' + myEnemyData.counterAttackPower + ' damage.')
      
      //decrement HP
      if(myRemainingHP >= 0 && enemyRemainingHP >= 0) {
        myRemainingHP = myRemainingHP - myEnemyData.counterAttackPower;
        enemyRemainingHP = enemyRemainingHP - myCharData.attackPower;
      }

      //increase AP
      myCharData.attackPower = myCharData.attackPower + baseAP;

      $('.char').each(function( i ) {
        if($(this).attr('data-char') == myCharData.name) {
          $('.hp', this).text(myRemainingHP + ' HP');
        } else if($(this).attr('data-char') == myEnemyData.name) {
          $('.hp', this).text(enemyRemainingHP + ' HP');
        }
      });
      
      //win-lose logic
      if(myRemainingHP <= 0) {
        $('.your-attack').text('You lose...GAME OVER');
        $('.enemy-attack').text(' ');
        createRestartBtn();
        myChar = null;
      } else if(enemyRemainingHP <= 0) {
        $('.your-attack').text('You have defeated ' + myEnemyData.name + '. You can choose a new enemy to fight.');
        $('.enemy-attack').text(' ');
        for(let char of characters) {
          if(myEnemyData.name == char.name)
            char.wasBeaten = true;
        }

        //remove enemy from screen
        $('.char').each(function( i ) {
          if($(this).attr('data-char') == myEnemyData.name) {
            $(this).animate({ left: "-=300px" }, 'fast');
          }
        });

        myEnemy = null;
      }  
      
    } else if(myCharData && !myEnemyData) {
      $('.your-attack').text('There is no enemy to attack');
    }
    
  //check for win game  
  const beatenEnemies = characters.filter((char) => {
    return char != myCharData;
  })
  let charBeaten = 0;
  for(let char of beatenEnemies) {
    if(char.wasBeaten == true)
    charBeaten++
  }

  if(charBeaten == 3) {
    $('.your-attack').text('YOU WIN!!!');
    createRestartBtn();
    }
  }

  //append restart btn
  function createRestartBtn() {
    const restartBtn = $('<button>')
    $('.outcome').append(restartBtn);
    restartBtn.text('Restart').addClass('restart');
    $('body').off('click', '#attack');
  }
  
  //restart 
  $('body').on('click', '.restart', function() {
    initGame();
    $('body').on('click', '#attack', attack);
  })
  initGame();
});

