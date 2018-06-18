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

let myChar = '';
let myEnemy = '';
let myCharData = null;
let myEnemyData = null;

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

    //find current defender loop
    for(let char of characters) {
      if(myEnemy == char.name) {
        myEnemyData = char
      }
    }
  });

  //attack button
    $('#attack').on('click', function() {
        $('.your-attack').text('You hit ' + myEnemyData.name + ' for ' + myCharData.attackPower + ' damage.')
        $('.enemy-attack').text(myEnemyData.name + ' hit you back for ' + myEnemyData.counterAttackPower + ' damage.')
    });  
 
  // health points
  let marioHp = $('#mario-hp');
  let donkeykongHp = $('#donkeykong-hp');
  let bowserHp = $('#bowser-hp');
  let warioHp = $('#wario-hp');

  marioHp.text(characters[0].healthPoints + ' HP');
  donkeykongHp.text(characters[1].healthPoints + ' HP');
  bowserHp.text(characters[2].healthPoints + ' HP');
  warioHp.text(characters[3].healthPoints + ' HP');

});