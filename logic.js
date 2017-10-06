$(document).ready(function() {

// On search button: 
//		clear results section,
//		make sqoot ajax calls
//		repopulate results section with Sqoot API data,
//		

$("#submit-btn").click(function() {

	event.preventDefault();
	$(".view-2").show();
	$(".results-section").empty();
	
	var userKey= $("#search-term").val().trim();
	console.log(userKey)
	var queryURL1 = "http://api.sqoot.com/v2/deals?query="+ userKey+ "&category_slug=restaurants&location=cityofchicago&api_key=ayeoGcPfH-7ZUjj5u082";


	$.ajax({
        url: queryURL1,
        method: "GET"
      }).done(function(response) {

	    console.log(response)
	    for (var i = 0; i < 10 ; i++) {
	     	
	     	var category_slug= response.deals[i].deal.category_slug;
            console.log(category_slug)
            
            // make sure we're pulling restaurants!
            if(category_slug==="restaurants") {
			    var imgUrl = response.deals[i].deal.image_url;
			    var h1 = response.deals[i].deal.title;
			    console.log(h1);
			    var name = response.deals[i].deal.merchant.name;
			    var nameUppercase = name.toUpperCase();
			    var dealUrl = response.deals[i].deal.url;
			    
			    var newDealDiv = $("<div>");
				newDealDiv.addClass("col-sm-6 col-md-4");

				var newDealDivCard = $("<div>");
				newDealDivCard.addClass("card");

				var newDealDivImg = $("<img>");
				newDealDivImg.addClass("card-img-top");
				newDealDivImg.attr("src", imgUrl);
				newDealDivImg.attr("alt", "Card image cap");

				var newDealDivBlock = $("<div>");
				newDealDivBlock.addClass("card-block");

				newDealDivBlock.append("<h4 class='card-title'>" + name + "</h4>");
				newDealDivBlock.append("<p class='card-text'>" + h1 + "</p>");

				var newDealDivInspection = $("<ul>");
				newDealDivInspection.addClass("list-group list-group-flush");
				var inspectionInfo = $("<li class='list-group-item'>" + "We've got inspection data" + "</li>");
				newDealDivInspection.append(inspectionInfo);

				var dealLinkBlock = $("<div>");
				dealLinkBlock.addClass("card-block");
				dealLinkBlock.append("<a href='" + dealUrl +"' class='card-link'  target='_blank'>" + "Get this deal >>" + "</a>");

				newDealDivCard.append(newDealDivImg);
				newDealDivCard.append(newDealDivBlock);
				newDealDivCard.append(newDealDivInspection);
				newDealDivCard.append(dealLinkBlock);

				newDealDiv.append(newDealDivCard);

				$(".results-section").append(newDealDiv);



				$.ajax({
				    url: "https://data.cityofchicago.org/resource/cwig-ma7x.json?aka_name='" + nameUppercase +"'",
				    type: "GET",
				    data: {
				      "$limit" : 5000,
				      "$$app_token" : "YyemuyggIVumoVRnsbIlmLeqq"
				    }
				}).done(function(data) {
				  // alert("Retrieved " + data.length + " records from the dataset!");
				  console.log(data);
				
				}); // close city data API call

			} // close if statement checking for restaurants	
		} //close for loop
    }); // close sqoot API call

}); // close submit button listener


})
