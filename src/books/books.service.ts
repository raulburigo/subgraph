import { Injectable } from '@nestjs/common';
import { Book } from './models/book.model';

@Injectable()
export class BooksService {
  booksList: Book[] = [
    {
      id: '1',
      title: "Harry Potter and the Sorcerer's Stone",
      authorId: '1',
    },
    {
      id: '2',
      title: 'Harry Potter and the Chamber of Secrets',
      authorId: '1',
    },
    {
      id: '3',
      title: 'The Hobbit',
      authorId: '2',
    },
  ];

  async getBooks(): Promise<Book[]> {
    return this.booksList;
  }

  async getBookById(id: string): Promise<Book> {
    return this.booksList.find((book) => book.id === id);
  }
}
