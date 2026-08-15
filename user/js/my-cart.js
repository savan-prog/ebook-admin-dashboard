// currentUser
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let cart;

const cartData = localStorage.getItem("ebook-cart");
if (cartData !== null) {
  cart = JSON.parse(cartData);
} else {
  cart = [];
}

//showCart function
function showCart() {
  //target the tbody tag
  const cartTable = document.getElementById("cartTable");
  cartTable.innerHTML = "";

  let grandTotal = 0;

  //current User cart only yani currentUser ka data nikalega cart ka
  let myCart = cart.filter((item) => {
    return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali my-cart.js file ek hi page my-cart.html pe load ho rhi hai to my-cart.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
  });

  //yadi myCart empty hua to
  if (myCart.length === 0) {
    cartTable.innerHTML = `<tr>
            <td colspan="6" class="text-center">
                Cart is Empty
            </td>
        </tr>
    `;

    document.getElementById("grandTotal").textContent = 0;
    return; // yadi cart empty hua to function yahi end ho jayega esliye return lagaya.
  }

  // yadi cart mai data hai to loop chal jayega
  myCart.forEach((items, index) => {
    let total = items.bookPrice * items.quantity; //Ek book ka total price (Price × Quantity)
    grandTotal += total; //grandtotal = grandtotal(0) + total;          //Saari books ka total bill "grandtotal"

    cartTable.innerHTML += ` <tr>
            <td>${index + 1}</td>
            <td>
                <img
                src="${items.bookImage}"
                class="book-img mb-3">
                <br>
                ${items.bookTitle}
            </td>
            <td>
                ₹${items.bookPrice}
            </td>
            <td>
                <button
                class="qty-btn"
                onclick="decreaseQty(${index})">
                -
                </button>
                <span class="qty-number">
                ${items.quantity}
                </span>
                <button
                class="qty-btn"
                onclick="increaseQty(${index})">
                +
                </button>
            </td>
            <td>
                ₹ ${total}
            </td>
            <td>
                <button
                class="btn btn-danger btn-sm"
                onclick="removeCart(${index})">
                Remove
                </button>
            </td>
        </tr>`;
  });
  document.getElementById("grandTotal").textContent = grandTotal;
}
showCart();

//increaseQty function
function increaseQty(index) {
  //cart mai se sirf current user jisne login kia hai uski add to cart vali book ka data nikal do yani object
  let myCart = cart.filter((item) => {
    return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali my-cart.js file ek hi page my-cart.html pe load ho rhi hai to my-cart.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
  });

  myCart[index].quantity = myCart[index].quantity + 1;
  //update the localstorage
  localStorage.setItem("ebook-cart", JSON.stringify(cart));
  showCart();
}

//decreaseQty function
function decreaseQty(index) {
  //cart mai se sirf current user jisne login kia hai uski add to cart vali book ka data nikal do yani object
  let myCart = cart.filter((item) => {
    return item.email === currentUser.useremail;
  });

  if (myCart[index].quantity > 1) {
    myCart[index].quantity = myCart[index].quantity - 1;
    //update the localStorage
    localStorage.setItem("ebook-cart", JSON.stringify(cart));
    showCart();
  }
}

//removeCart function
function removeCart(index) {
  let check = confirm("Are you sure want to remove this book form cart?");
  if (check) {
    //current user ka cart
    let myCart = cart.filter((item) => {
      return item.email === currentUser.useremail;
    });

    //jis book pe click kia uska bookId nikala
    let bookId = myCart[index].bookId;

    //original cart mai uska index match karwaya
    let realIndex = cart.findIndex((item) => {
      //realIndex mai index aayega kyonki findIndex , index return krta hai ojbect ka
      return item.bookId === bookId && item.email === currentUser.useremail;
    });

    //delete
    cart.splice(realIndex, 1);
    //array.splice(start, deleteCount(yani starting index se konse index tak delete krna hai vo count))

    //update the localstorage
    localStorage.setItem("ebook-cart", JSON.stringify(cart));
    showCart();
  }
}

//checkout function
function checkout() {
  const cartMessage = document.getElementById("cartMessage");

  let check = confirm("Are you sure want to place order?");

  if (!check) {
    return;
  }

  let myCart = cart.filter((item) => {
    return item.email === currentUser.useremail;
  });

  if (myCart.length === 0) {
    cartMessage.textContent = "Your Cart is Empty!";

    setTimeout(() => {
      cartMessage.textContent = "";
    }, 3000);

    return;
  }

  let orders;
  const orderData = localStorage.getItem("ebook-orders");
  if (orderData !== null) {
    orders = JSON.parse(orderData);
  } else {
    orders = [];
  }

  //cart ki har book ko order mai convert karenge
  myCart.forEach((item) => {
    //mycart.forEach() jo hai vo currentUser ki har book (cart vali) ko order bna rha hai
    //phle mycart pe loop chalega and then mycart mai jo data hai usko orders array mai add kar denge
    orders.push({
      orderId: "ORD" + Date.now() + Math.floor(Math.random() * 1000), //unique order id bnanae ke liye likha hai. Math.random() 0 se 1 ke bich random number deta hai ex- 0.52742 fir Math.random()*1000 = 527.42 fir Math.floor() ye decimal hta deta hai to ban jata hai "ORD" + date + 527 = ORD1753968215452527
      bookId: item.bookId,
      username: currentUser.username,
      email: currentUser.useremail,
      bookTitle: item.bookTitle,
      price: item.bookPrice,
      quantity: item.quantity,
      total: item.bookPrice * item.quantity,
      status: "pending",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
  });
  localStorage.setItem("ebook-orders", JSON.stringify(orders));

  //current user ka cart data empty karenge/remove krenge
  cart = cart.filter((items) => {
    return items.email !== currentUser.useremail;
  });
  //update the localstorage
  localStorage.setItem("ebook-cart", JSON.stringify(cart));

  //show order placed successfully message
  cartMessage.textContent = "✓ Order Placed Successfully!";
  cartMessage.style.color = "green";

  setTimeout(() => {
    cartMessage.textContent = "";
  }, 3000);

  showCart();
}
