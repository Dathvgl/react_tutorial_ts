import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import SideLeftHome from "./components/SideLeftHome";
import SideRightHome from "./components/SideRightHome";
import { Link, Outlet } from "react-router-dom";
import { DropIcon, HoverCircleIcon } from "~/components/Icon";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill, BsThreeDots } from "react-icons/bs";
import { SupportProvider, useSupportContext } from "~/contexts/Support";
import { ChildrenProps, SongsAPIType, SupportStateType } from "~/types";

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

  const { setSupport } = useSupportContext();

  function onClick(id: string) {
    setSupport((state: SupportStateType) => ({
      ...state,
      songId: [...state.songId, id],
      songIndex: state.songIndex + 1,
    }));
  }

  return (
    <>
      <div
        className="relative w-12 h-12 cursor-pointer overflow-hidden"
        onClick={() => onClick(id)}
      >
        <div className="absolute w-full h-full group-hover/icon:bg-black group-hover/icon:bg-opacity-20 center-flex">
          <BsFillPlayFill
            className="hidden group-hover/icon:block"
            color="white"
            size={30}
          />
        </div>
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

export function OtherMoreHome(props: { position: string } & ChildrenProps) {
  const { position, children } = props;

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
        className={`${position} w-60 bg-slate-700 rounded-lg p-2 flex flex-col`}
      ></DropIcon>
    </>
  );
}

export default LayoutHome;
