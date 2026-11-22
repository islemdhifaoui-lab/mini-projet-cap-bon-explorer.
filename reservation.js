
// Les prix des activités en TND
const prixActivites = {
    A01: 20,
    A02: 35,
    A03: 30,
    A04: 25,
    A05: 40,
    A06: 25,
    A07: 15,
    A08: 30
};


// Récupération des éléments HTML
const form = document.getElementById("formReservation");

const activite = document.getElementById("activite");
const participants = document.getElementById("participants");
const date = document.getElementById("date");

const prixUnitaire = document.getElementById("prixUnitaire");
const sousTotal = document.getElementById("sousTotal");
const remise = document.getElementById("remise");
const total = document.getElementById("total");

const erreur = document.getElementById("erreur");
const resultat = document.getElementById("resultat");
const recapitulatif = document.getElementById("recapitulatif");


// Définir la date minimale à aujourd'hui
const aujourdHui = new Date();
const annee = aujourdHui.getFullYear();
const mois = String(aujourdHui.getMonth() + 1).padStart(2, "0");
const jour = String(aujourdHui.getDate()).padStart(2, "0");

date.min = `${annee}-${mois}-${jour}`;


// Fonction pour calculer le prix
function calculerPrix() {

    const idActivite = activite.value;
    const nombre = Number(participants.value);

    // Récupérer le prix unitaire
    const prix = prixActivites[idActivite] || 0;

    // Calcul du sous-total
    const montant = prix * nombre;

    // Calcul de la remise
    let reduction = 0;

    if (nombre >= 4) {
        reduction = montant * 0.10;
    }

    // Calcul du total final
    const montantFinal = montant - reduction;

    // Afficher les résultats
    prixUnitaire.textContent = prix + " TND";
    sousTotal.textContent = montant + " TND";
    remise.textContent = reduction + " TND";
    total.textContent = montantFinal + " TND";
}


// Actualiser le calcul quand l'activité change
activite.addEventListener("change", calculerPrix);

// Actualiser le calcul quand le nombre change
participants.addEventListener("input", calculerPrix);


// Fonction pour récupérer le nom de l'activité
function obtenirNomActivite() {

    return activite.options[activite.selectedIndex].text;
}


// Validation du formulaire
form.addEventListener("submit", function(event) {

    // Empêcher l'envoi du formulaire
    event.preventDefault();

    // Cacher les anciens messages
    erreur.style.display = "none";
    resultat.style.display = "none";

    // Vérifier les champs HTML obligatoires et les formats
    if (!form.checkValidity()) {

        erreur.textContent =
            "Veuillez remplir correctement tous les champs obligatoires.";

        erreur.style.display = "block";

        form.reportValidity();

        return;
    }


    // Vérifier que le téléphone n'est pas vide
    const telephone = document.getElementById("telephone").value.trim();

    if (telephone === "") {

        erreur.textContent =
            "Veuillez saisir un numéro de téléphone.";

        erreur.style.display = "block";

        return;
    }


    // Vérifier le nombre de participants
    const nombre = Number(participants.value);

    if (nombre < 1 || nombre > 6) {

        erreur.textContent =
            "Le nombre de participants doit être compris entre 1 et 6.";

        erreur.style.display = "block";

        return;
    }


    // Vérifier la date
    if (date.value < date.min) {

        erreur.textContent =
            "La date choisie ne doit pas être passée.";

        erreur.style.display = "block";

        return;
    }


    // Vérifier le choix de l'activité
    if (activite.value === "") {

        erreur.textContent =
            "Veuillez choisir une activité.";

        erreur.style.display = "block";

        return;
    }


    // Vérifier l'acceptation
    if (!document.getElementById("acceptation").checked) {

        erreur.textContent =
            "Vous devez accepter les conditions de simulation.";

        erreur.style.display = "block";

        return;
    }


    // Calculer les montants
    const prix = prixActivites[activite.value];
    const montant = prix * nombre;

    let reduction = 0;

    if (nombre >= 4) {
        reduction = montant * 0.10;
    }

    const montantFinal = montant - reduction;


    // Récupérer les informations
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;

    const nomActivite = obtenirNomActivite();

    const type = document.querySelector(
        'input[name="typeParticipation"]:checked'
    ).value;


    // Afficher le récapitulatif
    recapitulatif.innerHTML = `
        Bonjour ${prenom} ${nom} !<br><br>

        <strong>Activité :</strong> ${nomActivite}<br>

        <strong>Date :</strong> ${date.value}<br>

        <strong>Participants :</strong> ${nombre}<br>

        <strong>Type :</strong> ${type}<br>

        <strong>Total :</strong> ${montantFinal} TND
    `;

    resultat.style.display = "block";

});


// Réinitialiser les résultats après le reset
form.addEventListener("reset", function() {

    erreur.style.display = "none";
    resultat.style.display = "none";

    setTimeout(function() {
        calculerPrix();
    }, 0);

});


// Affichage initial
calculerPrix();
