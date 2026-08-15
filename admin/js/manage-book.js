//Manage All Books

let bookArray;
function manageBooks() {
  //target the tbody tag
  let t_Body = document.getElementById("bookData");

  t_Body.innerHTML = "";

  let data = localStorage.getItem("book-data");
  if (data != null) {
    bookArray = JSON.parse(data);
  } else {
    bookArray = [];
  }

  bookArray.forEach((items, index) => {
    t_Body.innerHTML += `<tr>
                        <td><img src = ${items.BookPics} width="100px" /></td>
                        <td>${items.bookTitle}</td>
                        <td>${items.authorName}</td>
                        <td>${items.category}</td>
                        <td>${items.price}</td>
                        <td>
                        <button class="btn btn-info btn-sm me-2" onclick="viewBook(${index})">View</button>
                        <button class="btn btn-primary btn-sm me-2" onclick="editBook(${index})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick= "deleteBook(${index})">Delete</button>
                        </td>
                    </tr>`;
  });
}
manageBooks();

// viewBook function
function viewBook(id) {
  // console.log(id);
  localStorage.setItem("view-book-id", id);
  window.location.href = "view-book.html";
}

// deleteBook function
function deleteBook(id) {
  //confirmation popup before delete the data.
  const check = confirm("Are you sure want to delete this book?");
  if (check) {
    const data = localStorage.getItem("book-data");
    if (data != null) {
      bookArray = JSON.parse(data);
    } else {
      bookArray = [];
    }

    let newBookArray = bookArray.filter((items, index) => {
      return index !== id;
    });
    bookArray = newBookArray;
    localStorage.setItem("book-data", JSON.stringify(bookArray));

    //view-book-id vali key ko delete krna after delete the data (kyonki es key mai delete hone vale data ki id rhegi esliye)
    let viewId = Number(localStorage.getItem("view-book-id"));
    if (viewId === id) {
      localStorage.removeItem("view-book-id");
    }

    manageBooks(); //delete karne ke table ko refresh karne ke liye taki table se bhi hat jaye data
  }
}

//editBook function
function editBook(id) {
  localStorage.setItem("edit-book-id", id);
  window.location.href = "edit-book.html";
}
