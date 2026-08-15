//Create Default Admin account (only ek bar bnta hai)
let users;
const userData = localStorage.getItem("ebook-users");
if (userData !== null) {
  users = JSON.parse(userData);
} else {
  users = [];
}

let adminExists = users.find((user) => {
  return user.status === "admin";
});
if (!adminExists) {
  users.push({
    username: "Admin",
    useremail: "admin@gmail.com",
    userpassword: "admin@12345",
    status: "admin",
  });
  localStorage.setItem("ebook-users", JSON.stringify(users));
}

// target the password "input tag"
const password = document.getElementById("password");

// target the eye icon from "password input tag"
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    // here "password" is variable name which is stored password input field.
    password.type = "text"; // yaha hmne input ka type = password se input ka type = text kar dia taki jo user password/character daale vo show kar ske eye icon ke click pe

    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  } else {
    password.type = "password";

    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  }
});

// get the login details
function loginUser(e) {
  e.preventDefault();

  // declare the array
  let arr;

  // target the form tag by id
  const form = document.getElementById("loginForm");

  // target the p tag from password input field ("loginMessage");
  const loginMessage = document.getElementById("loginMessage");

  //target the email input field
  const email = document.getElementById("email").value;
  // console.log(email);

  //target the password input field
  const password = document.getElementById("password").value;
  // console.log(password);

  //get the data from local storage
  let data = localStorage.getItem("ebook-users");
  if (data != null) {
    arr = JSON.parse(data);
  } else {
    arr = [];
  }

  let result = arr.find((items) => {
    return items.useremail === email && items.userpassword === password;
  });
  // console.log(result);

  if (result) {
    localStorage.setItem("currentUser", JSON.stringify(result)); //current user jo login karega uska data localstorage mai save kia yaha

    if (result.status === "admin") {
      // alert("admin dashboard");
      window.location.href = "../admin/admin-dashboard.html";
    } else if (result.status === "user") {
      // alert("user Dashboard");
      window.location.href = "../user/user-dashboard.html";
    }
    loginMessage.textContent = "✓ Login Successful!";
    loginMessage.style.color = "#03371f";

    // clear form
    form.reset();
  } else {
    loginMessage.textContent = "Invalid Email or Password";
    loginMessage.style.color = "red";

    //target the password input field
    const password = document.getElementById("password");

    password.value = "";
    password.focus();

    //hide login Error Message after 2 second.
    setTimeout(() => {
      loginMessage.textContent = "";
    }, 3000);

    // clear form
    // form.reset();
  }
}
