import "../styles/flatList-principal.css"; // Estilos de la lista de publicaciones
import { BiWorld } from "react-icons/bi";

interface Post {
  id: number;
  text: string;
  name: string;
  date: string;
  image: string;
}

const posts: Post[] = [
  {
    id: 1,
    text: "No olvides aprovechar las oportunidades que tenemos disponibles para ti.",
    image: "/public/descarga.webp",
    name: "San Felipe Tlalimimilpan",
    date: "4 d · ",
  },
  {
    id: 2,
    text: "¡Los esperamos con muchas ganas de compartir más conocimientos!",
    image: "/public/descarga.webp",
    name: "Alejandro Cuenca",
    date: "Hace 2 horas",
  },
  {
    id: 3,
    text: "No olvides aprovechar las oportunidades que tenemos disponibles para ti.",
    image: "/public/descarga.webp",
    name: "Juan Pérez",
    date: "Hace 1 día",
  },
];

// Componente de una publicación individual
const FacebookPost: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="author">{post.name}</span>
        <span className="date">
          {post.date} <BiWorld className="inline-block ml-1" size={14} />
        </span>
        {/* Icono BiWorld después de la fecha */}
      </div>
      <p className="post-content">{post.text}</p>
      <img src={post.image} alt="post visual" className="post-image" />
    </div>
  );
};

// Componente FlatList
const FlatList = () => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FlatList;
