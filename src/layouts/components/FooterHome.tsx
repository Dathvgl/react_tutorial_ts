import { ChangeEvent, useEffect, useRef, useState } from "react";
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

function VolumePlayer() {
  const [volume, setVolume] = useState(60);

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
        setVolume(() => range);
      }
    };

    target?.addEventListener("wheel", handleWheel);

    return () => {
      target?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setVolume(() => Number.parseInt(event.target.value));
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
        value={volume}
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
  type LoopType = "off" | "all" | "one";

  const [state, setState] = useState<LoopType>("off");

  return (
    <>
      {state == "off" && (
        <HoverCircleIcon
          id="play-loop-all"
          onClick={() => {
            setState(() => "all");
          }}
          content="Bật phát lại tất cả"
        >
          <BsRepeat size={20} />
        </HoverCircleIcon>
      )}
      {state == "all" && (
        <HoverCircleIcon
          id="play-loop-all"
          onClick={() => {
            setState(() => "one");
          }}
          content="Bật phát lại tất cả"
        >
          <BsRepeat size={20} className="text-sky-500" />
        </HoverCircleIcon>
      )}
      {state == "one" && (
        <HoverCircleIcon
          id="play-loop-one"
          onClick={() => {
            setState(() => "off");
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
  const [state, setState] = useState(false);

  const className = "cursor-pointer select-none";

  return (
    <>
      {state ? (
        <>
          <BsPauseCircle
            size={30}
            className={className}
            onClick={() => {
              setState(() => false);
            }}
          />
        </>
      ) : (
        <>
          <BsPlayCircle
            size={30}
            className={className}
            onClick={() => {
              setState(() => true);
            }}
          />
        </>
      )}
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
        <div className="flex items-center">
          <div>00:00</div>
          <Brh />
          <input className="w-96" type="range" min={0} max={100} />
          <Brh />
          <div>00:00</div>
        </div>
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

export default FooterHome;
