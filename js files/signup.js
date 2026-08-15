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

// target the confirm password "input tag"
const confirmPassword = document.getElementById("confirm-password");

//target the eye icon form "confirm password input tag"
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
// console.log(toggleConfirmPassword)

toggleConfirmPassword.addEventListener("click", () => {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";

    toggleConfirmPassword.classList.remove("fa-eye-slash");
    toggleConfirmPassword.classList.add("fa-eye");
  } else {
    confirmPassword.type = "password";

    toggleConfirmPassword.classList.remove("fa-eye");
    toggleConfirmPassword.classList.add("fa-eye-slash");
  }
});

//password strength js logic
//target the "input" password field
// const password = document.getElementById("password");        //esko upar target kr rkha hai to double nhi kar skte hai but ye niche vale code mai use hua hai

// target the p tag (passwordStrength vala p tag)
const passwordStrength = document.getElementById("passwordStrength");

password.addEventListener("input", () => {
  const value = password.value; //password vale input tag ki value li yaha

  if (value.length === 0) {
    passwordStrength.textContent = "";
  } else if (value.length < 8) {
    passwordStrength.textContent = "weak";
    passwordStrength.style.color = "red";

    setTimeout(() => {
      passwordStrength.textContent = "";
    }, 3000);
  } else if (value.length < 12) {
    passwordStrength.textContent = "Medium";
    passwordStrength.style.color = "orange";

    setTimeout(() => {
      passwordStrength.textContent = "";
    }, 3000);
  } else {
    passwordStrength.textContent = "Strong";
    passwordStrength.style.color = "#03371f";

    setTimeout(() => {
      passwordStrength.textContent = "";
    }, 3000);
  }
});

// confrim password validation js logic
//target the "input" password field
// const password = document.getElementById("password");        //esko upar target kr rkha hai to double nhi kar skte hai but ye niche code mai use hua hai
// target the confirm-password input field
// const confirmPassword = document.getElementById("confirm-password");     //esko bhi upar target kar rkha hai to double nhi kar skte hai but ye niche code mai use hua hai.
// target the p tag (passwordMessage vala)
const passwordMessage = document.getElementById("passwordMessage");

confirmPassword.addEventListener("input", () => {
  if (password.value === "" || confirmPassword.value === "") {
    passwordMessage.textContent = "";
  } else if (password.value === confirmPassword.value) {
    passwordMessage.textContent = "✓ Password Match";
    passwordMessage.style.color = "#03371f";

    setTimeout(() => {
      passwordMessage.textContent = "";
    }, 5000);
  } else {
    passwordMessage.textContent = "✗ Password Do Not Match";
    passwordMessage.style.color = "red";

    setTimeout(() => {
      passwordMessage.textContent = "";
    }, 5000);
  }
});

// password vali input field ke liye bhi
password.addEventListener("input", () => {
  if (password.value === "" || confirmPassword.value === "") {
    passwordMessage.textContent = "";
    return;
  }

  if (password.value === confirmPassword.value) {
    passwordMessage.textContent = "✓ Password Match";
    passwordMessage.style.color = "#03371f";
  } else {
    passwordMessage.textContent = "✗ Password Do Not Match";
    passwordMessage.style.color = "red";
  }
});

let arr; //declare the arr
// take the inputs data through form and stored into array and then localstorage
function registerUser(e) {
  e.preventDefault();

  // target the Success Message "P tag" (from register-btn div)
  const successMessage = document.getElementById("successMessage");

  //target the email Message "p tag" (from email input div)
  const emailMessage = document.getElementById("emailMessage");

  //target the form by id
  const form = document.getElementById("signupForm");

  // target the name input field
  const name = document.getElementById("name").value;

  //target the email input field
  const email = document.getElementById("email").value;

  //target the password input field
  const password = document.getElementById("password").value;

  //target the confirm password input field
  const confirmPassword = document.getElementById("confirm-password").value;

  //validation      (password input field mai already minlength de rkha hai to ye vali condition ki jarurat nhi hai, password vali input khud alert dikha degi 8 character se kam hue to)
  //   if (password.length < 8) {
  //     successMessage.textContent = "Password must be at least 8 characters";
  //     successMessage.style.color = "red";
  //      //hide success Message after 2 second.
  //   setTimeout(() => {
  //     successMessage.textContent = "";
  //   }, 2000);
  // return;
  // }

  if (password !== confirmPassword) {
    successMessage.textContent = "✗ Passwords do not match";
    successMessage.style.color = "red";
    //hide success Message after 2 second.
    setTimeout(() => {
      successMessage.textContent = "";
    }, 2000);
    return;
  }

  //old record fetch from local storage firstly then push into array
  const data = localStorage.getItem("ebook-users");
  if (data != null) {
    arr = JSON.parse(data);
  } else {
    arr = [];
  }

  //before pushing new data into array we check that the new email is already exist in arr or localstorage data or not.
  const emailExist = arr.filter((items) => {
    return items.useremail === email;
    // "useremail" object key name and "email" (email input field ki value ko target krke "email" varible mai rkha vo hai).
  });
  // console.log(emailExist);
  if (emailExist.length > 0) {
    emailMessage.textContent = "Email already exist";
    emailMessage.style.color = "#3ed68f";

    setTimeout(() => {
      emailMessage.textContent = "";
    }, 2000);
  } else {
    // data push into array
    arr.push({
      username: name,
      useremail: email,
      userpassword: password,
      status: "user",
    });
    //   console.log(arr);

    // keep array data into localstorage
    localStorage.setItem("ebook-users", JSON.stringify(arr));
  }

  //success Message after registration
  successMessage.textContent = "✓ Registration Successful";
  successMessage.style.color = "#03371f";
  //hide success Message after 2 second.
  setTimeout(() => {
    successMessage.textContent = "";
  }, 2000);

  //clear form
  form.reset();
} // function yaha end ho rha hai
