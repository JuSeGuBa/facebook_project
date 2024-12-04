import "../styles/home.css";
import FlatList from "../sections/flatList-principal";
import CustomNavbar from "../sections/navbar";
import CustomSidebar from "../sections/sidebar";

const Home = () => {
  return (
    <div>
      <>
        <CustomNavbar />
        <div className="home-container">
          <FlatList />
          <CustomSidebar />
        </div>
      </>
    </div>
  );
};

export default Home;
