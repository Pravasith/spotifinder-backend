import { Image } from './image'
import { Field, ObjectType } from 'type-graphql'




@ObjectType()
export class AlbumType {

    // Required
    @Field()
    name: string

    @Field()
    id: string

    @Field(() => [Image])
    images: Image[]


    // Optional
    @Field(() => [String])
    artistNames: string[]

    @Field()
    uri: string

    @Field()
    href: string


}
