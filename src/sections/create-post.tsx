import "../styles/create-post.css";
import { Avatar } from "flowbite-react";
import { IoMdPhotos } from "react-icons/io";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { Post } from "../store/reducers/postSlice";

const CreatePost: React.FC<{
  onPostCreate: (post: Post) => void;
}> = ({ onPostCreate }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || image) {
      onPostCreate({
        text,
        image: image || "",
        id: Math.floor(Math.random() * 10),
        name: "Sebastian Guzman",
        createdAt: new Date().toISOString(),
      });
      setText("");
      setImage(null);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div className="post-create">
      <div className="description">
        <div className="avatar-container">
          <Avatar img="" alt="avatar of Jese" rounded />
        </div>
        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="¿Qué estás pensando Sebastian?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="search-input rounded-full text-sm bg-[#434343] text-white border-none focus:ring-0 focus:outline-none"
            />
            <label htmlFor="file-input" className="input-button">
              <IoMdPhotos />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(URL.createObjectURL(file));
                }
              }}
              className="hidden-file-input"
            />
          </div>
          {text.trim() && image && (
            <button type="submit" className="post-button ">
              <IoSend />
            </button>
          )}
        </form>
      </div>
      {(text.trim() || image) && (
        <div className="preview-card">
          <div className="preview-content">
            <h4>Previsualización del post</h4>
            {image && (
              <div className="image-preview">
                <img src={image} alt="Previsualización" />
                <button className="remove-image" onClick={handleImageRemove}>
                  Eliminar imagen
                </button>
              </div>
            )}
            <p>{text || "Texto vacío..."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
