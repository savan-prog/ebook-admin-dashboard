//Total Books js logic
let books;
let users;
let order;
const data = localStorage.getItem("book-data");
if (data !== null) {
  books = JSON.parse(data);
} else {
  books = [];
}

//target the totalBooks h3 tag
document.getElementById("totalBooks").textContent = books.length;

//Total Users
const ebookUser = localStorage.getItem("ebook-users");
if (ebookUser !== null) {
  users = JSON.parse(ebookUser);
} else {
  users = [];
}

let allUsers = users.filter((item) => {
  return item.status === "user";
});
document.getElementById("totalUsers").textContent = allUsers.length;

//total Orders
// const orders = localStorage.getItem("orders");
// if(orders !== null){
//     order = JSON.parse(orders);
// }
// else{
//     order = [];
// }
// document.getElementById("totalOrders").textContent = order.length;

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

function showRecentUsers() {
  const ebookUser = localStorage.getItem("ebook-users");
  if (ebookUser !== null) {
    users = JSON.parse(ebookUser);
  } else {
    users = [];
  }

  //target the recentBooks Ul tag
  let recentUser = document.getElementById("recentUsers");
  recentUser.innerHTML = "";

  users
    .filter((items) => items.status === "user")
    .slice(-3)
    .reverse()
    .forEach((record) => {
      recentUser.innerHTML += `<li>
        <strong>👤 ${record.username}</strong> <br>
        <small>${record.useremail}</small>
        </li>`;
    });
}
showRecentUsers();
