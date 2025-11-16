const data = {
    table: "Taula",
    fields: ["Camp1", "Camp2", "Camp3"],
    values: ["Valor1", "Valor2", "Valor3"],
}


const table = data.table;
const fields = data.fields;
const values = data.values;

if(fields.length != values.length){
    console.log("Discrepancia de longitut entre arrrays");
}

let sql = "INSERT INTO "+table;
sql += format_array (fields);
sql += " VALUES";
sql += format_array (values);

console.log(sql);

function format_array (llista){
    let sql = " (";
    for(let i=0; i<llista.length; i++){
        sql += llista[i];
        if(i < llista.length - 1){
            sql += ", ";
        }
    }
    sql += ")";
    return sql;
}