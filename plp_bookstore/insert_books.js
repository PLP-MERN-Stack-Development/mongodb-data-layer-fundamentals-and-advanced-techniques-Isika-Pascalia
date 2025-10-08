
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pascalmbithe1999_db_user:6eEZL7YeG8QyFVbH@cluster1.tcfvkmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Local MongoDB
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    const sampleBooks = [
      { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", published_year: 2019, price: 18.99, in_stock: true, pages: 336, publisher: "Celadon Books" },
      { title: "Becoming", author: "Michelle Obama", genre: "Biography", published_year: 2018, price: 22.5, in_stock: true, pages: 448, publisher: "Crown" },
      { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018, price: 20.0, in_stock: false, pages: 352, publisher: "Random House" },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988, price: 12.99, in_stock: true, pages: 208, publisher: "HarperOne" },
      { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 16.0, in_stock: true, pages: 320, publisher: "Avery" },
      { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 15.99, in_stock: true, pages: 310, publisher: "George Allen & Unwin" },
      { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 19.99, in_stock: true, pages: 443, publisher: "Harper" },
      { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 10.99, in_stock: false, pages: 328, publisher: "Secker & Warburg" },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 13.5, in_stock: true, pages: 180, publisher: "Scribner" },
      { title: "The Power of Now", author: "Eckhart Tolle", genre: "Spirituality", published_year: 1997, price: 14.99, in_stock: true, pages: 229, publisher: "New World Library" }
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted successfully!`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
