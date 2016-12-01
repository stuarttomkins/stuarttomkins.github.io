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
var Board = new Array(7);
for (var i = 0; i < Board.length; i++) {
  Board[i] = null;
}
var turn_score = 0, overall_score = 0;

// The dictionary lookup object
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

    $(".ui-widget-header").droppable(
      {
        drop: function( event, ui )
        {
          var letter_index = ui.draggable["0"].attributes["0"].value;
          var tile_index = (+event.target.id) - 1;

          Board[tile_index] = {
            letter: letter_index,
            value: ScrabbleTiles[letter_index].value
          }

          turn_score += Board[tile_index].value;
          $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score );
        },
        out: function(event, ui)
        {
          var tile_index = (+event.target.id) -1;
          turn_score -= Board[tile_index].value;
          Board[tile_index] = null;
          $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);
        }
      });

  });

  function dealTiles()
  {
    var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 7; i++)
    {
      var rand = Math.floor(Math.random() * 26);
      PlayerHand[i] = options[rand];
      --ScrabbleTiles[options[rand]]["number-remaining"];
      $("#rack").append("<div data-letter=\"" + options[rand] + "\"id=\"draggable-" + (i+1) + "\" class=\"ui-widget-content\"><img src=" + ScrabbleTiles[options[rand]].image + " height=50px width=50px></div>");
      $("#draggable-" + (i+1)).draggable({
        snap: ".ui-widget-header"
      });
    }
  }

  function validateBoard()
  {
    var null_flag = false, letter_flag = false, size = 0, i = 0;

    while (Board[i] == null && i < 7)
      i++

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

function check()
{
  if(validateBoard())
  {
    if (validateWord() != false)
    {
      overall_score += turn_score;
      turn_score = 0;
      $("#score").text("turn score: " + turn_score + "\noverall score: " + overall_score);
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
