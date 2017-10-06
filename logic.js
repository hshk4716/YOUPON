

//////////////////On click event for the search button///////////////////////

$("#submit-btn").click(function()
{
	var userKey= $("#search-term").val().trim();
	console.log(userKey)
	var queryURL1 = "http://api.sqoot.com/v2/deals?query="+ userKey+ "&api_key=ayeoGcPfH-7ZUjj5u082"
	var queryURL2 = "https://data.cityofchicago.org/profile/hshk4716/rj9x-ky8u/app_token=YyemuyggIVumoVRnsbIlmLeqq/new"
	//var queryURL = "http://api.sqoot.com/v2/deals?api_key=ayeoGcPfH-7ZUjj5u082";
var search = "";



$.ajax({
        url: queryURL1,
        method: "GET"
      }).done(function(response) 
      {

	     console.log(response)
	     for(var i =0; i<10 ; i++) 
	     {
		     var searchDivEl = $("<div>");
		     searchDivEl.attr("id", "searchDiv" )
		     var headingEl = $("<h3>");
		     var imgEl     = $("<img>");
		     var imgUrl    = response.deals[i].deal.image_url
		     var h1 = response.deals[i].deal.title;
		     console.log(h1)

		     headingEl.text(h1)
		     imgEl.attr("src", imgUrl)
		     $("#searchDivEl").append(headingEl)
		     $("#searchDivEl").append(imgEl)
		     $("#search-Div").append(searchDivEl)
 		 }

$.ajax({
        url: queryURL2,
        method: "GET"
      }).done(function(response)
      {
      	console.log(response);
      });


      });

     

 









})



