import AwesomeBooks from './modules/awesome.js';
import luxon from './modules/luxon.js';

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if (awesomeBooks.getBooks().length < 1) {
  awesomeBooks.addBook('The Hobbit', 'J.R.R. Tolkien');
  awesomeBooks.addBook('hello JS', 'ricky ricky');
}

const bookListSection = document.querySelector('#book-list');

const renderBook = () => {
  bookListSection.innerHTML = awesomeBooks.getBooks().map((book, index) => `
        <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <div class="button-remove">
            <button data-id=${book.id} class="remove">Remove</button>
            </div>
        </article>`).join('');
};

renderBook();

const addBookForm = document.querySelector('#add-book');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#title').value;
  const author = event.target.querySelector('#author').value;
  awesomeBooks.addBook(title, author);
  this.reset();
  renderBook();
});

bookListSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBook();
  }
});

const listItem = document.querySelector('.list-link');
const addItem = document.querySelector('.add-link');
const contactItem = document.querySelector('.contact-link');
const formItems = document.querySelector('.new-book');
const bookList = document.querySelector('#book-list');
const contSec = document.querySelector('.contact');

listItem.addEventListener('click', () => {
  formItems.style.display = 'none';
  contSec.style.display = 'none';
  bookList.style.display = 'block';
});

addItem.addEventListener('click', () => {
  formItems.style.display = 'block';
  contSec.style.display = 'none';
  bookList.style.display = 'none';
});

contactItem.addEventListener('click', () => {
  formItems.style.display = 'none';
  contSec.style.display = 'block';
  bookList.style.display = 'none';
});

const time = document.querySelector('.time');
const dateTime = luxon.DateTime.utc().toLocaleString(luxon.DateTime.DATETIME_FULL);
time.textContent = dateTime;
