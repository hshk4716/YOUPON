

//////////////////On click event for the search button///////////////////////

$("#submit-btn").click(function()
{
	var userKey= $("#search-term").val().trim();
	console.log(userKey)
	var queryURL1 = "http://api.sqoot.com/v2/deals?query="+ userKey+ "&api_key=ayeoGcPfH-7ZUjj5u082"
	
var search = "";



$.ajax({
        url: queryURL1,
        method: "GET"
      }).done(function(response) 
      {

	     console.log(response)
	     for(var i =0; i<10 ; i++) 
	     {
	     	
		     var imgUrl    = response.deals[i].deal.image_url
		     var h1 = response.deals[i].deal.title;
		     console.log(h1)


		    

		     var newDealDiv = $("<div>");
			newDealDiv.addClass("col-sm-6 col-md-4");

			var newDealDivThumb = $("<div>");
			newDealDivThumb.addClass("thumbnail");

			var newDealDivImg = $("<img>");
			newDealDivImg.attr("src", imgUrl);
			newDealDivImg.attr("alt", "img");

			var newDealDivCaption = $("<div>");
			newDealDivCaption.addClass("caption");

			newDealDivCaption.append("<h3>" + "RESTAURANT_NAME" + "</h3>");
			newDealDivCaption.append("<p>" + h1 + "</p>");


			newDealDivThumb.append(newDealDivImg);
			newDealDivThumb.append(newDealDivCaption);

			newDealDiv.append(newDealDivThumb);

			$(".results-section").append(newDealDiv);
		}

$.ajax({
    url: "https://data.cityofchicago.org/resource/cwig-ma7x.json?aka_name=Carlos Mexican",
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



