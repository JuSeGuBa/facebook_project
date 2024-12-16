import "../styles/sidebar.css"; // Estilos personalizados
import { FaUserFriends } from "react-icons/fa"; // Font Awesome
import { PiClockCounterClockwiseFill } from "react-icons/pi"; // Phosphor Icons
import { CiSaveDown2 } from "react-icons/ci"; // Circled Icons
import { MdGroups, MdOutlineOndemandVideo } from "react-icons/md"; // Material Design Icons
import { IoIosArrowDropdownCircle } from "react-icons/io"; // Ionicons
import {
  CustomFlowbiteTheme,
  Sidebar as FlowbiteSidebar,
} from "flowbite-react"; // Flowbite components
import { HiUserCircle } from "react-icons/hi"; // Hero Icons

// Tema personalizado para el sidebar
const customTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    inner: "bg-[#242424]", // Fondo interno
  },
};

const CustomSidebar: React.FC = () => {
  return (
    <div className=" flex flex-col  ">
      <FlowbiteSidebar
        aria-label="Sidebar with multi-level dropdown example"
        theme={customTheme}
      >
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            {/* Ítem de usuario */}
            <FlowbiteSidebar.Item
              href="#"
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 items-center py-4"
              icon={HiUserCircle}
            >
              Sebastian Guzman
            </FlowbiteSidebar.Item>

            {/* Ítems principales */}
            <FlowbiteSidebar.Item
              href="#"
              icon={FaUserFriends}
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
            >
              Amigos
            </FlowbiteSidebar.Item>

            <FlowbiteSidebar.Item
              href="#"
              icon={PiClockCounterClockwiseFill}
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
            >
              Recuerdos
            </FlowbiteSidebar.Item>

            <FlowbiteSidebar.Item
              href="#"
              icon={CiSaveDown2}
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
            >
              Guardado
            </FlowbiteSidebar.Item>

            <FlowbiteSidebar.Item
              href="#"
              icon={MdGroups}
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
            >
              Grupos
            </FlowbiteSidebar.Item>

            <FlowbiteSidebar.Item
              href="#"
              icon={MdOutlineOndemandVideo}
              className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
            >
              Videos
            </FlowbiteSidebar.Item>

            {/* "Ver más" con dropdown */}
            <FlowbiteSidebar.Collapse
              icon={IoIosArrowDropdownCircle}
              label="Ver más"
              className=" text-white hover:bg-[#2E2E2E] no-hover-text py-4"
            >
              <FlowbiteSidebar.Item
                href="#"
                className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
              >
                Feeds
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item
                href="#"
                className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
              >
                Eventos
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item
                href="#"
                className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
              >
                Administrador de anuncios
              </FlowbiteSidebar.Item>
              <FlowbiteSidebar.Item
                href="#"
                className="text-white hover:bg-[#2E2E2E] hover:text-gray-200 py-4"
              >
                Recaudaciones de fondos
              </FlowbiteSidebar.Item>
            </FlowbiteSidebar.Collapse>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
        <hr />
      </FlowbiteSidebar>

      {/* Footer siempre visible */}
      <footer className="footer">
        <div className="footer-content">
          <span>
            Privacidad · Condiciones · Publicidad · Opciones de anuncios ·
            Cookies · Meta © 2024
          </span>
        </div>
      </footer>
    </div>
  );
};

export default CustomSidebar;
