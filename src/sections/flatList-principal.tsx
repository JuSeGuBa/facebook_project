import "../styles/flatList-principal.css";
import { useState } from "react";
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
// import { CiEdit } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";

import { BsPencilSquare } from "react-icons/bs";
import CreatePost from "./create-post";

// Definición de la interfaz Post
interface Post {
  id: number;
  text: string;
  name: string;
  image: string;
  createdAt: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  description: string;
}

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
  onSave: (id: number, updatedPost: Post) => void; // Función para guardar los cambios
}> = ({ post, onDelete, onSave }) => {
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
    onSave(post.id, updatedPost); // Guardar los cambios
    setIsEditing(false); // Desactivar el modo de edición
  };

  const handleImageClick = () => {
    setImageExpanded(!imageExpanded);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convertir la imagen a una URL temporal
      const imageUrl = URL.createObjectURL(file);
      setEditingImage(imageUrl); // Actualizar el estado de la imagen editada
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <button
          className="edit-btn"
          onClick={handleEditClick} // Activar el modo de edición
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

      {/* Mostrar formulario de edición solo cuando estamos editando */}
      {isEditing ? (
        <div className="edit-post-content">
          <textarea
            className="texterea-edit"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            placeholder="Escribe tu nuevo texto aquí..."
            rows={4} // Puedes ajustar el número de filas según lo necesites
            style={{
              backgroundColor: "#444",

              color: "white", // Texto oscuro para que se vea bien
              padding: "10px", // Un poco de espacio dentro del textarea
              width: "100%", // Asegura que el textarea ocupe todo el ancho disponible
              fontSize: "16px", // Tamaño de fuente adecuado
              borderRadius: "5px", // Bordes redondeados para hacerlo más estético
              resize: "none",
            }}
          />
          <div className="button-edit-container">
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }} // Puedes ocultarlo si prefieres solo el botón de foto
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

      {/* Mostrar la imagen del post o el formulario de edición */}
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

      {/* Las acciones del post */}
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
                  className={`reaction-btn ${selectedReaction === emoji ? "selected" : ""}`}
                  title={label}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comentar y compartir */}
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
                { icon: HiOutlineLink, label: "Copiar enlace" },
              ].map(({ icon: Icon, label, url }, index) => (
                <button
                  key={index}
                  className="share-button"
                  title={label}
                  onClick={() => {
                    if (url) {
                      window.open(url, "_blank");
                    } else {
                      console.log(`Botón de ${label} clickeado`);
                    }
                  }}
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comentarios */}
      {showComments && (
        <div className="comentario-area" style={{ position: "relative" }}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Evitar el salto de línea
                handleSendComment(); // Enviar el comentario al presionar Enter
              }
            }}
            placeholder="Escribe un comentario público..."
            className="textarea-custom"
            style={{ flex: 1, paddingRight: "50px" }}
          />
          <button
            onClick={handleSendComment}
            className="button-send"
            style={{
              position: "absolute",
              bottom: "10px",
              right: "1px",
              background: "none",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              color: "#0866FF",
            }}
          >
            <IoSend />
          </button>
        </div>
      )}

      {comments.length > 0 && <hr className="line-hr" />}
      <div className="comentarios-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comentario-item">
            {comment.description}
          </div>
        ))}
      </div>
    </div>
  );
};

const FlatList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleCreateForm = (post: { text: string; image: string }) => {
    const newPost = {
      id: posts.length + 1,
      text: post.text,
      image: post.image,
      name: "Sebastian Guzman",
      createdAt: new Date().toISOString(),
    };

    setPosts((prevPosts) => {
      // Verificar si el post ya existe
      if (
        prevPosts.some(
          (p) => p.text === newPost.text && p.image === newPost.image
        )
      ) {
        return prevPosts; // No agregar duplicados
      }
      return [...prevPosts, newPost];
    });
  };

  const handleDeletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleSaveEditedPost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) =>
        post.id === id
          ? { ...post, text: updatedPost.text, image: updatedPost.image }
          : post
      );
    });
    setEditingPost(null); // Cerrar el formulario de edición
  };

  return (
    <div className="post-list">
      <CreatePost onPostCreate={handleCreateForm} />
      {editingPost && (
        <div className="edit-post-form">
          <FacebookPost
            post={editingPost}
            onDelete={handleDeletePost}
            onSave={handleSaveEditedPost}
          />
        </div>
      )}
      {posts.map((post) => (
        <FacebookPost
          key={post.id}
          post={post}
          onDelete={handleDeletePost}
          onSave={handleSaveEditedPost}
        />
      ))}
    </div>
  );
};

export default FlatList;
