import "../styles/home.css";
import FlatList from "../sections/flatList-principal";
import CustomNavbar from "../sections/navbar";
import CustomSidebar from "../sections/sidebar";
import Contact from "../sections/contacts";

const Home = () => {
  return (
    <div>
      <>
        <CustomNavbar />
        <div className="home-container">
          <FlatList />
          <CustomSidebar />
        </div>
        <Contact />
      </>
    </div>
  );
};

export default Home;
