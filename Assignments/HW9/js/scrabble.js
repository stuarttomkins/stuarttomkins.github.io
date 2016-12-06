/*
Name: Stuart Tomkins
Email: stuart_tomkins@cs.uml.edu
UMass Lowell 91.461 GUI Programming I
Date Created: 11/30/16
Date Submitted: 12/6/16
Description: In this assignment we added JQuery UI elements such as a slider
for each input and tabs for the tables.
*/
var ScrabbleTiles = {};
var PlayerHand = {};
var LettersPlayed = "";
var Board = new Array(7);
var dragging = false;

for (var i = 0; i < Board.length; i++) {
  Board[i] = null;
}
var turn_score = 0, overall_score = 0;

// The dictionary lookup object
// this was taken from the Piazza, Jesse Heines example
var dict = {};

ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image" : "\"img/Scrabble_Tile_A.jpg\""};
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_B.jpg\""};
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_C.jpg\""};
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "\"img/Scrabble_Tile_D.jpg\""} ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12,  "image" : "\"img/Scrabble_Tile_E.jpg\"" } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_F.jpg\""  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3,  "image" : "\"img/Scrabble_Tile_G.jpg\""  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_H.jpg\""  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image" : "\"img/Scrabble_Tile_I.jpg\""  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "\"img/Scrabble_Tile_J.jpg\""  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "\"img/Scrabble_Tile_K.jpg\""  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "\"img/Scrabble_Tile_L.jpg\""  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_M.jpg\""  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "\"img/Scrabble_Tile_N.jpg\""  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8,  "image" : "\"img/Scrabble_Tile_O.jpg\""  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_P.jpg\""  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image" : "\"img/Scrabble_Tile_Q.jpg\""  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "\"img/Scrabble_Tile_R.jpg\""  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "\"img/Scrabble_Tile_S.jpg\""  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "\"img/Scrabble_Tile_T.jpg\""  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "\"img/Scrabble_Tile_U.jpg\""  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_V.jpg\""  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_W.jpg\"" } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "\"img/Scrabble_Tile_X.jpg\""  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "\"img/Scrabble_Tile_Y.jpg\""  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image" : "\"img/Scrabble_Tile_Z.jpg\""  } ;

