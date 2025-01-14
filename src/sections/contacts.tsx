import "../styles/contacts.css";
import { Avatar, Card } from "flowbite-react";

interface Contact {
  name: string;
}

const contacts: Contact[] = [
  { name: "Sebastián Bríñez" },
  { name: "Kevin Guzman" },
  { name: "Julieta Triana" },
  { name: "Sara Ruth Barrera Ruiz" },
  { name: "Maricela Castaño Bañol" },
  { name: "Sandy Santamaria" },
  { name: "B-Esteban Guzman" },
  { name: "Manuela Pareja" },
  { name: "Samuel Oicata" },
  { name: "Mai Mosquera Cetre" },
  { name: "Nickolay MitNick Jiménez" },
  { name: "Eblin Villarreal de Mendez" },
  { name: "Luis Miguel Barrera" },
];

const Contact = () => {
  return (
    <div className="contacts ">
      <h2 className="text-xl font-bold mb-4 text-white">Contactos</h2>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <Card key={index} className="card cursor-pointer " horizontal>
            <div className="mt-4 flex items-center space-x-3 lg:mt-6">
              <div className="avatar-container">
                <Avatar alt={contact.name} rounded className="avatar" />
              </div>

              <h3 className="contact-name font-bold">{contact.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contact;
