var expect = chai.expect;

var oldGoal = connectFour.goal || 4;
var resetBoard = function(){
  var newRow = [];
  var newBoard = [];
  var rowLength = connectFour.board[0].length;
  var boardLength = connectFour.board.length;
  while(newRow.length < rowLength){
    newRow.push('O');
  }
  while(newBoard.length < boardLength){
    newBoard.push(newRow.slice());  
  }
  connectFour.board = newBoard;
  connectFour.playerToken = 'R';
  connectFour.goal = oldGoal;
};

describe('the Connect Four Application', function(){
  it('Should have a global object called "connectFour"', function(){
    expect(typeof connectFour).to.not.be.undefined;
    expect(connectFour).to.be.an('object');
  });
  describe('the ConnectFour Object', function(){
    it('should have a "board" property', function(){
      expect(connectFour.board).to.exist;
    });
    it('should have a "playerToken" property', function(){
      expect(connectFour.playerToken).to.exist;
    });
    it('should have a "switchPlayers" method', function(){
      expect(connectFour.switchPlayers).to.exist;
      expect(connectFour.switchPlayers).to.be.a('function');
    });
    it('should have an "insertToken" method', function(){
      expect(connectFour.insertToken).to.exist;
      expect(connectFour.switchPlayers).to.be.a('function');
    });
    it('should have a "goal" property with a default value of integer 4', function(){
      expect(connectFour.goal).to.exist;
      expect(connectFour.goal).to.equal(4);
    });
    describe('the board property', function(){
      it('should be an array', function(){
        expect(connectFour.board).to.be.an('array');
      });
      it('should be a multidimensional array (it must contain only other arrays)', function(){
        var allArrays = connectFour.board.every(function(arr){
          return Array.isArray(arr);
        });
        expect(allArrays).to.be.true;
      });
      it('should have at least 6 indices', function(){
        expect(connectFour.board.length).to.greaterThan(5);
      });
      describe('each child array', function(){
        it('should have a length of 7', function(){
          var allSevens = connectFour.board.every(function(arr){
            return arr.length >= 7;
          });
          expect(allSevens).to.be.true;
        });
        it('should have each index contain only an "O" character for "open"', function(){
          var allOs = connectFour.board.every(function(arr){
            return arr.every(function(val){
              return val === 'O';
            }); 
          });
          expect(allOs).to.be.true;
        });
      });
    });
    describe('the playerToken property', function(){
      it('should have a default value of "R" for "red"', function(){
        expect(connectFour.playerToken).to.equal('R');
      });
    });
    describe('the switchPlayers method', function(){
      afterEach(function(){
        connectFour.playerToken = 'R';
      });
      it('should change the value of the playerToken from "R" to "B" for "blue"', function(){
        connectFour.switchPlayers();
        expect(connectFour.playerToken).to.equal('B');
      });
      it('should toggle the value of the playerToken back and forth between the two values', function(){
        connectFour.switchPlayers();
        connectFour.switchPlayers();
        expect(connectFour.playerToken).to.equal('R');
        connectFour.switchPlayers();
        expect(connectFour.playerToken).to.equal('B');
      });
    });
    describe('the insertToken method', function(){
      it('should return false when anything but an integer is provided as an argument (no type coercion from string to integer)', function(){
        expect(connectFour.insertToken()).to.be.false;
        expect(connectFour.insertToken(true)).to.be.false;
        expect(connectFour.insertToken(function(){})).to.be.false;
        expect(connectFour.insertToken({})).to.be.false;
        expect(connectFour.insertToken([])).to.be.false;
        expect(connectFour.insertToken('1')).to.be.false;
      });
      it('should return false if the number is greater than the board\'s sub arrays\' length', function(){
        var tooBig = connectFour.board[0].length + 1;
        expect(connectFour.insertToken(tooBig)).to.be.false;
      });
      it('should be 1 based, meaning that a token should insert in the first position when 1 is the argument, and return false for 0', function(){
        expect(connectFour.insertToken(0)).to.be.false;
      });
      describe('the insertToken method alters the board property with player tokens', function(){
        afterEach(function(){
          resetBoard();
        });
        it('should insert a token in the last array of the board, at the position provided by the argument', function(){
          var last = connectFour.board.length - 1;
          connectFour.insertToken(1);
          expect(connectFour.board[last][0]).to.not.equal('O');
          connectFour.insertToken(2);
          expect(connectFour.board[last][1]).to.not.equal('O');
          connectFour.insertToken(connectFour.board[0].length);
          expect(connectFour.board[last][connectFour.board[last].length-1]).to.not.equal('O');
        }); 
        it('should stack tokens on top of previously inserted ones', function(){
          connectFour.insertToken(1);
          connectFour.insertToken(1);
          var secondToLastRow = connectFour.board.length - 2;
          var thirdToLastRow = secondToLastRow - 1;
          expect(connectFour.board[secondToLastRow][0]).to.not.equal('O');
          expect(connectFour.board[thirdToLastRow][0]).to.equal('O');
          connectFour.insertToken(1);
          expect(thirdToLastRow).to.not.equal('O');
        });
        it('should alternate player tokens each turn by calling the switchPlayers method.', function(){
          expect(connectFour.playerToken).to.equal('R');
          connectFour.insertToken(1);
          expect(connectFour.playerToken).to.equal('B');
        });
        it('should return false if too many tokens are inserted in any column', function(){
          connectFour.insertToken(1);
          connectFour.insertToken(1);
          connectFour.insertToken(1);
          connectFour.insertToken(1);
          connectFour.insertToken(1);
          expect(connectFour.insertToken(1)).to.equal(false);
        });
      });
    });
    describe('the searchForWin method', function(){
      afterEach(function(){
        resetBoard();
      });
      it('should return false by defaut', function(){
        expect(connectFour.searchForWin(1,1)).to.equal(false);
      });
      it('should return true if four in a row to the top and bottom', function(){
        connectFour.insertToken(1);
        connectFour.insertToken(2);
        connectFour.insertToken(1);
        connectFour.insertToken(2);
        connectFour.insertToken(1);
        connectFour.insertToken(2);
        connectFour.playerToken = 'R';
        expect(connectFour.searchForWin(0, 2)).to.equal(true);
      });
      it('should return true if four in a row to the left and right', function(){
        connectFour.insertToken(1);
        connectFour.insertToken(1);
        connectFour.insertToken(2);
        connectFour.insertToken(2);
        connectFour.insertToken(3);
        connectFour.insertToken(3);
        connectFour.playerToken = 'R';
        var last = connectFour.board.length - 1;
        expect(connectFour.searchForWin(3, last)).to.equal(true);
      });
      it('should return true if four in a row to the top right and bottom left', function(){
        connectFour.board[0][4] = 'R';
        connectFour.board[1][3] = 'R';
        connectFour.board[2][2] = 'R';
        connectFour.board[3][1] = 'R';
        connectFour.goal = 4;
        expect(connectFour.searchForWin(2, 2)).to.equal(true);
      });
      it('should return true if four in a row to the bottom right and top left', function(){
        connectFour.board[0][0] = 'R';
        connectFour.board[1][1] = 'R';
        connectFour.board[2][2] = 'R';
        connectFour.board[3][3] = 'R';
        connectFour.board[4][4] = 'R';
        connectFour.goal = 4;
        expect(connectFour.searchForWin(2, 2)).to.equal(true);
      });
      it('should be called by the insertToken after each turn to check for a winner', function(){
        var savedFunc = connectFour.searchForWin;
        
        var called = false;
        connectFour.searchForWin = function(){
          called = true;
        };

        connectFour.insertToken(1);
        expect(called).to.equal(true);
        connectFour.searchForWin = savedFunc;
      });
      it('should announce a winner by turning the board into a string', function(){
        connectFour.insertToken(1);
        connectFour.insertToken(1);
        connectFour.insertToken(2);
        connectFour.insertToken(1);
        connectFour.insertToken(3);
        connectFour.insertToken(1);
        connectFour.insertToken(4);
        expect(connectFour.board).to.not.be.an('array');
        expect(connectFour.board).to.be.a('string');
      });
    });
  });
});


mocha.run();
