export type ChildrenProps = {
  children?: React.ReactNode;
};

export type SupportStateType = {
  songId: string[];
  songIndex: number;
  isPlay: boolean;
  sideRight: boolean;
};

export type SupportProviderType = {
  support: SupportStateType;
  setSupport(value: SetStateAction<SupportStateType>): void;
};

export type MusicStateType = {
  audio: HTMLAudioElement;
  played: boolean;
  volume: number;
  loop: LoopType;
};

export type MusicContextType = {
  music: MusicStateType;
  setMusic(value: SetStateAction<MusicStateType>): void;
};

export type LoopType = "off" | "all" | "one";

export type ResZingType = {
  err: number;
  msg: string;
  timestamp: number;
};

export type SongsAPIType = {
  album?: AlbumAPIType;
  alias?: string;
  allowAudioAds?: boolean;
  artists?: ArtistAPIType[];
  artistsNames?: string;
  downloadPrivileges?: number[];
  duration?: number;
  encodeId?: string;
  genreIds?: string[];
  hasLyric?: boolean;
  // indicators?: [];
  isIndie?: boolean;
  isOffical?: boolean;
  isPrivate?: boolean;
  isWorldWide?: boolean;
  link?: string;
  mvlink?: string;
  preRelease?: boolean;
  radioId?: number;
  releaseDate?: number;
  streamingStatus?: number;
  thumbnail?: string;
  thumbnailM?: string;
  title?: string;
  username?: string;
  zingChoice?: boolean;
};

export type AlbumAPIType = {
  PR?: boolean;
  artists?: ArtistAPIType[];
  artistsNames?: string;
  encodeId?: string;
  genreIds?: string[];
  isIndie?: boolean;
  isoffical?: boolean;
  link?: string;
  releaseDate?: string;
  releasedAt?: number;
  sortDescription?: string;
  thumbnail?: string;
  title?: string;
};

export type ArtistAPIType = {
  alias?: string;
  id?: string;
  isOA?: boolean;
  isOABrand?: boolean;
  link?: string;
  name?: string;
  playlistId?: string;
  spotlight?: boolean;
  thumbnail?: string;
  thumbnailM?: string;
};

export type HomeFourType = {
  itemType?: string;
  items?: HomeFourItemType[];
  options?: { hideTitle?: true };
  sectionId?: string;
  sectionType?: string;
  title?: string;
  viewType?: string;
};

export type HomeFourItemType = {
  artists?: HomeFourArtist[];
  artistsNames?: string;
  encodeId?: string;
  link?: string;
  sortDescription?: string;
  thumbnail?: string;
  thumbnailM?: string;
  title?: string;
};

export type HomeFourArtist = {
  alias?: string;
  id?: string;
  isOA?: boolean;
  isOABrand?: boolean;
  link?: string;
  name?: string;
  playlistId?: string;
  spotlight?: boolean;
  thumbnail?: string;
  thumbnailM?: string;
  totalFollow?: number;
};
