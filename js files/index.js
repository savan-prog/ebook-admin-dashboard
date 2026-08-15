// target the search input
const homeSearch = document.querySelector("#homeSearch");

homeSearch.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key == "Enter") {
    e.preventDefault(); // kyonki input form tag ek andar hai to default submit behaviour ko rokne ke liye lagaya e.preventDefault
    const searchValue = homeSearch.value;

    window.location.href = `books.html?search=${encodeURIComponent(searchValue)}`; //here search is js url(web) parameter.   syntax:- html page?key=value
  }
});

/* encodeURIComponent ek function hai or ye URL me special characters ko safe banane ka kaam karta hai.
" ? URL me query parameters start hone ka indicator hota hai." */

// Subscribe To Our Newsletter functionality

// target the email input
const emailInput = document.getElementById("email");

// target the email send button
const subscribeBtn = document.getElementById("subscribeBtn");

//target the subscribed-successfully div
const subscribedSuccessfully = document.getElementById(
  "subscribed-successfully",
);

subscribeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;

  if (email) {
    // alert("Thanks for subscribing!");
    emailInput.value = "";
  }

  subscribedSuccessfully.style.display = "block";

  setTimeout(() => {
    subscribedSuccessfully.style.display = "none";
  }, 3000);
});

//hero section carousel dynamically add data and image
const heroContainer = document.getElementById("heroCarousel");

//filter the hero section book
const heroBooks = homeBooks.filter((item) => {
  return item.section === "hero";
});

//apply loop on heroBooks array
heroBooks.forEach((item, index) => {
  heroContainer.innerHTML += `<div class="carousel-item ${index === 0 ? "active" : ""}">
                            <div class="main-content">
                                <div class="main-content-text">
                                    <h1>${item.bookTitle}</h1>
                                    <p>${item.shortDescription}</p>
                                    <div class="main-content-btn">
                                        <a href="book-detail.html?id=${item.bookId}">Read More <span class="ms-2"><i
                                                    class="fa-solid fa-arrow-right-long"></i></span></a>
                                    </div>
                                </div>
                                <div class="main-content-img">
                                    <a href="book-detail.html?id=${item.bookId}"><img src="${item.bookImage}"
                                            alt="..."></a>
                                </div>
                            </div>
                        </div>`;
});

//target the "div id= featuredBookContainer" from the feacture-book section
const featuredBookContainer = document.getElementById("featuredBookContainer");

//filtered the feacutred books from homeBooks array (common-book.js file mai bna hai)
const featuredBooks = homeBooks.filter((items) => {
  return items.section === "featured";
});

//now we apply the loop on featuredBooks
featuredBooks.forEach((item) => {
  featuredBookContainer.innerHTML += `<div class="col-12 col-md-6 col-lg-3">
                        <div class="card">
                            <a href=""><img src="${item.bookImage}" class="card-img-top" alt="..."></a>
                            <div class="card-body">
                                <h5 class="card-title">${item.bookTitle}</h5>
                                <p class="card-text mb-1">${item.author}</p>
                                <p>₹ ${item.price}</p>
                                <a href="javascript:void(0)" class="btn btn-success btn-sm" onclick="homeBookCart('${item.bookId}')">Add To
                                    Cart</a>
                            </div>
                        </div>
                    </div>`;
});

//best sellers book section js logic
const bestSeller = homeBooks.find((item) => {
  return item.section === "bestSellers";
});

//target the "div =best-sellers" tag
const bestSellerContainer = document.getElementById("bestSellerContainer");

bestSellerContainer.innerHTML += `<div class="book-image">
                        <img src="${bestSeller.bookImage}" alt="">
                    </div>
                    <div class="best-sellers-content">
                        <h2 class="book-title">${bestSeller.sectionTitle}</h2>
                        <p>${bestSeller.author}</p>
                        <h3>${bestSeller.bookTitle}</h3>
                        <p>${bestSeller.about}</p>
                        <p class="fs-5">₹ ${bestSeller.price}</p>
                        <a href="javascript:void(0)" onclick="homeBookCart('${bestSeller.bookId}')"><span class="best-sellers-btn">Shop Now
                            </span><span class="ms-3 best-sellers-arrow"><i
                                    class="fa-solid fa-arrow-right-long"></i></span></a>
                    </div>`;
