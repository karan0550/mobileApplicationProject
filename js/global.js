
function btnCalculate_click() {
    showCalculatedTotal();
}

function btnAdd_click() {
    addProduct();
}

function btnUpdate_click() {
    updateProduct();
}

function btnDelete_click() {
    deleteProduct();
}

function btnShowAll_click() {
    showAllProducts();
}
function btnShowOne_click() {
    showOneProduct();
}

function pageProduct_show() {
    showAllProducts();
}

function pageDetail_show() {
    showOneProduct();
}

function btnShow_click() {
    getPosition();
}
function btnClearDatabase_click(){
    clearDatabase();
}

function init() {
    $("#txtPriceAdd").on("change", btnCalculate_click);
    $("#btnAdd").on("click", btnAdd_click);

    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnShowAll").on("click", btnShowAll_click);
    $("#btnShowOne").on("click", btnShowOne_click);

    $("#pageProduct").on("pageshow", pageProduct_show);
    $("#pageDetail").on("pageshow", pageDetail_show);
    $("#clearDatabase").on("click", btnClearDatabase_click);
    $("#btnShow").on("click", btnShow_click);

    $("#radRoad").on("change", btnShow_click);
    $("#radSatellite").on("change", btnShow_click);
    $("#radHybrid").on("change", btnShow_click);
    $("#radTerrain").on("change", btnShow_click);
    
}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    init();
    initDB();
});
