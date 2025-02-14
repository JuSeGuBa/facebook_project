import "../styles/navbar.css";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { MdOutlineGroups } from "react-icons/md";
import { CgGames } from "react-icons/cg";
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";

const CustomNavbar: React.FC = () => {
  return (
    <Navbar
      fluid
      rounded
      style={{ backgroundColor: "#2e2e2e", padding: "0.5px 20px" }}
    >
      <Navbar.Brand>
        <FaFacebook style={{ fontSize: "2rem", color: "#1A6DD8" }} />
        <form method="GET" className="ml-4 flex items-center">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              name="q"
              placeholder="Buscar en Facebook"
              className="pl-10 py-2 rounded-full text-sm w-64 bg-[#434343] text-white border-none focus:ring-0 focus:outline-none"
            />
          </div>
        </form>
      </Navbar.Brand>

      <div className="flex md:order-2 space-x-4 items-center">
        <Navbar.Link href="#" className="navbar-link">
          <CgMenuGridO className="text-2xl text-white" />
        </Navbar.Link>
        <Navbar.Link href="#" className="navbar-link">
          <FaFacebookMessenger className="text-2xl text-white" />
        </Navbar.Link>
        <Navbar.Link href="#" className="navbar-link">
          <IoMdNotifications className="text-2xl text-white" />
        </Navbar.Link>

        <Dropdown
          arrowIcon={false}
          label={
            <Avatar
              alt="User settings"
              rounded
              className="bg-[#2E2E2E] text-white"
            ></Avatar>
          }
          className="button-avatar bg-[#2E2E2E] no-border"
          style={{
            background: "transparent",
          }}
        >
          <Dropdown.Header className="text-white">
            <span className="block text-sm">Sebastian Guzman</span>
            <span className="block truncate text-sm font-medium">
              sebancho42@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item className="bg-[#2E2E2E] text-white hover:text-gray-700">
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item className="bg-[#2E2E2E] text-white hover:text-gray-700">
            Settings
          </Dropdown.Item>
          <Dropdown.Item className="bg-[#2E2E2E] text-white hover:text-gray-700">
            Earnings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="bg-[#2E2E2E] text-white hover:text-gray-700">
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>

      <Navbar.Collapse className="navbar-collapse flex justify-center space-x-10 ml-[-50px]">
        <Navbar.Link href="/" active className="mr-5 navbar-item">
          <MdHomeFilled className="icon text-3xl" />
        </Navbar.Link>
        <Navbar.Link href="#" active className="mr-5 navbar-item">
          <HiMiniBuildingStorefront className="icon text-3xl" />
        </Navbar.Link>
        <Navbar.Link href="#" active className="mr-5 navbar-item">
          <MdOutlineGroups className="icon text-3xl" />
        </Navbar.Link>
        <Navbar.Link href="#" active className="mr-5 navbar-item">
          <CgGames className="icon text-3xl" />
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
