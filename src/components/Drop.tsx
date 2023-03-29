import { useEffect, useRef } from "react";

type AbsoluteProps = {
  children?: React.ReactNode;
  className?: string;
  init?: () => void;
  callback?: () => void;
};

export function DropAbsolute(props: AbsoluteProps) {
  const { children, className, init, callback } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    init?.();

    function handleClick(event: MouseEvent) {
      if (event && !ref.current?.contains(event.target as HTMLElement)) {
        callback?.();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div ref={ref} className={`absolute ${className}`}>
        {children}
      </div>
    </>
  );
}
