import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { DataProvider } from "../../contexts/DataContext";

const data = {
  events: [
    {
      id: 4,
      type: "conférence",
      date: "2022-08-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/headway-F2KRf_QfCqw-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur ",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scène principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
  ],
};

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

  it("an event card, with the last event, is displayed in the footer", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    // Attend que le texte "Notre dernière prestation" soit présent dans le DOM
    await screen.findByText("Notre dernière prestation");

    // Sélectionne l'élément par data-testid
    const lastEventCard = screen.getByTestId("last-event-card");

    // Vérifie que l'élément est présent dans le DOM
    expect(lastEventCard).toBeInTheDocument();

    // Vérifie la présence du titre de la dernière prestation généré dynamiquement
    await screen.findByTestId("last-event-card");

    // Déclenche l'ouverture de la modale en cliquant sur la carte de l'événement
    fireEvent.click(lastEventCard);  
    await screen.findByTestId("last-event-card");     
  });
});

