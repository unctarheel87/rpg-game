//character data
const characters = [
{
  name: 'Mario',
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 12
},
{
  name: 'Donkey Kong',
  healthPoints: 220,
  attackPower: 8,
  counterAttackPower: 20
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
let myChar = ' ';
let myEnemy = ' ';
let myCharData = null;
let myEnemyData = null;
let myRemainingHP = ' ';
let enemyRemainingHP = ' ';

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
  });

  //chose enemy to fight
  $('body').one('click', '.enemy', function() {
    let xCord = $(this).position().left - 15;
    $(this).animate({ top: '+=285px', left: '-=' + xCord }, 'normal').addClass('defender-char');
    $('.enemy').not(this).each(function( i ) {
      let eachXCord = $(this).position().left - 15 - (i * 200);
      $(this).animate({ left: '-=' + eachXCord }, 'normal').addClass('enemy').off('click');
    });
    myEnemy = $(this).attr('data-char'); 

    //find current defender loop & sort data
    for(let char of characters) {
      if(myEnemy == char.name) {
        myEnemyData = char
      }
    }
    enemyRemainingHP = myEnemyData.healthPoints;
  });

  //attack button
  $('#attack').on('click', function() {
    if(myCharData && myEnemyData) { 
      $('.your-attack').text('You hit ' + myEnemyData.name + ' for ' + myCharData.attackPower + ' damage.')
      $('.enemy-attack').text(myEnemyData.name + ' hit you back for ' + myEnemyData.counterAttackPower + ' damage.')
      
      //decrement HP
      myRemainingHP = myRemainingHP - myCharData.counterAttackPower;
      enemyRemainingHP = enemyRemainingHP - myEnemyData.counterAttackPower;

      $('.char').each(function( i ) {
        if($(this).attr('data-char') == myCharData.name) {
          $('.hp', this).text(myRemainingHP + ' HP')
        } else if($(this).attr('data-char') == myEnemyData.name) {
          $('.hp', this).text(enemyRemainingHP + ' HP')
        }
      })
    }  
  });  

});