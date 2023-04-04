import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { server } from "~/App";
import { DropIcon, HoverCircleIcon } from "~/components/Icon";
import { useSupportContext } from "~/contexts/Support";
import { ResZingType, SongsAPIType } from "~/types";
import { OtherInfoHome, OtherMoreHome } from "../LayoutHome";

function SideRightHome() {
  const {
    support: { sideRight, songId },
  } = useSupportContext();

  return (
    <>
      {sideRight && (
        <div className="absolute right-0 h-full w-84 p-2 bg-zinc-800 text-white z-40 text-sm font-semibold">
          <div className="flex justify-between">
            <div className="flex bg-blue-500 bg-opacity-40 rounded-3xl overflow-hidden">
              <div className="px-4 py-2 bg-white bg-opacity-10 rounded-3xl">
                Danh sách phát
              </div>
              <div className="px-4 py-2 rounded-3xl">Nghe gần đây</div>
            </div>
            <DropIcon
              id="more-side"
              place="bottom"
              content="Khác"
              icon={<BsThreeDots size={20} />}
              iconType={HoverCircleIcon}
              className="right-0 top-10 w-60 text-base bg-slate-700 rounded-lg p-2 flex flex-col"
            >
              <div className="flex p-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                Xóa danh sách phát
              </div>
              <div className="flex p-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                Tải danh sách phát
              </div>
              <div className="flex p-2 rounded-lg hover:bg-white hover:bg-opacity-10">
                Thêm vào playlist
              </div>
            </DropIcon>
          </div>
          <br />
          {songId.map((item, index) => (
            <Fragment key={index}>
              <SideRightItem data={item} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}

type ResType = ResZingType & {
  data: SongsAPIType;
};

function SideRightItem(props: { data: string }) {
  const {
    support: { songId, songIndex },
  } = useSupportContext();

  const [info, setInfo] = useState<SongsAPIType | null>(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const res = await axios.get(`${server}/zing/info-song/${props.data}`);
    const data: ResType = res.data;
    if (data.err == 0) setInfo(() => data.data);
  }

  return (
    <>
      <div
        className={`w-full px-3 py-2 group ${
          props.data == songId[songIndex]
            ? "bg-white bg-opacity-30"
            : "hover:bg-white hover:bg-opacity-30"
        } rounded-lg flex justify-between items-center group group/icon`}
      >
        {info && <OtherInfoHome item={info} />}
        <div className="hidden group-hover:block">
          <div className="flex justify-between items-center">
            {info && <OtherMoreHome position="right-14 top-0" item={info} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideRightHome;
