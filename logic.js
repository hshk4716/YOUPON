

//////////////////On click event for the search button///////////////////////

$("#submit-btn").click(function()
{
	var userKey= $("#search-term").val().trim();
	console.log(userKey)
	var queryURL1 = "http://api.sqoot.com/v2/deals?query="+ userKey+ "&api_key=ayeoGcPfH-7ZUjj5u082"
	//var queryURL2 = "https://data.cityofchicago.org/profile/hshk4716/rj9x-ky8u/app_token=YyemuyggIVumoVRnsbIlmLeqq/new"
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
	     	///Creating a new <Div> for search result//// 
		     var searchDivEl = $("<div>");
		     var headingEl = $("<h3>");
		     var imgEl     = $("<img>");
		     var imgUrl    = response.deals[i].deal.image_url
		     var h1 = response.deals[i].deal.title;
		     console.log(h1)


		     searchDivEl.attr("id", "searchDiv" ); ///Adding id new div////
		     headingEl.text(h1)
		     imgEl.attr("src", imgUrl)
		     $("#searchDivEl").append(headingEl)
		     $("#searchDivEl").append(imgEl)
		     $("#search-Div").append(searchDivEl)
 		 }

$.ajax({
    url: "https://data.cityofchicago.org/resource/cwig-ma7x.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "YyemuyggIVumoVRnsbIlmLeqq"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});


      });

     

 









})



