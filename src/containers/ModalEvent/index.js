import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const ModalEvent = ({ event, small }) => (
  <div className={`ModalEvent ${small ? "small" : ""}`}>
    <div className="ModalEvent__imageContainer">
      <img
        data-testid="card-image-testid"
        src={event.cover}
        alt={event.title}
      />
    </div>
    <div className="ModalEvent__title">
      <div className="ModalEvent__titleLabel">{event.title}</div>
      <div className="ModalEvent__titlePeriode">{event.periode}</div>
    </div>
    <div className="ModalEvent__descriptionContainer">
      <h3>Description</h3>
      <div>{event.description}</div>
    </div>
    <div className="ModalEvent__descriptionContainer">
      <h3>Participants</h3>
      <div>{event.nb_guesses} participants</div>
    </div>
    <div className="ModalEvent__descriptionContainer">
      <h3>Prestations</h3>
      {event.prestations.map((presta) => (
        <div key={presta}>{presta}</div>
      ))}
    </div>
  </div>
);

ModalEvent.propTypes = {
  event: PropTypes.shape({
    cover: PropTypes.string,
    title: PropTypes.string,
    periode: PropTypes.string,
    description: PropTypes.string,
    nb_guesses: PropTypes.number,
    prestations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  small: PropTypes.bool, // Déclarez la prop "small" dans les propTypes
};

ModalEvent.defaultProps = {
  small: false, // Définissez une valeur par défaut pour "small"
};

export default ModalEvent;

