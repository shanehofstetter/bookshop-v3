import {computed, observable, runInAction, action, decorate} from "mobx";
import {Api} from "../middleware/api";

export class Book {
    id = null;
    title = "";
    description = "";
    isbn = "";
}

decorate(Book, {
    title: observable,
    description: observable,
    isbn: observable
});

export class BookStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    books = [];
    pendingRequests = 0;

    get booksCount() {
        return this.books.length;
    }

    get isLoading() {
        return this.pendingRequests > 0;
    }

    addBook(book) {
        if (!this.books.find(b => b.id === book.id)) {
            this.books.push(book);
        }
    }

    loadBook(bookId) {
        this.pendingRequests++;
        return Api.books.byId(bookId).then(book => {
            runInAction('loadBookSuccess', () => {
                    if (!this.books.find(b => b.id.toString() === bookId.toString())) {
                        this.books.push(book);
                    }
                    this.pendingRequests--;
                }
            );
            return book;
        }).catch(e => {
            runInAction('loadBookError', () => {
                this.pendingRequests--;
            });
            return Promise.reject(e);
        });
    }

    loadBooks() {
        this.pendingRequests++;
        Api.books.all().then(books => {
            runInAction('loadBooksSuccess', () => {
                this.books.replace(books);
                this.pendingRequests--;
            });
        }).catch(e => {
            runInAction('loadBooksError', () => {
                this.pendingRequests--;
            });
            return Promise.reject(e);
        });
    }
}

decorate(BookStore, {
    books: observable,
    pendingRequests: observable,
    booksCount: computed,
    isLoading: computed,
    addBook: action,
    loadBook: action,
    loadBooks: action
});