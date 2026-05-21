const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// check username exists
const isValid = (username) => {
    let user = users.find(u => u.username === username);
    return user ? true : false;
};

// check login credentials
const authenticatedUser = (username, password) => {
    let user = users.find(u => u.username === username && u.password === password);
    return user ? true : false;
};

// LOGIN
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Login failed" });
    }

    if (authenticatedUser(username, password)) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

// ADD REVIEW
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.body.username;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[isbn].reviews[username] = review;

    return res.status(200).json({
        message: "Review added/updated successfully",
        reviews: books[isbn].reviews
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;