import "../styles/flatList-principal.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaComment,
  FaShare,
  FaTrashAlt,
} from "react-icons/fa";
import {
  RiMessengerFill,
  RiInstagramLine,
  RiWhatsappFill,
} from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { RootState } from "../store";
import {
  Comment,
  createPost,
  deletePost,
  Post,
  updatePost,
} from "../store/reducers/postSlice";
import CreatePost from "./create-post";
import { useAppDispatch, useAppSelector } from "../hooks";

// Definición de la interfaz Post

const getFormattedDate = (createdAt: string) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const isSameDay = currentDate.toDateString() === createdDate.toDateString();
  if (isSameDay) {
    return "Hoy ·";
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return createdDate.toLocaleDateString("es-ES", options);
};

const FacebookPost: React.FC<{
  post: Post;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedPost: Post) => void;
}> = ({ post, onDelete, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [editingText, setEditingText] = useState(post.text); // Estado para el texto editado
  const [editingImage, setEditingImage] = useState(post.image); // Estado para la imagen editada
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando

  const handleReactionClick = (reaction: string) => {
    setSelectedReaction((prev) => (prev === reaction ? null : reaction));
  };

  const getReactionTextAndIcon = () => {
    switch (selectedReaction) {
      case "👍":
        return { icon: <FaThumbsUp color="#0866FF" />, text: "Me gusta" };
      case "❤️":
        return { icon: <FcLike />, text: "Me encanta" };
      case "😂":
        return { icon: "😂", text: "Me divierte" };
      case "😮":
        return { icon: "😮", text: "Me asombra" };
      case "😢":
        return { icon: "😢", text: "Me entristece" };
      default:
        return { icon: <FaRegThumbsUp />, text: "Me gusta" };
    }
  };

  const { icon, text } = getReactionTextAndIcon();

  const handleSendComment = () => {
    if (commentText.trim() === "") return;
    const newComment: Comment = {
      id: comments.length + 1,
      description: commentText,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentText(""); // Limpiar el campo de texto
  };

  const handleEditClick = () => {
    setIsEditing(true); // Activar el modo de edición
  };

  const handleSaveClick = () => {
    const updatedPost = { ...post, text: editingText, image: editingImage };
    onUpdate(post.id, updatedPost); // Guardar los cambios
    setIsEditing(false); // Desactivar el modo de edición
  };

  const handleImageClick = () => {
    setImageExpanded(!imageExpanded);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditingImage(imageUrl); // Actualizar el estado de la imagen editada
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <button
          className="edit-btn"
          onClick={handleEditClick}
          style={{
            position: "absolute",
            top: "10px",
            right: "40px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          title="Editar post"
        >
          <BsPencilSquare />
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(post.id)}
          style={{
            position: "absolute",
            top: "10px",
            right: "0px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          title="Eliminar post"
        >
          <FaTrashAlt />
        </button>
        <span className="author">{post.name}</span>
        <span className="date">
          {getFormattedDate(post.createdAt)}{" "}
          <BiWorld className="inline-block ml-1" size={14} />
        </span>
      </div>

      {isEditing ? (
        <div className="edit-post-content">
          <textarea
            className="texterea-edit"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            placeholder="Escribe tu nuevo texto aquí..."
            rows={4}
            style={{
              backgroundColor: "#444",
              color: "white",
              padding: "10px",
              width: "100%",
              fontSize: "16px",
              borderRadius: "5px",
              resize: "none",
            }}
          />
          <div className="button-edit-container">
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="button-edit-image">
              <IoMdPhotos />
            </label>
            <button onClick={handleSaveClick} className="button-save-edit">
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <p className="post-content">{post.text}</p>
      )}

      <div
        className={`post-image-container ${imageExpanded ? "expanded" : ""}`}
        onClick={handleImageClick}
      >
        <img
          src={editingImage || post.image}
          alt="post visual"
          className={`post-image ${imageExpanded ? "expanded" : ""}`}
        />
      </div>

      <div className="post-actions">
        <div
          className="action-btn"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
          onClick={() => setLiked(!liked)}
        >
          {icon}
          <span>{text}</span>
          {showReactions && (
            <div className="reactions">
              {[
                { emoji: "👍", label: "Me gusta" },
                { emoji: "❤️", label: "Me encanta" },
                { emoji: "😂", label: "Me divierte" },
                { emoji: "😮", label: "Me asombra" },
                { emoji: "😢", label: "Me entristece" },
              ].map(({ emoji, label }) => (
                <button
                  key={emoji}
                  onClick={() => handleReactionClick(emoji)}
                  className={`reaction-btn ${
                    selectedReaction === emoji ? "selected" : ""
                  }`}
                  title={label}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>Comentar</span>
        </div>

        <div
          className="action-btn"
          onMouseEnter={() => setShowShareOptions(true)}
          onMouseLeave={() => setShowShareOptions(false)}
        >
          <FaShare />
          <span>Compartir</span>
          {showShareOptions && (
            <div className="share-options">
              {[
                {
                  icon: RiMessengerFill,
                  label: "Messenger",
                  url: "https://www.messenger.com",
                },
                {
                  icon: RiInstagramLine,
                  label: "Instagram",
                  url: "https://www.instagram.com",
                },
                {
                  icon: RiWhatsappFill,
                  label: "WhatsApp",
                  url: "https://web.whatsapp.com",
                },
                { icon: HiOutlineLink, label: "Copiar enlace", url: "#" },
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-option"
                >
                  <Icon /> {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.description}</p>
            </div>
          ))}
          <div className="comment-input">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <button onClick={handleSendComment} className="send-comment-btn">
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FlatList = () => {
  const dataPosts = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deletePost(id)); // Llamar a la acción para eliminar la publicación
  };

  const handleCreate = (post: Post) => {
    dispatch(createPost(post)); // Llamar a la acción para guardar la publicación actualizada
  };

  const handleUpdate = (id: number, post: Post) => {
    dispatch(updatePost({ id, post }));
  };

  return (
    <div className="flat-list">
      <CreatePost onPostCreate={handleCreate} />
      {dataPosts &&
        dataPosts.posts.map((post, i) => (
          <FacebookPost
            key={post.id + i}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
};

export default FlatList;
