import { Fragment, useEffect, useState } from "react";
import { RTChartLine } from "../home/components/RTChart";
import axios from "axios";
import { server } from "~/App";
import { RTChartType, ResZingType, SongsAPIType } from "~/types";
import { OtherInfoHome, OtherMoreHome } from "~/layouts/LayoutHome";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineLine } from "react-icons/ai";

type ResType = ResZingType & {
  data: ItemType;
};

type ItemType = {
  RTChart: RTChartType;
  newRelease: SongsAPIType[];
  weekChart: WeekChartType;
};

type WeekChartType = {
  korea: WeekChartItemType;
  us: WeekChartItemType;
  vn: WeekChartItemType;
};

type WeekChartItemType = {
  banner: string;
  chartId: number;
  country: string;
  cover: string;
  endDate: string;
  group: WeekGroupType[];
  items: SongsAPIType[];
  latestWeek: number;
  link: string;
  playlistId: string;
  sectionId: string;
  startDate: string;
  type: string;
  week: number;
  year: number;
};

type WeekGroupType = {
  id: number;
  link: string;
  name: string;
  type: string;
};

function ZingChartPage() {
  const [item, setItem] = useState<ItemType | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get(`${server}/zing/chart-home`);
    const data: ResType = res.data;

    if (data.err == 0) {
      setItem(() => data.data);
    }
  }

  if (!item) {
    return <></>;
  }

  return (
    <>
      <div className="font-semibold">
        <div className="text-3xl font-bold">#zingchart</div>
        <div className="w-full h-72 mt-12">
          <RTChartLine item={item.RTChart} />
        </div>
        <ZingChartRank item={item.weekChart.vn.items} slice={10} album />
        <div className="center-flex mt-4">
          <Link className="border border-white rounded-3xl px-6 py-2" to="/">
            Xem top 100
          </Link>
        </div>
        <div className="mt-12">
          <div className="font-bold text-4xl">Bảng Xếp Hạng Tuần</div>
          <br />
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white bg-opacity-10">
              <div className="text-xl font-bold text-center">Việt Nam</div>
              <ZingChartRank item={item.weekChart.vn.items} slice={5} />
              <div className="center-flex mt-4">
                <Link
                  className="border border-white rounded-3xl px-6 py-2"
                  to="/"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white bg-opacity-10">
              <div className="text-xl font-bold text-center">US-UK</div>
              <ZingChartRank item={item.weekChart.us.items} slice={5} />
              <div className="center-flex mt-4">
                <Link
                  className="border border-white rounded-3xl px-6 py-2"
                  to="/"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white bg-opacity-10">
              <div className="text-xl font-bold text-center">K-Pop</div>
              <ZingChartRank item={item.weekChart.korea.items} slice={5} />
              <div className="center-flex mt-4">
                <Link
                  className="border border-white rounded-3xl px-6 py-2"
                  to="/"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ZingChartRank(props: {
  item: SongsAPIType[];
  slice: number;
  album?: boolean;
}) {
  const { item, slice, album } = props;

  const colors = ["deepskyblue", "green", "red"];

  function timeLine(millis: number) {
    var minutes = Math.floor(millis / 60);
    var seconds = ((millis % 60) / 1).toFixed(0);
    return `${(minutes < 10 ? "0" : "") + minutes}:${
      Number.parseInt(seconds) < 10 ? "0" : ""
    }${seconds}`;
  }

  return (
    <>
      <div className="flex flex-col mt-4 divide-y">
        {item.slice(0, slice).map((item, index) => (
          <Fragment key={index}>
            <div
              className={`${
                album ? "grid grid-cols-2" : "flex justify-between"
              } items-center p-4 rounded-lg hover:bg-white hover:bg-opacity-25 group group/icon`}
            >
              <div className="flex items-center gap-2 truncate">
                <div
                  style={{
                    WebkitTextStroke: colors[index]
                      ? `1px ${colors[index]}`
                      : "1px white",
                  }}
                  className="text-4xl w-8 flex-none text-center text-transparent"
                >
                  {index + 1}
                </div>
                <div className="text-center">
                  {item.rakingStatus && item.rakingStatus > 0 ? (
                    <>
                      <IoMdArrowDropup size={20} color="green" />
                      {item.rakingStatus}
                    </>
                  ) : item.rakingStatus == 0 ? (
                    <>
                      <AiOutlineLine size={20} />
                    </>
                  ) : (
                    <>
                      <IoMdArrowDropdown size={20} color="red" />
                      {Math.abs(item.rakingStatus ?? 0)}
                    </>
                  )}
                </div>
                <OtherInfoHome item={item} />
              </div>
              {album ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>{item.album?.title}</div>
                    <div className="block group-hover:hidden">
                      {timeLine(item.duration ?? 0)}
                    </div>
                    <div className="hidden group-hover:flex">
                      <OtherMoreHome position="bottom-14 right-0" item={item} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ml-1 block group-hover:hidden">
                    {timeLine(item.duration ?? 0)}
                  </div>
                  <div className="hidden group-hover:flex">
                    <OtherMoreHome position="bottom-14 right-0" item={item} />
                  </div>
                </>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default ZingChartPage;
