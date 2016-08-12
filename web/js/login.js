
var usuario;
var password;
var permitirIngreso;
var validator;


function onLoad() {
    sessionStorage.clear();
    validator = $("#formLogin").kendoValidator().data("kendoValidator");

    $("#btnLogin").kendoButton({
    });

    presionaEnter();
}

/*
 * Metodo que consume el servicio de para el Login
 * 
 */
function login() {
    usuario = $("#usuario").val();
    password = $("#password").val();

    try {
        var data = "{"
+"  \"dslogin\": {"
+"    \"ttdatauser\": ["
+"      {"
+"        \"picusrcod\": \"fchaparro\","
+"        \"picusrpass\": \"1234\","
+"        \"picfiid\": \"921682464178209792\","
+"        \"poccargo\": \" \""
+"      }"
+"    ]"
+"  }"
+""
+""
+"}";
        var jSonData = JSON.parse(data);
        var objResponse = {};
        var objEstado = {};
        $.ajax({
            type: "POST",
            data: data,
            url: "http://190.144.16.114:8810/rest/Base/BaseIntegrity/Login",
            contentType: "application/json",
            success: function (resp) {
                alert(JSON.parse(resp))
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () { //use this
            //afterAjax(objResponse, objEstado);
        });
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }

}

/*
 *  Permite que los datos del fomulario sean enviando cuando el usuario oprime la tecla "Enter"
 */
function presionaEnter() {
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        var target = e.keyCode;
        if (target == 13) {
            login();
            document.getElementById("btnLogin").click();
        }
    }, false);
}
