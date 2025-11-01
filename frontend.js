let isDeployed = [];
console.log("Carregat array isDeployed");

let llocs = ["Serra de Tramuntana", "Fundació Miró", "Aqualand", "Aficine Palma", "Palma Jump"];
let dates = ["12/10/2025", "15/10/2025", "3/11/2025", "5/3/2026", "6/5/2026"];

function build_sortides(){
    console.log("Carregat build_sortides");
    let nombre_sortides = 5;
    document.getElementById("container").innerHTML = "";
    isDeployed = [];
    for (let i=0; i<nombre_sortides; i++){
        build_bloc(i);
        document.getElementById("tagLeft"+i).innerHTML = llocs[i];
        document.getElementById("tagRight"+i).innerHTML = dates[i];

        document.getElementById("desplegable"+i).innerHTML += `
        <div> Departament </div>
        <div> Hora sortida - Hora arribada </div>
        <div> Observacions </div>
        `;
    } 
}

function build_professors() {
    let nombre_professors = 7;
    document.getElementById("container").innerHTML = "";
    isDeployed = [];
    for (let i=0; i<nombre_professors; i++){
        build_bloc(i);
        document.getElementById("tagLeft"+i).innerHTML = "Llinatges, Nom";
        document.getElementById("tagRight"+i).innerHTML = "DNI:";

        document.getElementById("desplegable"+i).innerHTML += "<div> sortides </div>";
    } 
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