$( function() {
    dealTiles();

    // this was also taken from the piazza
    // Do a jQuery Ajax request for the text dictionary
    $.get( "dict/dict.txt", function( txt ) {
        // Get an array of all the words
        var words = txt.split( "\n" );

        // And add them as properties to the dictionary lookup
        // This will allow for fast lookups later
        for ( var i = 0; i < words.length; i++ ) {
            dict[ words[i] ] = true;
        }
    });
    $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);

    createLetterDist();

    $(".ui-widget-header").droppable(
      {
        drop: function( event, ui )
        {
            var letter_index = ui.draggable["0"].attributes["0"].value;
            var tile_index = (+event.target.id) - 1;

            // find the letter being played and update containers
            for (var i = 0; i < 7; i++)
            {
              if (PlayerHand[i] == letter_index)
              {
                LettersPlayed += letter_index;
                PlayerHand[i] = null;
                break;
              }
            }
            // fill board with letters and their values
            Board[tile_index] =
            {
              letter: letter_index,
              value: ScrabbleTiles[letter_index].value
            }
            turn_score += Board[tile_index].value;

            $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score );
        },
        out: function(event, ui)
        {
            var letter_index = ui.draggable["0"].attributes["0"].value;
            var tile_index = (+event.target.id) - 1;

            turn_score -= Board[tile_index].value;
            Board[tile_index] = null;
            $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);

            //places the selected letter back into hand and out of the played letters
            for (var i = 0; i < 7; i++)
            {
              if (LettersPlayed.includes(letter_index) && PlayerHand[i] == null)
              {
                PlayerHand[i] = letter_index;
                var index = LettersPlayed.indexOf(letter_index);
                LettersPlayed = LettersPlayed.slice(0, index) + LettersPlayed.slice(index + 1, LettersPlayed.length);
                break;
              }
            }
        }
      });

  });

  function dealTiles()
  {
    var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 7; i++)
    {
      var rand = Math.floor(Math.random() * 26);
      // don't pick a letter with none remaining
      while(ScrabbleTiles[options[rand]]["number-remaining"] == 0)
        rand = Math.floor(Math.random() * 26);

      PlayerHand[i] = options[rand];
      --ScrabbleTiles[options[rand]]["number-remaining"];
      $("#rack").append("<div data-letter=\"" + options[rand] + "\"id=\"draggable-" + (i+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[options[rand]].image + " height=50px width=50px></div>");
      $("#draggable-" + (i+1)).draggable({
        snap: ".ui-widget-header",
        snapMode: "inner",
      });
    }
  }

  function reDealTiles()
  {
    var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var rand = Math.floor(Math.random() * 26);

    //force deal previous tiles from hand from PlayerHand
    for (var i = 0; i < 7; i++)
    {
      if (PlayerHand[i] != null)
      {
        $("#rack").append("<div data-letter=\"" + PlayerHand[i] + "\"id=\"draggable-" + (i+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[PlayerHand[i]].image + " height=50px width=50px></div>");
        $("#draggable-" + (i+1)).draggable({
          snap: ".ui-widget-header",
          snapMode: "inner",
        });
      }
      else
      {
        var rand = Math.floor(Math.random() * 26);
        // don't pick a letter with none remaining
        while(ScrabbleTiles[options[rand]]["number-remaining"] == 0)
          rand = Math.floor(Math.random() * 26);

        PlayerHand[i] = options[rand];
        --ScrabbleTiles[options[rand]]["number-remaining"];
        $("#rack").append("<div data-letter=\"" + options[rand] + "\"id=\"draggable-" + (i+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[options[rand]].image + " height=50px width=50px></div>");
        $("#draggable-" + (i+1)).draggable({
          snap: ".ui-widget-header",
          snapMode: "inner",
        });
      }
    }

  LettersPlayed = "";
  }

  //makes sure that there are no spaces in the board, all letters adjacent
  function validateBoard()
  {
    var null_flag = false, letter_flag = false, size = 0, i = 0;

    // skip leading empty board spaces
    while (Board[i] == null && i < 7)
      i++

    // returns false if it finds a null surrounded by objects on the board
    for (var j = i + 1; j < Board.length; j++)
    {
      if (Board[j] != null)
      {
        if (null_flag == true && size > 0)
          return false;
      }
      else
      {
        if (null_flag == false)
          null_flag = true;
      }
      size++;
    }
    return true;
  }

// construct a word from the board and check it against the dictionary
function validateWord()
{
  var word = [];
  var i = 0, j = 0;

  while (Board[i] == null && i < 7)
    i++;

  while (Board[i] != null)
  {
    if (j == 0)
      word = Board[i].letter;
    else
      word += Board[i].letter;

    i++; j++;
  }
  word = word.toLowerCase();

    if (dict[word])
      return word;
    else
      return false;

}

// submit button check function, checks for valid board and word, deals with
// re dealing and updating the container variables
function check()
{
  if(validateBoard())
  {
    if (validateWord() != false)
    {
      overall_score += turn_score;
      turn_score = 0;
      $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);

      for (var i = 0; i < Board.length; i++)
      {
            $("#draggable-" + (i+1)).draggable("destroy");
            $("#draggable-" + (i+1)).remove();
      }
      reDealTiles();
      createLetterDist();

      // clear the board
      for(var i = 0; i < 7; i++)
      {
        if (Board[i] != null)
        {
          Board[i] = null;
        }
      }
    }
    else
    {
      alert("WORD NOT VALIDATED")
    }

  }
  else
  {
    alert("BOARD NOT VALIDATED");
  }
}

// prints the remaining letters of each tile to the page
function createLetterDist()
{
    var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  $("#letterDist1 p").empty();
  $("#letterDist2 p").empty();

    for (var i = 0; i < 26; i++)
    {
      if (i < 13)
        $("#letterDist1").append("<p> " + options[i] + ": " + ScrabbleTiles[options[i]]["number-remaining"] + " / " + ScrabbleTiles[options[i]]["original-distribution"] + "</p>");
      else
        $("#letterDist2").append("<p> " + options[i] + ": " + ScrabbleTiles[options[i]]["number-remaining"] + " / " + ScrabbleTiles[options[i]]["original-distribution"] + "</p>");

    }
}

// brings all tiles back to the starting position in rack and resets container variables
function revert()
{
  turn_score = 0;
  $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);
  for (var i = 0; i < Board.length; i++)
  {
        $("#draggable-" + (i+1)).draggable("destroy");
        $("#draggable-" + (i+1)).remove();
  }

  var j = 0;
  for (var i = 0; i < 7; i++)
  {
    if (PlayerHand[i] != null)
    {
      $("#rack").append("<div data-letter=\"" + PlayerHand[i] + "\"id=\"draggable-" + (j+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[PlayerHand[i]].image + " height=50px width=50px></div>");
      $("#draggable-" + (j+1)).draggable({
        snap: ".ui-widget-header",
        snapMode: "inner",
      });
      j++;
    }
  }

  for (var i = 0; i < LettersPlayed.length; i++)
  {
    $("#rack").append("<div data-letter=\"" + LettersPlayed[i] + "\"id=\"draggable-" + (j+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[LettersPlayed[i]].image + " height=50px width=50px></div>");
    $("#draggable-" + (j+1)).draggable({
      snap: ".ui-widget-header",
      snapMode: "inner",
    });
    j++;
  }

  var j = 0;

  // refills player hand with the letters you just played
  for (var i = 0; i < 7; i++)
  {
    if(PlayerHand[i] == null)
    {
      PlayerHand[i] = LettersPlayed[j];
      j++;
    }
  }
  // clears the board
  for(var i = 0; i < 7; i++)
  {
    if (Board[i] != null)
    {
      Board[i] = null;
    }
  }

  LettersPlayed = "";
}
