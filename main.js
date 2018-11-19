// Весь текст
var textArray = '';

// Индекс текущего слова
var indexOfCurrentWord = 0;

// Индекс текущего символа
var indexOfCurrentLetter = 0;

// Количество ошибок
var errors = 0;

$(document).ready(function () {
  $('#original_text').html(generateText());
  $('#word' + indexOfCurrentWord).attr('class', 'one_word current_word');
  $('#errors').text(errors);
});

/**
 * Функция, генерирующая текст, возвращает html-разметку с текстом
 * return String
 */
function generateText() {
  // Количество слов
  var countWords = 20,
    // Текст, с html-разметкой
    htmlText = '';
  for (var i = 1; i < countWords; i++) {
    var word = generateWord();
    htmlText += '<div class="one_word" id = "word' + (i - 1) + '">' + word + '</div>&nbsp;';
    textArray += word + ' ';
  }
  return htmlText;
}

/**
 * Функция, генерирующая одно слово
 * return String
 */
function generateWord() {
  // Количество сиволов в текущем слове
  var countOfLetter = getRandomInRange(2, 12),

    // Коды, с которых начинаются и заканчиваются латинские символы
    min = 97,
    max = 122;

  var word = '';
  for (var j = 1; j < countOfLetter; j++) {
    word += String.fromCharCode(getRandomInRange(min, max));
  }
  return word;
}

/**
 * Функция, возвращующая случайное число из отрезка [min, max]
 * @param {int} min 
 * @param {int} max
 * return integer 
 */
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$('#inner_text').bind('input', function () {
  var char = $('#inner_text').val().slice(-1);

  if (textArray[indexOfCurrentLetter] === char) {
    $('#inner_text').css('border', '2px solid green');
    $('#inner_text').val($('#inner_text').val());
    if (char === ' ') {
      $('#word' + indexOfCurrentWord).attr('class', 'one_word');
      indexOfCurrentWord++;
      $('#word' + indexOfCurrentWord).attr('class', 'one_word current_word');
    }
    indexOfCurrentLetter++;
  } else {
    var audio = new Audio();
    audio.src = 'error.mp3';
    audio.autoplay = true;
    $('#inner_text').css('border', '2px solid red');
    errors++;
    $('#errors').text(errors);
    $('#inner_text').val($('#inner_text').val().substring(0, $('#inner_text').val().length - 1));
  }

  if (indexOfCurrentLetter === textArray.length) {
    $('#inner_text').prop('disabled', true);
    alert('Ты справился! Чтобы начать заново, обнови страницу!!!');
  }

});