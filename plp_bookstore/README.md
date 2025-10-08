# MongoDB Bookstore Project

This project demonstrates how to insert and query book data using MongoDB and Node.js. It includes two main files: `insert_books.js` for inserting sample book records and `queries.js` for running database queries such as filtering, sorting, and aggregation.

## Features
- Insert multiple book documents into a MongoDB collection  
- Query books by genre, price, and availability  
- Sort results and project specific fields  
- Count total books and calculate average price  
- Simple Node.js scripts for testing MongoDB operations  

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (v14 or later)  
- MongoDB Atlas account or a local MongoDB instance  
- npm (Node Package Manager)

## Setup Instructions
1. **Clone or Create Project Folder**
   ```bash
   mkdir plp_bookstore
   cd plp_bookstore
   ```

2. **Initialize Node.js**
   ```bash
   npm init -y
   ```

3. **Install MongoDB Driver**
   ```bash
   npm install mongodb
   ```

4. **Create Files**
   - `insert_books.js` — for inserting data  
   - `queries.js` — for querying data  

5. **Add the Connection URI**
   Replace the placeholder URI in both files with your actual MongoDB Atlas connection string:
   ```js
   const uri = "your_mongodb_connection_uri";
   ```

6. **Run the Insert Script**
   This script inserts 10 sample book records into the `books` collection.
   ```bash
   node insert_books.js
   ```
   Example output:
   ```bash
   10 books inserted successfully!
   ```

7. **Run Queries**
   After inserting data, execute the queries file:
   ```bash
   node queries.js
   ```
   Example output:
   ```bash
   Books in Thriller genre: [ { title: "The Silent Patient", author: "Alex Michaelides", ... } ]
   Books priced below $20: [ { title: "The Alchemist", price: 12.99, ... } ]
   Total number of books: 10
   Average book price: $17.50
   ```

## Files Overview
- **insert_books.js** → Connects to MongoDB and inserts 10 sample books.  
- **queries.js** → Fetches books by genre, filters by price, sorts results, and calculates stats.

## Sample Data
Example book document:
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "published_year": 1988,
  "price": 12.99,
  "in_stock": true,
  "pages": 208,
  "publisher": "HarperOne"
}
```

##  Example Queries
```js
// 1. Find all books in a specific genre
const thrillerBooks = await books.find({ genre: "Thriller" }).toArray();

// 2. Find books under $20
const affordableBooks = await books.find({ price: { $lt: 20 } }).toArray();

// 3. Count total books
const totalBooks = await books.countDocuments();

// 4. Calculate average price
const avgPrice = await books.aggregate([{ $group: { _id: null, avgPrice: { $avg: "$price" } } }]).toArray();
```

