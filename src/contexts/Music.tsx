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
import axios from "axios";
import { server } from "~/App";
import useAudio from "~/hooks/Audio";

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
  const { audio, srcBlob, volume, played } = useAudio();

  const [music, setMusic] = useState<MusicStateType>({
    audio: audio,
    volume: 0.1,
    loop: "off",
  });

  useEffect(() => {
    audio.onended = () => {
      if (songId.length == songIndex + 1 && songIndex != -1) {
        setSupport((state: SupportStateType) => ({
          ...state,
          isPlay: false,
          songIndex: 0,
        }));
      } else {
        setSupport((state: SupportStateType) => ({
          ...state,
          songIndex: state.songIndex + 1,
        }));
      }
    };

    // if (songIndex == 0 && music.loop == "all") {
    //   init(songId[songIndex]);
    // }

    if (songId.length != 0) {
      init(songId[songIndex]);
    }
  }, [songIndex]);

  useEffect(() => {
    volume(music.volume);
  }, [music.volume]);

  useEffect(() => {
    played(isPlay);
  }, [isPlay]);

  async function init(id: string) {
    const res = await axios.get(`${server}/zing/song/${id}`);
    const data: ResType = res.data;
    console.log(data);
    if (data.err == 0) {
      const file = await axios.get(data.data[128], { responseType: "blob" });
      const blob: Blob | MediaSource = file.data;
      await srcBlob(blob);

      setSupport((state: SupportStateType) => ({
        ...state,
        isPlay: true,
      }));
    }
  }

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
