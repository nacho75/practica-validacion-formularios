 $("#formulario").validate({
     onkeyup: false,
     onfocusout: false,
     onclick: false,
     rules: {
         nombre: {
             required: true
         },
         apellidos: {
             required: true
         },
         email: {
             required: true,
             minlength: 4,
             email: true,
             remote: "php/validar_email_db.php"
         },
         email2: {
             required: true,
             minlength: 4,
             equalTo: email
         },
         cp: {
             required: true,
             maxlength: 5,
             minlength: 5,
             digits: true
         },
         iban: {
             iban: true,
             required: true

         },
         telefono: {
             required: true,
             maxlength: 9,
             minlength: 9,
             digits: true

         },
         lastName1: {
             required: true
         },
         pass: {
             required: true,
             controlPass: true
         },
         pass2: {
             required: true,
             equalTo: pass
         },
         cif: {
             required: true,
             cifES: true
         },
         nif: {
             required: true,
             nifES: true,
             remote: "php/validar_nif_db.php"
         }
     }
 });
 $("#cp").focusout(function() {
     var caracteres = $("#cp").val();
     var num = 5 - caracteres.length;
     var cero = "0";

     if (num > 0) {
         for (i = 1; i < num; i++) {
             cero += "0";
         }

         $("#cp").val(cero + caracteres);
     } else if (num <= 0) {
         $("#cp").val(caracteres);
     }

     var cod = new Array();


     cod[1] = "Alava";
     cod[2] = "Albacete";
     cod[3] = "Alicante";
     cod[4] = "Almeria";
     cod[5] = "Avila";
     cod[6] = "Badajoz";
     cod[7] = "Illes Balears";
     cod[8] = "Barcelona";
     cod[9] = "Burgos";
     cod[10] = "Caceres";
     cod[11] = "Cadiz";
     cod[12] = "Castellon";
     cod[13] = "Ciudad Real";
     cod[14] = "Cordoba";
     cod[15] = "A Coruña";
     cod[16] = "Cuenca";
     cod[17] = "Girona";
     cod[18] = "Granada";
     cod[19] = "Guadalajara";
     cod[20] = "Guipuzcoa";
     cod[21] = "Huelva";
     cod[22] = "Huesca";
     cod[23] = "Jaen";
     cod[24] = "Leon";
     cod[25] = "Lleida";
     cod[26] = "La Rioja";
     cod[27] = "Lugo";
     cod[28] = "Madrid";
     cod[29] = "Malaga";
     cod[30] = "Murcia";
     cod[31] = "Navarra";
     cod[32] = "Ourense";
     cod[33] = "Asturias";
     cod[34] = "Palencia";
     cod[35] = "Las Palmas";
     cod[36] = "Pontevedra";
     cod[37] = "Salamanca";
     cod[38] = "S.C. Tenerife";
     cod[39] = "Cantabria";
     cod[40] = "Segovia";
     cod[41] = "Sevilla";
     cod[42] = "Soria";
     cod[43] = "Tarragona";
     cod[44] = "Teruel";
     cod[45] = "Toledo";
     cod[46] = "Valencia";
     cod[47] = "Valladolid";
     cod[48] = "Vizcaya";
     cod[49] = "Zamora";
     cod[50] = "Zaragoza";
     cod[51] = "Ceuta";
     cod[52] = "Melilla";
     $cp = $("#cp").val();
     $zip = $cp.substr(0, 2);
     if ($zip == 00 || $cp < 1000 || $cp > 52999) {
         alert("el CP es erroneo");

     }

     if ($zip.substr(0, 1) == 0) {

         $zip = $cp.substr(1, 1);

     }

     $("#provincia").val(cod[$zip]);
     $.ajax({
         url: "php/cp.php",
         type: "POST",
         data: "zip=" + $("#cp").val(),
         success: function(opciones) {
             $("#localidad").html(opciones);
         }
     })

 });



 $("#apellidos").focusout(function() {
     var nombre = $("#nombre").val();
     var apellidos = $("#apellidos").val();


     $("#facturacionNombre").val(nombre + " " + apellidos);

 });

 $("#demandante").focusout(function() {


     if ($("#demandante").val() == 2) {


         $("#nif2").html("CIF*:");
         $("#lblDemandante").html("Empresa*:");
         $("#facturacionNombre").val("");
         $("#nif").attr({
             "id": "cif",
             "name": "cif"
         });



     } else {
         $("#nif2").html("NIF*:");
         $("#lblDemandante").html("Nombre*:");
         $("#cif").attr({
             "id": "nif",
             "name": "nif"
         });



     }

 });

 $("#email2").focusout(function() {

     $("#usuario").val($("#email2").val());
     $("#usuario").disabled = "true";

 });

 $('#pass').focusin(function() {
     $('#pass').complexify({}, function(valid, complexity) {
         $('#progressBar').val(complexity);
     });
 });

 jQuery.validator.addMethod("controlPass", function(value, element) {

     var prueba = $("#progressBar").val();

     if (prueba < 5) {
         return false;
     } else {


         return true;
     }
 }, "Contraseña insegura");