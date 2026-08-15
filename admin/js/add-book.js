//file handler function for image (image input in form)
let fileData = "";
function fileHandler(e) {
  //    const file = e.target.files;
  const file = e.target.files[0];
  //    console.log(file);
  fileData = file;
}

//pdf handler function for pdf
let pdfData = "";
function pdfHandler(e) {
  // const pdfFile = e.target.files;
  // console.log(pdfFile);
  const pdfFile = e.target.files[0];
  //    console.log(pdfFile);
  pdfData = pdfFile;
}

// Add books
async function addBook(e) {
  e.preventDefault();

  //receive the file from fileHandler function
  // console.log("file", fileData);

  //declare a array
  let bookArray;

  //create book Id varible for items increase, decrease and remove from cart. This bookId variable/key added in bookObject.
  const bookId = "Book" + Date.now(); //here "Book" is string name only nothing special and Book jitni bhi bookId baneghi unme aage ek keyword rahega bs

  // target the input elements
  const bookTitle = document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const language = document.getElementById("language").value;
  const pages = document.getElementById("page").value;
  const description = document.getElementById("description").value;

  //image upload into the cloudinary server
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
  // console.log(result);
  console.log("upload image URL :", result.secure_url); // "url" jo hai vo "data" ki "secure_url" key par hai

  //pdf file upload into cloudinary server
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
  console.log(pdfResult);
  console.log("Upload pdf URL : ", pdfResult.secure_url);

  //object destructuring (jisme object key name and target input field value name is same) [upar jo elements target kiye hai vo object ki key ki value hai sb]
  let bookObject = {
    bookId: "Book" + Date.now(),
    bookTitle,
    authorName,
    category,
    price,
    language,
    pages,
    BookPics: result.secure_url,
    pdfFile: pdfResult.secure_url,
    description,
  };

  //if data already stored into the local storage.
  const data = localStorage.getItem("book-data");
  if (data != null) {
    bookArray = JSON.parse(data);
  } else {
    bookArray = [];
  }

  // push bookObject (data) into array
  bookArray.push(bookObject);
  // console.log(bookArray);

  // store this bookObject into the localstorage
  localStorage.setItem("book-data", JSON.stringify(bookArray));

  //clear the form inputs
  frm.reset();
}
