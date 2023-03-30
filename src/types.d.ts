export type MusicStateType = {
  audio: HTMLAudioElement;
  played: boolean;
  volume: number;
  loop: LoopType;
};

export type MusicContextType = {
  music: MusicStateType;
  setMusic: (value: SetStateAction<MusicStateType>) => void;
};

export type LoopType = "off" | "all" | "one";
