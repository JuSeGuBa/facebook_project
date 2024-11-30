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

const CustomNavbar: React.FC = () => {
  return (
    <Navbar
      fluid
      rounded
      style={{ backgroundColor: "#2e2e2e", padding: "0.5px 20px" }}
    >
      <Navbar.Brand>
        <img
          src="/public/logoFacebook.svg"
          alt="Facebook Logo"
          className="w-10 h-10"
        />
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
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
              className="focus:ring-0 focus:outline-none"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>

      <Navbar.Collapse className="flex justify-center ml-[-50px]">
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
