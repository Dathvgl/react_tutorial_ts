import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import SideLeftHome from "./components/SideLeftHome";
import SideRightHome from "./components/SideRightHome";
import { Outlet } from "react-router-dom";

function LayoutHome() {
  return (
    <>
      <div className="full-body flex flex-col">
        <div className="flex flex-1 relative">
          <SideLeftHome />
          <SideRightHome />
          <div className="relative flex-1 flex flex-col text-white bg-blue-900">
            <HeaderHome />
            <div className="px-14 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-zinc-600">
              <Outlet />
            </div>
          </div>
        </div>
        <FooterHome />
      </div>
    </>
  );
}

export default LayoutHome;
