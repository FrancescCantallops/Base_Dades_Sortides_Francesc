let isDeployed = [];
console.log("Carregat array");

let llocs = ["Serra de Tramuntana", "Fundació Miró", "Aqualand", "Aficine Palma", "Palma Jump"];
let dates = ["12/10/2025", "15/10/2025", "3/11/2025", "5/3/2026", "6/5/2026"];

function build_sortides(){
    document.getElementById("container").innerHTML = "";
    let nombre_sortides = 5;
    for (let i=0; i<nombre_sortides; i++){
        document.getElementById("container").innerHTML += `
        <div class="bloc"> 
            <button class="desplegador" onclick="toggle_deploy(${i})"><img class="img_boto" src="Imatges/down_arrow_simple_1.png"></button> <div class="lloc">${llocs[i]}</div>   <div class="data">${dates[i]}</div> 
            <div class="desplegable" id="desplegable_${i}"> 
                <hr>
                <div>Departament</div> <div>Hora sortida - Hora arribada</div>
                <div> Observacions jashjkdhjksahd </div>
            </div>
        </div>
        `
        isDeployed = [];
        document.getElementById("desplegable_"+i).hidden = true;
        isDeployed.push(false);
    } 
}

function build_professors() {
    document.getElementById("container").innerHTML = "";
    let nombre_professors = 7;
    for (let i=0; i<nombre_professors; i++){
        document.getElementById("container").innerHTML += `
        <div class="bloc"> 
            <button class="desplegador" onclick="toggle_deploy(${i})"><img class="img_boto" src="Imatges/down_arrow_simple_1.png"></button> <div class="lloc">Nom i Llinatges</div>   <div class="data">DNI</div>
            <div class="desplegable" id="desplegable_${i}"> 
                <hr>
                <div>Sortides</div>
            </div>
        </div>
        `
        isDeployed = [];
        document.getElementById("desplegable_"+i).hidden = true;
        isDeployed.push(false);
    } 
}


function toggle_deploy(id){
    document.getElementById("desplegable_"+id).hidden = isDeployed[id];
    isDeployed[id] = !isDeployed[id];
}