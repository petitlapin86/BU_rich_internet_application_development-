var myModule = angular.module('shoppingCart', []); //define module

myModule.controller('CartController', function CartController($scope) {
    if (localStorage.books_cart) {
        $scope.books = JSON.parse(localStorage.getItem("books_cart")); //grab from local storage, also naming my local storage books_cart
    } else{
        $scope.books = [ //otherwise grab these defined books
            {
                title: "Absolute Java", //book 1
                qty: 1,
                price: 114.95
            },
            {
                title: "Pro HTML5", //book 2
                qty: 2,
                price: 27.95
            },
            {
                title: "Head First HTML5", //book 3
                qty: 1,
                price: 27.89
            }
        ];
    }

    // GET TOTAL PRICE
    $scope.getTotalPrice = function() { //define a function
        var totalPrice = 0; //begin price at zero

        for(var i=0; i<$scope.books.length; i++) { //iterate over all books with for loop
            totalPrice += $scope.books[i].price * $scope.books[i].qty; //find the price of each book and consider the quantity
        }

        totalPrice = totalPrice.toFixed(2);
        $scope.books.totalPrice = totalPrice;
        return totalPrice
    }

    $scope.books.totalPrice = $scope.getTotalPrice(); //

    //ADD A NEW BOOK
    $scope.addBook = function() {
        $scope.books.push({ //push onto books array
            title: "New Book", //default title
            qty: 1, //default quantity
            price: 10.99 //default price
        });
        $scope.getTotalPrice();  //update price total
    }

    //SAVE A BOOK
    $scope.saveBook = function() { //define function
        localStorage.setItem("books_cart", JSON.stringify($scope.books)); //save item to local storage
    }

    // REMOVE A BOOK
    $scope.removeBook = function(index) { //define function
        $scope.books.splice(index, 1); //cut index out of books array
        $scope.getTotalPrice(); //update price total
    }
});
