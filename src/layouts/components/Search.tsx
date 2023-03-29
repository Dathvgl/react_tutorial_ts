import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Brh from "~/components/Brh";
import { DropAbsolute } from "~/components/Drop";

function SearchHome() {
  const [state, setState] = useState(false);

  const ref = useRef<HTMLInputElement | null>(null);

  function onClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setState(() => true);
  }

  function init() {
    ref.current?.focus();
  }

  function callback() {
    setState(() => false);
  }

  return (
    <>
      <div className="relative">
        <div className="p-3 w-96 bg-black bg-opacity-20 rounded-3xl">
          <div className="flex items-center">
            <BsSearch size={15} />
            <Brh />
            <div className="flex-1 cursor-text" onClick={onClick}>
              Tìm kiếm
            </div>
          </div>
          {state && (
            <DropAbsolute
              className="w-full p-3 bg-sky-500 left-0 top-0  rounded-3xl"
              init={init}
              callback={callback}
            >
              <div className="flex items-center">
                <BsSearch size={15} />
                <Brh />
                <input
                  ref={ref}
                  className="bg-transparent placeholder-white outline-0 flex-1"
                  placeholder="Tìm kiếm"
                />
              </div>
              <br />
              <div className="w-full p-2 bg-black bg-opacity-30 rounded-lg">
                Haha
              </div>
            </DropAbsolute>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchHome;
