$(document).ready(function() {
    
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCgLQigSk7txmGmlMDim4FhcyvGg-eKql0",
        authDomain: "youpon-182016.firebaseapp.com",
        databaseURL: "https://youpon-182016.firebaseio.com",
        projectId: "youpon-182016",
        storageBucket: "",
        messagingSenderId: "801527230420"
    };
    firebase.initializeApp(config);
    // <!-- Link to Firebase Auth UI -->
        // FirebaseUI config.
    var provider = new firebase.auth.GoogleAuthProvider();
    var uiConfig = {
        signInSuccessUrl: 'index.html',
        signInFlow: "popup",
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);






    // checks if the Firebase authentication has changed
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            $("#account-details").text(email);
            $("#sign-in-status-container").show();
            $("#signInButton").hide();
            $("#sign-out").show();

        } else {
            // redirects to login
            // window.location = "index.html";
            return;
        }
    });
    // logouts the user
    $("#sign-out").on("click", function() {
        firebase.auth().signOut();
        $("#signInButton").show();
        $("#sign-in-status-container").hide();
        $("#sign-out").hide();
    })



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
    var originalURL = "https://api.sqoot.com/v2/deals?query="+ userKey+ "&category_slug=restaurants&location=cityofchicago&api_key=ayeoGcPfH-7ZUjj5u082";
    var queryURL1 = "https://cors-anywhere.herokuapp.com/" + originalURL

    $.ajax({

        url: queryURL1,
        method: "GET",
        dataType: "json",
      	// this headers section is necessary for CORS-anywhere
      	headers: {
        "x-requested-with": "xhr" 
    	}
    }).done(function(response) {
        console.log(response)
        if (response.deals.length === 0) {
        	$(".results-section").append("<p class='text-muted'> No results found </p>");
        } else {

	        for (var i = 0; i < 10 ; i++) {
	            
	            var category_slug= response.deals[i].deal.category_slug;
	            console.log(category_slug)
	            
	            // make sure we're pulling restaurants!
	            if(category_slug==="restaurants") {
	                
	                //Begin Humera's changes. 10/10 Added longitude longitude, corrected the URL, search by restaurant name first two letters.
	                var imgUrl = response.deals[i].deal.image_url;
	                var h1 = response.deals[i].deal.title;
	                console.log(h1);
	                var restaurant = response.deals[i]
	                var latitude = restaurant.deal.merchant.latitude.toString().substr(0, 8);
	                var longitude = restaurant.deal.merchant.longitude.toString().substr(0, 8);
	                var name = response.deals[i].deal.merchant.name;
	                var nameUppercase = name.toUpperCase();
	                var useName = nameUppercase.substr(0, 4);
	                var urlCorrected = encodeURIComponent(nameUppercase)
	                var finalURL = urlCorrected.replace("'", "%27").replace("-", "%2D").replace("!", "%21");
	                var superFinalURL = finalURL.toString().substr(0, 2);
	                var superFfinalURL = superFinalURL.replace(/ /g, "%20");
	                //end Humera's changes
	            
	                var dealUrl = response.deals[i].deal.url;
	                
	                var newDealDiv = $("<div>");
	                // newDealDiv.addClass("col-sm-6 col-md-4 col-lg-3");
	                var newDealDivCard = $("<div>");
	                newDealDivCard.addClass("card");
	                var newDealDivImg = $("<img>");
	                newDealDivImg.addClass("card-img-top img-responsive");
	                newDealDivImg.attr("src", imgUrl);
	                newDealDivImg.attr("alt", "Card image cap");
	                var newDealDivBlock = $("<div>");
	                newDealDivBlock.addClass("card-block");

	                newDealDivBlock.append("<span class='bookmark'><img class='img-responsive bookmark-icon' data-state='unsaved' src='images/bookmark-icon-unclicked.png'></span> <br><br> <h5 class='card-title'>" + name + "</h5>");

	                newDealDivBlock.append("<p class='card-text text-muted'>" + h1 + "</p>");
	                
	                var newDealDivInspection = $("<div> Risk Level: </div>");
	                newDealDivInspection.addClass("inspection-ratings");
	                newDealDivInspection.attr('data-name', useName);
	                

	                // var inspectionInfo = $("<p>");
	                // inspectionInfo.addClass("violation-data")
	                // inspectionInfo.attr('data-input', useName);
	                // newDealDivInspection.append(inspectionInfo);
	                var violationsButton = $("<button> See Inspection Results</button>");
	                violationsButton.addClass('btn btn-default violationsButton')
	                violationsButton.attr({
	                	"data-toggle": 'modal',
	                	"data-target": '#violationsModal',
	              		"data-input": useName,
	                });

	                var inspectionList = $("<ul>");
	                inspectionList.addClass('list-group list-group-flush')
	                var inspectionListItem1 = $("<li>");
	                inspectionListItem1.addClass('list-group-item')
	                inspectionListItem1.append(newDealDivInspection);
	                inspectionListItem1.append(violationsButton);
	                inspectionList.append(inspectionListItem1);
	                
	                var dealLinkBlock = $("<div>");
	                dealLinkBlock.addClass("card-block");
	                dealLinkBlock.append("<a href='" + dealUrl +"' class='card-link'  target='_blank'>" + "Get this deal >>" + "</a>");
	                
	                newDealDivCard.append(newDealDivImg);
	                newDealDivCard.append(newDealDivBlock);
	                newDealDivCard.append(inspectionList);
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
	                    var riskLevel = parseInt(riskResponse.substr(5, 1));
	                    var numSplats = (6 - riskLevel);
	                    console.log("RISK LEVEL: " + riskLevel);
	                    console.log("NUM SPLATS: " + numSplats);
	                    for (var i = 0; i < numSplats; i++){
	                    	$("div[data-name='" + akaName.substr(0,4) + "']").append($("<img class='green-splat img-responsive' src='../YOUPON/images/green-splat.png'>"));
	                    }
	                    $("button[data-input='" + akaName.substr(0,4) + "']").attr("data-info", violationsResponse);

	                }); // close city data API callback (.done)
	                    
	            } // close if statement checking for restaurants    
	        } //close for loop
	    } // close else 
	    console.log('CORS anywhere response', response);
	}) // close sqoot API .done callback
    .fail(function(jqXHR, textStatus) { 
      console.error(textStatus)
    });


	// auto scroll to Search Results section
	$('html, body').animate({
	    scrollTop: $(".view-2").offset().top
	}, 800, 'linear');

}); // close submit button listener

//bookmark function
$(document).on("click", ".bookmark", function() {
	var img = $(this).children(":first");
	var state = img.attr("data-state");
	
	if (state === "unsaved"){
		img.attr("src", "images/bookmark-icon-clicked.png");
		img.attr("data-state", "saved")

		// add Firebase functionality HERE

	} else if (state === "saved") {
		img.attr("src", "images/bookmark-icon-unclicked.png")
		img.attr("data-state", "unsaved")

		// add Firebase functionality HERE
	}
}); //end bookmark function



$('#violationsModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var info = button.data('info') // Extract info from data-* attributes
  var name = button.data('input')

  var modal = $(this)
  modal.find('.modal-title').text('Inspection Results -- ' + name)
  if (!info) {
  	modal.find('.modal-body').text("No inspection results were found")
  } else {
	  var split = info.split("|");
	  for (i = 0; i < split.length; i++) {
	  	modal.find('.modal-body').append($("<p>" + split[i] + "<p>"))
	  }
  }
})



})
