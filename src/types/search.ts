import { TrackType } from './track';
import { AlbumType } from './album'
import { ArtistType } from './artist'


import { Field, ObjectType } from "type-graphql"






@ObjectType()
export class SearchType {

    @Field(() => [AlbumType])
    albums: AlbumType[]

    @Field(() => [ArtistType])
    artists: ArtistType[]

    @Field(() => [TrackType])
    tracks: TrackType[]

}