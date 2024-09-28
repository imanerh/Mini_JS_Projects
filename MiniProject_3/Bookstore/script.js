const bookDropdown = document.getElementById('books');
const bookDetails = document.getElementById('book-details');
const cartList = document.getElementById('cart');
const totalPriceElement = document.getElementById('total');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const bookPrice = document.querySelector('.book-price');

let cart = [];
let totalPrice = 0;
let books = [];

fetch('books.json')
    .then(response => response.json())
    .then(data => {
        books = data.books;
        populateDropdown(books);
    })
    .catch(error => console.error('Error loading JSON:', error));

function populateDropdown(books) {
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.isbn;
        option.textContent = book.title;
        bookDropdown.appendChild(option);
    });
}

bookDropdown.addEventListener('change', function () {
    const selectedBook = books.find(book => book.isbn === this.value);
    if (selectedBook) {
        bookDetails.style.display = 'block';
        bookDetails.querySelector('.card-title').textContent = selectedBook.title;
        bookDetails.querySelector('.book-author').textContent = `Author: ${selectedBook.author}`;
        bookDetails.querySelector('.card-subtitle').textContent = selectedBook.subtitle;
        bookDetails.querySelector('.book-description').textContent = selectedBook.description;
        bookDetails.querySelector('#book-publisher').textContent = selectedBook.publisher;
        bookDetails.querySelector('#book-pages').textContent = selectedBook.pages;
        bookPrice.textContent = `$${selectedBook.price ? selectedBook.price.toFixed(2) : 'N/A'}`;
        bookDetails.querySelector('#book-website').href = selectedBook.website;

        addToCartBtn.onclick = () => addToCart(selectedBook.isbn);
    } else {
        bookDetails.style.display = 'none';
    }
});

function addToCart(isbn) {
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        cart.push(book);
        totalPrice += book.price || 0;
        renderCart();
    }
}

function removeFromCart(isbn) {
    const index = cart.findIndex(book => book.isbn === isbn);
    if (index > -1) {
        totalPrice -= cart[index].price || 0;
        cart.splice(index, 1);
        renderCart();
    }
}

function renderCart() {
    cartList.innerHTML = '';
    cart.forEach(book => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${book.title} - $${book.price ? book.price.toFixed(2) : 'N/A'}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart('${book.isbn}')">Remove</button>
        `;
        cartList.appendChild(listItem);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function clearCart() {
    cart = [];
    totalPrice = 0;
    renderCart();
}