import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  authorId: string;
  author?: Promise<Author>;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Author {
  @Directive('@external')
  @Field(() => ID, { nullable: false })
  id: string;
}
