//dashboard protection (direct url mai admin-dashboard type karke ya user status = admin na ho to dashboard mai enter na  kar paye esliye security check lgaya)
let currentUser = null;
const userRecord = localStorage.getItem("currentUser");
if (userRecord !== null) {
  currentUser = JSON.parse(userRecord);
  //  console.log(currentUser);
}
if (!currentUser || currentUser.status !== "admin") {
  window.location.href = "../login.html";
}

//dashboard chevrons { >> } logic
function toggleSidebar(e) {
  event.preventDefault();
  document.getElementById("sidebar").classList.toggle("collapsed"); // here "sidebar" is nav id
}

//books dropdown menu ke liye
function toggleBooks() {
  const arrow = document.getElementById("bookArrow");
  const menu = document.getElementById("bookMenu");
  menu.classList.toggle("show");
  arrow.classList.toggle("rotate");
}

//order dropdown menu ke liye
function toggleOrder() {
  const arrow = document.getElementById("orderArrow");
  const menu = document.getElementById("orderMenu");
  menu.classList.toggle("show");
  arrow.classList.toggle("rotate");
}

//user dropdwon menu ke liye
function toggleUsers() {
  const arrow = document.getElementById("userArrow");
  const menu = document.getElementById("userMenu");
  menu.classList.toggle("show");
  arrow.classList.toggle("rotate");
}

//sidebar toggle button (humburg)
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
menuBtn.addEventListener("click", () => {
  // Mobile screen par collapsed hatane ke liye
  sidebar.classList.remove("collapsed");
  sidebar.classList.toggle("show");
  overlay.classList.toggle("show");
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
});

// browser ko drag krke (responsive mode mai) resize krne par layout na bigde uske liye
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
  }
});

//logoutUser function
function logoutUser(e) {
  e.preventDefault();
  const check = confirm("Are you sure want to logout?");
  if (check) {
    localStorage.removeItem("currentUser");
    window.location.href = "../login.html";
  }
}
