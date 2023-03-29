import { BsArrowLeft, BsArrowRight, BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import Brh from "~/components/Brh";
import { CircleIcon, DropIcon } from "~/components/Icon";
import SearchHome from "./Search";

const classNameDrop: string =
  "right-0 top-14 w-60 bg-slate-700 rounded-lg p-2 flex flex-col";
const classNameDropItem: string =
  "p-2 hover:bg-black hover:bg-opacity-20 rounded";

function HeaderHome() {
  return (
    <>
      <div className="px-14 bg-slate-700 sticky top-0 h-16 flex justify-between items-center">
        <div className="flex items-center">
          <BsArrowLeft size={25} />
          <Brh />
          <BsArrowRight size={25} />
          <Brh />
          <SearchHome />
        </div>
        <div className="flex items-center">
          <DropIcon
            id="settings"
            content="Settings"
            place="bottom"
            icon={<FiSettings size={20} />}
            iconType={CircleIcon}
            className={classNameDrop}
          >
            <div className={classNameDropItem}>Haha</div>
          </DropIcon>
          <Brh />
          <DropIcon
            id="non-user"
            content="User"
            place="bottom"
            icon={<BsFillPersonFill size={20} />}
            iconType={CircleIcon}
            className={classNameDrop}
          >
            <Link className={classNameDropItem} to={"/login/signUp"}>
              Đăng ký
            </Link>
            <Link className={classNameDropItem} to={"/login/signIn"}>
              Đăng nhập
            </Link>
          </DropIcon>
        </div>
      </div>
    </>
  );
}

export default HeaderHome;
