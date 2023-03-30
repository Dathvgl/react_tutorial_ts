import axios from "axios";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineStepBackward,
  AiOutlineStepForward,
} from "react-icons/ai";
import {
  BsPauseCircle,
  BsPlayCircle,
  BsRepeat,
  BsRepeat1,
  BsThreeDots,
} from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import {
  RiPlayListLine,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import Brh from "~/components/Brh";
import { DropIcon, HoverCircleIcon } from "~/components/Icon";
import { MusicContext } from "~/contexts/Music";
import { MusicContextType, MusicStateType } from "~/types";

function VolumePlayer() {
  const {
    music: { volume },
    setMusic,
  } = useContext(MusicContext) as MusicContextType;

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
  } = useContext(MusicContext) as MusicContextType;

  return (
    <>
      {loop == "off" && (
        <HoverCircleIcon
          id="play-loop-all"
          onClick={() => {
            setMusic((state: MusicStateType) => ({ ...state, loop: "all" }));
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
            setMusic((state: MusicStateType) => ({ ...state, loop: "one" }));
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
            setMusic((state: MusicStateType) => ({ ...state, loop: "off" }));
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
  } = useContext(MusicContext) as MusicContextType;

  const className = "cursor-pointer select-none";

  return (
    <>
      {played ? (
        <>
          <BsPauseCircle
            size={30}
            className={className}
            onClick={() => {
              setMusic((state: MusicStateType) => ({
                ...state,
                played: false,
              }));
            }}
          />
        </>
      ) : (
        <>
          <BsPlayCircle
            size={30}
            className={className}
            onClick={() => {
              setMusic((state: MusicStateType) => ({
                ...state,
                played: true,
              }));
            }}
          />
        </>
      )}
    </>
  );
}

function TimelinePlayer() {
  const {
    music: { audio },
  } = useContext(MusicContext) as MusicContextType;

  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.onloadedmetadata = () => {
      setDuration(() => audio.duration);
    };

    audio.ontimeupdate = () => {
      setTime(() => audio.currentTime);
    };
  }, [audio]);

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

const classNameDropItem: string =
  "p-2 hover:bg-black hover:bg-opacity-20 rounded";

function FooterHome() {
  return (
    <>
      <div className="h-24 p-4 text-white bg-slate-800 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <img src="" alt="Error" />
          <Brh />
          <div>
            <div>Name</div>
            <div>Author</div>
          </div>
          <Brh />
          <HoverCircleIcon id="heart" content="Thêm/Xóa khỏi thư viện">
            <AiOutlineHeart size={20} />
          </HoverCircleIcon>
          <Brh />
          <DropIcon
            id="more"
            content="Xem thêm"
            icon={<BsThreeDots size={20} />}
            iconType={HoverCircleIcon}
            className="left-0 bottom-14 w-60 bg-slate-700 rounded-lg p-2 flex flex-col"
          >
            <Link className={classNameDropItem} to={"/login/signUp"}>
              Đăng ký
            </Link>
            <Link className={classNameDropItem} to={"/login/signIn"}>
              Đăng nhập
            </Link>
          </DropIcon>
        </div>
        <MediaPlayer />
        <div className="flex justify-between items-center">
          <VolumePlayer />
          <Brh />
          <HoverCircleIcon id="list-song" disable>
            <RiPlayListLine size={20} />
          </HoverCircleIcon>
        </div>
      </div>
    </>
  );
}

// https://mp3-s1-zmp3.zmdcdn.me/577fc5e4a5a04cfe15b1/2306389018076181266?authen=exp=1680281342~ac~acl=/577fc5e4a5a04cfe15b1/*~hmac=d5027a686414a56b10594c036219adf4&fs=MTY4MDEwODU0MjM0NHx3ZWJWNnwxMDQyNDjQ0M1MjQ0fDExMy4yMy4xMTUdUngNjk

export default FooterHome;
