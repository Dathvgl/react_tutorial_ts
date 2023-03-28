import { BsArrowLeft, BsArrowRight, BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Brh from "~/components/Brh";
import { CircleIcon } from "~/components/Icon";
import SearchHome from "./Search";

function HeaderHome() {
  return (
    <>
      <div className="px-14 sticky top-0 h-16 flex justify-between items-center">
        <div className="flex items-center">
          <BsArrowLeft size={25} />
          <Brh />
          <BsArrowRight size={25} />
          <Brh />
          <SearchHome />
        </div>
        <div className="flex items-center">
          <CircleIcon id="settings" content="Settings" place="bottom">
            <FiSettings size={20} />
          </CircleIcon>
          <Brh />
          <CircleIcon id="non-user" content="User" place="bottom">
            <BsFillPersonFill size={20} />
          </CircleIcon>
        </div>
      </div>
    </>
  );
}

export default HeaderHome;
