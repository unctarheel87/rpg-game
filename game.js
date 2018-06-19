//character data
const characters = [
{
  name: 'Mario',
  healthPoints: 180,
  attackPower: 6,
  counterAttackPower: 12
},
{
  name: 'Donkey Kong',
  healthPoints: 220,
  attackPower: 8,
  counterAttackPower: 25
},
{
  name: 'Bowser',
  healthPoints: 230,
  attackPower: 12,
  counterAttackPower: 14
},
{
  name: 'Wario',
  healthPoints: 200,
  attackPower: 14,
  counterAttackPower: 10
}
]

// health points
let marioHp = $('.mario-hp');
let donkeykongHp = $('.donkeykong-hp');
let bowserHp = $('.bowser-hp');
let warioHp = $('.wario-hp');

marioHp.text(characters[0].healthPoints + ' HP');
donkeykongHp.text(characters[1].healthPoints + ' HP');
bowserHp.text(characters[2].healthPoints + ' HP');
warioHp.text(characters[3].healthPoints + ' HP');

//choice char data
let myChar = '';
let myEnemy = '';
let myCharData = null;
let myEnemyData = null;
let myRemainingHP = '';
let enemyRemainingHP = '';
let baseAP = '';

$(document).ready(function() {

  //choose char
  $('body').one('click', '.char', function() {
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
        myCharData = char
      }
    }
    myRemainingHP = myCharData.healthPoints;
    baseAP = myCharData.attackPower;
  });

  //chose enemy to fight
  $('body').on('click', '.enemy', function() {
    if(!myEnemy) {
      let xCord = $(this).position().left - 15;
      $(this).animate({ top: '+=285px', left: '-=' + xCord }, 'normal').addClass('defender-char');
      $('.enemy').not(this).each(function( i ) {
        let eachXCord = $(this).position().left - 15 - (i * 200);
        $(this).animate({ left: '-=' + eachXCord }, 'normal').addClass('enemy');
      });
      myEnemy = $(this).attr('data-char'); 

      //find current defender loop & sort data
      for(let char of characters) {
        if(myEnemy == char.name) {
          myEnemyData = char
        }
      }
      enemyRemainingHP = myEnemyData.healthPoints;
    }
  });

  //attack button
  $('#attack').on('click', function() {
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
      
      //win-lose logice
      if(enemyRemainingHP <= 0) {
        $('.your-attack').text('You have defeated ' + myEnemyData.name + '. You can choose a new enemy to fight.');
        $('.enemy-attack').text(' ');
        
        //remove enemy from screen
        $('.char').each(function( i ) {
          if($(this).attr('data-char') == myEnemyData.name) {
            $(this).animate({ left: "-=300px" }, 'fast');
          }
        });

        myEnemy = null;
      } else if (myRemainingHP <= 0) {
        $('.your-attack').text('You lose...GAME OVER');
        $('.enemy-attack').text(' ');
        myChar = null;
      }
      
    } else if(myCharData && !myEnemyData) {
      $('.your-attack').text('There is no enemy to attack');
    }  
  });  

});

