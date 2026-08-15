//book array
const homeBooks = [
  {
    bookId: "HOME101",
    bookTitle: "Life of the Wild",
    author: "Sanchit Howdy",
    category: "Adventure",
    price: 299,
    bookImage: "./images/main-img1.jpg",
    about: `Follow an inspiring adventure across untamed landscapes where courage, determination, and
            curiosity guide every step. Explore breathtaking scenery, encounter new challenges, and uncover
            the true essence of life in the wild. As the story unfolds, themes of resilience, curiosity, and
            self-discovery come to life. Along the way, unexpected encounters and breathtaking scenery reveal
            the beauty and power of the natural world. This captivating tale encourages readers to embrace
            adventure, overcome obstacles, and appreciate the wonders that exist beyond their comfort zone.`,

    shortDescription: `Follow an inspiring adventure across untamed landscapes where courage,determination, and curiosity guide 
                      every step. Explore breathtaking scenery, encounter new challenges, and uncover the true essence of life in the wild.`,
    language: "English",
    pages: 250,
    publisher: "E-Book Store",
    publicationYear: 2019,
    section: "hero",
  },
  {
    bookId: "HOME102",
    bookTitle: "Birds Gonna Be Happy",
    author: "Timbur Hood",
    category: "Fiction",
    price: 299,
    bookImage: "./images/main-img2.jpg",
    about: `Birds Gonna Be Happy is a heartwarming story that follows a group of cheerful birds on an unforgettable
                journey filled with friendship, courage, and discovery. As they explore new places and face unexpected
                challenges, they learn valuable lessons about kindness, teamwork, and the importance of staying
                positive.Through exciting adventures and meaningful experiences, the birds discover that happiness is
                not found in perfect circumstances but in appreciating the little moments of life. Their journey
                inspires readers to embrace optimism, support one another, and face difficulties with confidence.`,

    shortDescription: `Join a delightful adventure where cheerful birds spread joy wherever they go.Through challenges and discoveries, they 
                      learn that true happiness comes from courage, kindness, and embracing every moment.`,
    language: "English",
    pages: 250,
    publisher: "E-Book Store",
    publicationYear: 2025,
    section: "hero",
  },
  {
    bookId: "HOME103",
    bookTitle: "Simple Way of Peace Life",
    author: "Armor Ramsey",
    category: "Adventure",
    price: 400,
    bookImage: "./images/featured-book1.jpg",
    section: "featured",
  },
  {
    bookId: "HOME104",
    bookTitle: "Great Travel at Desert",
    author: "Sanchit Howdy",
    category: "Adventure",
    price: 299,
    bookImage: "./images/featured-book2.jpg",
    section: "featured",
  },
  {
    bookId: "HOME105",
    bookTitle: "The Lady Beauty Scralett",
    author: "Arthur Doyle",
    category: "Adventure",
    price: 299,
    bookImage: "./images/featured-book3.jpg",
    section: "featured",
  },
  {
    bookId: "HOME106",
    bookTitle: "Once Upon A Time",
    author: "Klien Marry",
    category: "Adventure",
    price: 299,
    bookImage: "./images/featured-book4.jpg",
    section: "featured",
  },
  {
    bookId: "HOME107",
    sectionTitle: "Best Selling Book",
    bookTitle: "Birds Gonna Be Happy",
    author: "Timbur Hood",
    category: "Fiction",
    price: 299,
    bookImage: "./images/main-img2.jpg",
    about:
      "Discover an uplifting story of friendship and freedom as a flock of birds explores new horizons, overcomes obstacles, and finds happiness in the wonders of the natural world.",
    section: "bestSellers",
  },
];

//homeBookCart function
function homeBookCart(bookId) {
  let book = homeBooks.find((item) => {
    return item.bookId === bookId; //equal ke right side vala bookId homeBooks ki key ka name hai
  });
  //   console.log(book);
}
