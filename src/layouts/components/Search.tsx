import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { server } from "~/App";
import Brh from "~/components/Brh";
import { DropAbsolute } from "~/components/Drop";
import useDebounce from "~/hooks/Debounce";
import { ResZingType, SongsAPIType } from "~/types";
import { OtherInfoHome, OtherMoreHome } from "../LayoutHome";

type ResType = ResZingType & {
  data: { songs: SongsAPIType[] };
};

function SearchHome() {
  const [state, setState] = useState(false);
  const [input, setInput] = useState("");
  const [list, setList] = useState<SongsAPIType[]>([]);

  const search = useDebounce<string>(input);

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    filter();
  }, [search]);

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

  async function onChange() {
    const name = ref.current?.value;
    setInput(() => name ?? "");
  }

  async function filter() {
    if (search != "") {
      const res = await axios.get(`${server}/zing/search/${search}`);
      const data: ResType = res.data;
      if (data.err == 0) setList(() => data.data.songs);
    } else setList(() => []);
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
              className="w-full p-3 bg-gray-600 left-0 top-0 rounded-3xl"
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
                  onChange={onChange}
                />
              </div>
              <SearchItemHome data={list?.slice(0, 6)} />
            </DropAbsolute>
          )}
        </div>
      </div>
    </>
  );
}

function SearchItemHome(props: { data: SongsAPIType[] }) {
  const { data } = props;

  return (
    <>
      {data?.map((item, index) => (
        <Fragment key={index}>
          <br />
          <div className="w-full px-3 py-2 group group/icon hover:bg-black hover:bg-opacity-30 rounded-lg flex justify-between items-center">
            <OtherInfoHome item={item} />
            <Brh />
            <div className="hidden group-hover:block">
              <div className="flex justify-between items-center">
                <OtherMoreHome position="top-14 left-0" item={item} />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}

export default SearchHome;
