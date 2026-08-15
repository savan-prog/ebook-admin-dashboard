const books = [
  //Technology category
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: "₹299",
    category: "technology",
    image: "./images/technology category img1.jpeg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    price: "₹299",
    category: "technology",
    image: "./images/technology category img2.jpeg",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    price: "₹299",
    category: "technology",
    image: "./images/technology category img3.jpeg",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: "₹299",
    category: "technology",
    image: "./images/technology category img4.jpeg",
  },
];

function popularBooks(technologyArray) {
  //target the "books-wrapper" div tag
  const technologyContainer = document.querySelector(".technology-wrapper");

  technologyContainer.innerHTML = "";

  // Now we will apply loops/methods on the array.
  technologyArray.forEach((items) => {
    technologyContainer.innerHTML += `<div class="technology-card text-center">
                        <a href=""><img src="${items.image}" alt="" class="technology-img"></a>
                        <h5>${items.title}</h5>
                        <p>${items.author}</p>
                        <h6>${items.price}</h6>
                        <button type="button" class="btn btn-primary btn-sm mb-5">Add to Cart</button>
                    </div>`;
  });
}
popularBooks(books);
