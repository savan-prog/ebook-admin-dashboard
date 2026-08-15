//dashboard protection (direct url mai admin-dashboard type karke ya user status = admin na ho to dashboard mai enter na  kar paye esliye security check lgaya)
let currentUser = null;
const userRecord = localStorage.getItem("currentUser");
if (userRecord !== null) {
  currentUser = JSON.parse(userRecord);
  //  console.log(currentUser);
}

if (!currentUser || currentUser.status !== "user") {
  window.location.href = "../login.html";
}

//Welcome to user dashboard : user name functionality
//target the p tag from "main-topbar-content"
document.getElementById("username").textContent =
  `Welcome Back, ${currentUser.username} 👋`; //currentUser hmne upar declare kar rkha hai jisme currentUser ka data hai

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

// Sidebar toggle button (hamburger)
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");

if (menuBtn && sidebar && overlay) {
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

  // Browser resize hone par mobile sidebar band ho jaye
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    }
  });
}
//jab responsive mai modal open ho to humburg hide ho jaye uske liye
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("show.bs.modal", () => {
    if (window.innerWidth <= 768) {
      menuBtn.style.display = "none";
    }
  });

  modal.addEventListener("hidden.bs.modal", () => {
    if (window.innerWidth <= 768) {
      menuBtn.style.display = "block"; // agar CSS me display:flex hai to "flex" likho
    }
  });
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
