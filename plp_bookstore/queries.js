// queries.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://pascalmbithe1999_db_user:6eEZL7YeG8QyFVbH@cluster1.tcfvkmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    console.log("Connected to MongoDB Atlas ");

    // --- Task 2: Basic CRUD Operations ---

    console.log("\n Find all books in Fiction genre:");
    console.log(await books.find({ genre: "Fiction" }).toArray());

    console.log("\n Find books published after 2010:");
    console.log(await books.find({ published_year: { $gt: 2010 } }).toArray());

    console.log("\n Find books by George Orwell:");
    console.log(await books.find({ author: "George Orwell" }).toArray());

    console.log("\n Update the price of 'The Alchemist':");
    await books.updateOne({ title: "The Alchemist" }, { $set: { price: 14.99 } });
    console.log("Updated successfully ");

    console.log("\n Delete book titled '1984':");
    await books.deleteOne({ title: "1984" });
    console.log("Deleted successfully ");

    // --- Task 3: Advanced Queries ---
    console.log("\n Books in stock and published after 2010:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log("\n Projection (title, author, price):");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    console.log("\n Sort by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("\n Sort by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    console.log("\n Pagination - 5 books per page (page 2):");
    console.log(await books.find().limit(5).skip(5).toArray());

    // --- Task 4: Aggregation ---
    console.log("\n Average price by genre:");
    console.log(await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());

    console.log("\n Author with the most books:");
    console.log(await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray());

    // --- Task 5: Indexing ---
    console.log("\n Creating index on title...");
    await books.createIndex({ title: 1 });

    console.log(" Creating compound index on author and published_year...");
    await books.createIndex({ author: 1, published_year: -1 });

    console.log("All queries executed successfully ");
  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await client.close();
  }
}

run();
