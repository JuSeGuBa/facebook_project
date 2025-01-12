import "../styles/home.css";
import FlatList from "../sections/flatList-principal";
import CustomNavbar from "../sections/navbar";
import CustomSidebar from "../sections/sidebar";
import Contact from "../sections/contacts";
import { useSelector } from "react-redux";
import { RootState } from "../../configuration/store";

const Home = () => {
  const posts = useSelector((state: RootState) => state.posts); // Obtén las publicaciones del estado global

  return (
    <>
      <CustomNavbar />
      <div className="home-container">
        <CustomSidebar />
        <FlatList posts={posts} />
        <Contact />
      </div>
    </>
  );
};

export default Home;
