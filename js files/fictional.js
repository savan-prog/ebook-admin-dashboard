const books = [
  //fictional category
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    price: "₹299",
    category: "fictional",
    image: "./images/fictional category img1.jpg",
  },
  {
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    price: "₹299",
    category: "fictional",
    image: "./images/fictional category img2.jpeg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: "₹299",
    category: "fictional",
    image: "./images/fictional category img3.jpeg",
  },
  {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    price: "₹299",
    category: "fictional",
    image: "./images/fictional category img4.jpeg",
  },
];

function popularBooks(fictionalArray) {
  //target the "books-wrapper" div tag
  const fictionalContainer = document.querySelector(".fictional-wrapper");

  fictionalContainer.innerHTML = "";

  // Now we will apply loops/methods on the array.
  fictionalArray.forEach((items) => {
    fictionalContainer.innerHTML += `<div class="fictional-card text-center">
                        <a href=""><img src="${items.image}" alt="" class="fictional-img"></a>
                        <h5>${items.title}</h5>
                        <p>${items.author}</p>
                        <h6>${items.price}</h6>
                        <button type="button" class="btn btn-primary btn-sm mb-5">Add to Cart</button>
                    </div>`;
  });
}
popularBooks(books);
