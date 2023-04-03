import moment from "moment";
import { Fragment, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { OtherImageHome } from "~/layouts/LayoutHome";
import { ArtistAPIType } from "~/types";

type NewReleaseType = {
  sectionTyoe: string;
  title: string;
  link: string;
  items: NewReleaseItemType;
};

type NewReleaseItemType = {
  all: NewReleaseItemChildType[];
  vPop: NewReleaseItemChildType[];
  others: NewReleaseItemChildType[];
};

type NewReleaseItemChildType = {
  lias: string;
  allowAudioAds: boolean;
  artists: ArtistAPIType[];
  artistsNames: string;
  downloadPrivileges: number[];
  duration: number;
  encodeId: string;
  genreIds: string[];
  hasLyric: boolean;
  // indicators: [];
  isIndie: boolean;
  isOffical: boolean;
  isPrivate: boolean;
  isWorldWide: boolean;
  link: string;
  preRelease: boolean;
  releaseDate: number;
  streamingStatus: number;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  username: string;
  zingChoice: boolean;
};

type FilterType = "all" | "vPop" | "others";

function NewReleaseHome(props: { data?: unknown | undefined }) {
  const { data } = props;
  if (!data) {
    return <></>;
  }

  const { title, items } = data as NewReleaseType;

  const [filter, setFilter] = useState<FilterType>("all");

  function onFilter(str: FilterType) {
    setFilter(() => str);
  }

  return (
    <>
      <div className="mt-9">
        <div className="font-bold text-2xl">{title}</div>
        <br />
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex gap-4">
            <button
              className={`px-6 py-2 rounded-3xl border ${
                filter == "all" && "bg-blue-500"
              }`}
              onClick={() => onFilter("all")}
            >
              TẤT CẢ
            </button>
            <button
              className={`px-6 py-2 rounded-3xl border ${
                filter == "vPop" && "bg-blue-500"
              }`}
              onClick={() => onFilter("vPop")}
            >
              VIỆT NAM
            </button>
            <button
              className={`px-6 py-2 rounded-3xl border ${
                filter == "others" && "bg-blue-500"
              }`}
              onClick={() => onFilter("others")}
            >
              QUỐC TẾ
            </button>
          </div>
          <div className="flex items-center hover:text-blue-500">
            <div className="pr-1">TẤT CẢ</div>
            <IoIosArrowForward size={20} />
          </div>
        </div>
        <br />
        <div className="grid grid-cols-3 gap-x-4">
          {items[filter].slice(0, 12).map((item, index) => (
            <Fragment key={index}>
              <div className="p-2 flex justify-between items-center hover:bg-white hover:bg-opacity-20 rounded-md  group group/icon">
                <div className="flex items-center overflow-hidden">
                  <OtherImageHome id={item.encodeId} url={item.thumbnail} />
                  <div className="ml-2 text-sm min-w-0">
                    <div className="font-bold">{item.title}</div>
                    <div className="truncate w-4/5">
                      {item.artists.map(({ name }) => name).join(", ")}
                    </div>
                    <div>
                      {moment.unix(item.releaseDate).locale("vi").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewReleaseHome;
