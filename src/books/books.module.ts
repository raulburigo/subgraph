import { Module } from '@nestjs/common';
import { BooksResolvers } from './books.resolver';
import { BooksService } from './books.service';

@Module({
  imports: [],
  providers: [BooksService, BooksResolvers],
  exports: [BooksService],
})
export class BooksModule {}
