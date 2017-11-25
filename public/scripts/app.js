// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
function getFirstWord(string) {
var firstWord = string.split(" ");
if(firstWord[0] === "Watch") {
  console.log(firstWord[0], "I should use the IMDB database")
  } else if (firstWord[0] === "Read") {
    console.log(firstWord[0], "I should use the Wolfram database")
  } else if (firstWord[0] === "Eat") {
    console.log(firstWord[0], "I should use the Yelp database")
  } else if (firstWord[0] === "Buy") {
    console.log(firstWord[0], "I should use the Amazon database")
  } else {
    console.log("I don't know what to use, go with default")
  }
}


$(function () {
  function addItem (item) {
    // append to the list
    $("#todo-items").append('<li><span>' + item + '</span> <small><a href="#edit">Edit</a> &bull; <a href="#delete">Delete</a></small></li>');
    // clear the text
    $(getFirstWord(item))
  }
  $("#todo").keydown(function (e) {
    // if enter key pressed
    if (e.which === 13) {
      addItem(e.target.value);
      e.target.value = '';
    }
  });
  // on clicking the add button
  $("#add").click((e) => {
    addItem($("#todo").val());
    $("#todo").val('')
  });
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
});


