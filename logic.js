$(document).ready(function() {
    
    // // checks if the Firebase authentication has changed
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in.
    //         var email = user.email;
    //         $("#account-details").text(email);
    //         $("#sign-in-status-container").show();
    //     } else {
    //         // redirects to login
    //         window.location = "index.html";
    //         return;
    //     }
    // });
    // // logouts the user
    // $("#sign-out").on("click", function() {
    //     firebase.auth().signOut();
    // })



// On search button: 
//      clear results section,
//      make sqoot ajax calls
//      repopulate results section with Sqoot API data,
//      
var riskResponse;
var violationsResponse;

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
                // var imgUrl = response.deals[i].deal.image_url;
                // var h1 = response.deals[i].deal.title;
                // // console.log(h1);
                // var name = response.deals[i].deal.merchant.name;
                // var nameUppercase = name.toUpperCase();
                // var nameSubstring = nameUppercase.substr(0,3)
                // var urlCorrected = encodeURIComponent(nameUppercase)
                // var finalURL = urlCorrected.replace("'", "%27").replace("-", "%2D").replace("!", "%21");
                //Begin Humera's changes. 10/10 Added longitude longitude, corrected the URL, search by restaurant name first two letters.
                var imgUrl = response.deals[i].deal.image_url;
                var h1 = response.deals[i].deal.title;
                console.log(h1);
                var restaurant = response.deals[i]
                var latitude = restaurant.deal.merchant.latitude.toString().substr(0, 8);
                var longitude = restaurant.deal.merchant.longitude.toString().substr(0, 8);
                var name = response.deals[i].deal.merchant.name;
                var nameUppercase = name.toUpperCase();
                var useName = nameUppercase.substr(0, 3);
                var urlCorrected = encodeURIComponent(nameUppercase)
                var finalURL = urlCorrected.replace("'", "%27").replace("-", "%2D").replace("!", "%21");
                var superFinalURL = finalURL.toString().substr(0, 2);
                var superFfinalURL = superFinalURL.replace(/ /g, "%20");
                //end Humera's changes
            
                var dealUrl = response.deals[i].deal.url;
                
                var newDealDiv = $("<div>");
                newDealDiv.addClass("col-sm-6 col-md-4 col-lg-3");
                var newDealDivCard = $("<div>");
                newDealDivCard.addClass("card");
                var newDealDivImg = $("<img>");
                newDealDivImg.addClass("card-img-top img-responsive");
                newDealDivImg.attr("src", imgUrl);
                newDealDivImg.attr("alt", "Card image cap");
                var newDealDivBlock = $("<div>");
                newDealDivBlock.addClass("card-block");
                newDealDivBlock.append("<h5 class='card-title'>" + name + "</h5>");
                newDealDivBlock.append("<p class='card-text text-muted'>" + h1 + "</p>");
                var newDealDivInspection = $("<p>");
                newDealDivInspection.addClass("inspection-ratings");
                newDealDivInspection.attr('data-name', useName);
                var inspectionInfo = $("<p>");
                inspectionInfo.addClass("violation-data")
                inspectionInfo.attr('data-input', useName);
                // newDealDivInspection.append(inspectionInfo);
                var dealLinkBlock = $("<div>");
                dealLinkBlock.addClass("card-block");
                dealLinkBlock.append("<a href='" + dealUrl +"' class='card-link'  target='_blank'>" + "Get this deal >>" + "</a>");
                newDealDivCard.append(newDealDivImg);
                newDealDivCard.append(newDealDivBlock);
                newDealDivCard.append(newDealDivInspection);
                newDealDivCard.append(inspectionInfo);
                newDealDivCard.append(dealLinkBlock);
                newDealDiv.append(newDealDivCard);
                $(".results-section").append(newDealDiv);
                //Humera's changes. 10/10 I fixed the URL so it factors the longitude, latitude and it includes the new variable we're working with. 
                $.ajax({
                    url: "https://data.cityofchicago.org/resource/cwig-ma7x.json?$limit=50000000&$where=within_circle(location, "+latitude+",%20"+longitude+",%20200)AND%20starts_with(aka_name, %27" +superFfinalURL+ "%27) ",
                    type: "GET",
                    data: {
                      "$$app_token" : "YyemuyggIVumoVRnsbIlmLeqq"
                    }
                }).done(function(data) {    
                    if (! data[0]) return;
                    // first, sort the data by inspection date           
                    data.sort(function(a, b) {
                        return parseFloat(b.inspection_date) - parseFloat(a.inspection_date);               
                        console.log(data);
                    }); 
                    // grab info from most recent inspection
                    var akaName = (data[0].aka_name);
                    riskResponse = data[0].risk;
                    violationsResponse = data[0].violations;
                    var inspectionDate = data[0].inspection_date;
                    console.log(akaName);
                    console.log(inspectionDate);
                    console.log("risk reponse : " + riskResponse);
                    console.log("violations response: " +violationsResponse);
                    
                    // console.log("p[data-name='" + nameUppercase + "']");
                    $("p[data-name='" + akaName.substr(0,3) + "']").text(riskResponse);
                    $("p[data-input='" + akaName.substr(0,3) + "']").text(violationsResponse);
                }); // close city data API call (.done)
                    // console.log("now im grabbing riskResponse: " + riskResponse)
                    // we're tryng to add risk rating to DOM card
                    
                    // $("[data-name~='" + nameUppercase + "'] .violation-data").text(violationsResponse);
            } // close if statement checking for restaurants    
        } //close for loop
    }); // close sqoot API call
}); // close submit button listener
})
