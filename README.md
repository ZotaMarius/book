# Bookstore Management System

A full-stack application for managing bookstore inventory with a C# backend API and HTML/CSS/JavaScript frontend.

## Project Structure

```
Bookstore-management/
├── server/           # C# backend API (.NET 8.0)
└── client/           # HTML/CSS/JS frontend
```

## Running the Application

### Database Setup

Our recommendation is to use SQL Server Express LocalDB as database for this project.

You can follow these instructions to install SQL Server Express: https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16

To connect to an existing database using Visual Studio SQL Server Data Tools, you can follow these instructions: https://learn.microsoft.com/en-us/sql/ssdt/connect-to-an-existing-database-in-sql-server-data-tools?view=sql-server-ver16

To initialize the database with the structure for the project, we’ll need to run two more commands:
   1. We need to install the .NET Entity Framework (EF) Core tools using PowerShell by running the command: dotnet tool install --global dotnet-ef
   2. In the project folder, we need to run the command: dotnet ef database update (This command will run a migration that contains the structure and data for the database—we’ll talk more about this tomorrow.)


### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Restore required packages:

   ```bash
   dotnet restore
   ```

3. Build the application:

   ```bash
   dotnet build
   ```

4. Run the API server:
   ```bash
   dotnet run
   ```

The API will start running at `http://localhost:5000/api/books` by default.

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Open the `index.html` file in your web browser:

   ```bash
   # On macOS
   open index.html

   # On Windows
   start index.html

   # Or use a local server like http-server if installed
   # npm install -g http-server
   # http-server
   ```

## Features

- View all books in the inventory
- Add new books
- Edit existing book information
- Delete books from inventory
- Responsive design for different screen sizes

## API Endpoints

- `GET /api/books` - Retrieve all books
- `GET /api/books/{id}` - Retrieve a specific book
- `POST /api/books` - Add a new book
- `PUT /api/books/{id}` - Update a book
- `DELETE /api/books/{id}` - Delete a book

## Development Notes

- The backend is built with ASP.NET Core 8.0
- The frontend uses vanilla HTML, CSS, and JavaScript
- API communication is handled through the Fetch API

## License

[MIT](LICENSE)
