
var product = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO product(name, description, price, gender) VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE product SET name=?, description=?, price=?, gender=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM product WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM product WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM product;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
