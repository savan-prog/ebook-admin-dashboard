// function homeBookCart()
function homeBookCart(bookId) {
  console.log(bookId);
  const book = homeBooks.find((item) => {
    return item.bookId === bookId;
  });
  // console.log(book);
  addToCart(book);
}

//booksCart function
function booksCart(bookId) {
  const book = books.find((item) => {
    return item.bookId === bookId;
  });
  addToCart(book);
}

//declare the array
let cart;

function addToCart(book) {
  // console.log(book);
  //localstorage se cart data nikalenge
  let data = localStorage.getItem("ebook-guestCart");
  if (data !== null) {
    cart = JSON.parse(data);
  } else {
    cart = [];
  }

  //check karenge ki book phle se cart mai add to nahi kar rkhi hai
  const existingBook = cart.find((item) => {
    return item.bookId === book.bookId; //book.booId mai book ek parameter hai jo upar function mai dia hai and ye parameter ek object recieve kr rha hia jo index.js , books.js mai addToCart mai pass kia hai
  });

  //yadi book cart mai hai to
  if (existingBook) {
    existingBook.quantity += 1;
    //total update
    existingBook.total = existingBook.quantity * existingBook.price;
  } else {
    cart.push({
      ...book, //in future book object mai koi key add krna rha to vo automatically cart mai push bhi ho jayegi esa krne se
      quantity: 1,
      total: book.price,
    });
  }
  localStorage.setItem("ebook-guestCart", JSON.stringify(cart));
  //update cart
  updateCartCount();
  //alert message
  alert("Book Added To Cart Successfully");
}

//updateCart Count function
function updateCartCount() {
  let data = localStorage.getItem("ebook-guestCart");
  if (data !== null) {
    cart = JSON.parse(data);
  } else {
    cart = [];
  }

  //target the cart
  const count = document.getElementById("cartCount");
  if (count) {
    count.textContent = cart.length;
  }
}
updateCartCount();

//renderCart funciton
function renderCart() {
  //target the tbody tag
  const table = document.getElementById("cartTable");
  if (!table) {
    //table === null
    return;
  }
  let data = localStorage.getItem("ebook-guestCart");
  if (data !== null) {
    cart = JSON.parse(data);
    // console.log(cart);
    table.innerHTML = "";

    //Grand Total
    let grandTotal = 0;

    cart.forEach((item, index) => {
      grandTotal = grandTotal + item.total;

      table.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>
                <img src="${item.bookImage}" width="70">
            </td>
            <td>${item.bookTitle}</td>
            <td>₹ ${item.price}</td>
            <td>
            <button class="btn btn-success btn-sm" onclick="decreaseQty('${item.bookId}')"> - </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-success btn-sm" onclick="increaseQty('${item.bookId}')"> + </button>
            </td>
            <td>₹ ${item.total}</td>
            <td>
                <button  class="btn btn-danger btn-sm" onclick="removeBook('${item.bookId}')"> Remove </button>           
            </td>
        </tr>`;
    });
    const total = document.getElementById("grandTotal");
    if (total) {
      total.textContent = grandTotal;
    }
  } else {
    table.innerHTML = `<tr>
        <td colspan="7">
            Cart is Empty
        </td>
    </tr>`;
    const total = document.getElementById("grandTotal");
    if (total) {
      total.textContent = 0;
    }
  }
}
renderCart();

//function increaseQuantity
function increaseQty(bookId) {
  const item = cart.find((book) => {
    return book.bookId === bookId;
  });

  item.quantity = item.quantity + 1;
  item.total = item.quantity * item.price;

  //update the local storage
  localStorage.setItem("ebook-guestCart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

//function decreaseQty
function decreaseQty(bookId) {
  const item = cart.find((book) => {
    return book.bookId === bookId;
  });

  if (item.quantity > 1) {
    item.quantity = item.quantity - 1;
    item.total = item.quantity * item.price;
  } else {
    cart = cart.filter((book) => {
      return book.bookId !== bookId;
    });
  }
  //update the localstorage
  localStorage.setItem("ebook-guestCart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

//remove cart item function
function removeBook(bookId) {
  cart = cart.filter((item) => {
    return item.bookId !== bookId;
  });
  localStorage.setItem("ebook-guestCart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

//empty cart functionality
//target the "emptyCartBtn" button tag
const emptyBtn = document.getElementById("emptyCartBtn");

if (emptyBtn) {
  emptyBtn.onclick = function () {
    localStorage.removeItem("ebook-guestCart");
    cart = [];
    updateCartCount();
    renderCart();
  };
}

//checkout functionality
const checkoutBtn = document.getElementById("checkoutBtn");
const orderMessage = document.getElementById("orderMessage");
if (checkoutBtn) {
  checkoutBtn.onclick = function () {
    if (cart.length === 0) {
      orderMessage.textContent = "Your Cart is Empty!";
      orderMessage.classList.remove("text-success");
      orderMessage.classList.add("text-danger");
      return;
    }
    orderMessage.textContent = "✅ Order Placed Successfully!";
    orderMessage.classList.remove("text-danger");
    orderMessage.classList.add("text-success");

    //after order placed successfully
    setTimeout(() => {
      localStorage.removeItem("ebook-guestCart");
      cart = [];
      updateCartCount();
      renderCart();
    }, 1500);
  };
}
