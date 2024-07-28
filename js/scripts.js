let currentPage = 1;
const perPage = 18;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJyb2dvQHJvZ28uY29tIiwiZm5hbWUiOiJybyIsImxuYW1lIjoiZ28iLCJyb2xlIjoxLCJwYXNzd29yZCI6IjFmOGMxNzk3ODlkOTQyNTkzMmVmZmFlMzdlYjI2NjM1MDQ1Yjg1NjljYTM5M2Y1MmRhYThkMGFkNzQzZDMwMjEifSwiZXhwIjoxNzIyMTgxMzMyfQ.nTgVMLnU-beVjVjdkop3D38d3qLtHklFzmuXVv7e00k"; // Replace with your actual token

async function fetchBooks(page) {
    try {
        const response = await fetch(`http://localhost:8000/books?page=${page}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.detail || 'Failed to fetch books');
        }
        return data.books;
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error fetching books. Please try again later.');
        return [];
    }
}

function renderBooks(books) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <div class="cover-photo">
                <img src="${book.thumbnail}" alt="${book.title}">
            </div>
            <p class="book-title">${book.title}</p>
        `;
        gallery.appendChild(bookDiv);
    });
}


async function loadBooks(page) {
    const books = await fetchBooks(page);
    if (books) {
        renderBooks(books);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadBooks(currentPage);
    }
}

function nextPage() {
    currentPage++;
    loadBooks(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    loadBooks(currentPage);
});
