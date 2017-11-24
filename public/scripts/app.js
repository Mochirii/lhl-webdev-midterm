$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

function makeTodo(){
    var input = document.getElementById('inputTask').value;
    var node = document.createElement("p");
    var textnode = document.createTextNode(input);
    node.appendChild(textnode);
    document.getElementById('addTask').appendChild(node);

    var removeTask = document.createElement('input');
    removeTask.setAttribute('type', 'button');
    removeTask.setAttribute("value", "Remove");
    removeTask.setAttribute("id", "removeButton");
    removeTask.addEventListener('click', function(e) {
        node.parentNode.removeChild(node);
    }, false);
    node.appendChild(removeTask);


}
