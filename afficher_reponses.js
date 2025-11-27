// afficher_reponses.js

// 🔗 Tes informations Supabase
const SUPABASE_URL = "https://gyrhemmeabidqflmcnrw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cmhlbW1lYWFiZHFmbG1jbnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDI5MTYsImV4cCI6MjA3OTgxODkxNn0._1deFRtpII7FugeMw1FxoFjBmHBCNZNu9-Entb-OM-o";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ⚡ Container où afficher les réponses
const container = document.getElementById("reponses");

// 🔹 Fonction pour récupérer les données
async function fetchReponses() {
    const { data, error } = await supabase
        .from("formulaire_iteb")
        .select("*")
        .order("date", { ascending: false }); // les plus récentes en premier

    if (error) {
        console.error(error);
        container.innerHTML = "<p>Erreur lors de la récupération des réponses.</p>";
        return;
    }

    if (data.length === 0) {
        container.innerHTML = "<p>Aucune réponse pour le moment.</p>";
        return;
    }

    // 🔹 Création de la liste
    container.innerHTML = data.map(item => `
        <div class="reponse">
            <h3>${item.entreprise} - ${item.contact}</h3>
            <p><strong>Fonction :</strong> ${item.fonction || "N/A"}</p>
            <p><strong>Email :</strong> ${item.email}</p>
            <p><strong>Téléphone :</strong> ${item.telephone || "N/A"}</p>
            <p><strong>Objectif :</strong> ${item.objectif}</p>
            <p><strong>Application :</strong> ${item.application || "N/A"}</p>
            <p><strong>Fichier joint :</strong> ${item.fichier_joint ? `<a href="${item.fichier_joint}" target="_blank">Voir</a>` : "Aucun"}</p>
            <p><strong>Date :</strong> ${new Date(item.date).toLocaleString()}</p>
            <hr>
        </div>
    `).join("");
}

// 🔹 Appel de la fonction
fetchReponses();
