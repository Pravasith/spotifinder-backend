
import { Image } from './image'
import { Field, Int, ObjectType, ID } from 'type-graphql'



@ObjectType()
export class TrackType {

    // Required
    @Field(() => String, { nullable: true })
    preview_url: string

    @Field()
    name: string

    @Field(() => ID) // type = graphqlID
    id: string

    @Field(() => [Image])
    images: Image[]

    // @Field(() => [String])
    // albumNames: string[]

    @Field(() => [String])
    artistNames: string[]


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
