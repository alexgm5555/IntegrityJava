
var usuario;
var password;
var permitirIngreso;
var validator;


function onLoad(){
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
    
    validator = $("#formLogin").kendoValidator().data("kendoValidator");
    var status = $(".status");

    if (validator.validate()) {
        
        usuario = $("#usuario").val();
        password = $("#password").val();
              
        var loginUrl = 'http://190.144.16.114:8810/rest/Base/BaseIntegrity/Login/'+ usuario + '/' + password + '/582372082679954432';             
       
        
        jQuery.get(loginUrl,{
        },function(resultado){           
            permitirIngreso = JSON.stringify(resultado.response.dslogin.dslogin.ttestado[0].pocestado);
            
            console.log(loginUrl+"\n"+permitirIngreso);
            
            if(permitirIngreso=='"OK"'){                
                console.log("Usuario con permiso de ingresar \n" + permitirIngreso);
                sessionStorage.setItem("usrnom",resultado.response.dslogin.dslogin.eesicusuarios[0].usrnom);
                sessionStorage.setItem("usuario",usuario);
                sessionStorage.setItem("usrmail",resultado.response.dslogin.dslogin.eesicusuarios[0].usrmail);
                sessionStorage.setItem("loginintegrity","valido");                
                sessionStorage.setItem("menuJsonIni",JSON.stringify(resultado.response.dslogin.dslogin.ttxmenuxusuario));
                window.location.assign("html/index.html");
            }else{
                status.text(permitirIngreso)
                console.log("Usuario no puede ingresar \n" + permitirIngreso);                
            }
        });
    }else{
        status.text("Datos incompletos")
    }
}

/*
 *  Permite que los datos del fomulario sean enviando cuando el usuario oprime la tecla "Enter"
 */
function presionaEnter() {
    document.addEventListener('keyup', function(e) {
        e = e || window.event;
        var target = e.keyCode;
        if(target==13){
            login();
            document.getElementById("btnLogin").click();
        }
    }, false);
}
