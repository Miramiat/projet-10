import { render, screen, fireEvent } from '@testing-library/react';
import Home from './index';
import EventCard from "../../components/EventCard";
import { DataProvider } from '../../contexts/DataContext';

jest.mock('../../contexts/DataContext', () => ({
  ...jest.requireActual('../../contexts/DataContext'),
  useData: () => ({
    last: {
      id: 4,
      type: 'conférence',
      date: '2022-08-29T20:28:45.744Z',
      title: 'Conférence #productCON',
      cover: '/images/headway-F2KRf_QfCqw-unsplash.png',
      description: 'Présentation des outils analytics aux professionnels du secteur ',
      nb_guesses: 1300,
      periode: '24-25-26 Février',
      prestations: [
        '1 espace d’exposition',
        '1 scène principale',
        '2 espaces de restaurations',
        '1 site web dédié',
      ],
    },
  }),
}));

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {

  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  });

  it("a footer is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    await screen.findByText("Contactez-nous");
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
  });
});

describe("When a page is created", () => {
  test("renders an event card with the last event in the footer", () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const lastEventCards = screen.getAllByTestId('last-event-card');  
    expect(lastEventCards[0]).toBeInTheDocument();   
  });
});

describe("with small props", () => {
  it("an event card, with the last event, is displayed in the footer", () => {
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
        small
      />
    );
    const cardElement = screen.getByTestId("card-testid");
    expect(cardElement.className.includes("EventCard--small")).toEqual(true);
  });
});







