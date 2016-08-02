$(document).ready(function() {
    sessionStorage.setItem("usrnom","Fernando Chaparro");//despues de las pruebas se debe eliminar esta linea
    sessionStorage.setItem("usuario","fchaparro");//despues de las pruebas se debe eliminar esta linea
    sessionStorage.setItem("usrmail","fchaparro@quantumltda.com"); //despues de las pruebas se debe eliminar esta linea
    sessionStorage.setItem("loginintegrity","valido"); //despues de las pruebas se debe eliminar esta linea
    sessionStorage.setItem("VideoAyuda","http://comunicacion349.wix.com/integrity#!reportes-tutoriales/w865s");//cambiar urlVideo con url link apenas este listo el video de ayuda
    
    if(sessionStorage.getItem("loginintegrity")==="valido"){
        $(window).trigger("resize");
    
        $("#btnCambiarClave").kendoButton({
            
        });
        $("#btnGuardarClave").kendoButton({
            
        });
        $("#divArbol").load("tree1.html"); 
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
  
function cambiarimgPortafolio(){
    apagarBotones("imgPortafolio");
    var estado = document.getElementById("imgPortafolio").getAttribute("estado");     
    if(estado == "off"){         
        document.getElementById("imgPortafolio").src = "../images/transaccionesOn.png";
        document.getElementById("imgPortafolio").setAttribute("estado", "on");
        document.getElementById("imgPortafolio").setAttribute("onmouseover", "");
        document.getElementById("imgPortafolio").setAttribute("onmouseout", "");
        cambiarFondoTD("tdVerde");
    }else if(estado == "on"){         
        document.getElementById("imgPortafolio").src = "../images/transaccionesOff.png";
        document.getElementById("imgPortafolio").setAttribute("estado", "off");
        document.getElementById("imgPortafolio").setAttribute("onmouseover", "this.src='../images/transaccionesRO.png';");
        document.getElementById("imgPortafolio").setAttribute("onmouseout", "this.src='../images/transaccionesOff.png';");
        cambiarFondoTD("");
    }     
}

function cambiarimgMisReportes(){
    apagarBotones("imgMisReportes");
    var estado = document.getElementById("imgMisReportes").getAttribute("estado");     
    if(estado == "off"){         
        document.getElementById("imgMisReportes").src = "../images/reportesOn.png";
        document.getElementById("imgMisReportes").setAttribute("estado", "on");
        document.getElementById("imgMisReportes").setAttribute("onmouseover", "");
        document.getElementById("imgMisReportes").setAttribute("onmouseout", "");
        cambiarFondoTD("tdNaraja");
    }else if(estado == "on"){         
        document.getElementById("imgMisReportes").src = "../images/reportesOff.png";
        document.getElementById("imgMisReportes").setAttribute("estado", "off");
        document.getElementById("imgMisReportes").setAttribute("onmouseover", "this.src='../images/reportesRO.png';");
        document.getElementById("imgMisReportes").setAttribute("onmouseout", "this.src='../images/reportesOff.png';");
        cambiarFondoTD("");
    }     
}

function cambiarimgIndicadores(){
    apagarBotones("imgIndicadores");
    var estado = document.getElementById("imgIndicadores").getAttribute("estado");
    
    if(estado == "off"){         
        document.getElementById("imgIndicadores").src = "../images/indicadoresOn.png";
        document.getElementById("imgIndicadores").setAttribute("estado", "on");
        document.getElementById("imgIndicadores").setAttribute("onmouseover", "");
        document.getElementById("imgIndicadores").setAttribute("onmouseout", "");
        cambiarFondoTD("tdAzul");
    }else if(estado == "on"){         
        document.getElementById("imgIndicadores").src = "../images/indicadoresOff.png";
        document.getElementById("imgIndicadores").setAttribute("estado", "off");
        document.getElementById("imgIndicadores").setAttribute("onmouseover", "this.src='../images/indicadoresRO.png';");
        document.getElementById("imgIndicadores").setAttribute("onmouseout", "this.src='../images/indicadoresOff.png';");
        cambiarFondoTD("");
    }     
}

function cambiarimgProcesos(){
    apagarBotones("imgProcesos");
    var estado = document.getElementById("imgProcesos").getAttribute("estado");
    
    if(estado == "off"){         
        document.getElementById("imgProcesos").src = "../images/procesosOn.png";
        document.getElementById("imgProcesos").setAttribute("estado", "on");
        document.getElementById("imgProcesos").setAttribute("onmouseover", "");
        document.getElementById("imgProcesos").setAttribute("onmouseout", "");
        cambiarFondoTD("tdRojo");
    }else if(estado == "on"){         
        document.getElementById("imgProcesos").src = "../images/procesosOff.png";
        document.getElementById("imgProcesos").setAttribute("estado", "off");
        document.getElementById("imgProcesos").setAttribute("onmouseover", "this.src='../images/procesosRO.png';");
        document.getElementById("imgProcesos").setAttribute("onmouseout", "this.src='../images/procesosOff.png';");        
        cambiarFondoTD("");
    }     
}
/**
 * Cambia el fondo del todos los td que tengan el atributo name="imgLogoIntegrity"
 * @returns {undefined}
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

function apagarBotones(id){
    var imgMenu = document.getElementsByName("imgMenu");    
    for (var i=0; i<imgMenu.length; i++){        
        if(imgMenu[i].id!=id && imgMenu[i].getAttribute("estado")!="off"){        
            eval("cambiar"+imgMenu[i].id+"()");
        }
    }
}

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
function reemplazarDiv(divOcultar, divMostrar){
    document.getElementById(divOcultar).style.display = 'none';    
    $("#"+divMostrar).fadeIn("slow");
}

function mostrarArbol(){
    $("#perfil").fadeOut("slow");
    $("#divArbol").fadeIn("slow");
}

function cerrarSesion(){
	sessionStorage.clear();
	window.location.assign("login.html");
}