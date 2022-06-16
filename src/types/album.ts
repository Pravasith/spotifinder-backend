import { TrackType } from "./track";
import { ArtistType } from "./artist";
import { Image } from "./image";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AlbumType {
    // Required
    @Field()
    name: string;

    @Field()
    id: string;

    @Field(() => [Image])
    images: Image[];

    @Field()
    album_type: string;

    @Field()
    copyrights?: string;

    @Field()
    release_date: string;

    // Optional
    @Field(() => [String])
    artistNames: string[];

    @Field(() => [ArtistType], { nullable: true })
    artists?: ArtistType[];

    @Field()
    uri: string;

    @Field()
    href: string;

    @Field(() => [TrackType]!, { nullable: true })
    tracks?: TrackType[];
}
