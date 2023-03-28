import ReactPlayer from "react-player";
import HeaderHome from "./components/HeaderHome";
import FooterHome from "./components/FooterHome";
import SideLeftHome from "./components/SideLeftHome";

function LayoutHome() {
  return (
    <>
      <div className="full-body flex flex-col">
        <div className="flex flex-1">
          <SideLeftHome />
          <div className="relative flex-1 flex flex-col text-white bg-blue-900">
            <HeaderHome />
            <div className="px-14 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-zinc-600">
              <div className="h-1/2">Haah</div>
              {/* <ReactPlayer
                url="<https://www.youtube.com/watch?v=X5pQ_sGcNg4>"
                controls
              /> */}
            </div>
          </div>
        </div>
        <FooterHome />
      </div>
    </>
  );
}

export default LayoutHome;
