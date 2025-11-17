//import {consultaClient} from "./backend_client.js";

let isDeployed = [];
console.log("Carregat array isDeployed");

let llocs = ["Serra de Tramuntana", "Fundació Miró", "Aqualand", "Aficine Palma", "Palma Jump"];
let dates = ["12/10/2025", "15/10/2025", "3/11/2025", "5/3/2026", "6/5/2026"];

async function build_sortides(){
    document.getElementById("titol").innerHTML = "Sortides";
    document.getElementById("container").innerHTML = "Carregant...";
    const rows = await consultaClient('/sortides');
    let nombre_sortides = rows.length;
    console.log(rows);
    build_blocs(nombre_sortides, "formulari_sortides");
    for (let i=0; i<nombre_sortides; i++){
        row = rows[i];
        document.getElementById("tagLeft"+i).innerHTML = row.Lloc;
        document.getElementById("tagRight"+i).innerHTML = row.Data.slice(0, 10);

        resposta_departament = await find("Departaments", "idDepartaments", row.Departaments_idDepartaments);
        departament = resposta_departament[0];

        desplegable = document.getElementById("desplegable"+i);
        desplegable.innerHTML += "<div>"+departament.Nom+"</div>";
        desplegable.innerHTML += "<div>"+row.Hora_sortida.slice(0, 5)+" - "+row.Hora_arribada.slice(0, 5)+"</div>";
        desplegable.innerHTML += "<div> Observacions: "+row.Observacions+"</div>";
        desplegable.innerHTML += "<div> Grups </div>";
        desplegable.innerHTML += "<div> Professors </div>";
    }
    document.getElementById("titol").innerHTML += " ("+nombre_sortides+")";
}

async function build_professors() {
    document.getElementById("titol").innerHTML = "Professors";
    document.getElementById("container").innerHTML = "Carregant...";
    const rows = await consultaClient('/professors');
    let nombre_professors = rows.length;
    console.log(rows);

    build_blocs(nombre_professors, "formulari_professors");
    for (let i=0; i<nombre_professors; i++){
        document.getElementById("tagLeft"+i).innerHTML = rows[i].Llinatges + ", " + rows[i].Nom;
        document.getElementById("tagRight"+i).innerHTML = "DNI: " + rows[i].DNI;

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML += " ("+nombre_professors+")";
}

async function build_grups() {
    document.getElementById("titol").innerHTML = "Grups";
    document.getElementById("container").innerHTML = "Carregant...";
    const rows = await consultaClient('/grups');
    let nombre_grups = rows.length;
    console.log(rows);

    build_blocs(nombre_grups, "formulari_grups");
    for (let i=0; i<nombre_grups; i++){
        document.getElementById("tagLeft"+i).innerHTML = rows[i].Nom;
        document.getElementById("tagRight"+i).innerHTML = "Nombre sortides";

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML += " ("+nombre_grups+")";
}

async function build_departaments() {
    document.getElementById("titol").innerHTML = "Departaments";
    document.getElementById("container").innerHTML = "Carregant...";
    const rows = await consultaClient('/departaments');
    let nombre_departaments = rows.length;
    console.log(rows);

    build_blocs(nombre_departaments, "formulari_departaments");
    for (let i=0; i<nombre_departaments; i++){
        document.getElementById("tagLeft"+i).innerHTML = rows[i].Nom;

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML += "("+nombre_departaments+") ";
}


function toggle_deploy(id){
    document.getElementById("desplegable"+id).hidden = isDeployed[id];
    isDeployed[id] = !isDeployed[id];
    console.log("Tamany array isDeployed: "+isDeployed.length);
}

function build_bloc(i) {
    document.getElementById("container").innerHTML += `
        <div class="bloc"> 
            <button class="desplegador" onclick="toggle_deploy(${i})">
                <img class="img_boto" src="Imatges/down_arrow_simple_1.png">
            </button> 
            <div class="tag_left" id="tagLeft${i}"></div>
            <div class="tag_right" id="tagRight${i}"></div>

            <div class="desplegable" id="desplegable${i}"> 
                <hr>
            </div>
        </div>
        `;
        document.getElementById("desplegable"+i).hidden = true;
        isDeployed.push(false);
}

function build_blocs(n, formulari){
    let nom_formulari = '"'+formulari+'"';
    document.getElementById("container").innerHTML = "<button id='afegir_element' onclick='carregar_formulari("+nom_formulari+")'> + </button>";
    isDeployed = [];
    for (let i=0; i<n; i++){    
        build_bloc(i);
    }
}

function showAll(value){
    for(let i=0; i<isDeployed.length; i++){
        document.getElementById("desplegable"+i).hidden = !value;
        isDeployed[i] = value;
    }
}

function carregar_formulari(nom){
    window.location.href = 'http://localhost:3000/Formularis/'+nom+'.html';
}

async function consultaClient(handle) {
    //resultDiv.innerHTML = 'Carregant...';

    try {
        const resp = await fetch(handle);
        //console.log("Resposta fetch "+handle+":", resp);
        const json = await resp.json();
        //console.log("JSON rebuts:", json);

        if (!resp.ok || !json.success) {
            //resultDiv.innerHTML = `<p style="color:red;">Error: ${json.error || resp.statusText}</p>`;
            return;
        }

        //Llegir files i trobar error
        const rows = json.data;
        //console.log("JSON data/rows: ", rows);
        //console.log("Nombre files: ", rows.length);
        if (!rows || rows.length === 0) {
            //resultDiv.innerHTML = "<p>No s'han trobats registres.</p>";
            return;
        }
        //console.log("1r Objecte JSON: ", rows[0]);
        return rows;
        
        
    } catch (err) {
        //console.error("Error fetch "+handle+":", err);
        //resultDiv.innerHTML = `<p style="color:red;">Error de connexió: ${err.message}</p>`;
    }
};

async function find(table, field, value){
    const data = {
        table: table,
        field: field,
        value: value,
    }
    try {
        const resp = await fetch('/find', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log("Resposta fetch /find:", resp);
        const json = await resp.json();
        console.log("JSON rebuts /find:", json);
        if (json.success) {
            console.log("Fetch /find ha funcionat");
            return json.result;
        } else {
            insertResult.innerHTML = `❌ Error: ${json.error}`;
        }
    } catch (err) {
        console.error("Error fetch /find:", err);
        insertResult.innerHTML = `❌ Error de connexió: ${err.message}`;
    }
}

function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}