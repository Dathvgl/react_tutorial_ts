import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import SideLeftHome from "./components/SideLeftHome";
import SideRightHome from "./components/SideRightHome";
import { Link, Outlet } from "react-router-dom";
import { DropIcon, HoverCircleIcon } from "~/components/Icon";
import { AiOutlineDownload, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill, BsFillShareFill, BsThreeDots } from "react-icons/bs";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlinePlaylistAdd, MdStackedLineChart } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { SupportProvider, useSupportContext } from "~/contexts/Support";
import { ChildrenProps, SongsAPIType, SupportStateType } from "~/types";
import { BiBlock, BiLink } from "react-icons/bi";
import { FaHeadphonesAlt, FaRegComments } from "react-icons/fa";

function LayoutHome() {
  return (
    <>
      <div className="full-body flex flex-col">
        <SupportProvider>
          <div className="flex flex-1 relative min-h-0">
            <SideLeftHome />
            <SideRightHome />
            <div className="relative flex-1 flex flex-col text-white bg-blue-900">
              <HeaderHome />
              <div className="px-14 py-8 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-zinc-600">
                <Outlet />
              </div>
            </div>
          </div>
          <FooterHome />
        </SupportProvider>
      </div>
    </>
  );
}

export function OtherImageHome(props: { id: string; url: string }) {
  const { id, url } = props;

  const {
    support: { songId, isPlay },
    setSupport,
  } = useSupportContext();

  function onClick(id: string) {
    if (!songId.includes(id)) {
      setSupport((state: SupportStateType) => ({
        ...state,
        songId: [...state.songId, id],
        songIndex: state.songIndex + 1,
      }));
    } else {
      if (isPlay) {
        setSupport((state: SupportStateType) => ({
          ...state,
          isPlay: false,
        }));
      } else {
        setSupport((state: SupportStateType) => ({
          ...state,
          isPlay: true,
        }));
      }
    }
  }

  return (
    <>
      <div
        className="relative w-12 h-12 cursor-pointer overflow-hidden"
        onClick={() => onClick(id)}
      >
        {songId.includes(id) && isPlay ? (
          <>
            <div className="absolute w-full h-full bg-black bg-opacity-20 center-flex">
              <IoStatsChartSharp color="white" size={25} />
            </div>
          </>
        ) : (
          <>
            <div className="absolute w-full h-full group-hover/icon:bg-black group-hover/icon:bg-opacity-20 center-flex">
              <BsFillPlayFill
                className="hidden group-hover/icon:block"
                color="white"
                size={30}
              />
            </div>
          </>
        )}
        <img className="center-crop rounded" src={url} alt="Error" />
      </div>
    </>
  );
}

export function OtherInfoHome(props: { item: SongsAPIType }) {
  const { item } = props;

  return (
    <>
      <div className="flex items-center overflow-hidden">
        <OtherImageHome id={item.encodeId ?? ""} url={item.thumbnail ?? ""} />
        <div className="flex-1 overflow-hidden">
          <div className="ml-2 truncate overflow-hidden">
            <Link className="font-semibold hover:text-blue-500" to={"/"}>
              {item.title}
            </Link>
            <div className="text-sm text-white">
              {item.artists?.map((child) => child.name).join(", ")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function OtherMoreHome(
  props: { position: string; item: SongsAPIType } & ChildrenProps
) {
  const { item, position, children } = props;

  return (
    <>
      <HoverCircleIcon id="heart" content="Thêm/Xóa khỏi thư viện">
        <AiOutlineHeart size={20} />
      </HoverCircleIcon>
      {children ? (
        <>{children}</>
      ) : (
        <>
          <div className="w-1"></div>
        </>
      )}
      <DropIcon
        id="more"
        content="Xem thêm"
        icon={<BsThreeDots size={20} />}
        iconType={HoverCircleIcon}
        className={`${position} w-72 bg-slate-700 rounded-lg flex flex-col`}
      >
        <div className="flex flex-col gap-2">
          {item.thumbnail && (
            <>
              <div className="mx-2 mt-2 flex item-center">
                <div className="center-flex">
                  <img
                    className="w-10 h-10 center-crop rounded-lg"
                    src={item.thumbnail}
                    alt="Error"
                  />
                </div>
                <div className="ml-2">
                  <div>{item.title}</div>
                  <div className="text-gray-400">
                    {item.like && item.listen ? (
                      <>
                        <div className="flex items-center gap-1">
                          <AiOutlineHeart />
                          <div className="mr-2">
                            {Intl.NumberFormat("en-GB", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(item.like)}
                          </div>
                          <FaHeadphonesAlt />
                          <div>
                            {Intl.NumberFormat("en-GB", {
                              notation: "compact",
                              compactDisplay: "short",
                            }).format(item.listen)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="truncate">
                          {item.artists?.map(({ name }) => name).join(", ") ??
                            item.artistsNames}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 mx-2 bg-white bg-opacity-20 rounded-lg">
                <button className="hover:bg-white hover:bg-opacity-10 p-2 flex flex-col items-center rounded-lg">
                  <AiOutlineDownload size={20} />
                  <div className="text-xs">Tải xuống</div>
                </button>
                <button className="hover:bg-white hover:bg-opacity-10 p-2 flex flex-col items-center rounded-lg">
                  <MdStackedLineChart size={20} />
                  <div className="text-xs">Lời bài hát</div>
                </button>
                <button className="hover:bg-white hover:bg-opacity-10 p-2 flex flex-col items-center rounded-lg">
                  <BiBlock size={20} />
                  <div className="text-xs">Chặn</div>
                </button>
              </div>
              <button className="flex gap-3 p-2 items-center hover:bg-white hover:bg-opacity-10">
                <MdOutlinePlaylistAdd size={22} />
                <div className="text-sm">Thêm vào danh sách phát</div>
              </button>
              <button className="flex gap-3 p-2 items-center hover:bg-white hover:bg-opacity-10">
                <RiPlayList2Fill size={22} />
                <div className="text-sm">Phát tiếp theo</div>
              </button>
            </>
          )}
          <button className="flex gap-3 p-2 items-center hover:bg-white hover:bg-opacity-10">
            <FaRegComments size={22} />
            <div className="text-sm">Bình luận</div>
          </button>
          <button className="flex gap-3 p-2 items-center hover:bg-white hover:bg-opacity-10">
            <BiLink size={22} />
            <div className="text-sm">Sao chép link</div>
          </button>
          <button className="flex gap-3 p-2 items-center hover:bg-white hover:bg-opacity-10">
            <BsFillShareFill size={22} />
            <div className="text-sm">Chia sẻ</div>
          </button>
        </div>
      </DropIcon>
    </>
  );
}

export default LayoutHome;
