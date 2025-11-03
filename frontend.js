import {consultaClient} from backend_client.js;

let isDeployed = [];
console.log("Carregat array isDeployed");

let llocs = ["Serra de Tramuntana", "Fundació Miró", "Aqualand", "Aficine Palma", "Palma Jump"];
let dates = ["12/10/2025", "15/10/2025", "3/11/2025", "5/3/2026", "6/5/2026"];

function build_sortides(){
    let nombre_sortides = 5;
    build_blocs(nombre_sortides);
    for (let i=0; i<nombre_sortides; i++){
        document.getElementById("tagLeft"+i).innerHTML = llocs[i];
        document.getElementById("tagRight"+i).innerHTML = dates[i];

        document.getElementById("desplegable"+i).innerHTML += `
        <div> Departament </div>
        <div> Hora sortida - Hora arribada </div>
        <div> Observacions </div>
        <div> Grups </div>
        <div> Professors </div>
        `;
    }
    document.getElementById("titol").innerHTML = "Sortides";
}

function build_professors() {
    let nombre_professors = 7;
    build_blocs(nombre_professors);
    for (let i=0; i<nombre_professors; i++){
        document.getElementById("tagLeft"+i).innerHTML = "Llinatges, Nom";
        document.getElementById("tagRight"+i).innerHTML = "DNI:";

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML = "Professors";
}

function build_grups() {
    rows = consultaClient("\grups");
    let nombre_grups = rows.length;
    console.log(rows);
    build_blocs(nombre_grups);
    for (let i=0; i<nombre_grups; i++){
        document.getElementById("tagLeft"+i).innerHTML = "Nom";
        document.getElementById("tagRight"+i).innerHTML = "Nombre sortides";

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML = "Grups";
}

function build_departaments() {
    let nombre_departaments = 3;
    build_blocs(nombre_departaments);
    for (let i=0; i<nombre_departaments; i++){
        document.getElementById("tagLeft"+i).innerHTML = "Nom";

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    }
    document.getElementById("titol").innerHTML = "Departaments";
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

function build_blocs(n){
    document.getElementById("container").innerHTML = "";
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