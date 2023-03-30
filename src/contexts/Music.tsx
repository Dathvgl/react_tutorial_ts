import { createContext, useEffect, useState } from "react";
import { MusicContextType, MusicStateType } from "~/types";
import song from "../song.mp3";

export const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const audio = new Audio(song);

  const [music, setMusic] = useState<MusicStateType>({
    audio: audio,
    played: false,
    volume: 0.2,
    loop: "off",
  });

  useEffect(() => {
    music.audio.volume = music.volume;
  }, [music.audio]);

  useEffect(() => {
    music.audio.volume = music.volume;
  }, [music.volume]);

  useEffect(() => {
    musicPlayed(music.played);
  }, [music.played]);

  useEffect(() => {
    switch (music.loop) {
      case "off":
        music.audio.loop = false;
        break;
      case "all":
      case "one":
        music.audio.loop = true;
        break;
    }
  }, [music.loop]);

  async function musicPlayed(played: boolean) {
    if (played) await music.audio.play();
    else music.audio.pause();
  }

  return (
    <MusicContext.Provider value={{ music, setMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
