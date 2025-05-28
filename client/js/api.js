// Base API URL
const API_URL = 'http://localhost:5000/api/Books';

const username = 'admin';
const password = 'password';
const basicAuth = 'Basic ' + btoa(`${username}:${password}`);


// API functions for CRUD operations
const BookstoreAPI = {
    // Get all books
    getAllBooks: async function() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },
    
    // Get a book by ID
    getBookById: async function(id) {
        try {
			
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching book ${id}:`, error);
            throw error;
        }
    },
    
    // Create a new book
    createBook: async function(book) {
        try {
			console.log(book)
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    },
    
    // Delete a book
    deleteBook: async function(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': basicAuth  // ✅ same as in updateBook
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error(`Error deleting book ${id}:`, error);
        throw error;
    }
},
	
	// Update a book
	updateBook: async function(id, book) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth  // ✅ aici adaugi autentificarea
            },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}
	
};