import configs from "../configs";

import { fetchOptions } from "./../libs/hitAPIs";

import { SearchType } from "./../types/search";
import { Args, Query, Resolver } from "type-graphql";
import { GetSearchArgs } from "./../args/search";
import { checkForTokenAndHitAPI } from "./checkForTokenAndHitAPI";

@Resolver()
export class SearchResolver {
  @Query(() => SearchType)
  async search(
    @Args() { searchQuery, searchFilter, limit }: GetSearchArgs
  ): Promise<SearchType> {
    const url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchFilter.join()}&limit=${limit}`;

    const accessToken = configs.spotify.getAccessToken();

    const options: fetchOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    };

    const data: any = await checkForTokenAndHitAPI(url, options);
    const { albums, artists, tracks } = data; // Spotify data structure

    const refinedData = {
      albums: albums.items.map((item: any) => {
        const { name, id, images, artists, uri, href } = item;
        return {
          name,
          id,
          images,
          uri,
          href,
          artistNames: artists.map((artist: { name: string }) => artist.name),
        };
      }),

      artists: artists.items.map((item: any) => {
        const {
          id,
          name,
          followers,
          images,
          popularity,
          type,
          uri,
          href,
          genres,
        } = item;
        return {
          id,
          name,
          followers,
          images,
          popularity,
          type,
          uri,
          href,
          genres,
        };
      }),

      tracks: tracks.items.map((item: any) => {
        const {
          preview_url,
          name,
          id,
          artists,
          album,
          popularity,
          type,
          available_markets,
          duration_ms,
          uri,
          href,
        } = item;

        return {
          preview_url,
          name,
          id,
          popularity,
          type,
          available_markets,
          duration_ms,
          uri,
          href,
          artistNames: artists.map((artist: { name: string }) => artist.name),
          images: album.images,
        };
      }),
    };

    return refinedData;
  }
}
