// import { Image } from './image';
import { Field, ID, Int, ObjectType } from "type-graphql";



// type Album = {
//     name: string,
//     id: string,
//     images: Image[],
//     uri: string,
//     href: string
// }

@ObjectType()
export class SearchType {

    // Required

    // @Field(() => Album)
    // album: Album

    @Field()
    preview_url: string

    @Field()
    name: string

    @Field(() => ID) // type = graphqlID
    id: string

    @Field(() => [String])
    artists: string[]


    // Optional
    @Field(() => Int)
    popularity: number

    @Field()
    type: string

    @Field(() => [String])
    available_markets: string[]

    @Field(() => Int)
    duration_ms: number

    @Field()
    uri: string

    @Field()
    href: string

}