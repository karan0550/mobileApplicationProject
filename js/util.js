
function doValidate_frmProduct() {
    var form = $("#formAddProduct");
    form.validate({
        rules:{
            txtNameAdd:{
                required: true,
                minlength: 2
            },
            txtProductDescriptionAdd:{
                required: true,
                rangelength: [2,20]
            },
            txtPriceAdd:{
                required: true,
            }

        },
        messages:{
            txtNameAdd:{
                required: "You must specify Name",
                minlength: "Name must be at least 2 characters long"
            },
            txtProductDescriptionAdd:{
                required: "You must specify full name",
                rangelength: "Description must be 2-20 characters long"
            },
            txtPriceAdd:{
                required: "You must specify Price",
            }
        }
    });
    return form.valid();
}


