import { FaMemory } from "react-icons/fa";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import Brh from "~/components/Brh";

type Props = {
  to: string;
  icon: React.ReactNode;
  label: string;
  extra?: React.ReactNode;
};

function NavLinkHome(props: Props) {
  const { to, icon, label, extra } = props;
  const baseClassName = "px-4 py-2 font-semibold flex items-center";

  return (
    <NavLink
      className={({ isActive }) => {
        return isActive ? `${baseClassName} bg-gray-200 bg-opacity-10` : baseClassName;
      }}
      to={to}
    >
      {icon}
      <Brh />
      {label}
      {extra && (
        <>
          <Brh />
          {extra}
        </>
      )}
    </NavLink>
  );
}

function SideLeftHome() {
  return (
    <>
      <div className="w-18 md:w-60 bg-slate-800 text-white">
        <div className="w-full h-16 px-4 bg-blue-500 center-flex">
          <Link to="/">Haha</Link>
        </div>
        <div className="flex flex-col">
          <NavLinkHome to="/personal" icon={<FaMemory />} label={"Cá Nhân"} />
          <NavLinkHome
            to="/"
            icon={<RiCompassDiscoverLine />}
            label={"Khám Phá"}
          />
        </div>
      </div>
    </>
  );
}

export default SideLeftHome;
