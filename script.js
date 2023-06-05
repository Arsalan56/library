/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
const form = document.querySelector('form');
const openForm = document.querySelector('.btn > button');
const body = document.querySelector('body');

const radioY = document.querySelector('#status-y');
const radioN = document.querySelector('#status-n');
const submitForm = document.querySelector('form > div > button');
const myLibrary = [];
const main = document.querySelector('main');
const templateCard = document.querySelector('.template');
const inputs = document.querySelectorAll(
    'form input[type=text], form input[type=number]'
);
const ClearForm = () => {
    inputs.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
        radioY.checked = false;
        radioN.checked = false;
    });
};

openForm.addEventListener('click', (e) => {
    e.stopPropagation();
    form.style.visibility = 'visible';
});

body.addEventListener('click', () => {
    form.style.visibility = 'hidden';
    ClearForm();
});

form.addEventListener('click', (e) => e.stopPropagation());

// Hide and clear form when x is clicked
const closeForm = document.querySelector('form > button');
closeForm.addEventListener('click', () => {
    form.style.visibility = 'hidden';
    ClearForm();
});

function Book(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBook(name, author, pages, status) {
    myLibrary.push(new Book(name, author, pages, status));
}

templateCard.remove();
function displayBooks() {
    // Remove all displayed cards first
    const childs = document.querySelectorAll('main > div');
    childs.forEach((child) => main.removeChild(child));

    // Loop through list and display each book's info
    myLibrary.forEach((book) => {
        let card = templateCard.cloneNode(true);
        card.removeAttribute('class');
        main.appendChild(card);
        let name = document.querySelector('main > div:last-of-type .b-name');
        let author = document.querySelector(
            'main > div:last-of-type .b-author'
        );
        let pages = document.querySelector('main > div:last-of-type .b-pgs');
        let status = document.querySelector(
            'main > div:last-of-type .status > img'
        );

        name.textContent = book.name;
        author.textContent = book.author;
        pages.textContent = book.pages;
        // eslint-disable-next-line no-unused-expressions
        book.status === 'Read'
            ? status.setAttribute('src', 'svg-icons/check.svg')
            : status.setAttribute('src', 'svg-icons/uncheck.svg');
        function indexData() {
            card.setAttribute(
                'data',
                myLibrary.findIndex(
                    (arrBook) =>
                        arrBook.name === name.textContent &&
                        arrBook.author === author.textContent &&
                        arrBook.pages === pages.textContent
                )
            );
        }
        indexData();
    });

    // Make trash button work
    let allTrash = document.querySelectorAll('.trash');
    allTrash.forEach((trash) => {
        trash.addEventListener('click', () => {
            trash.parentNode.remove();
            let cards = document.querySelectorAll('main > div');
            let index = 0;
            cards.forEach((crd) => {
                crd.setAttribute('data', index++);
            });
        });
    });

    // Toggle status button
    const statImgs = document.querySelectorAll('.status > img');
    statImgs.forEach((statImg) =>
        statImg.addEventListener('click', () => {
            const currentImg = statImg.getAttribute('src');
            if (currentImg === 'svg-icons/uncheck.svg') {
                statImg.setAttribute('src', 'svg-icons/check.svg');
            } else {
                statImg.setAttribute('src', 'svg-icons/uncheck.svg');
            }
        })
    );
}

// Retrieve data from form, then hide and clear form inputs
submitForm.addEventListener('click', (e) => {
    if (form.checkValidity()) {
        e.preventDefault();
        form.style.visibility = 'hidden';
        let selectedRad = document.querySelector('input[type=radio]:checked');
        addBook(
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            selectedRad.value
        );
        ClearForm();
        displayBooks();
    }
});
