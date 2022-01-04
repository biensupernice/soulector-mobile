import axios from "axios";

export function createApiClient() {
  return new APIClient();
}

export class APIClient {
  private get client() {
    return axios.create({
      baseURL: "https://soulector.app",
    });
  }

  getEpisodes(): Promise<EpisodeDTO[]> {
    return this.client
      .get<GetEpisodesDTO>("/api/episodes")
      .then(this._data)
      .then((data) => data.tracks);
  }

  /**
   * Helper to extract data.
   */
  private _data<T>(resp: { data: T }) {
    return resp.data;
  }
}

/**
 * DTOs
 */
export type EpisodeDTO = {
  _id: string;
  source: string;
  duration: number;
  created_time: string;
  key: number | string;
  name: string;
  url: string;
  picture_large: string;
};

type GetEpisodesDTO = {
  tracks: EpisodeDTO[];
};

type UpdateEpisodesDTO = {
  msg: string;
  retrievedTracks: string[];
};
