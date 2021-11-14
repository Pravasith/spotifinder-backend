import { TrackType } from "./../types/track";
import { AlbumType } from "./../types/album";

import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { checkForTokenAndHitAPI } from "./checkForTokenAndHitAPI";
import { fetchOptions } from "./../libs/hitAPIs";
import configs from "../configs";

import { ArtistType } from "./../types/artist";

@Resolver(() => ArtistType)
export class ArtistResolver {
  // QUERIES AND MUTATIONS
  @Query(() => ArtistType)
  async getArtist(
    @Arg("artistId")
    artistId: string
  ) {
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    const accessToken = configs.spotify.getAccessToken();

    const options: fetchOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    };

    const data: any = await checkForTokenAndHitAPI(url, options);

    const { id, name, followers, images, popularity, type, uri, href, genres } =
      data;

    const refinedData: ArtistType = {
      id,
      name,
      images,
      popularity,
      type,
      uri,
      href,
      genres,
      followers: followers.total,
    };

    return refinedData;
  }

  @Query(() => [ArtistType])
  async getRelatedArtists(
    @Arg("artistId")
    artistId: string
  ) {
    const url = `https://api.spotify.com/v1/artists/${artistId}/related-artists`;

    const accessToken = configs.spotify.getAccessToken();

    const options: fetchOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    };

    const data: any = await checkForTokenAndHitAPI(url, options);

    const refinedData = data.artists.map((item: any) => {
      const {
        id,
        name,
        images,
        popularity,
        type,
        uri,
        href,
        genres,
        followers,
      } = item;
      const temp: ArtistType = {
        id,
        name,
        images,
        popularity,
        type,
        uri,
        href,
        genres,
        followers: followers.total,
      };

      return temp;
    });

    return refinedData;
  }

  // FIELD RESOLVERS
  @FieldResolver(() => [AlbumType])
  async albums(@Root() artist: ArtistType) {
    const url = `https://api.spotify.com/v1/artists/${artist.id}/albums?offset=0&limit=10`;

    const accessToken = configs.spotify.getAccessToken();

    const options: fetchOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    };

    const data: any = await checkForTokenAndHitAPI(url, options);

    const artistAlbumIds = data.items.map((item: { id: string }) => {
      const { id } = item;

      return id;
    });

    const url2 = `https://api.spotify.com/v1/albums/?ids=${artistAlbumIds.join()}`;

    const newData: any = await checkForTokenAndHitAPI(url2, options);

    const refinedData = newData.albums.map((item: any) => {
      const {
        name,
        id,
        images,
        artists,
        uri,
        href,
        album_type,
        release_date,
        tracks,
      } = item;

      const temp: AlbumType = {
        id,
        name,
        images,
        uri,
        href,
        album_type,
        release_date,

        artistNames: artists.map((item: { name: string }) => item.name),
        artists: artists.map((item: any) => {
          return {
            name: item.name,
            href: item.href,
            id: item.id,
            type: item.type,
            uri: item.uri,
          };
        }),
        tracks: tracks.items,
      };

      return temp;
    });

    return refinedData;
  }

  @FieldResolver(() => [TrackType])
  async popularTracks(
    @Root()
    artist: ArtistType,

    @Arg("country", { defaultValue: "US" })
    country: string
  ) {
    const url = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=${country}`;

    const accessToken = configs.spotify.getAccessToken();

    const options: fetchOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    };

    const data: any = await checkForTokenAndHitAPI(url, options);

    const refinedData = data.tracks.map((item: any) => {
      const {
        preview_url,
        name,
        id,
        artists,
        popularity,
        type,
        available_markets,
        duration_ms,
        uri,
        href,
        album,
      } = item;
      const temp: TrackType = {
        preview_url,
        name,
        id,
        popularity,
        type,
        available_markets,
        duration_ms,
        uri,
        href,
        album,
        images: album.images,
        artistNames: artists.map((item: { name: string }) => item.name),
      };

      return temp;
    });

    return refinedData;
  }
}
