// Consulta
const resultDiv = document.getElementById('result');

async function consultaClient(handle) {
    resultDiv.innerHTML = 'Carregant...';

    try {
        const resp = await fetch(handle);
        console.log("Resposta fetch "+handle+":", resp);
        const json = await resp.json();
        console.log("JSON rebuts:", json);

        if (!resp.ok || !json.success) {
            resultDiv.innerHTML = `<p style="color:red;">Error: ${json.error || resp.statusText}</p>`;
            return;
        }

        //Llegir files i trobar error
        const rows = json.data;
        console.log("JSON data/rows: ", rows);
        console.log("Nombre files: ", rows.length);
        if (!rows || rows.length === 0) {
            resultDiv.innerHTML = "<p>No s'han trobats registres.</p>";
            return;
        }
        console.log("1r Objecte JSON: ", rows[0]);

        //Crear taula html
        
        let camps = ["Nom"];
        let noms = ["Nom"];
        Crear_Taula(camps, noms, rows);


    } catch (err) {
        console.error("Error fetch "+handle+":", err);
        resultDiv.innerHTML = `<p style="color:red;">Error de connexió: ${err.message}</p>`;
    }
};

// Inserció
const formInsert = document.getElementById('formInsert');
const insertResult = document.getElementById('insertResult');

formInsert.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formInsert);
    const data = {
        llinatges: formData.get('llinatges'),
        nom: formData.get('nom')
    };

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
});

// Funció per escapar HTML
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function Crear_Taula (camps, noms, rows){
    let html = '<table><thead><tr>';
    for (let i=0; i<noms.length; i++){
        html += "<th>"+noms[i]+"</th>"
    }
    html += '</tr></thead><tbody>';

    for (const r of rows) {
        html += "<tr>";
        for (let i=0; i<camps.length; i++){
            html += "<td>"+escapeHtml(r[camps[i]])+"</td>";
        }
        html += "<tr>";
    }
    html += '</tbody></table>';
    resultDiv.innerHTML = html;
}

async function query_selector(alias) {

}


/*
function nombre_keys (myObj){
    let nombre_elements = 0;
    for (const x in myObj) {
        nombre_elements += 1;
    }
    return
}
*/

/*
function autoTaula (rows){
    const myObj2 = JSON.stringify(rows[0]);
    const myObj = JSON.parse(myObj2);
    let camps = [];
    for (const x in myObj){
        camps.push[x];
    }
    console.log(camps);
    Crear_Taula (camps, camps, rows);
}
*/