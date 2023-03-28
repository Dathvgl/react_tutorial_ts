import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Brh from "../../components/Brh";

function SearchHome() {
  const [slider, setSlider] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event && !ref.current?.contains(event.target as HTMLElement)) {
        setSlider(() => false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function inputClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setSlider(() => true);
  }

  return (
    <>
      <div className="relative">
        <div
          ref={ref}
          className={`p-3 bg-sky-400 ${slider ? "rounded-t-3xl" : "rounded-3xl"}`}
        >
          <div className="flex items-center">
            <BsSearch size={20} />
            <Brh />
            <input
              className="bg-transparent placeholder-white outline-0"
              onClick={inputClick}
              placeholder="Search"
            />
          </div>
          {slider && (
            <div className="absolute p-3 left-0 bg-inherit w-full rounded-b-3xl">
              <div>Test</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchHome;
