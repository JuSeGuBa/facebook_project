import "../styles/flatList-principal.css"; // Asegúrate de que los estilos se carguen correctamente
import { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaComment, FaShare } from "react-icons/fa";
import {
  RiMessengerFill,
  RiInstagramLine,
  RiWhatsappFill,
} from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import CreatePost from "./create-post";

// Definición de la interfaz Post
interface Post {
  id: number;
  text: string;
  name: string;
  image: string;
  createdAt: string;
}

// Función para formatear la fecha
const getFormattedDate = (createdAt: string) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const diffInTime = currentDate.getTime() - createdDate.getTime();

  const diffInHours = diffInTime / (1000 * 3600);
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  if (diffInHours < 24) {
    return `${Math.floor(diffInDays * 24)} h ·`;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return createdDate.toLocaleDateString("es-ES", options);
};

const FacebookPost: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null); // Estado para la reacción seleccionada
  const [showComments, setShowComments] = useState(false); // Estado para mostrar los comentarios
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleReactionClick = (reaction: string) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null); // Si ya está seleccionado, lo deseleccionamos
    } else {
      setSelectedReaction(reaction); // Si no, lo seleccionamos
    }
  };

  // Función para obtener el icono y texto según la reacción seleccionada
  const getReactionTextAndIcon = () => {
    switch (selectedReaction) {
      case "👍":
        return { icon: <FaThumbsUp color="#0866FF" />, text: "Me gusta" };
      case "❤️":
        return { icon: "❤️", text: "Me encanta" };
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

  return (
    <div className="post">
      {/* Cabecera del post */}
      <div className="post-header">
        <span className="author">{post.name}</span>
        <span className="date">
          {getFormattedDate(post.createdAt)}{" "}
          <BiWorld className="inline-block ml-1" size={14} />
        </span>
      </div>

      {/* Contenido del post */}
      <p className="post-content">{post.text}</p>
      <img src={post.image} alt="post visual" className="post-image" />

      {/* Acciones del post */}
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
                // Muestra las reacciones disponibles
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
                  title={label} // Tooltip al pasar el mouse
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className="action-btn"
          onClick={() => setShowComments(!showComments)} // Cambio aquí para mostrar los comentarios
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
                // Aquí agregas los íconos de las opciones de compartir
                { icon: RiMessengerFill, label: "Messenger" },
                { icon: RiInstagramLine, label: "Instagram" },
                { icon: RiWhatsappFill, label: "WhatsApp" },
                { icon: HiOutlineLink, label: "Copiar enlace" },
              ].map(({ icon: Icon, label }, index) => (
                <button
                  key={index}
                  className="share-button"
                  title={label} // Tooltip al pasar el mouse
                  onClick={() => {
                    console.log(`Botón de ${label} clickeado`);
                    // Agregar funcionalidad específica de cada botón aquí
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    margin: "5px",
                    padding: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#707070",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#3B3D3E";
                    e.currentTarget.style.color = "#fff"; // Color blanco para el ícono
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#252728";
                    e.currentTarget.style.color = "#707070";
                  }}
                >
                  <Icon size={24} /> {/* Tamaño ajustado */}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sección de comentarios */}
      {showComments && (
        <div
          className="comentario-area"
          style={{
            position: "relative",
            padding: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
          }}
        >
          <textarea
            id="comentario"
            className="textarea-custom"
            placeholder="Escribe un comentario público..."
            style={{
              width: "100%",
              height: "100px",
              padding: "10px",
              backgroundColor: "#444",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              outline: "none",
              resize: "none",
            }}
          />
          <button
            className="button-send"
            style={{
              position: "absolute",
              bottom: "15px",
              right: "10px",
              padding: "10px",
              color: "#707070",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <IoSend />
          </button>
        </div>
      )}
    </div>
  );
};

const posts: Post[] = [
  {
    id: 1,
    text: "No olvides aprovechar las oportunidades que tenemos disponibles para ti.",
    image: "/public/descarga.webp",
    name: "San Felipe Tlalimimilpan",
    createdAt: "2024-12-01T10:00:00",
  },
  {
    id: 2,
    text: "¡Los esperamos con muchas ganas de compartir más conocimientos!",
    image: "/public/descarga.webp",
    name: "Alejandro Cuenca",
    createdAt: "2024-12-03T12:00:00",
  },
];

const FlatList: React.FC = () => {
  return (
    <div className="post-list">
      <CreatePost />

      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FlatList;
