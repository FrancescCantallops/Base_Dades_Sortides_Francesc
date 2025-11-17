async function enviar_departament(id_formulari){
    const formInsert = document.getElementById(id_formulari);
    const insertResult = document.getElementById('insertResult');
    const dadesFormulari = new FormData(formInsert);

    const fields = ["Nom"];
    const values = [dadesFormulari.get('Nom')];
    if(values[0] == ''){
        insertResult.innerHTML = "Ha d'emplanar el nom del departament";
        return;
    }
    const data = {
        table: "Departaments",
        fields: fields,
        values: values,
    }
    enviar_insert(data, formInsert, insertResult);
}

async function enviar_professor(id_formulari){
    const formInsert = document.getElementById(id_formulari);
    const insertResult = document.getElementById('insertResult');
    const dadesFormulari = new FormData(formInsert);

    const fields = ["Nom", "Llinatges", "DNI"];
    const values = [dadesFormulari.get('Nom'), dadesFormulari.get('Llinatges'), dadesFormulari.get('DNI')];
    for(let i=0; i<values.length; i++){
        if(values[i] == ''){
        insertResult.innerHTML = "Ha d'emplanar tots els camps";
        return;
        }
    }
    const data = {
        table: "Professors",
        fields: fields,
        values: values,
    }
    enviar_insert(data, formInsert, insertResult);
}

async function enviar_grup(id_formulari){
    const formInsert = document.getElementById(id_formulari);
    const insertResult = document.getElementById('insertResult');
    const dadesFormulari = new FormData(formInsert);

    const llistaCursos = ["1", "2", "3", "4", "1", "2"];
    const llistaNivells = [0, 0, 0, 0, 1, 1];
    const nivells = ["ESO", "BATX"];

    const opcioCurs = dadesFormulari.get("cursInivell");
    console.log(opcioCurs);
    const Curs = llistaCursos[opcioCurs];
    const Nivell = nivells[llistaNivells[opcioCurs]];
    const Grup = dadesFormulari.get("Grup");
    const Nom = Curs+" "+Nivell+" "+Grup;

    const fields = ["Nom", "Curs", "Nivell", "Grup"];
    const values = [Nom, Curs, Nivell, Grup];
    for(let i=0; i<values.length; i++){
        if(values[i] == ''){
        insertResult.innerHTML = "Ha d'emplanar tots els camps";
        return;
        }
    }
    const data = {
        table: "Grups",
        fields: fields,
        values: values,
    }
    enviar_insert(data, formInsert, insertResult);
}

async function enviar_sortida(id_formulari){
    const formInsert = document.getElementById(id_formulari);
    const insertResult = document.getElementById('insertResult');
    const dadesFormulari = new FormData(formInsert);

    const Lloc = dadesFormulari.get("Lloc");
    const Observacions = dadesFormulari.get("Observacions");
    const Departament = dadesFormulari.get("Departament");
    const Data = dadesFormulari.get("Data"); 
    console.log(Data);
    const Hora_sortida = dadesFormulari.get("Hora_sortida");
    console.log(Hora_sortida);
    const Hora_arribada = dadesFormulari.get("Hora_arribada");
    console.log(Hora_arribada);

    const fields = ["Data", "Hora_sortida", "Hora_arribada", "Lloc", "Observacions", "Departaments_idDepartaments"];
    const values = [Data, Hora_sortida, Hora_arribada, Lloc, Observacions, Departament];
    for(let i=0; i<values.length; i++){
        if(values[i] == '' && i != 4){
        insertResult.innerHTML = "Falten camps obligatoris per emplanar";
        return;
        }
    }
    const data = {
        table: "Sortides",
        fields: fields,
        values: values,
    }
    enviar_insert(data, formInsert, insertResult);
}

function build_opcions_grups(){
    let opcionsCurs = ["1r d'ESO", "2n d'ESO", "3r d'ESO", "4t d'ESO", "1r de Batxiller", "2n de Batxiller"];
    let html = '';
    for(let i=0; i<llista.length; i++){
        html += '<option value="'+i+'">';
        html += llista[i];
        html += '</option>';
    }
    document.getElementById("cursInivell").innerHTML += html;
}

async function build_opcions_sortides(){
    const rows = await consultaClient('/departaments');
    let html = '';
    for(let i=0; i<rows.length; i++){
        html += '<option value="'+rows[i].idDepartaments+'">';
        html += rows[i].Nom;
        html += '</option>';
    }
    console.log(html);
    document.getElementById("Departament").innerHTML += html;
}

async function build_opcions_sortides_professors(){
    const rows_sortides = await consultaClient('/sortides');
    const rows_professors = await consultaClient('/professors');

    let html = '';
    for(let i=0; i<rows_sortides.length; i++){
        html += '<option value="'+rows_sortides[i].idSortides+'">';
        html += rows_sortides[i].Lloc+" "+rows_sortides[i].Data.slice(0, 10);
        html += '</option>';
    }
    console.log(html);
    document.getElementById("Sortida").innerHTML += html;
}

async function enviar_insert(data, formInsert, insertResult){
    insertResult.innerHTML = 'Enviant...';
    try {
        const resp = await fetch('/insertar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        console.log("Resposta fetch /insertar:", resp);
        const json = await resp.json();
        console.log("JSON rebuts /insertar:", json);
        if (json.success) {
            insertResult.innerHTML = `✅ ${json.message} (ID: ${json.insertedId})`;
            formInsert.reset();
        } else {
            insertResult.innerHTML = `❌ Error: ${json.error}`;
        }
    } catch (err) {
        console.error("Error fetch /insertar:", err);
        insertResult.innerHTML = `❌ Error de connexió: ${err.message}`;
    }
}

async function consultaClient(handle) {
    try {
        const resp = await fetch(handle);
        const json = await resp.json();
        console.log(json);

        if (!resp.ok || !json.success) {
            console.log("Error", json.error);
            return;
        }

        const rows = json.data;
        if (!rows || rows.length === 0) {
            return;
        }
        console.log(rows);
        return rows;
        
    } catch (err) {
    }
};