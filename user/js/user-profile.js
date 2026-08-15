// currentUser
// const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//showProfile function
function showProfile() {
  //target the "div = profile-row" p tag
  document.getElementById("profileUsername").textContent = currentUser.username;
  document.getElementById("profileEmail").textContent = currentUser.useremail;
  document.getElementById("profileStatus").textContent = currentUser.status;

  //edit profile detail
  //target the "div = edit-profile-card"  input
  document.getElementById("editUsername").value = currentUser.username;
  document.getElementById("editEmail").value = currentUser.useremail;
}
showProfile();

//update profile function
function updateProfile() {
  //target the "div = edit-profile-card"  input
  let username = document.getElementById("editUsername").value.trim();
  let email = document.getElementById("editEmail").value.trim();
  //target the p tag (button tag ke baad vala)
  let message = document.getElementById("profileMessage");

  //validation
  if (username === "" || email === "") {
    message.textContent = "All Fields are Required";
    message.style.color = "red";

    return;
  }

  //fetch the users (ebook-users) array
  let users;
  let data = localStorage.getItem("ebook-users");
  if (data !== null) {
    users = JSON.parse(data);
  } else {
    users = [];
  }

  //Duplicate email validation
  let emailExists = users.find((item) => {
    return item.useremail === email && item.useremail !== currentUser.useremail;
  });

  if (emailExists) {
    message.style.color = "red";
    message.textContent = "Email Already Exists!";
    return;
  }

  //current user ka index nikalenge
  let userIndex = users.findIndex((item) => {
    //findIndex , index return krta hai object ka
    return item.useremail === currentUser.useremail;
  });

  //update the user data
  users[userIndex].username = username; //equal ke right side vala username ek variable hai jo hmne upar bnaya hai input ko target krke
  users[userIndex].useremail = email; //equal ke right side vala email ek variable hai jo hmne upar bnaya hai input ko target krke

  //update the localstorage
  localStorage.setItem("ebook-users", JSON.stringify(users));

  //update the currentUser key in localstorage
  currentUser.username = username;
  currentUser.useremail = email;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  //update the myProfile section using call the showprofile() function
  showProfile();

  //success message
  message.textContent = "Profile Updated Successfully!";
  message.style.color = "green";
  setTimeout(() => {
    message.textContent = "";
  }, 3000);
}

//changePassword function
function changePassword() {
  //target the change-password-card input tag
  let currentPassword = document.getElementById("currentPassword").value.trim();
  let newPassword = document.getElementById("newPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  //target the p tag (button tag ke niche vala)
  let message = document.getElementById("passwordMessage");

  //Empty input field validation
  if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
    message.textContent = "All Fields are Required";
    message.style.color = "red";
    return;
  }

  //current Password Check
  if (currentPassword !== currentUser.userpassword) {
    message.textContent = "Current Password is Incorrect";
    message.style.color = "red";
    return;
  }

  //new Password , currentPassword jesa na ho uske liye validation
  if (currentPassword === newPassword) {
    message.style.color = "red";
    message.textContent = "New Password cannot be same as Current Password";
    return;
  }

  //confirm Password check
  if (newPassword !== confirmPassword) {
    message.textContent = "New Password & Confirm Password do not match";
    return;
  }

  //ebook-users array fetch karenge
  let users;
  let data = localStorage.getItem("ebook-users");
  if (data !== null) {
    users = JSON.parse(data);
  } else {
    users = [];
  }

  //current user ka index nikalenge
  let userIndex = users.findIndex((item) => {
    return item.useremail === currentUser.useremail;
  });

  //password update krenge
  users[userIndex].userpassword = newPassword;

  //ebook-users key update in localstorage update
  localStorage.setItem("ebook-users", JSON.stringify(users));

  //currentUser key update in localstorage
  currentUser.userpassword = newPassword;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  //success Message
  message.textContent = "Password Changed Successfully!";
  message.style.color = "green";
  setTimeout(() => {
    message.textContent = "";
  }, 3000);

  //input fields empty karenge
  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
}
