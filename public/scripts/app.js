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

//Function to make the 'to do' input into an array, and take the first word from that array to
//compare to the if statements. The statements will then dictate which category
//the todo list item falls into. 1 = Movie, 2 = Book, 3 = Food, 4= Shop, 5 = Miscellaneous
//If 5 then function will use the API to suggest hits based on Google Custom Search


$(function () {

  console.log("Hello");

  $('#testbutton').click(function(e){
    e.preventDefault();

    var input = $('#testtask').val();

    getFirstWord(input);

    var testData ={

      item: input,
      user_id: req.session.user_id,
      category_id: 1,
    };



    $.ajax({

      method: 'POST',
      url: '/test',
      data: testData,
      dataType: 'json',
      success: function(result){
        console.log("Call was successfull");
        console.log(result);
      },
      error: function(error){
        console.log("there was an error calling the route",error);
      }

    }); //AJAX Call ends here.

  });


function getFirstWord(string) {
let firstWord = string.split(" ");
let category = 0;
if(firstWord[0] === "Watch") {
  category = 1;
  console.log(firstWord[0], "I should be the movie category")
  } else if (firstWord[0] === "Read") {
    category = 2;
    console.log(firstWord[0], "I should be the book category")
  } else if (firstWord[0] === "Eat") {
    category = 3;
    console.log(firstWord[0], "I should be the restaurant category")
  } else if (firstWord[0] === "Buy") {
    category = 4;
    console.log(firstWord[0], "I should be the shop category")
  } else {
    category = 5;
    console.log("I don't know what to use, go with misc. category")
  }
  return category;
  console.log(category);
}



//   function addItem (item) {
//     // append to the list
//     $("#todo-items").append('<li><span>' + item + '</span> <small><a href="#edit">Edit</a> &bull; <a href="#delete">Delete</a></small></li>');
//     // clear the text
//     $(getFirstWord(item))
//   }
//   $("#todo").keydown(function (e) {
//     // if enter key pressed
//     if (e.which === 13) {
//       addItem(e.target.value);
//       e.target.value = '';
//     }
//   });
//   // on clicking the add button
//   $("#add").click((e) => {
//     addItem($("#todo").val());
//     $("#todo").val('')
//   });
//   // delegate the events to dynamically generated elements
//   // for the edit button
//   $(document).on("click", 'a[href="#edit"]', function () {
//     // make the span editable and focus it
//     $(this).closest("li").find("span").prop("contenteditable", true).focus();
//     return false;
//   });
//   // for the delete button
//   $(document).on("click", 'a[href="#delete"]', function () {
//     // remove the list item
//     $(this).closest("li").fadeOut(function () {
//       $(this).remove();
//     });
//     return false;
//   });
// });

}); //MAIN FUNCTION CLOSING BRACET;

