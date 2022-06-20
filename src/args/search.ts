import { Max, Min } from "class-validator"
import { ArgsType, Field, Int } from "type-graphql"

enum SearchFilters {
    track = "track",
    artist = "artist",
    album = "album",
}

@ArgsType()
export class GetSearchArgs {
    @Field()
    searchQuery: string

    @Field(() => [String])
    searchFilter: SearchFilters[]

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit: number
}
