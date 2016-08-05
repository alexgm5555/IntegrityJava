var objJson;
var strJson;

$(document).ready(function() {
    sessionStorage.setItem("VideoAyuda","http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865s");//cambiar urlVideo con url link apenas este listo el video de ayuda   
        
    if(sessionStorage.getItem("loginintegrity")==="valido"){
        $(window).trigger("resize");
    
        $("#btnCambiarClave").kendoButton({
            
        });
        $("#btnGuardarClave").kendoButton({
            
        });
        menufunciones();        
        document.getElementById("lbNombre").innerHTML = sessionStorage.getItem("usrnom");
        document.getElementById("lbEMail").innerHTML = sessionStorage.getItem("usrmail");    
        document.getElementById("imgUsuario").src = "../images/equipo/"+sessionStorage.getItem("usuario")+".png";
    }else{
        window.location.assign("login.html");
    }
    
    
});


$(window).resize(function() {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight-70);
  });
/**
 * Cambia la imagen del menu izquierdo, cuyo id=imgId, por una imagen que muestre un estado activo(On). 
 * @param {type} imgId 
 * @param {type} estiloTd
 * @returns {undefined}
 */  
function cambiarImagen(imgId, estiloTd){
    var imgName=imgId.replace("img", "").toLowerCase();   
    
    var estado = document.getElementById(imgId).getAttribute("estado");
    apagarBotones(imgId);
    
    if(estado == "off"){         
        document.getElementById(imgId).src = "../images/"+imgName+"On.png";
        document.getElementById(imgId).setAttribute("estado", "on");
        document.getElementById(imgId).setAttribute("onmouseover", "");
        document.getElementById(imgId).setAttribute("onmouseout", "");
        cambiarFondoTD(estiloTd);
    }
}

/**
 * Cambia el fondo del todos los td que tengan el atributo name="imgLogoIntegrity"
 */
function cambiarFondoTD(nombreClase){    
    if(nombreClase==""){        
        document.getElementById("imgLogoIntegrity").src = "../images/Login Inicio-07.png";
    }else{
        document.getElementById("imgLogoIntegrity").src = "../images/logo-08.png";
    }    
    var listaTdSuperior = document.getElementsByName("tdSuperior");    
    for (var i=0; i<listaTdSuperior.length; i++){
        listaTdSuperior[i].className = nombreClase;
    }  
}
/**
 * cambia el estado de todos los botones del menu vertical de la izquierda (Trasferencias, reportes, procesos, etc ) a off 
 * excepto el del id que le pasemos, este quedara activo
 */
function apagarBotones(id){
    var imgMenu = document.getElementsByName("imgMenu");    
    for (var i=0; i<imgMenu.length; i++){        
        if(imgMenu[i].id!=id && imgMenu[i].getAttribute("estado")!="off"){
            var imgNombre=imgMenu[i].id.replace("img", "").toLowerCase();            
            document.getElementById(imgMenu[i].id).src = "../images/"+imgNombre+"Off.png";
            document.getElementById(imgMenu[i].id).setAttribute("estado", "off");
            document.getElementById(imgMenu[i].id).setAttribute("onmouseover", "this.src='../images/"+imgNombre+"RO.png';");
            document.getElementById(imgMenu[i].id).setAttribute("onmouseout", "this.src='../images/"+imgNombre+"Off.png';");
        }
    }
}
/**
 * Abre la pagina de ayuda que esta almacenda como una variable de sesion, la pagina que despiegla por el momento esta en http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865sS
 */
function ayuda(){        
	var video = sessionStorage.getItem("VideoAyuda");
	if(video){
		windowPopUp (video,"Ayuda");
	}else{
		var htmlText= '<html><head><title>Soporte</title></head><body><p align="center">'+
		'<img src="images/ayuda-52.png" alt="Soporte" width="200" height="45"><br></br></p>'+
		'<p align="center" style="font-family:Tahoma;font-size:10pt;">Visite nuestro '+
		'canal de tutoriales <b>Integrity</b> y conozca todas las posibilidades de nuestro sistema.'+
		'<br></br></p><p align="center"><img src="images/video.png" alt="Soporte" width="500" height="307"></p></body></html>';
		alert(htmlText);
	}
}
/**
 * 
 * @param {type} detalle 
 * @param {type} titulo
 * @returns {undefined}
 */
function  windowPopUp (detalle,titulo){
	try{
		$("#windowDiv").append("<div id='window'></div>");
		var win = $("#window").kendoWindow({
			draggable: true,
			height: "90%",
			modal: true,
			resizable: false,
			title: titulo,
			width: "1300px",
			content: detalle,
			close: function() {
				this.destroy(); 
			}
		}).data("kendoWindow");
                win.center()
		win.open();
	}catch(e){
		alert("Function: windowPopUp Error: "+e.message);
	}
}

function cambiarClave(){    
    reemplazarDiv("divBtCambiarClave", "cambiarClave");
}

function guardarClave(){
    reemplazarDiv("cambiarClave","divBtCambiarClave");
}
/*
 * Funcion reemplaza un div por otro, oculta el divOcultar y muestra el divMostrar con un leve efecto.
 */
function reemplazarDiv(divOcultar, divMostrar){
    document.getElementById(divOcultar).style.display = 'none';    
    $("#"+divMostrar).fadeIn("slow");
}

function mostrarArbol(){
    $("#perfil").fadeOut("slow");
    $("#divArbol").fadeIn("slow");
}
/*
 * Funcion que se encarga de limpiar todas las variables de sesion y retornar a la pagina de login.
 */
function cerrarSesion(){
	sessionStorage.clear();
	window.location.assign("login.html");
}
/*
 * reestructura el json que esta en menuJsonIni y lo trasnforma de tal forma que sea util para enviarlo a la pag tree2.html la cual muestra una arbol
 */
function menufunciones() {
	var dataarbol = sessionStorage.getItem("menuJsonIni");	
        debugger
	var txtJson;	
	if (dataarbol) {
		//sessionStorage.setItem("txtJson3", dataarbol);
		//dataarbol = modificarJSON2(dataarbol);
		dataarbol = dataarbol.replace(/Codigo/g, "id"); 
		dataarbol = dataarbol.replace(/Depende/g, "parent");
		dataarbol = dataarbol.replace(/Nombre/g, "text");
		dataarbol = dataarbol.replace(/Imagen/g, "icon");
		dataarbol = dataarbol.replace(/CON IMAGEN/g, "../css/images/leaf.gif");
		dataarbol = dataarbol.replace(/SIN IMAGEN/g, "");
		txtJson = "{ \"plugins\" : [],\"core\" : { \"data\" : " + dataarbol + "}}";
		sessionStorage.setItem("txtJson2", txtJson);
                $("#divArbol").load("tree2.html"); 
	}

}