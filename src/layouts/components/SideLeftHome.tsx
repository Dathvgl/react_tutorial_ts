import { FaMemory } from "react-icons/fa";
import { BiLineChart } from "react-icons/bi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Brh from "~/components/Brh";
import { BsStar } from "react-icons/bs";

type Props = {
  to: string;
  icon: React.ReactNode;
  label: string;
  extra?: React.ReactNode;
};

function NavLinkHome(props: Props) {
  const { to, icon, label, extra } = props;
  const baseClassName =
    "px-4 py-2 font-semibold flex items-center hover:bg-gray-200 hover:bg-opacity-10";

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? `${baseClassName} bg-gray-200 bg-opacity-10`
          : baseClassName;
      }}
      to={to}
    >
      {icon}
      <div className="flex">
        <Brh />
        {label}
        {extra && (
          <>
            <Brh />
            {extra}
          </>
        )}
      </div>
    </NavLink>
  );
}

function SideLeftHome() {
  return (
    <>
      <div className="hidden md:block md:w-60 bg-slate-800 text-white">
        <div className="w-full h-16 px-4 center-flex">
          <Link to="/">
            <img className="p-4" src="/ZingMP3logo.svg.png" alt="Error" />
          </Link>
        </div>
        <div className="flex flex-col">
          <NavLinkHome to="/personal" icon={<FaMemory />} label={"Cá Nhân"} />
          <NavLinkHome
            to="/"
            icon={<RiCompassDiscoverLine />}
            label={"Khám Phá"}
          />
          <NavLinkHome
            to="/zingChart"
            icon={<BiLineChart />}
            label={"Zing Chart"}
          />
          <hr className="my-4" />
          <NavLinkHome to="/top100" icon={<BsStar />} label={"Top 100"} />
        </div>
      </div>
    </>
  );
}

export default SideLeftHome;
