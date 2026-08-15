//view button pe click krne par modal open hota hai to menu button hide krna
// const menuBtn = document.getElementById("menuBtn");      //menuBtn ko common.js file mai target kr rkha hai vo file manage-orders.html page par load hai to menuBtn ko double target nahi kar skte hai manage-order.js file mai bs direct use kr skte hai.
const orderModal = document.getElementById("orderModal");

orderModal.addEventListener("shown.bs.modal", () => {
  menuBtn.style.display = "none";
});

orderModal.addEventListener("hidden.bs.modal", () => {
  menuBtn.style.display = "flex";
});

let orderArray = [];

function showOrders() {
  const data = localStorage.getItem("ebook-orders");
  if (data !== null) {
    orderArray = JSON.parse(data);
  } else {
    orderArray = [];
  }

  displayOrders(orderArray);
}
showOrders();

function displayOrders(arr) {
  const table = document.getElementById("orderTable");
  table.innerHTML = "";

  //yadi oder nahi hai to
  if (arr.length === 0) {
    table.innerHTML = `<tr>
<td colspan="8">
No Orders Found
</td>
</tr>`;
    return;
  }

  arr.forEach((items, index) => {
    table.innerHTML += `<tr>
                        <td>${index + 1}</td>
                        <td>${items.orderId}</td>
                        <td>${items.username}</td>
                        <td>${items.bookTitle}</td>
                        <td>${items.total}</td>
                        <td>
<select
class="form-select form-select-sm w-auto mx-auto"
onchange="changeStatus(${index}, this.value)">
<option value="Pending"
${items.status === "Pending" ? "selected" : ""}>
Pending
</option>
<option value="Processing"
${items.status === "Processing" ? "selected" : ""}>
Processing
</option>
<option value="Completed"
${items.status === "Completed" ? "selected" : ""}>
Completed
</option>
<option value="Cancelled"
${items.status === "Cancelled" ? "selected" : ""}>
Cancelled
</option>
</select>
</td>
                        <td>
                        <button class="btn btn-info btn-sm" onclick="viewOrder(${index})" data-bs-toggle="modal" data-bs-target="#orderModal">view</button> 
                        </td>
                    </tr>`;
  });
}

//view function
function viewOrder(index) {
  let order = orderArray[index];

  document.getElementById("viewOrderId").textContent = order.orderId;
  document.getElementById("viewCustomer").textContent = order.username;
  document.getElementById("viewEmail").textContent = order.email;
  document.getElementById("viewBook").textContent = order.bookTitle;
  document.getElementById("viewPrice").textContent = order.price;
  document.getElementById("viewStatus").textContent = order.status;
  document.getElementById("viewDate").textContent = order.date;
  document.getElementById("viewTime").textContent = order.time;
}

//search function
function searchOrder() {
  const value = document.getElementById("searchOrder").value.toLowerCase();

  let filteredOrders = orderArray.filter((items) => {
    return (
      items.orderId.toLowerCase().includes(value) ||
      items.username.toLowerCase().includes(value) ||
      items.bookTitle.toLowerCase().includes(value)
    );
  });
  displayOrders(filteredOrders);
}

//Change Status function
function changeStatus(index, status) {
  orderArray[index].status = status; // equal ke right side vala status ek parameter hai jisme select & Option se value access hogi

  //update the localStorage
  localStorage.setItem("ebook-orders", JSON.stringify(orderArray));

  //load the table again
  showOrders();
}
