(function () {
	var mockDatabase = [
		{ _id: '123', title: 'Article 1/', price: '8', img: './images/product1.jpg'},
		{ _id: '324', title: 'Article 2/', price: '4', img: './images/product2.jpg'},
		{ _id: '984', title: 'Article 3/', price: '5', img: './images/product3.jpg'},
		{ _id: '546', title: 'Article 4/', price: '1', img: './images/product4.png'},
		{ _id: '778', title: 'Article 5/', price: '3', img: './images/product5.jpg'},
		{ _id: '168', title: 'Article 6/', price: '7', img: './images/product6.jpg'},
		{ _id: '543', title: 'Article 7/', price: '9', img: './images/product7.jpg'},
		{ _id: '678', title: 'Article 8/', price: '2', img: './images/product8.jpg'},
		{ _id: '876', title: 'Article 9/', price: '6', img: './images/product9.jpg'},
    ];
    function getInfo(results){
        var listInfos = results.map(function(result,index){
            return(
                '<p class="product_info">'+ '<span>'+result.title+'</span>'
                + result.price+'</p>'
            )
        });
        return listInfos;
    }
    
    function getImg(results){
        var listImgs = results.map(function(result,index){
            return(
                "<img class='product_img' src='"+result.img+"'>"
            )
        });
        return listImgs;
    }

	function renderList (results) {
	/*	var listBody = document.querySelector('.list-container');
        //document.getElementsByClassName('.list-container').innerHTML = '';
        console.log('test');
        var listItems = results.map(function (result, index) {
            return(
                "<img class='product_img' src='"+result.img+"'>"+'<p class="product_info">'+ '<span>'+result.title+'</span>'
                + result.price+'</p>'
            )
        });*/
        var info = getInfo(results);
        var img = getImg(results);

        var getCard = document.getElementsByClassName("card");
        var getCardInfo = document.getElementsByClassName("card_info");

        var i;
        for (i=0;i<info.length;i++){
            getCardInfo[i].innerHTML='';
            getCardInfo[i].innerHTML+=info[i];
        }
        

        for (i=0;i<img.length;i++){
            getCard[i].innerHTML='';
            getCard[i].innerHTML+=img[i];
        }
    	}

	renderList(mockDatabase);
   
	// Function to Order results list 
	function orderBy(sortValue) {
		// Sort method varies based on what type of value we're sorting 
		var sortedResults = (sortValue === 'Title') ? 
			mockDatabase.sort(function (a, b) { // Strings need to be sorted in a slightly more compldex way
				var nameA = a.name.toUpperCase(); // ignore upper and lowercase
				var nameB = b.name.toUpperCase(); // ignore upper and lowercase
				// Sorts alphabetically.  -1 puts it before. 1 puts it after
				if (nameA < nameB) {
				    return -1;
				}
				if (nameA > nameB) {
				    return 1;
				}
			}) : 
			mockDatabase.sort(function (a, b) { // Numbers a booleans are much simpler. 
												// Just need postive or negative number 
				// Object properties can be accessed through a string representing their name
				return a[sortValue] - b[sortValue];
			});
		renderList(sortedResults);
	}
	// Change events trigger after the value of a form input changes
	document.querySelector('#orderBy').addEventListener('change', function(event){
		// Event is the JavaScript event that transpired, in our change a CHANGE event.
		// Target is the element it was performed on, useful for when the event targets 
		// multiple elements.
		// Value has the name implies is the current value of the input element, if there is one
		orderBy(event.target.value);
	});

	// Function to filter out unpublished results
	function togglePublished(showPublished) {
		// If showPublished is TRUE, only display published results
		// Filter will only inclue objects that return TRUE from it's query
		var filteredResults = mockDatabase.filter(function (result) {
			// If showPublished is TRUE, always show.
			// Otherweise only show if published is TRUE
			return showPublished || result.published;
		});
		renderList(filteredResults);
	}
	// Change events trigger after the value of a form input changes
	document.querySelector('#published').addEventListener('change', function(event){
		// in this case value is a string that we need to convert to a boolean 
		var value = event.target.value === 'true';
		togglePublished(value);
	});



})(); // Wrap entire file in self executing function. 
      // Keeping all variables declared in this file inside a local scope.