async function enviar_formulari (id_formulari) {
    const formInsert = document.getElementById(id_formulari);
    const insertResult = document.getElementById('insertResult');

    //Creacio objecte formulari i passar a altre objecte
    const formData = new FormData(document.getElementById(formInsert));
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
};