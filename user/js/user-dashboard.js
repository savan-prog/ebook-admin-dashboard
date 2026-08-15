// currentUser
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//Total Books js logic
let books;
let orders;
let cart;
const data = localStorage.getItem("book-data");
if (data !== null) {
  books = JSON.parse(data);
} else {
  books = [];
}

//target the totalBooks h3 tag
document.getElementById("totalBooks").textContent = books.length;

//Total orders
const ebookOrder = localStorage.getItem("ebook-orders");
if (ebookOrder !== null) {
  orders = JSON.parse(ebookOrder);
} else {
  orders = [];
}

let myOrders = orders.filter((item) => {
  return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali user-dashboard.js file ek hi page user-dashboard.html pe load ho rhi hai to user-dashboard.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
});
document.getElementById("totalOrders").textContent = myOrders.length;

// total cartItems
const ebookCart = localStorage.getItem("ebook-cart");
if (ebookCart !== null) {
  cart = JSON.parse(ebookCart);
} else {
  cart = [];
}

let myCart = cart.filter((item) => {
  return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali user-dashboard.js file ek hi page user-dashboard.html pe load ho rhi hai to user-dashboard.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
});
document.getElementById("totalCart").textContent = myCart.length;

//Recent Book & Recent User functionality
function showRecentBooks() {
  const data = localStorage.getItem("book-data");
  if (data !== null) {
    books = JSON.parse(data);
  } else {
    books = [];
  }

  //target the recentBooks Ul tag
  let recentBooks = document.getElementById("recentBooks");
  recentBooks.innerHTML = "";

  books
    .slice(-3)
    .reverse()
    .forEach((items) => {
      recentBooks.innerHTML += `<li>
        <strong>📘 ${items.bookTitle}</strong> <br>
        <small>By ${items.authorName}</small>
        </li>`;
    });
}
showRecentBooks();

function showRecentOrders() {
  const ebookOrders = localStorage.getItem("ebook-orders");
  if (ebookOrders !== null) {
    orders = JSON.parse(ebookOrders);
  } else {
    orders = [];
  }

  //target the recentBooks Ul tag
  let recentOrders = document.getElementById("recentOrders");
  recentOrders.innerHTML = "";

  let myOrders = orders.filter((item) => {
    return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali user-dashboard.js file ek hi page user-dashboard.html pe load ho rhi hai to user-dashboard.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
  });

  if (myOrders.length === 0) {
    recentOrders.innerHTML = "<li>No Orders Yet</li>";
  } else {
    myOrders
      .slice(-3)
      .reverse()
      .forEach((record) => {
        recentOrders.innerHTML += `<li>
        <strong>👤 ${record.orderId}</strong> <br>
        <small>${record.status}</small>
        </li>`;
      });
  }
}
showRecentOrders();
