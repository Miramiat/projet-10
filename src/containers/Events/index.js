import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";


import "./style.css";

function generateUniqueKey() {
  return `unique-key-${Date.now()}-${Math.random()}`;
}

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = (data?.events || []).filter((event) => {
    if (!type) return true;
    return event.type === type;
  });

  const handleTypeChange = (newType) => {
    setType(newType);
    setCurrentPage(1);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);
  const typeList = [...new Set(data?.events.map((event) => event.type))];

  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "Loading..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={[...typeList]}
            onChange={handleTypeChange}
            value={type || "Toutes"}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.slice(startIndex, endIndex).map((event) => (
              <Modal key={generateUniqueKey()} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
          {Array.from({ length: pageNumber }).map((_, index) => (
        <a
          key={generateUniqueKey()} // Utilisez la fonction pour générer une clé unique
          href="#events"
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </a>
      ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
