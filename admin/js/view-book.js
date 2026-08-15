//view book function

function showBook() {
  //target the div tag from view.html page
  const element = document.getElementById("mainContentData");
  element.innerHTML = "";

  //localstorage se phle id nikalenge view-book-id vali key se
  let id = localStorage.getItem("view-book-id");

  //localstorage se "book-data" key se saari books ka data nikalenge
  let data = localStorage.getItem("book-data");
  //   console.log(data);
  if (data != null) {
    let bookArray = JSON.parse(data);

    let book = bookArray[id];
    // console.log(book);
    // console.log(book.pdfFile);
    element.innerHTML += `<div class="left-content">
            <img src=${book.BookPics} alt="">
            </div>
            <div class="right-content">
                    <h2 class="book-title">${book.bookTitle}</h2>
                    <p class="book-description">${book.description}</p>
                    <p><strong>Author :</strong> ${book.authorName}</p>
                    <p><strong>Category :</strong> ${book.category}</p>
                    <p><strong>Language :</strong> ${book.language}</p>
                    <p><strong>Price :</strong>Rs.${book.price}</p>
                    <p class="mb-4"><strong>Pages :</strong> ${book.pages}</p>
                    <a href="" class="btn btn-primary">Add to Cart</a>
                    <a href="${book.pdfFile}" download class="btn btn-success downloadBtn">
                    <i class="bx bx-download"></i> Download PDF    </a>
            </div>`;
  }
}
showBook();
