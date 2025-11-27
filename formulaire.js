// formulaire.js

// ⚠️ Configuration Supabase
const SUPABASE_URL = "https://gyrhemmeabidqflmcnrw.supabase.co";
const SUPABASE_KEY = "TON_PUBLISHABLE_ANON_KEY"; // clé publishable, PAS secret

// ✅ Création correcte du client
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// FORMULAIRE
const form = document.getElementById("formulaire");

// ✅ Affichage conditionnel
document.getElementById("choix-app").addEventListener("change", function () {
    document.getElementById("section-app").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("paiement").addEventListener("change", function () {
    document.getElementById("section-paiement").classList.toggle("hidden", this.value !== "oui");
});

document.getElementById("ancien-site").addEventListener("change", function () {
    document.getElementById("section-technique").classList.toggle("hidden", this.value !== "oui");
});

// ✅ Soumission du formulaire
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // ✅ Ajout date
    data.date = new Date().toISOString();

    // ✅ Envoi vers Supabase
    const { error } = await client.from("formulaire_iteb").insert([data]);

    if (error) {
        console.log(error);;
        alert("❌ " + error.message);
    } else {
        alert("✅ Formulaire envoyé avec succès !");
        form.reset();
    }
});
