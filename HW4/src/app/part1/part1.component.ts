import { Component, OnInit } from '@angular/core';

@Component({ //this is a decorator
  selector: 'app-part1', //create selector
  templateUrl: './part1.component.html', //connect to html
  styleUrls: ['./part1.component.css'] //connect to css
})
export class Part1Component implements OnInit { //this is a class


    books: any;
    totalPrice: any;

    // check localstorage
    constructor() { //this is a constructor within the class Part1Component
      if (localStorage.books_cart) {
        this.books = JSON.parse(localStorage.getItem('books_cart')); //grab from local storage, also naming my local storage books_cart
      } else {
        this.books = [ //otherwise grab these defined books
          {
            title: 'Absolute Java', //book 1
            qty: 1,
            price: 114.95
          },
          {
            title: 'Pro HTML5', //book 2
            qty: 2,
            price: 27.95
          },
          {
            title: 'Head First HTML5', //book 3
            qty: 1,
            price: 27.89
          }
        ];
      }

      // GET TOTAL PRICE
      this.getTotalPrice();
    }

    getTotalPrice(): void { //define a function
      this.totalPrice = 0; //begin price at zero
      for (let book of this.books) { //iterate over all books
        this.totalPrice += book.price * book.qty; //find price of each book and consider the quantity
      }

      this.totalPrice = this.totalPrice.toFixed(2);
      this.books.totalPrice = this.totalPrice;
    }

    //ADD A NEW BOOK
    addBook(event): void {
      this.books.push({ //push onto books array
        title: 'New Book', //default title
        qty: 1, //default quantity
        price: 10.99 //default price
      });
      this.getTotalPrice();  //update price total
    }

    // SAVE A BOOK
    saveBook(event): void { //define function
      localStorage.setItem('books_cart', JSON.stringify(this.books)); //save item to local storage
      this.getTotalPrice();
    }

    // REMOVE A BOOK
    removeBook(index) { //define function
      this.books.splice(index, 1); //cut index out of books array
      this.getTotalPrice(); //update price total
    }

    ngOnInit() { //this is a callback method
    }

  }
