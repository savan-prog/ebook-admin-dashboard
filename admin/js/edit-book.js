//declare the array
let bookArray;

//Image handler
let fileData = "";

function fileHandler(e) {
  fileData = e.target.files[0];
}

//Pdf handler
let pdfData = "";

function pdfHandler(e) {
  pdfData = e.target.files[0];
}

//get edit book id from localstroge (edit-book-id key se)
let id = Number(localStorage.getItem("edit-book-id"));

//get all books from localstorage (book-data key se)
let data = localStorage.getItem("book-data");
if (data !== null) {
  bookArray = JSON.parse(data);
} else {
  bookArray = [];
}

//Get select book (jisko edit karna hai)
let book = bookArray[id];

//Agar book exist hi nhi krti
if (!book) {
  alert("Book not found!");
  window.location.href = "manage-book.html";
}

//old image and old pdf url ko hold karenge (in case yadi image or pdf ko same rhne dena hai to)
let oldImage = book.BookPics;
let oldPdf = book.pdfFile;

//fill all the input fields
document.getElementById("book-title").value = book.bookTitle;
document.getElementById("author-name").value = book.authorName;
document.getElementById("category").value = book.category;
document.getElementById("language").value = book.language;
document.getElementById("price").value = book.price;
document.getElementById("page").value = book.pages;
document.getElementById("description").value = book.description;

async function updateBook(e) {
  e.preventDefault();

  // take the value of input fields after new value adding.
  const bookTitle = document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const category = document.getElementById("category").value;
  const language = document.getElementById("language").value;
  const price = document.getElementById("price").value;
  const pages = document.getElementById("page").value;
  const description = document.getElementById("description").value;

  let imageURL = oldImage;
  if (fileData) {
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("upload_preset", "bookImage");
    formData.append("cloud_name", "dlvd6hufx");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlvd6hufx/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await res.json();
    //  console.log(result);
    //  console.log("upload Image URL", result.secure_url);
    imageURL = result.secure_url;
  }

  let pdfURL = oldPdf;
  if (pdfData) {
    const pdfFormData = new FormData();
    pdfFormData.append("file", pdfData);
    pdfFormData.append("upload_preset", "bookPDF");
    pdfFormData.append("cloud_name", "dlvd6hufx");

    const pdfRes = await fetch(
      "https://api.cloudinary.com/v1_1/dlvd6hufx/auto/upload",
      {
        method: "POST",
        body: pdfFormData,
      },
    );
    const pdfResult = await pdfRes.json();
    // console.log(pdfResult);
    // console.log("upload pdf URL", pdfResult.secure_url);
    pdfURL = pdfResult.secure_url;
  }

  //object destructuring (jisme object key name and target input field value name is same) [upar jo elements target kiye hai vo object ki key ki value hai sb]
  let bookObject = {
    bookTitle,
    authorName,
    category,
    language,
    price,
    pages,
    BookPics: imageURL,
    pdfFile: pdfURL,
    description,
  };
  //   console.log(bookObject);

  //Array update
  bookArray[id] = bookObject;
  //   console.log(bookArray);

  //update localstorage
  localStorage.setItem("book-data", JSON.stringify(bookArray));

  //redirect manage.html page
  window.location.href = "manage-book.html";
}
