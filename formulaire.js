// formulaire.js

// 🔗 Remplace par tes informations Supabase
const SUPABASE_URL = "https://gyrhemmeabidqflmcnrw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cmhlbW1lYWFiZHFmbG1jbnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDI5MTYsImV4cCI6MjA3OTgxODkxNn0._1deFRtpII7FugeMw1FxoFjBmHBCNZNu9-Entb-OM-o";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// FORMULAIRE
const form = document.getElementById("formulaire");

// ⚡ Affichage conditionnel
document.getElementById("choix-app").addEventListener("change", function () {
    document.getElementById("section-app").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("paiement").addEventListener("change", function () {
    document.getElementById("section-paiement").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("ancien-site").addEventListener("change", function () {
    document.getElementById("section-technique").classList.toggle("hidden", this.value !== "oui");
});

// 📤 Soumission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // 🔹 Gestion du fichier
    const fichier = form.document.files[0];
    if (fichier) {
        const fileName = `uploads/${Date.now()}_${fichier.name}`;
        const { data: fileData, error: fileError } = await supabase
            .storage
            .from('uploads') // nom du bucket
            .upload(fileName, fichier);

        if (fileError) {
            console.error(fileError);
            alert("Erreur lors de l'upload du fichier !");
            return;
        }

        const { publicUrl } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(fileData.path);

        data.fichier_joint = publicUrl;
    }

    // 🔹 Ajout de la date
    data.date = new Date().toISOString();

    // 🔹 Insertion dans la table
    const { error } = await supabase.from("formulaire_iteb").insert([data]);

    if (error) {
        console.error(error);
        alert("Erreur lors de l'envoi du formulaire !");
    } else {
        alert("Formulaire envoyé avec succès !");
        form.reset();
    }
});
