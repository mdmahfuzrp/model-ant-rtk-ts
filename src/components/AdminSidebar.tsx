import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaGithub, FaUser, FaLinkedin } from "react-icons/fa";

import { HiMenuAlt4 } from "react-icons/hi";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>Logo.</h2>
        <DivOne location={location} />
        <DivThree location={location} />
        <DivFour location={location} />
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
    </ul>
  </div>
);

const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5>About me</h5>
    <ul>
      <Li
        url="https://mdmahfuzrp.netlify.app"
        text="Portfolio"
        Icon={FaUser}
        location={location}
      />
      <Li
        url="https://github.com/mdmahfuzrp"
        text="Github"
        Icon={FaGithub}
        location={location}
      />
      <Li
        url="https://www.linkedin.com/in/mdmahfuzrp"
        text="LinkedIn"
        Icon={FaLinkedin}
        location={location}
      />
    </ul>
  </div>
);

const DivFour = ({ location }: { location: Location }) => (
  <div>
    <h5>Others</h5>
    <ul>
      <Li url="/" text="Logout" Icon={RiLogoutCircleLine} location={location} />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,.8)"
        : location.pathname === "/" && text === "Product"
        ? "rgba(0,115,255,.8)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url)
          ? "white"
          : location.pathname === "/" && text === "Product"
          ? "white"
          : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
