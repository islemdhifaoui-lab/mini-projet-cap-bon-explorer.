
// Tableau contenant les 8 activités
const activites = [
    {
        id: "A01",
        titre: "Découverte de la médina",
        categorie: "Culture",
        lieu: "Nabeul",
        duree: "2 heures",
        prix: 20,
        image: "medina.jpg",
        description: "Découvrez les ruelles de la médina de Nabeul, son histoire, son architecture et son ambiance traditionnelle."
    },

    {
        id: "A02",
        titre: "Atelier d'initiation à la poterie",
        categorie: "Artisanat",
        lieu: "Nabeul",
        duree: "1h30",
        prix: 35,
        image: "pottery.jpg",
        description: "Participez à un atelier de poterie et découvrez les techniques traditionnelles de fabrication."
    },

    {
        id: "A03",
        titre: "Parcours découverte de Kerkouane",
        categorie: "Culture",
        lieu: "Kerkouane",
        duree: "2h30",
        prix: 30,
        image: "kerkouane.jpg",
        description: "Explorez le site archéologique de Kerkouane et découvrez son patrimoine historique."
    },

    {
        id: "A04",
        titre: "Randonnée découverte",
        categorie: "Nature",
        lieu: "Djebel Abderrahmane",
        duree: "3 heures",
        prix: 25,
        image: "nature.jpg",
        description: "Profitez d'une randonnée pour découvrir les paysages naturels et les panoramas du Cap Bon."
    },

    {
        id: "A05",
        titre: "Circuit du littoral",
        categorie: "Nature",
        lieu: "Kélibia",
        duree: "3 heures",
        prix: 40,
        image: "littoral.jpg",
        description: "Découvrez les paysages côtiers et les magnifiques plages de la région de Kélibia."
    },

    {
        id: "A06",
        titre: "Peinture sur céramique",
        categorie: "Artisanat",
        lieu: "Nabeul",
        duree: "2 heures",
        prix: 25,
        image: "ceramique.jpg",
        description: "Laissez libre cours à votre créativité en décorant une pièce en céramique."
    },

    {
        id: "A07",
        titre: "Découverte d'un marché local",
        categorie: "Découverte",
        lieu: "Nabeul",
        duree: "1h30",
        prix: 15,
        image: "marché.jpg",
        description: "Visitez un marché traditionnel et découvrez les produits locaux et l'artisanat de Nabeul."
    },

    {
        id: "A08",
        titre: "Promenade photographique",
        categorie: "Découverte",
        lieu: "Hammamet",
        duree: "2 heures",
        prix: 30,
        image: "hammamet.jpg",
        description: "Partez à la découverte de Hammamet et capturez ses plus beaux paysages en photographie."
    }
];


// Récupération des éléments HTML
const listeActivites = document.getElementById("listeActivites");
const recherche = document.getElementById("recherche");
const categorie = document.getElementById("categorie");
const compteur = document.getElementById("compteur");
const messageVide = document.getElementById("messageVide");


// Fonction qui affiche les activités
function afficherActivites(liste) {

    listeActivites.innerHTML = "";

    liste.forEach(function(activite) {

        listeActivites.innerHTML += `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">

                    <img src="${activite.image}"
                         class="card-img-top"
                         alt="${activite.titre}"
                         style="height: 190px; object-fit: cover;">

                    <div class="card-body d-flex flex-column">

                        <span class="badge bg-info text-dark mb-2">
                            ${activite.categorie}
                        </span>

                        <h5 class="card-title">
                            ${activite.titre}
                        </h5>

                        <p class="card-text">
                            <strong>Lieu :</strong> ${activite.lieu}<br>
                            <strong>Durée :</strong> ${activite.duree}<br>
                            <strong>Prix :</strong> ${activite.prix} TND
                        </p>

                        <button class="btn btn-primary mt-auto"
                                onclick="voirDetails('${activite.id}')">
                            Voir les détails
                        </button>

                    </div>
                </div>
            </div>
        `;
    });

    // Mise à jour du compteur
    compteur.textContent = liste.length;

    // Affichage du message si aucun résultat
    if (liste.length === 0) {
        messageVide.style.display = "block";
    } else {
        messageVide.style.display = "none";
    }
}


// Fonction de recherche et de filtrage
function filtrerActivites() {

    const motCle = recherche.value.toLowerCase();
    const choixCategorie = categorie.value;

    const resultat = activites.filter(function(activite) {

        const correspondRecherche =
            activite.titre.toLowerCase().includes(motCle) ||
            activite.lieu.toLowerCase().includes(motCle);

        const correspondCategorie =
            choixCategorie === "Toutes" ||
            activite.categorie === choixCategorie;

        return correspondRecherche && correspondCategorie;
    });

    afficherActivites(resultat);
}


// Fonction pour afficher les détails dans la modal
function voirDetails(id) {

    const activite = activites.find(function(element) {
        return element.id === id;
    });

    document.getElementById("titreModal").textContent = activite.titre;
    document.getElementById("imageModal").src = activite.image;
    document.getElementById("imageModal").alt = activite.titre;
    document.getElementById("descriptionModal").textContent = activite.description;
    document.getElementById("lieuModal").textContent = activite.lieu;
    document.getElementById("dureeModal").textContent = activite.duree;
    document.getElementById("prixModal").textContent = activite.prix;

    const modal = new bootstrap.Modal(
        document.getElementById("modalActivite")
    );

    modal.show();
}


// Événements : recherche et filtre
recherche.addEventListener("input", filtrerActivites);
categorie.addEventListener("change", filtrerActivites);


// Affichage initial des 8 activités
afficherActivites(activites);
