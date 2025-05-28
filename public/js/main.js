// Main JavaScript for the Bookstore Management UI
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bookIdInput = document.getElementById('book-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const isbnInput = document.getElementById('isbn');
    const priceInput = document.getElementById('price');
    const saveButton = document.getElementById('save-book');
    const cancelButton = document.getElementById('cancel-edit');
    const refreshButton = document.getElementById('refresh-books');
    const booksTableBody = document.getElementById('books-table-body');
    const messageArea = document.getElementById('message-area');
	const yearInput = document.getElementById("year");

    //incarca autorii
	//BookstoreAPI.getAuthors();
    // Load books when page loads
    loadBooks();

    // Event Listeners
    refreshButton.addEventListener('click', loadBooks);
    saveButton.addEventListener('click', saveBook);
    cancelButton.addEventListener('click', clearForm);

    // Function to load and display all books
    async function loadBooks() {
        try {
            showMessage('Loading books...');
            const books = await BookstoreAPI.getAllBooks();
            displayBooks(books);
            showMessage('Books loaded successfully!', 'success');
        } catch (error) {
            showMessage('Failed to load books. ' + error.message, 'error');
        }
    }

    // Function to display books in the table
    function displayBooks(books) {
        booksTableBody.innerHTML = '';
        
        if (books.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" role="cell">No books found</td>';
            booksTableBody.appendChild(row);
            return;
        }
        
        books.forEach(book => {
    const row = document.createElement('tr');
    
    // Verificăm dacă genres există și e un array
    const genreList = (book.genres && Array.isArray(book.genres))
        ? book.genres.map(genre => genre.name).join(', ')
        : '';

    row.innerHTML = `
        <td role="cell">${book.title}</td>
        <td role="cell" data-author-id="${book.author?.id || ''}">${book.author?.name || 'Unknown'}</td>
        <td role="cell">${book.isbn}</td>
        <td role="cell">$${parseFloat(book.price).toFixed(2)}</td>
        <td role="cell">${book.year || ''}</td>
        <td role="cell">${genreList}</td>
        <td role="cell" class="actions-cell">
            <button class="icon-button edit-button" data-id="${book.id}" title="Edit ${book.title}" aria-label="Edit ${book.title}">
                <i class="fas fa-edit" aria-hidden="true"></i>
            </button>
            <button class="icon-button delete-button" data-id="${book.id}" title="Delete ${book.title}" aria-label="Delete ${book.title}">
                <i class="fas fa-trash" aria-hidden="true"></i>
            </button>
        </td>
    `;

    booksTableBody.appendChild(row);

    // Adaugă evenimente pe butoane
    row.querySelector('.edit-button').addEventListener('click', () => editBook(book.id));
    row.querySelector('.delete-button').addEventListener('click', () => deleteBook(book.id));
});
    }

    // Function to save a book (create or update)
    async function saveBook() {
    const genreCheckboxes = document.querySelectorAll('input[name="genre"]:checked');
    const genreIds = Array.from(genreCheckboxes).map(cb => parseInt(cb.value));


    const book = {
        title: titleInput.value,
        authorId: parseInt(authorInput.value),
        isbn: isbnInput.value,
        price: parseFloat(priceInput.value),
        year: parseInt(yearInput.value),
        genreIds: genreIds
    };

    const id = bookIdInput.value;

    try {
        if (id) {
            showMessage('Updating book...');
            await BookstoreAPI.updateBook(id, book);
            showMessage('Book updated successfully!', 'success');
        } else {
            showMessage('Creating new book...');
            await BookstoreAPI.createBook(book);
            showMessage('Book created successfully!', 'success');
        }

        clearForm();
        loadBooks();
    } catch (error) {
        showMessage('Error saving book: ' + error.message, 'error');
    }
}

    // Function to edit a book
	async function editBook(id) {
    try {
        const row = document.querySelector(`button[data-id="${id}"]`).closest('tr');

        if (!row) {
            console.error(`Error: No row found for book ID ${id}`);
            return;
        }

        const bookIdInput = document.getElementById('book-id');
        if (!bookIdInput) {
            console.error("Error: Element #book-id not found. Check your HTML.");
            return;
        }

        const book = {
            id: id,
            title: row.querySelector('td:nth-child(1)').innerText,
            authorName: row.querySelector('td:nth-child(2)').innerText,
            authorId: row.querySelector('td:nth-child(2)').getAttribute('data-author-id') || '',
            isbn: row.querySelector('td:nth-child(3)').innerText,
            price: parseFloat(row.querySelector('td:nth-child(4)').innerText.replace('$', '').trim()),
            year: parseInt(row.querySelector('td:nth-child(5)').innerText),
            genres: row.querySelector('td:nth-child(6)').innerText.split(',').map(g => g.trim()),
        };

        // Set book ID in the form
        bookIdInput.value = book.id;

        // Fill form fields
        document.getElementById('title').value = book.title;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('price').value = book.price.toFixed(2);
        document.getElementById('year').value = book.year;
        document.getElementById('author').value = book.authorId;

        // Set genres
        const genreCheckboxes = document.querySelectorAll('#genres-container input[type="checkbox"]');
        genreCheckboxes.forEach(cb => {
            cb.checked = book.genres.includes(cb.value);
        });

        // Scroll to form
        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error editing book:', error);
    }
}
        

    // Function to delete a book
    async function deleteBook(id) {
        if (confirm('Are you sure you want to delete this book?')) {
            try {
                showMessage('Deleting book...');
                await BookstoreAPI.deleteBook(id);
                loadBooks();
                showMessage('Book deleted successfully!', 'success');
            } catch (error) {
                showMessage('Error deleting book: ' + error.message, 'error');
            }
        }
    }

    // Function to clear the form
    function clearForm() {
        bookIdInput.value = '';
        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
        priceInput.value = '';
    }

    // Function to show messages with screen reader support
    function showMessage(text, type = 'info') {
        messageArea.textContent = text;
        messageArea.className = type;
        
        // Ensure screen readers announce the message
        messageArea.setAttribute('aria-live', 'assertive');
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = '';
            messageArea.setAttribute('aria-live', 'polite');
        }, 3000);
    }
	
	
	
});