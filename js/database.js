
var db;

function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    createDatabase: function(){
        var shortName= "KS";
        var version = "1.0";
        var displayName = "DB for Perfumes app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    createTables: function(){

        function txFunction(tx) {
            console.info("Creating table: product");
            var sql = "CREATE TABLE IF NOT EXISTS product(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name  VARCHAR(20) NOT NULL," +
                "description VARCHAR(20)," +
                "price INTEGER NOT NULL," +
                "gender VARCHAR(10));";


            var options = [];

            function successCreate(){
                console.info("Success: Create table: product successful.");
            }

            tx.executeSql(sql, options, successCreate, errorHandler);
        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    },
    dropTables: function(){
        
        function txFunction(tx){
            var sql = "DROP TABLE IF EXISTS product;";
            var options = [];
            
            function successDrop() {
                console.info("Success: product table dropped successfully");
            }
            tx.executeSql(sql, options, successDrop, errorHandler );
        }
        
        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }
        
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};
