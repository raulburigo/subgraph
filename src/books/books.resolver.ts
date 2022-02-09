import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Author, Book } from './models/book.model';

@Resolver(() => Book)
export class BooksResolvers {
  constructor(private booksService: BooksService) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Query(() => Book, { nullable: false })
  async book(
    @Args('id', { nullable: false })
    id: string,
  ): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @ResolveField(() => Author, {
    name: 'author',
  })
  public async author(@Parent() { authorId }: Book) {
    return {
      __typename: 'Author',
      id: authorId,
    };
  }
}
