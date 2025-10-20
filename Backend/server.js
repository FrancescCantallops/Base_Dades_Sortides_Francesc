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
    database: "alumnes_francesc"
};

// Funció consulta amb logs
function consulta() {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection(dbConfig);
        con.connect(err => {
            if (err) {
                console.error("Error connectant a MySQL:", err);
                return reject(err);
            }
            const sql = "SELECT Llinatges, Nom FROM Persones";
            con.query(sql, (err, results) => {
                con.end();
                if (err) {
                    console.error("Error fent consulta:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    });
}

// Funció insert
function insertarAlumne(llinatges, nom) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection(dbConfig);
        con.connect(err => {
            if (err) {
                console.error("Error connectant a MySQL:", err);
                return reject(err);
            }
            const sql = "INSERT INTO Alumnes (Llinatges, Nom) VALUES (?, ?)";
            con.query(sql, [llinatges, nom], (err, result) => {
                con.end();
                if (err) {
                    console.error("Error fent INSERT:", err);
                    return reject(err);
                }
                console.log(result);
                resolve(result);
            });
        });
    });
}

// Serveix l'HTML
app.use(express.static(path.join(__dirname, '.')));

// Endpoint GET /consulta
app.get('/consulta', async (req, res) => {
    console.log("Peticio GET /consulta rebuda");
    try {
        const results = await consulta();
        res.json({ success: true, data: results });
    } catch (err) {
        console.error("Error a /consulta:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Endpoint POST /insertar
app.post('/insertar', async (req, res) => {
    const { llinatges, nom } = req.body;
    console.log("Peticio POST /insertar rebuda:", req.body);
    if (!llinatges || !nom) {
        return res.status(400).json({ success: false, error: 'Falten dades' });
    }
    try {
        const result = await insertarAlumne(llinatges, nom);
        res.json({ success: true, message: 'Alumne afegit', insertedId: result.insertId });
    } catch (err) {
        console.error("Error a /insertar:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});