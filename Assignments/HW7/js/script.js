/*
Name: Stuart Tomkins
Email: stuart_tomkins@cs.uml.edu
UMass Lowell 91.461 GUI Programming I
Date Created: 11/1/16
Date Submitted: 11/3/16
Description: In this assignment we are creating a multiplication table
dynamically through input entered in the form of this page.
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

   $("#multiplicationTable").replaceWith(table);
}

// Checks the form to ensure that everything entered were numbers above zero,
// and that the lower bound is less than the higher one. If this all checks
// out we create our multiplication table

$(document).ready(function(){
  $("#form").validate({
    submitHandler: $('#submit').click(function(form) {
      var xStart = +$("#xStart").val();
      var xEnd = +$("#xEnd").val();
      var yStart = +$("#yStart").val();
      var yEnd = +$("#yEnd").val();

      if (xStart < xEnd && yStart < yEnd)
        createTable(xStart, xEnd, yStart, yEnd);
      else
      {
        if (xStart < xEnd)
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

});
