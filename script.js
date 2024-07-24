let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let readStatus = this.read ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

function displayBooks() {
  const library = document.getElementById('library');
  library.innerHTML = ''; // Clear the library
  myLibrary.forEach((book, index) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const bookInfo = document.createElement('span');
    bookInfo.textContent = book.info();
    bookElement.appendChild(bookInfo);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(index);
    });
    bookElement.appendChild(removeBtn);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Toggle Read Status';
    toggleReadBtn.addEventListener('click', () => {
      toggleReadStatus(index);
    });
    bookElement.appendChild(toggleReadBtn);

    library.appendChild(bookElement);
  });
}

document.getElementById('book-btn').addEventListener('click', () => {
  document.getElementById('Dialog').showModal();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('Dialog').close();
});

document.getElementById('book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById('Dialog').close();
  document.getElementById('book-form').reset();
});