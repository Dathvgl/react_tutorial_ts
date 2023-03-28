import { MouseEventHandler } from "react";
import { PlacesType, Tooltip } from "react-tooltip";

type Props = {
  id?: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  place?: PlacesType;
  onClick?: MouseEventHandler<HTMLDivElement>;
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
  const { id, children, content, place, onClick } = props;
  const idStr = id ?? "hover-circle-icon";

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
      <Tooltip anchorSelect={`#${idStr}`} place={place}>
        {content ?? "Tool Tip"}
      </Tooltip>
    </>
  );
}
