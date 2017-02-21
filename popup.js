$(document).ready( 
 function() {
  $('#go').click(
   function () {
        var newURL;
        var start = "http://hiring.monster.com/jcm/resumesearch/searchresults.aspx?";
        var mid = "&rb=1&tsni=1&clv=&tcc=&q=";
        var end1 = "&rlid=316";
        var end2 = "&rlid=";
        var stringz;
        var zipcode;
        var radius;
        var iFrom;
        var oFrom;
        var iTo;
        var oTo;
        var minAge;
        var maxAge;
        var segRPCR;
        var segZipcode;
        var segRadius;
        var segAge;
	var zipPass = true;
	var agePass = true;

	// reset warning colorations from previous attempts
	//
	document.getElementById("r").style.backgroundColor = "white";
	document.getElementById("toi").style.backgroundColor = "white";

        // get inputs
        //
        stringz = $('#s').val();
        zipcode = $('#z').val();
        radius = $('#r').val();
        iFrom = $('#fromi').val();
        oFrom = $('#fromo').val();
        iTo = $('#toi').val();
        oTo = $('#too').val();

        // Converts date range input into minutes
        //
        switch (oFrom) {
            case "Days":
                minAge = iFrom * 1440;
                break;
            case "Weeks":
                minAge = iFrom * 10080;
                break;
            case "Months":
                minAge = iFrom * 43200;
                break;
            case "Years":
                minAge = iFrom * 524160;
                break;
            default:
                minAge = 0;
        }

        switch (oTo) {
            case "Days":
                maxAge = iTo * 1440;
                break;
            case "Weeks":
                maxAge = iTo * 10080;
                break;
            case "Months":
                maxAge = iTo * 43200;
                break;
            case "Years":
                maxAge = iTo * 524160;
                break;
            default:
                maxAge = 0;
        }

        // log to console for verification
        //
        console.log(stringz);
        console.log(zipcode);
        console.log(radius);
        console.log(iFrom);
        console.log(oFrom);
        console.log(iTo);
        console.log(oTo);
        console.log(minAge);
        console.log(maxAge);

        // check for valid logic in inputs -> error coloration if incorrect and return to end function
        //
        if ($('#z').val().length > 0 && $('#r').val().length === 0) {
            document.getElementById("r").style.backgroundColor = "red";
            zipPass = false;
        }

        if (minAge > maxAge) {
            document.getElementById("toi").style.backgroundColor = "red";
            agePass = false;
        }

	if ( !zipPass || !agePass) {
		return;
	} 

        // run replacement on the string and test
        //
        stringz = stringz.replace(/"/g, "%22");
        stringz = stringz.replace(/ /g, "+");

        console.log(stringz);

        // create segments
        //
        segRPCR = "&rpcr=" + zipcode + "-" + radius;
        segZipcode = "&co=US&zipcode=" + zipcode;
        segRadius = "&radius=" + radius;

        // determine segAge value
        //
        if ( $('#fromi').val().length === 0 && $('#toi').val().length === 0 ) {
            segAge = "mdatemaxage=43200";
        } 
	else if ( $('#fromi').val().length === 0 && $('#toi').val().length > 0) {
            segAge = "mdatemaxage=" + maxAge;
        } 
	else {
            segAge = "mdatemaxage=" + maxAge + "&mdateminage=" + minAge;
        }

        // log to console for verification
        //
        console.log(segRPCR);
        console.log(segZipcode);
        console.log(segRadius);
        console.log(segAge);

        // Check for zip & radius -> combine parts and test
        //
        if ($('#z').val().length === 0) {
            newURL = start + segAge + mid + stringz + end2;
        } 
	else {
            newURL = start + segAge + mid + stringz + segRPCR + segZipcode + segRadius + end1;
        }

        console.log(newURL);

        // generate new tab with constructed URL
        //
        chrome.tabs.create({ url: newURL });
    });
});