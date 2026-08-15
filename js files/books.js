// Books.html page js (books section js)

const books = [
  //bussiness category
  {
    bookId: "BOOK101",
    bookTitle: "The Psychology of Money",
    author: "Morgan Housel",
    price: 299,
    category: "bussiness",
    bookImage: "./images/bussiness category img1.jpeg",
  },
  {
    bookId: "BOOK102",
    bookTitle: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 299,
    category: "bussiness",
    bookImage: "./images/bussiness category img2.jpeg",
  },
  {
    bookId: "BOOK103",
    bookTitle: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 299,
    category: "bussiness",
    bookImage: "./images/bussiness category img3.jpeg",
  },
  {
    bookId: "BOOK104",
    bookTitle: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: 299,
    category: "bussiness",
    bookImage: "./images/bussiness category img4.jpeg",
  },

  //technology category
  {
    bookId: "BOOK105",
    bookTitle: "Clean Code",
    author: "Robert C. Martin",
    price: 299,
    category: "technology",
    bookImage: "./images/technology category img1.jpeg",
  },
  {
    bookId: "BOOK106",
    bookTitle: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    price: 299,
    category: "technology",
    bookImage: "./images/technology category img2.jpeg",
  },
  {
    bookId: "BOOK107",
    bookTitle: "You Don't Know JS",
    author: "Kyle Simpson",
    price: 299,
    category: "technology",
    bookImage: "./images/technology category img3.jpeg",
  },
  {
    bookId: "BOOK108",
    bookTitle: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 299,
    category: "technology",
    bookImage: "./images/technology category img4.jpeg",
  },

  //fictional category
  {
    bookId: "BOOK109",
    bookTitle: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    price: 299,
    category: "fictional",
    bookImage: "./images/fictional category img1.jpg",
  },
  {
    bookId: "BOOK110",
    bookTitle: "The Hobbit",
    author: "J. R. R. Tolkien",
    price: 299,
    category: "fictional",
    bookImage: "./images/fictional category img2.jpeg",
  },
  {
    bookId: "BOOK111",
    bookTitle: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    category: "fictional",
    bookImage: "./images/fictional category img3.jpeg",
  },
  {
    bookId: "BOOK112",
    bookTitle: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    price: 299,
    category: "fictional",
    bookImage: "./images/fictional category img4.jpeg",
  },
];

function renderBooks(bookArray) {
  // target the books-container (div tag)
  const container = document.querySelector(".books-container");

  container.innerHTML = ""; //row type , yaha row nhi bnayi or direct tag ke innerHtml mai data de denge niche

  // Now we will apply loops/methods on the array.
  bookArray.forEach((items, index) => {
    container.innerHTML += `<div class="book-card text-center" data-category="${items.category}">
                        <a href="javascript:void(0)"><img src="${items.bookImage}" alt="" class="business-img"></a>
                        <h5>${items.bookTitle}</h5>
                        <p>${items.author}</p>
                        <h6>₹ ${items.price}</h6>
                        <button type="button" class="btn btn-primary btn-sm mb-5" onclick="booksCart('${items.bookId}')">Add to Cart</button>
                    </div>`;
  });
}
renderBooks(books); // "books" array passing as an argument in function

// target the book search section's ul li a (category links ko target kia yaha ek sath )
const filterBtns = document.querySelectorAll(".category-link");
//taget the books-cotainer (div tag)
const container = document.querySelector(".books-container");

filterBtns.forEach((btn) => {
  /* filterBtns ek nodelist hai or nodelist par kewal forEach method hi chal skti hai array ki otherwise nodelist ko array mia convert karke array methods use hoti hai*/
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // e.preventDefault esliye kyonki anchor tag ke andar hai categories name to page jump ya reload problem create na ho usse esliye lagaya

    const category = btn.dataset.filter; //take data-filter (data attribute) value.

    if (category === "all") {
      container.classList.remove("filtered"); // ye all catogries vala ul li dikhe to ek row mai 3 images ho uske liye and classList ek element/tag ki classes ko manage karta hai.
      renderBooks(books);
    } else {
      container.classList.add("filtered"); // yadi category=== all nahi hia to ye filtered class container (.books-container) vale div mai add karo or eski js apply karo

      const filteredBooks = books.filter((book) => {
        return book.category === category;
      });
      renderBooks(filteredBooks);
    }
  });
});

// home.html page ki search input ki value (jo user type karega) ko url ke through lenge books.js page mai
const params = new URLSearchParams(window.location.search); // here urlsearchparams is js url (web)paramerter jo home.html page ki search value ko access karega search parameter se.
// console.log(params);     //object milta hai jo url parameters ko manage krta hai.
const urlsearchValue = params.get("search"); //url parameter se value li yaha.
// console.log(urlsearchValue);

if (urlsearchValue) {
  const urlFilteredBooks = books.filter((book) => {
    return (
      book.bookTitle.toLowerCase().includes(urlsearchValue.toLowerCase()) ||
      book.author.toLowerCase().includes(urlsearchValue.toLowerCase()) ||
      book.category.toLowerCase().includes(urlsearchValue.toLowerCase())
    );
  });
  renderBooks(urlFilteredBooks);
} else {
  renderBooks(books);
}

// input tag search functionality (books.html page ka search input)
const searchInput = document.getElementById("searchInput");

// agar user Home page se "rich" search karke aaya, to Books page ke search box me bhi "rich" already dikh jayega
if (urlsearchValue) {
  searchInput.value = urlsearchValue;
}

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredBooks = books.filter((book) => {
    return (
      book.bookTitle.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue)
    );
  });
  renderBooks(filteredBooks);
});
