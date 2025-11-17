const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware per processar JSON del client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
    host: "alumnat.iesdamiahuguet.net",
    user: "francesc",
    password: "JD123456",
    database: "sortides_francesc"
};



// Funció consulta amb logs
function querry(sql) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection(dbConfig);
        con.connect(err => {
            if (err) {
                console.error("Error connectant a MySQL:", err);
                return reject(err);
            }
            //const sql = "SELECT Llinatges, Nom FROM Persones";
            con.query(sql, (err, result) => {
                con.end();
                if (err) {
                    console.error("Error fent querry:", sql, err);
                    return reject(err);
                }
                console.log(result);
                resolve(result);
            });
        });
    });
}

// Serveix l'HTML
//app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, '.')));


// Endpoint GET /consulta
async function endpointGet(handle, sql) {
    app.get(handle, async (req, res) => {
        console.log("Peticio GET "+handle+" rebuda");
        try {
            const results = await querry(sql);
            res.json({ success: true, data: results });
        } catch (err) {
            console.error("Error a "+handle+":", err);
            res.status(500).json({ success: false, error: err.message });
        }
    });
}

endpointGet('/grups', "SELECT * FROM Grups ORDER BY Nivell DESC, Curs, Grup");
endpointGet('/departaments', "SELECT * FROM Departaments");
endpointGet('/professors', 'SELECT * FROM Professors');
endpointGet('/sortides', 'SELECT * FROM Sortides ORDER BY Data');

// Endpoint POST /insertar
app.post('/insertar', async (request, res) => {
    //const { llinatges, nom } = request.body;
    const data = request.body;

    const table = data.table;
    const fields = data.fields;
    const values = data.values;
    console.log("Peticio POST /insertar rebuda:", request.body);
    if (!table || !fields || !values) {
        return res.status(400).json({ success: false, error: 'Falten dades' });
    }
    if(fields.length != values.length){
        return res.status(400).json({ success: false, error: "Discrepancia de longitut entre arrrays"});
    }

    let sql = crear_insert_sql(table, fields, values);
    console.log('SQL:', sql);
    try {
        const result = await querry(sql);
        res.json({ success: true, message: 'Afegit element a '+table, insertedId: result.insertId });
    } catch (err) {
        console.error("Error a /insertar:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/find', async (request, res) => {
    //const { llinatges, nom } = request.body;
    const data = request.body;

    const table = data.table;
    const field = data.field;
    const value = data.value;
    console.log("Peticio POST /insertar rebuda:", request.body);
    if (!table || !field || !value) {
        return res.status(400).json({ success: false, error: 'Falten dades' });
    }

    let sql = "SELECT * FROM "+table+" WHERE "+field+"='"+value+"'";
    console.log('SQL:', sql);
    try {
        const result = await querry(sql);
        res.json({ success: true, message: 'Trobat element a '+table, result});
    } catch (err) {
        console.error("Error a /find:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}/pagina.html`);
});

function crear_insert_sql(table, fields, values){
    let sql = "INSERT INTO "+table;
    sql += format_array (fields);
    sql += " VALUES";
    sql += format_array (values, true);
    return sql;
}

function format_array (llista, posar_cometes){
    let sql = " (";
    for(let i=0; i<llista.length; i++){
        if(posar_cometes){ sql += '"' }
        sql += llista[i];
        if(posar_cometes){ sql += '"' }
        if(i < llista.length - 1){
            sql += ", ";
        }
    }
    sql += ")";
    return sql;
}