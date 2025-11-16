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