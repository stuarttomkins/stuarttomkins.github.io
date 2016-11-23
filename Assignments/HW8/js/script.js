/*
Name: Stuart Tomkins
Email: stuart_tomkins@cs.uml.edu
UMass Lowell 91.461 GUI Programming I
Date Created: 11/20/16
Date Submitted: 11/22/16
Description: In this assignment we added JQuery UI elements such as a slider
for each input and tabs for the tables.
*/

// Creates an HTML buffer to hold the table as it is dynamically created from
// the values entered into the form, places the buffer in the HTML at the end.
function createTable(xStart, xEnd, yStart, yEnd) {

  var table =  "<br><table id=\"multiplicationTable\" border = 2px>";

  table += "<tr>";
  table += "<td> . </td>";
  for (var i = yStart; i <= yEnd ; i++) {
    table += `<td>${i}</td>`;
  }
  table += "</tr>";

  for (var i = xStart; i <= xEnd; i++) {
    table += "<tr>";
    table += "<td> " + i + " </td>";
    for (var j = yStart; j <= yEnd; j++) {
        table += "<td> " + i * j + " </td>";
    }
    table += "</tr>";
  }
  table+= "</table>";
  var multi_table = "#multiplicationTable" + createTable.counter;
   $(multi_table).replaceWith(table);
   $("#Tabs").tabs("refresh");
}

// Checks the form to ensure that everything entered were numbers above zero,
// and that the lower bound is less than the higher one. If this all checks
// out we create our multiplication table

$(document).ready(function(){
  $("#form").validate({
    submitHandler: $('#form #submit').click(function(form) {
      if ( typeof createTable.counter == 'undefined' ) {
           createTable.counter = 0;
       }
       ++createTable.counter;

      var xStart = +$("#xStart").val();
      var xEnd = +$("#xEnd").val();
      var yStart = +$("#yStart").val();
      var yEnd = +$("#yEnd").val();

      if (xStart < xEnd && yStart < yEnd) {
        $("#Tabs ul").append('<li><a href="#tab' + createTable.counter + '">Table</a></li>');
        $("#Tabs").append('<div id="tab' + createTable.counter + '"><table id="multiplicationTable' + createTable.counter + '"></table></div>');
        $("#Tabs").tabs("refresh");
        createTable(yStart, yEnd, xStart, xEnd);
      }
      else
      {
        if (xStart >= xEnd)
        {
          alert("xStart must be less than xEnd!");
        }
        else
        {
          alert("yStart must be less than yEnd!");
        }
      }
    }),
    rules: {
      xStart: {
        required: true,
        number: true,
        min: 1
      },
      xEnd: {
        required: true,
        number: true,
        min: 1
      },
      yStart: {
        required: true,
        number: true,
        min: 1
      },
      yEnd: {
        required: true,
        number: true,
        min: 1
      }
    }
  });
  $( "#xStartSlider" ).slider({
              min: -10,
              max: 10,
              value: 1,
              slide: function( event, ui ) {
                 $( "#xStart" ).val( ui.value );
              }
           });
           $( "#xStart" ).val(1);

  $( "#xEndSlider" ).slider({
             min: -10,
             max: 10,
             value: 10,
             slide: function( event, ui ) {
               $( "#xEnd" ).val( ui.value );
             }
           });
           $( "#xEnd" ).val(10);
  $( "#yStartSlider" ).slider({
             min: -10,
             max: 10,
             value: 1,
             slide: function( event, ui ) {
               $( "#yStart" ).val( ui.value );
             }
           });
           $( "#yStart" ).val(1);

   $( "#yEndSlider" ).slider({
             min: -10,
             max: 10,
             value: 10,
             slide: function( event, ui ) {
               $( "#yEnd" ).val( ui.value );
             }
           });
           $( "#yEnd" ).val(10);

    $(function($){
      $("#Tabs").tabs();
      $('#form #closeTabs').click(function(form) {
          $("#Tabs").tabs( "remove", 0);
      });
    });
});
