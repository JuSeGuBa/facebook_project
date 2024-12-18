import "../styles/flatList-principal.css";
import { useState } from "react";
import { FaThumbsUp, FaRegThumbsUp, FaComment, FaShare } from "react-icons/fa";
import {
  RiMessengerFill,
  RiInstagramLine,
  RiWhatsappFill,
} from "react-icons/ri";
import { HiOutlineLink } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
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

const FacebookPost: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [imageExpanded, setImageExpanded] = useState(false); // Estado para la imagen expandida

  const handleImageClick = () => {
    setImageExpanded(!imageExpanded); // Alternar entre expandir o contraer la imagen
  };

  const handleReactionClick = (reaction: string) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(reaction);
    }
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

    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="author">{post.name}</span>
        <span className="date">
          {getFormattedDate(post.createdAt)}{" "}
          <BiWorld className="inline-block ml-1" size={14} />
        </span>
      </div>

      <p className="post-content">{post.text}</p>
      <div
        className={`post-image-container ${imageExpanded ? "expanded" : ""}`}
        onClick={handleImageClick}
      >
        <img
          src={post.image}
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
                  className={`reaction-btn ${selectedReaction === emoji ? "selected" : ""}`}
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

      {showComments && (
        <div className="comentario-area" style={{ position: "relative" }}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
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

  const handleCreateForm = (post: { text: string; image: string }) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: prevPosts.length + 1,
        text: post.text,
        image: post.image,
        name: "Sebastian Guzman",
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="post-list">
      <CreatePost onPostCreate={handleCreateForm} />
      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FlatList;
