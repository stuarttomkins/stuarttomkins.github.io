var node = document.createElement('li');

// ADD NEW ITEM TO END OF LIST
var text = document.createTextNode("Cream");
node.appendChild(text);

document.getElementsByTagName('ul')[0].appendChild(node);

// ADD NEW ITEM START OF LIST
text = document.createTextNode("Kale");
node = document.createElement('li');
node.appendChild(text);

var list = document.getElementsByTagName('ul')[0];
list.insertBefore(node, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
list = document.getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
  list[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
node = document.createElement('span');
text = document.createTextNode(list.length);
node.appendChild(text);

var header = document.getElementsByTagName('h2')[0];
header.appendChild(node);
