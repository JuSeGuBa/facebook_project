import "../styles/sidebar.css";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

const CustomSidebar = () => {
  return (
    <FlowbiteSidebar aria-label="Sidebar with multi-level dropdown example">
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <FlowbiteSidebar.Item href="#">Products</FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#">Sales</FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#">Refunds</FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="#">Shipping</FlowbiteSidebar.Item>
          </FlowbiteSidebar.Collapse>
          <FlowbiteSidebar.Item href="#" icon={HiInbox}>
            Inbox
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="#" icon={HiUser}>
            Users
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item href="#" icon={HiTable}>
            Sign Up
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
};

export default CustomSidebar;
