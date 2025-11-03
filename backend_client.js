export async function consultaClient(handle) {
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

        return rows;
        
    } catch (err) {
        console.error("Error fetch "+handle+":", err);
        resultDiv.innerHTML = `<p style="color:red;">Error de connexió: ${err.message}</p>`;
    }
};