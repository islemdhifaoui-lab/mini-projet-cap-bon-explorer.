
// Récupérer le formulaire
const formulaire = document.getElementById("formContact");

// Récupérer la zone de confirmation
const confirmation = document.getElementById("confirmationContact");

// Écouter l'événement submit
formulaire.addEventListener("submit", function(event) {

    // Empêcher le rechargement de la page
    event.preventDefault();

    // Afficher le message de confirmation
    confirmation.textContent =
        "Merci ! Votre message a été enregistré localement à l'écran. Aucun message réel n'a été envoyé.";

    // Afficher la zone de confirmation
    confirmation.classList.remove("d-none");

    // Vider les champs du formulaire
    formulaire.reset();

});
