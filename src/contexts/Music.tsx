import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ChildrenProps,
  MusicContextType,
  MusicStateType,
  SupportStateType,
} from "~/types";
import song from "../song.mp3";
import axios from "axios";
import { server } from "~/App";
import useAudio from "~/hooks/Audio";
import { useSupportContext } from "./Support";

type ResType = {
  err: number;
  msg: string;
  data: MusicType;
};

type MusicType = {
  128: string;
  320?: string;
};

type Props = ChildrenProps & {
  isPlay: boolean;
  songId: string[];
  songIndex: number;
  setSupport(value: SetStateAction<SupportStateType>): void;
};

export function useMusicContext() {
  const context = useContext(MusicContext);

  if (!context) throw new Error("Music context null");
  return context;
}

export const MusicContext = createContext<MusicContextType>(null!);

export const MusicProvider = (props: Props) => {
  const { children, isPlay, songId, songIndex, setSupport } = props;
  const { audio, srcStr, srcBlob, volume, played } = useAudio();

  const [music, setMusic] = useState<MusicStateType>({
    audio: audio,
    played: isPlay,
    volume: 0.1,
    loop: "off",
  });

  useEffect(() => {
    audio.onended = () => {
      if (songId.length > songIndex) {
        setSupport((state: SupportStateType) => ({
          ...state,
          songIndex: state.songIndex + 1,
        }));
      } else {
        setSupport((state: SupportStateType) => ({
          ...state,
          isPlay: false,
        }));
      }
    };

    if (songId.length != 0 && songId.length > songIndex) {
      init(songId[songIndex]);
    }

    console.log(songIndex);
  }, [songIndex]);

  useEffect(() => {
    volume(music.volume);
  }, [music.volume]);

  useEffect(() => {
    played(music.played);
  }, [music.played]);

  // useEffect(() => {
  //   switch (music.loop) {
  //     case "off":
  //       music.audio.loop = false;
  //       break;
  //     case "all":
  //     case "one":
  //       music.audio.loop = true;
  //       break;
  //   }
  // }, [music.loop]);

  async function init(id: string) {
    const res = await axios.get(`${server}/zing/song/${id}`);
    const data: ResType = res.data;
    if (data.err == 0) {
      const file = await axios.get(data.data[128], { responseType: "blob" });
      const blob: Blob | MediaSource = file.data;
      await srcBlob(blob);
    }
  }

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
