import { useEffect, useRef } from "react";

type ReturnType = {
  audio: HTMLAudioElement;
  srcStr(url: string): Promise<void>;
  srcBlob(blob: Blob | MediaSource): Promise<void>;
  volume(num: number): void;
  played(played: boolean): Promise<void>;
};

function useAudio(): ReturnType {
  const audio = useRef(new Audio());

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(audio.current.src);
    };
  }, []);

  async function srcStr(url: string) {
    audio.current.pause();
    audio.current.src = url;
    audio.current.load();
    await audio.current.play();
  }
  
  async function srcBlob(blob: Blob | MediaSource) {
    audio.current.pause();
    URL.revokeObjectURL(audio.current.src);
    audio.current.src = URL.createObjectURL(blob);
    audio.current.load();
    await audio.current.play();
  }

  function volume(num: number) {
    audio.current.volume = num;
  }

  async function played(played: boolean) {
    if (played) await audio.current.play();
    else audio.current.pause();
  }

  return { audio: audio.current, srcStr, srcBlob, volume, played };
}

export default useAudio;
