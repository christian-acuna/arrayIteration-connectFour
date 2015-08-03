$(function(){
  var savedBoard = $('#game-board').html();
 
  var updateBoard = function(){
    var $tableBody = $('#game-board tbody'),
      board = connectFour.board;
    
    $tableBody.html('');

    if(Array.isArray(board)){
      board.forEach(function(row){
        $tableBody.append('<tr></tr>');
      });
      $tableBody.children().each(function(i, elem){
        var row = board[i],
          $elem = $(elem);
        row.forEach(function(letter){
          var data = '<td>' + letter + '</td>',
            $data = $(data);

          if(letter === 'R'){
            $data.css('color', 'red');
          }else if(letter === 'B'){
            $data.css('color', 'blue');
          }
          $elem.append($data);
        });
      });
    }else{
      removeBoardAddButton();
    }
  };

  var removeBoardAddButton = function() {  
   var button = $('<button></button>').text('reset').addClass('reset');
    $('#game-board').html(connectFour.board);
    $('body').append(button);
  };


  $('#game-board').on('click', '#insert td', function(e){
    e.preventDefault();
    var $target = $(e.currentTarget);
    var insertAt = $target.index() + 1;
    connectFour.insertToken(insertAt);
    updateBoard();
  });

  $('body').on('click', '.reset', function(){
    $('#game-board').html(savedBoard);
    connectFour = new ConnectFour();
    $(this).remove();
    updateBoard();
  });

  updateBoard();
});
