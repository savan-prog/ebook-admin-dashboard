// currentUser
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

let orders;
const orderData = localStorage.getItem("ebook-orders");
if (orderData !== null) {
  orders = JSON.parse(orderData);
} else {
  orders = [];
}
// console.log(orders);

//show order function
function showOrders() {
  //current user ke oder nikalenge
  let myOrders = orders.filter((item) => {
    return item.email === currentUser.useremail; //"currentUser" jo ki user-common.js file mai declare hai jo ki ek "key" hai localstorage mai and user-common.js file or ye vali my-orders.js file ek hi page my-orders.html pe load ho rhi hai to my-orders.js file mai fir se currentUser ko delcare nhi kar skte hai direct use kar skte hai esko.
  });
  // console.log(myOrders);

  //target the tbody tag
  const orderTable = document.getElementById("orderTable");
  orderTable.innerHTML = "";

  if (myOrders.length === 0) {
    orderTable.innerHTML = `<tr>
        <td colspan="7">
            No Orders Found
        </td>
    </tr>`;
    return;
  }

  myOrders.forEach((items, index) => {
    orderTable.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${items.orderId}</td>
            <td>${items.bookTitle}</td>
            <td>${items.quantity}</td>
            <td>₹${items.price}</td>
            <td>₹${items.total}</td>
            <td>${items.status}</td>
        </tr>`;
  });
}
showOrders();
