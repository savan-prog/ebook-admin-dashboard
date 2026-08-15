const books = [
  //bussiness category
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "₹299",
    category: "bussiness",
    image: "./images/bussiness category img1.jpeg",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "₹299",
    category: "bussiness",
    image: "./images/bussiness category img2.jpeg",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: "₹299",
    category: "bussiness",
    image: "./images/bussiness category img3.jpeg",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    price: "₹299",
    category: "bussiness",
    image: "./images/bussiness category img4.jpeg",
  },
];

function popularBooks(bussinessArray) {
  //target the "books-wrapper" div tag
  const bussinessContainer = document.querySelector(".books-wrapper");

  bussinessContainer.innerHTML = "";

  // Now we will apply loops/methods on the array.
  bussinessArray.forEach((items) => {
    bussinessContainer.innerHTML += `<div class="book-card text-center">
                        <a href=""><img src="${items.image}" alt="" class="business-img"></a>
                        <h5>${items.title}</h5>
                        <p>${items.author}</p>
                        <h6>${items.price}</h6>
                        <button type="button" class="btn btn-primary btn-sm mb-5">Add to Cart</button>
                    </div>`;
  });
}
popularBooks(books);
