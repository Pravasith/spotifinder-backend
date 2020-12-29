import { ArgsType, Field } from "type-graphql"

enum SearchFilters {
    track = 'track',
    artist = 'artist',
    album = 'album'
}

@ArgsType()
export class GetSearchArgs {
    @Field()
    searchQuery: string

    @Field(() => [String])
    searchFilter: SearchFilters[]
}
