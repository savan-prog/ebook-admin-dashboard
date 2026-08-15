// currentUser
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let books;
let cart;

// show books function
function showBooks() {
  const data = localStorage.getItem("book-data");
  if (data !== null) {
    books = JSON.parse(data);
  } else {
    books = [];
  }
  displayBooks(books);
}
showBooks();

//displaybooks function
function displayBooks(bookArray) {
  //target the div tag from "topbar-middle-content".
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  bookArray.forEach((items, index) => {
    container.innerHTML += `<div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
        <div class="card h-100">
        <img src="${items.BookPics}">
        <div class="card-body">
        <h5>${items.bookTitle}</h5>
        <p>${items.authorName}</p>
        <h6>₹ ${items.price}</h6>
        <button class="btn btn-primary btn-sm me-2" onclick="viewBook(${index})" data-bs-toggle="modal" data-bs-target="#viewBookModal">view</button>
        <button class="btn btn-success btn-sm" onclick="addToCart(${index})">Add To Cart</button>
        </div>
        </div>
        </div>`;
  });
}

//search book function
function searchBook() {
  //target the search input  from "topbar-middle content"
  const searchValue = document.getElementById("searchBook").value.toLowerCase();

  let filteredBooks = books.filter((item) => {
    return (
      item.bookTitle.toLowerCase().includes(searchValue) ||
      item.authorName.toLowerCase().includes(searchValue)
    );
  });
  displayBooks(filteredBooks);
}

//viewBook function
function viewBook(index) {
  let book = books[index];

  document.getElementById("viewImage").src = book.BookPics;
  document.getElementById("viewTitle").textContent = book.bookTitle;
  document.getElementById("viewAuthor").textContent = book.authorName;
  document.getElementById("viewCategory").textContent = book.category;
  document.getElementById("viewPrice").textContent = book.price;
  document.getElementById("viewDescription").textContent = book.description;
}

//add to cart function
function addToCart(index) {
  //jis book par user ne add to cart kia
  let book = books[index];

  //cart data
  let ebookCart = localStorage.getItem("ebook-cart");
  if (ebookCart !== null) {
    cart = JSON.parse(ebookCart);
  } else {
    cart = [];
  }

  //check karenge ki user ne phle se hi cart mai book add kr rkhi hai ya nahi yadi kar rakhi hai to quatity increase kar do or nahi kar rkhi hai to cart mai add kar do book ko
  let existingBook = cart.find((item) => {
    //find , object return krta hai
    return (
      item.bookId === book.bookId && //cart array/localstorage key === book-data array/localstorage key mai match kr rhe hai
      item.email === currentUser.useremail //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali all-book.js file ek hi page all-book.html pe load ho rhi hai to all-book.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
    );
  });

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push({
      bookId: book.bookId,
      email: currentUser.useremail,
      bookTitle: book.bookTitle,
      bookImage: book.BookPics,
      bookPrice: book.price,
      quantity: 1,
    });
  }
  localStorage.setItem("ebook-cart", JSON.stringify(cart));
}
