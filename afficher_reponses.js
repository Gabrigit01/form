// afficher_reponses.js

const SUPABASE_URL = "https://gyrhemmeabidqflmcnrw.supabase.co";
const SUPABASE_KEY = "sb_publishable_MOh8buKOsYv-Zd4l8eVR2w_ULNDU1_v";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let container = document.getElementById("reponses");

async function chargerDonnees() {
    const { data, error } = await client
        .from("formulaire_iteb")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        container.innerText = "Erreur de chargement";
        return;
    }

    container.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${item.entreprise}</strong></p>
            <p>${item.contact} — ${item.email}</p>
            <p>${item.attentes || ''}</p>
            <hr>
        `;
        container.appendChild(div);
    });
}

chargerDonnees();
