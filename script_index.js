// Consulta
const btn = document.getElementById('btnConsulta');
const resultDiv = document.getElementById('result');
const loading = document.getElementById('loading');
btn.addEventListener('click', async () => {
    resultDiv.innerHTML = '';
    loading.style.display = 'block';

    try {
        const resp = await fetch('/consulta');
        console.log("Resposta fetch /consulta:", resp);
        const json = await resp.json();
        console.log("JSON rebuts:", json);
        loading.style.display = 'none';

        if (!resp.ok || !json.success) {
            resultDiv.innerHTML = `<p style="color:red;">Error: ${json.error || resp.statusText}</p>`;
            return;
        }

        //Trobar error
        const rows = json.data;
        if (!rows || rows.length === 0) {
            resultDiv.innerHTML = "<p>No s'han trobats registres.</p>";
            return;
        }

        //Crear taula html
        let html = '<table><thead><tr><th>Llinatges</th><th>Nom</th></tr></thead><tbody>';
        for (const r of rows) {
            html += `<tr><td>${escapeHtml(r.Llinatges)}</td><td>${escapeHtml(r.Nom)}</td></tr>`;
        }
        html += '</tbody></table>';
        resultDiv.innerHTML = html;

    } catch (err) {
        loading.style.display = 'none';
        console.error("Error fetch /consulta:", err);
        resultDiv.innerHTML = `<p style="color:red;">Error de connexió: ${err.message}</p>`;
    }
});

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