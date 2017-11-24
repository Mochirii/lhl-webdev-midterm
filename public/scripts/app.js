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

function toDoList() {
  function addItem () {
    // append to the list
    $("#todo-items").append('<li><span>' + $("#todo").val() + '</span> <small><a href="#edit">Edit</a> &bull; <a href="#delete">Delete</a></small></li>');
    // clear the text
    $("#todo").val("");
  }
  $("#todo").keydown(function (e) {
    // if enter key pressed
    if (e.which == 13)
      addItem();
  });
  // on clicking the add button
  $("#add").click(addItem);
  // delegate the events to dynamically generated elements
  // for the edit button
  $(document).on("click", 'a[href="#edit"]', function () {
    // make the span editable and focus it
    $(this).closest("li").find("span").prop("contenteditable", true).focus();
    return false;
  });
  // for the delete button
  $(document).on("click", 'a[href="#delete"]', function () {
    // remove the list item
    $(this).closest("li").fadeOut(function () {
      $(this).remove();
    });
    return false;
  });
};
