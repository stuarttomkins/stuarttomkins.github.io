/*
Name: Stuart Tomkins
Email: stuart_tomkins@cs.uml.edu
UMass Lowell 91.461 GUI Programming I
Date Created: 11/1/16
Date Submitted: 11/3/16
Description: In this assignment we are creating a multiplication table
dynamically through input entered in the form of this page.
*/

// Checks the form to ensure that everything entered were numbers above zero,
// and that the lower bound is less than the higher one. If this all checks
// out we create our multiplication table
function validateInput() {

  var xStart = document.getElementById('form')[0].value;
  var xEnd = document.getElementById('form')[1].value;
  var yStart = document.getElementById('form')[2].value;
  var yEnd = document.getElementById('form')[3].value;

  if (isNaN(xStart) || Number(xStart) <= 0)
  {
    alert("Error: Invalid input for lower bound of X.");
    return;
  }
  if (isNaN(xEnd) || Number(xEnd) <= 0)
  {
    alert("Error: Invalid input for upper bound of X.");
    return;
  }
  if (Number(xEnd) <= Number(xStart))
  {
    alert("Error: X's lower bound must be lower than its higher bound.");
    return;
  }
  if (isNaN(yStart) || Number(yStart) <= 0)
  {
    alert("Error: Invalid input for lower bound of Y.");
    return;
  }
  if (isNaN(yEnd) || Number(yEnd) <= 0)
  {
    alert("Error: Invalid input for upper bound of Y.");
    return;
  }
  if (Number(yEnd) <= Number(yStart))
  {
    alert("Error: Y's lower bound must be lower than its higher bound.");
    return;
  }
  createTable();
}

// Creates an HTML buffer to hold the table as it is dynamically created from
// the values entered into the form, places the buffer in the HTML at the end.
function createTable() {
  var form = document.getElementById('form');

  var xStart = Number(form[0].value);
  var xEnd = Number(form[1].value);
  var yStart = Number(form[2].value);
  var yEnd = Number(form[3].value);

  var table =  "<br><table border = 2px>";

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

   document.getElementById("multiplicationTable").innerHTML = table;
}
