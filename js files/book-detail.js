const params = new URLSearchParams(window.location.search); // esse jo url pe id di hai index.html mai curousel mai anchor tag pe vo nikalenge
const bookId = params.get("id");
// console.log(bookId);

//homeBooks object (common.js file mai bna hai) pe loop chalayenge or jo id hai uska object nikalenge
const book = homeBooks.find((item) => {
  return item.bookId === bookId; // yaha jo equal ke right side vali bookId hai vo url se id pass ki thi vo hai jo upar hmne get ki hai params mai
});
// console.log(book);

//target the "div = main-content" img tag
document.getElementById("bookImage").src = book.bookImage;

//target the "div = main-content-text" h1 and p tags
document.getElementById("bookTitle").textContent = book.bookTitle;
document.getElementById("bookAuthtor").textContent = book.author;
document.getElementById("category").textContent = book.category;
document.getElementById("price").textContent = book.price;

//target the "section = about-this-book" p tag
document.getElementById("bookAbout").textContent = book.about;

//target the "section = book-information" p tag
document.getElementById("bookLanguage").textContent = book.language;
document.getElementById("bookPages").textContent = book.pages;
document.getElementById("bookPublisher").textContent = book.publisher;
document.getElementById("bookYear").textContent = book.publicationYear;

//target the "div = main-content-btn" button tag
document.getElementById("addCartBtn").onclick = function () {
  //yaha onclick pe ek function pass kia homeBookcart jiske andr (argument/value pass kia hai)
  homeBookCart(book.bookId);
  // console.log(book.bookId);
};
