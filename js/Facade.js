
function showCalculatedTotal() {
    var price = $("#txtPriceAdd").val();
    var modifiedPrice = $("#txtPriceModify").val();
    var modifiedQuantity = $("#txtQuantityModify").val();
    var quantity = $("#txtQuantityAdd").val();
    $("#txtTotalAdd").val(price* quantity);
    $("#txtTotalMod").val(modifiedPrice* modifiedQuantity);
}


function addProduct() {

    //do validation
    if (doValidate_frmProduct()) {
        //fetch info from inputs
        var name = $("#txtNameAdd").val();
        var description = $("#txtProductDescriptionAdd").val();

        var gender;

        if (document.getElementById('prodForMenAdd').checked)
        {
            gender = $("#prodForMenAdd").val();
        }
        else
        {
            gender = $("#prodForWomenAdd").val();
        }

        var price = $("#txtPriceAdd").val();


        //call DAL function to insert the
        var options = [name, description, price, gender];

        function callback() {
            console.info("Success: Record inserted successfully");
        }

        product.insert(options, callback);
    }
    else {
        console.error("Form is not valid");
    }
}



function clearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared!");
        } catch (e) {
            alert(e);
        }
    }
}

function updateProduct() {
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");

    var name = $("#txtNameModify").val();
    var description = $("#txtDescriptionModify").val();
    var gender = $("#prodForMenModify").val();
    var price = $("#txtPriceModify").val();

    //very important
    var options = [name, description, price, gender, id];

    function callback() {
        console.info("Success: Record updated successfully");
    }

    product.update(options, callback);
}

function deleteProduct() {
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Success: Record deleted successfully");
        $(location).prop('href', '#pageProduct');
    }

    product.delete(options, callback);
}

function showAllProducts() {
    var options = [];

    function callback(tx, results) {

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Name: " + row['name'] +
                " Description: " + row['description'] +
                " Price: " + row['price'] +
                " Gender: " + row['gender']);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>Name: " + row['name'] + "</h1>" +
                "<h2>Description: " + row['description'] + "</h2>" +
                "<h3>price: " + row['price'] + "</h3>" +
                "<h3>Gender: " + row['gender'] + "</h3>" +
                "</a></li>";
        }

        var lv = $("#lvAll");

        lv = lv.html(htmlCode);
        lv.listview("refresh"); // very important
        //attach event handler for each list items
        $("#lvAll a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));

            //navigate to the detail page automatically
            //both will work.
            $(location).prop('href', '#pageDetail');
            // $.mobile.changePage("#pageDetail", {transition: 'none'});
        }

    }

    product.selectAll(options, callback);
}

function showOneProduct() {

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        var row = results.rows[0];

        console.info("Id: " + row['id'] +
            " Name: " + row['name'] +
            " Description: " + row['fullName'] +
            " Price: " + row['dob'] +
            " Gender: " + row['position']);


        $("#txtNameModify").val(row['name']);
        $("#txtDescriptionModify").val(row['description']);
        if (row['gender'] === 'true') {
            $("#prodForMenModify").prop("checked", true);
        }
        else {
            $("#prodForWomenModify").prop("checked", true);
        }

        $("#frmModifyProduct :radio").checkboxradio("refresh");

        $("#txtPriceModify").val(row['price']);

    }

    product.select(options, callback);
}
