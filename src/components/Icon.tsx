import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { PlacesType, Tooltip } from "react-tooltip";
import { DropAbsolute } from "./Drop";

type Props = {
  id?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  place?: PlacesType;
  disable?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

export function CircleIcon(props: Props) {
  const { id, children, content, place, onClick } = props;
  const idStr = id ?? "circle-icon";

  return (
    <>
      <div
        id={idStr}
        className="rounded-full p-3 bg-sky-600 cursor-pointer"
        onClick={onClick}
      >
        {children}
      </div>
      <Tooltip anchorSelect={`#${idStr}`} place={place}>
        {content ?? "Tool Tip"}
      </Tooltip>
    </>
  );
}

export function HoverCircleIcon(props: Props) {
  const { id, children, content, place, disable, onClick } = props;
  const idStr = id ?? "hover-circle-icon";
  const disableBool = disable ?? false;

  return (
    <>
      <div
        id={idStr}
        style={{ padding: "0.375rem" }}
        className="rounded-full hover:bg-gray-200 hover:bg-opacity-10 cursor-pointer"
        onClick={onClick}
      >
        {children}
      </div>
      {!disableBool && (
        <Tooltip anchorSelect={`#${idStr}`} place={place}>
          {content ?? "Tool Tip"}
        </Tooltip>
      )}
    </>
  );
}

type DropIconType = typeof CircleIcon | typeof HoverCircleIcon;

type DropProps = Props & {
  icon?: React.ReactNode;
  iconType?: DropIconType;
  className?: string;
  init?: () => void;
};

export function DropIcon(props: DropProps) {
  const { icon, iconType, children, className, onClick, init, ...rest } = props;

  const [state, setState] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        setState(() => false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function onClickDrop(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    onClick?.(event);
    setState(() => !state);
  }

  function callback() {
    setState(() => false);
  }

  return (
    <>
      {iconType && (
        <div ref={ref} className="relative">
          <DropIconItem
            className={className}
            state={state}
            init={init}
            callback={callback}
          >
            {children}
          </DropIconItem>
          {iconType({
            ...rest,
            onClick: onClickDrop,
            children: <>{icon}</>,
          })}
        </div>
      )}
    </>
  );
}

type AbsoluteProps = {
  state: boolean;
  children?: React.ReactNode;
  className?: string;
  init?: () => void;
  callback?: () => void;
};

function DropIconItem(props: AbsoluteProps) {
  const { state, children, className, init, callback } = props;

  useEffect(() => {
    init?.();
  }, []);

  return (
    <>
      <div
        className={`absolute ${className} ${
          state ? "opacity-1 visible" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </>
  );
}
