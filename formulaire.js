// formulaire.js

// Configuration Supabase
const SUPABASE_URL = "https://gyrhemmeabidqflmcnrw.supabase.co";
const SUPABASE_KEY = "sb_publishable_MOh8buKOsYv-Zd4l8eVR2w_ULNDU1_v"; 
const client = window.supabaseClient;

// FORMULAIRE
const form = document.getElementById("formulaire");

// Affichage conditionnel
document.getElementById("choix-app").addEventListener("change", function () {
    document.getElementById("section-app").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("paiement").addEventListener("change", function () {
    document.getElementById("section-paiement").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("ancien-site").addEventListener("change", function () {
    document.getElementById("section-technique").classList.toggle("hidden", this.value !== "oui");
});

// Soumission du formulaire
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {
        const { error } = await client.from("formulaire_iteb").insert([data]);

        if (error) {
            console.error(error);
            alert("❌ " + error.message);
        } else {
            alert("✅ Formulaire envoyé avec succès !");
            form.reset();
        }
    } catch (err) {
        console.error(err);
        alert("❌ Une erreur inattendue est survenue !");
    }
});