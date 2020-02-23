(function () {
	var mockDatabase = [
		{ _id: '123', title: 'Article 1', price: '8', img: './images/product1.jpg', category:'makeup'},
		{ _id: '324', title: 'Article 2', price: '4', img: './images/product2.jpg', category:'makeup'},
		{ _id: '984', title: 'Article 3', price: '5', img: './images/product3.jpg', category:'skincare'},
		{ _id: '546', title: 'Article 4', price: '1', img: './images/product4.png', category:'skincare'},
		{ _id: '778', title: 'Article 5', price: '3', img: './images/product5.jpg', category:'makeup'},
		{ _id: '168', title: 'Article 6', price: '7', img: './images/product6.jpg', category:'skincare'},
		{ _id: '543', title: 'Article 7', price: '9', img: './images/product7.jpg', category:'makeup'},
		{ _id: '678', title: 'Article 8', price: '2', img: './images/product8.jpg', category:'skincare'},
		{ _id: '876', title: 'Article 9', price: '6', img: './images/product9.jpg', category:'skincare'},
    ];
    function getInfo(results){
        var listInfos = results.map(function(result,index){
            return(
                '<p class="product_info">'+result.title+'</p>'
            )
        });
        return listInfos;
    }
    function getPrice(results){
        var listPrices = results.map(function(result,index){
            return(
                '<p class="product_price">'+'$'+result.price+'</p'
            )
        });
        return listPrices;
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
        var info = getInfo(results);
        var img = getImg(results);
        var price = getPrice(results);
        var i;
        
        var list = document.getElementsByClassName("list-container")[0];
        list.innerHTML='';

        for (i=0;i<info.length;i++){
            var card = document.createElement("div");
            card.className = "card";
            list.appendChild(card);
           
            var getCardImg = document.createElement("div");
            getCardImg.className="card_img";
            card.appendChild(getCardImg);

            var cardInfo = document.createElement("div");
            cardInfo.className ="card_info";
            card.appendChild(cardInfo);

            var getCardInfo = document.createElement("div");
            getCardInfo.className="card_title";
            cardInfo.appendChild(getCardInfo);

            var getCardPrice = document.createElement("div");
            getCardPrice.className="card_price";
            cardInfo.appendChild(getCardPrice);

            getCardImg.innerHTML+=img[i];
            getCardInfo.innerHTML+=info[i];
            getCardPrice.innerHTML+=price[i];            
        }

    	}
        document.getElementsByClassName("list-container")[0].addEventListener("load",renderList(mockDatabase));
   
	function orderBy(sortValue) {        
		var sortedResults = (sortValue === 'title') ? 
			mockDatabase.sort(function (a, b) { 
				var nameA = a.title.toUpperCase(); 
				var nameB = b.title.toUpperCase(); 
				if (nameA < nameB) {
				    return -1;
				}
				if (nameA > nameB) {
				    return 1;
				}
			}) : 
			mockDatabase.sort(function (a, b) { 
				return a[sortValue] - b[sortValue];
			});
		renderList(sortedResults);
    }
    
	document.querySelector('#orderBy').addEventListener('change', function(event){
		orderBy(event.target.value);
	});

	
	function toggleCategory(showCategory) {
		var filteredResults = mockDatabase.filter(function(result) {
			return result.category==showCategory;
		});
		renderList(filteredResults);
	}
	
	document.querySelector('#category').addEventListener('change', function(event){
		var value = event.target.value;
		toggleCategory(value);
    });

    function togglePriceRange(showPrice){
        if (showPrice==='5'){
            //under $5
            var filteredResults = mockDatabase.filter(function(result){
                return result.price <=5;
            });
        }
        else{
            var filteredResults = mockDatabase.filter(function(result){
                return result.price >5;
            });
        }
        return renderList(filteredResults);
        
    }
    document.querySelector('#priceRange').addEventListener('change', function(event){
		var value = event.target.value;
		togglePriceRange(value);
    });
})(); 
