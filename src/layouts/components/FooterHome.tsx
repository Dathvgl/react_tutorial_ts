import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import {
  BsPauseCircle,
  BsPlayCircle,
  BsRepeat,
  BsRepeat1,
} from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import {
  RiPlayListLine,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import Brh from "~/components/Brh";
import { HoverCircleIcon } from "~/components/Icon";
import { MusicProvider, useMusicContext } from "~/contexts/Music";
import {
  MusicStateType,
  ResZingType,
  SongsAPIType,
  SupportStateType,
} from "~/types";
import { OtherInfoHome, OtherMoreHome } from "../LayoutHome";
import { useSupportContext } from "~/contexts/Support";
import axios from "axios";
import { server } from "~/App";

function VolumePlayer() {
  const {
    music: { volume },
    setMusic,
  } = useMusicContext();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const target = ref.current;
    const handleWheel = (event: WheelEvent) => {
      if (ref.current) {
        const value = Number.parseInt(ref.current.value);
        if (event.deltaY < 0) {
          ref.current.value = `${value + 20}`;
        }

        if (event.deltaY > 0) {
          ref.current.value = `${value - 20}`;
        }

        const range = Number.parseInt(ref.current.value);

        setMusic((state: MusicStateType) => ({
          ...state,
          volume: range / 100,
        }));
      }
    };

    target?.addEventListener("wheel", handleWheel);

    return () => {
      target?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const range = Number.parseInt(event.target.value);

    setMusic((state: MusicStateType) => ({
      ...state,
      volume: range / 100,
    }));
  }

  return (
    <>
      {volume ? (
        <>
          <HoverCircleIcon id="volume" disable>
            <RiVolumeUpFill size={20} />
          </HoverCircleIcon>
        </>
      ) : (
        <>
          <HoverCircleIcon id="volume" disable>
            <RiVolumeMuteFill size={20} />
          </HoverCircleIcon>
        </>
      )}
      <Brh />
      <input
        ref={ref}
        type="range"
        min={0}
        max={100}
        onChange={onChange}
        value={volume * 100}
        className="w-16"
      />
    </>
  );
}

function RandomPlayer() {
  const [state, setState] = useState(false);

  return (
    <>
      <HoverCircleIcon
        id="play-random"
        onClick={() => {
          setState(() => !state);
        }}
        content={`${state ? "Tắt" : "Bật"} phát ngẫu nhiên`}
      >
        <FaRandom
          size={20}
          className={`${state ? "text-sky-500" : "text-inherit"}`}
        />
      </HoverCircleIcon>
    </>
  );
}

function LoopPlayer() {
  const {
    music: { loop },
    setMusic,
  } = useMusicContext();

  return (
    <>
      {loop == "off" && (
        <HoverCircleIcon
          id="play-loop-all"
          onClick={() => {
            setMusic((state: MusicStateType) => ({
              ...state,
              loop: "all",
            }));
          }}
          content="Bật phát lại tất cả"
        >
          <BsRepeat size={20} />
        </HoverCircleIcon>
      )}
      {loop == "all" && (
        <HoverCircleIcon
          id="play-loop-all"
          onClick={() => {
            setMusic((state: MusicStateType) => ({
              ...state,
              loop: "one",
            }));
          }}
          content="Bật phát lại tất cả"
        >
          <BsRepeat size={20} className="text-sky-500" />
        </HoverCircleIcon>
      )}
      {loop == "one" && (
        <HoverCircleIcon
          id="play-loop-one"
          onClick={() => {
            setMusic((state: MusicStateType) => ({
              ...state,
              loop: "off",
            }));
          }}
          content="Tắt phát lại"
        >
          <BsRepeat1 size={20} className="text-sky-500" />
        </HoverCircleIcon>
      )}
    </>
  );
}

function ActivePlayer() {
  const {
    music: { played },
    setMusic,
  } = useMusicContext();

  const className = "cursor-pointer select-none";

  function onClick(value: boolean) {
    setMusic((state: MusicStateType) => ({
      ...state,
      played: value,
    }));
  }

  return (
    <>
      {played ? (
        <>
          <BsPauseCircle
            size={30}
            className={className}
            onClick={() => onClick(false)}
          />
        </>
      ) : (
        <>
          <BsPlayCircle
            size={30}
            className={className}
            onClick={() => onClick(true)}
          />
        </>
      )}
    </>
  );
}

function TimelinePlayer() {
  const {
    music: { audio },
  } = useMusicContext();

  const {
    support: { songId },
  } = useSupportContext();

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.onloadedmetadata = () => {
      setDuration(() => audio.duration);
    };

    audio.ontimeupdate = () => {
      setTime(() => audio.currentTime);
    };
  }, [songId]);

  function timeLine(millis: number) {
    var minutes = Math.floor(millis / 60);
    var seconds = ((millis % 60) / 1).toFixed(0);
    return `${(minutes < 10 ? "0" : "") + minutes}:${
      Number.parseInt(seconds) < 10 ? "0" : ""
    }${seconds}`;
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const range = Number.parseFloat(event.target.value);
    audio.currentTime = range;
  }

  return (
    <>
      <div className="flex items-center">
        <div>{timeLine(time)}</div>
        <Brh />
        <input
          className="w-96"
          type="range"
          value={time}
          min={0}
          max={duration}
          onChange={onChange}
        />
        <Brh />
        <div>{timeLine(duration)}</div>
      </div>
    </>
  );
}

function MediaPlayer() {
  type StepType = "forward" | "backward";

  function onStep(step: StepType) {
    if (step == "forward") {
    }

    if (step == "backward") {
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center">
          <RandomPlayer />
          <Brh />
          <HoverCircleIcon
            id="play-prev"
            disable
            onClick={() => onStep("backward")}
          >
            <AiOutlineStepBackward size={20} />
          </HoverCircleIcon>
          <Brh />
          <ActivePlayer />
          <Brh />
          <HoverCircleIcon>
            <AiOutlineStepForward size={20} onClick={() => onStep("forward")} />
          </HoverCircleIcon>
          <Brh />
          <LoopPlayer />
        </div>
        <TimelinePlayer />
      </div>
    </>
  );
}

type ResType = ResZingType & {
  data: SongsAPIType;
};

function FooterHome() {
  const { support, setSupport } = useSupportContext();

  const [info, setInfo] = useState<SongsAPIType | null>(null);

  useEffect(() => {
    init();
  }, [support.songIndex]);

  async function init() {
    const id = support.songId[support.songIndex];
    const res = await axios.get(`${server}/zing/info-song/${id}`);
    const data: ResType = res.data;
    if (data.err == 0) setInfo(() => data.data);
  }

  return (
    <>
      {support.songId.length != 0 && (
        <div className="h-24 p-4 flex-none text-white bg-slate-800 flex justify-between items-center select-none">
          <div className="flex items-center">
            {info && <OtherInfoHome item={info} />}
            <Brh />
            <OtherMoreHome position="left-0 bottom-14" />
          </div>
          <MusicProvider {...support} setSupport={setSupport}>
            <MediaPlayer />
            <div className="flex justify-between items-center">
              <VolumePlayer />
              <Brh />
              <HoverCircleIcon
                id="list-song"
                disable
                onClick={() => {
                  setSupport((state: SupportStateType) => ({
                    ...state,
                    sideRight: !support.sideRight,
                  }));
                }}
              >
                <RiPlayListLine size={20} />
              </HoverCircleIcon>
            </div>
          </MusicProvider>
        </div>
      )}
    </>
  );
}

export default FooterHome;
