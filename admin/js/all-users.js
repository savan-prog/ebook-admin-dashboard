// declare the array
let userArray;

let onlyUsers = []; //viewUser()function esko access nhi karega esliye glbally declare kar dia

function showUsers() {
  //get data from localstorage
  const data = localStorage.getItem("ebook-users");
  if (data !== null) {
    userArray = JSON.parse(data);
  } else {
    userArray = [];
  }

  // status = users  condition (yadi status = user hai koi to , admin nhi hona chahiye)
  onlyUsers = userArray.filter((items) => {
    return items.status === "user";
  });

  //total user logic
  document.getElementById("totalUsers").textContent = onlyUsers.length;

  displayUsers(onlyUsers);
}
showUsers();

// displayUser function
function displayUsers(users) {
  //target the tbody tag
  let tableData = document.getElementById("userTable");

  tableData.innerHTML = "";

  users.forEach((items, index) => {
    tableData.innerHTML += `<tr>
                        <td>${index + 1}</td>
                        <td>${items.username}</td>
                        <td>${items.useremail}</td>
                        <td>${items.status}</td>
                        <td>
                       <button class="btn btn-info btn-sm me-2" onclick="viewUser(${index})" data-bs-toggle="modal" data-bs-target="#viewUserModal">View</button>
                        <button class="btn btn-danger btn-sm" onclick= "deleteUser(${index})">Delete</button>
                        </td>
                    </tr>`;
  });
}

//viewUser function
function viewUser(index) {
  document.getElementById("viewUsername").textContent =
    onlyUsers[index].username;
  document.getElementById("viewEmail").textContent = onlyUsers[index].useremail;
  document.getElementById("viewStatus").textContent = onlyUsers[index].status;
}

//deleteUser function
function deleteUser(id) {
  const check = confirm("Are you sure want to delete this user?");
  if (check) {
    //jis user ko delete krna hai uska data lia yaha
    let deleteuser = onlyUsers[id];

    //original array se delete krwana hoga yaha
    userArray = userArray.filter((items, index) => {
      return items.useremail !== deleteuser.useremail;
    });
    localStorage.setItem("ebook-users", JSON.stringify(userArray));
    showUsers();
  }
}

//search User function
function searchUser() {
  const searchValue = document.getElementById("searchUser").value.toLowerCase();

  let filteredUsers = onlyUsers.filter((items) => {
    return (
      items.username.toLowerCase().includes(searchValue) ||
      items.useremail.toLowerCase().includes(searchValue)
    );
  });
  displayUsers(filteredUsers);
}
