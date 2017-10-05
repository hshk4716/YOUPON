

//////////////////On click event for the search button///////////////////////

$("#submit-btm").click(function()
{
	var userKey= $("#autocomplete-input").val().trim();
	console.log(userKey)
	var queryURL = "http://api.sqoot.com/v2/deals?query=chinese&api_key=ayeoGcPfH-7ZUjj5u082"
	//var queryURL = "http://api.sqoot.com/v2/deals?api_key=ayeoGcPfH-7ZUjj5u082";
var search = "";



$.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) 
      {

      		console.log(response)

      });

 









})



