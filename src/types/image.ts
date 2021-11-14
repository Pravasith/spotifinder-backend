import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Image {
  @Field()
  height: number;

  @Field()
  width: number;

  @Field()
  url: string;
}
