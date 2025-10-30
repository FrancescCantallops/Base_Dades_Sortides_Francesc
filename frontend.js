let isDeployed = [];
console.log("Carregat array");


function build_page(){
    let nombre_sortides = 5;
    for (let i=0; i<nombre_sortides; i++){
        document.getElementById("container").innerHTML += `
        <div class="bloc"> 
            <button class="desplegador" onclick="toggle_deploy(${i})"></button> <div class="lloc">Lloc</div>   <div class="data">Data</div> 
            <div class="desplegable" id="desplegable_${i}"> 
                <hr>
                <div>Departament</div> <div>Hora sortida - Hora arribada</div>
                <div> Observacions jashjkdhjksahd </div>
            </div>
        </div>
        `
        document.getElementById("desplegable_"+i).hidden = true;
        isDeployed.push(false);
    } 
}


function toggle_deploy(id){
    console.log("Toggle activat");
    console.log("Valor de isDeployed"+id+": "+isDeployed[id]);
    document.getElementById("desplegable_"+id).hidden = isDeployed[id];
    isDeployed[id] = !isDeployed[id];
    console.log("Toggle acabat");
    console.log("Valor de isDeployed"+id+": "+isDeployed[id]);
}