const mario = {
  healthPoints: 180,
  attackPower: 10,
  counterAttackPower: 12
};

const donkeykong = {
  healthPoints: 220,
  attackPower: 8,
  counterAttackPower: 20
};

const bowser = {
  healthPoints: 230,
  attackPower: 12,
  counterAttackPower: 14
};

const wario = {
  healthPoints: 200,
  attackPower: 14,
  counterAttackPower: 10
};

$(document).ready(function() {
  
$('body').one('click', '.char', function() {
    let xCord = $(this).position().left - 15;
    $(this).animate({ top: '+=200px', left: '-=' + xCord }, 'normal')
    $('.char').not(this).each(function( i ) {
      let eachXCord = $(this).position().left - 15 - (i * 200);
      $(this).animate({ top: '+=400px', left: '-=' + eachXCord }, 'normal').addClass('enemy');
    }).off('click'); 
  });

  $('body').one('click', '.enemy', function() {
    let xCord = $(this).position().left - 15;
    $(this).animate({ top: '+=200px', left: '-=' + xCord }, 'normal').addClass('defender-char');
    $('.enemy').not(this).each(function( i ) {
      let eachXCord = $(this).position().left - 15 - (i * 200);
      $(this).animate({ left: '-=' + eachXCord }, 'normal').addClass('enemy').off('click');
    }); 
  });
 
  // health points
  let marioHp = $('#mario-hp');
  let donkeykongHp = $('#donkeykong-hp');
  let bowserHp = $('#bowser-hp');
  let warioHp = $('#wario-hp');

  marioHp.text(mario.healthPoints + ' HP');
  donkeykongHp.text(donkeykong.healthPoints + ' HP');
  bowserHp.text(bowser.healthPoints + ' HP');
  warioHp.text(wario.healthPoints + ' HP');

});