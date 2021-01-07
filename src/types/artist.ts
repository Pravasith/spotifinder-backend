// import { AlbumType } from './album';
import { Image } from './image'

import { Field, ID, Int, ObjectType } from 'type-graphql'




@ObjectType()
export class ArtistType {


    // Required
    @Field(() => ID)
    id: string

    @Field()
    name: string

    @Field(() => Int)
    followers: number

    @Field(() => [Image])
    images: Image[]


    // Optional
    @Field(() => Int)
    popularity: number

    @Field()
    type: string

    @Field()
    uri: string

    @Field()
    href: string

    @Field(() => [String])
    genres: string[]

}