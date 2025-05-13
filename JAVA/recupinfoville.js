
document.getElementById('weatherForm').addEventListener('submit', function(événement) {

    événement.preventDefault();


    const codePostal = document.getElementById('postalCode').value.trim();

    const motifCodePostal = /^\d{5}$/;


    if (!motifCodePostal.test(codePostal)) {

        alert('Veuillez entrer un code postal valide de 5 chiffres.');
        return; 
    }
    const joursprevis = parseInt(document.getElementById("jourchoisis").value)

    récupérerCommunes(codePostal);
});


function récupérerCommunes(codePostal) {

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`)
        .then(réponse => réponse.json())
        .then(données => afficherCommunes(données))
        .catch(erreur => console.error('Erreur lors de la récupération des communes:', erreur));
}


function afficherCommunes(communes) {

    const sélecteurVille = document.getElementById('citySelect');

    
    sélecteurVille.innerHTML = '<option value="">--Sélectionnez une ville--</option>';

    if (communes.length > 0) {

        communes.forEach(commune => {
            const option = document.createElement('option');
            option.value = commune.code; 
            option.textContent = commune.nom; 
            sélecteurVille.appendChild(option);
        });

        sélecteurVille.style.display = 'block';
    } else {

        alert('Aucune commune trouvée pour ce code postal.');
    }
}

document.getElementById('citySelect').addEventListener('change', function() {

    const codeVilleSélectionnée = this.value;

    if (codeVilleSélectionnée) {

        récupérerMétéo(codeVilleSélectionnée);
    }
});