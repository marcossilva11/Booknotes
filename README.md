# Booknotes

A web app to track your book reading journey by organizing notes, ratings, and key insights.

---

## Features

- Search for books through the Open Library API.
- Add books to a personal list.
- Create notes and summaries about the books.
- Rate books (1 to 5).
- Intuitive and responsive interface.

---

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostregreSQL](https://www.postgresql.org) (for data storage)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/marcossilva11/Booknotes.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Booknotes
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the PostgreSQL database following the instructions in the .env.example file.

### Running the Project

To start the aplication, use one of the following commands:

1. Using Node.js:
   ```bash
   node server.js
   ```
   
2. Using Nodemon (for automatic restarts on file changes):
   ```bash
   npx nodemon server.js
   ```

By default, the server will run on port `3000`.

### Accessing the application

Once the server is running, open your browser and go to:

```
http://localhost:3000
```

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **Axios**: HTTP client for making API requests.
- **EJS**: Template engine for rendering HTML.
- **PostgreSQL**: Relational database.
- **HTML & CSS**: For structuring and styling the frontend.
- **JavaScript (JS)**: Core programming language for the application.
- **Body-parser**: Middleware for processing request body data.

---

## Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Open Library API](https://openlibrary.org) for providing book data.
- Inspired by Derek Sivers' website.
