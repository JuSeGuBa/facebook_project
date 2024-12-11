import "../styles/create-post.css";
import { Avatar } from "flowbite-react";
import { IoMdPhotos } from "react-icons/io";

const CreatePost = () => {
  return (
    <div className="post-create">
      <div className="description">
        <Avatar img="" alt="avatar of Jese" rounded />
        <form className="create-post-form">
          <div className="input-container">
            <input
              type="search"
              placeholder="¿Qué estás pensando Sebastian?"
              className="search-input rounded-full text-sm bg-[#434343] text-white border-none focus:ring-0 focus:outline-none"
            />
            <label htmlFor="file-input" className="input-button">
              <IoMdPhotos />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden-file-input"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
