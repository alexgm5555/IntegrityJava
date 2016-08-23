/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
hoy = yyyy+'/'+ mm+'/'+dd;

$(document).ready(function() {
    
    var roleViewModel = kendo.observable({
        categories: new kendo.data.DataSource({
            data: [
                { "CategoryId": 1, "Description": "IT" },
                { "CategoryId": 2, "Description": "Billing" },
                { "CategoryId": 3, "Description": "HR" },
                { "CategoryId": 4, "Description": "Sales" },
                { "CategoryId": 5, "Description": "Field" },
                { "CategoryId": 10, "Description": "Stuff" },
                { "CategoryId": 11, "Description": "Unassigned" }
            ]
        }),        
        categoryEditor: function(container, options) {
            $('<input data-bind="value: ' + options.field + '" />')
                    .appendTo(container) 
                    .kendoComboBox({
                        dataSource: roleViewModel.categories,
                dataTextField: 'Description',
                dataValueField: 'CategoryId'
            });
        }
    });
   

    
    $("#ipFecha").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    $("#ipFechaVencimiento").kendoDatePicker({
        format: "yyyy/MM/dd",        
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });   
    
    cargarParametros();
    
    $("#validacion").kendoButton({
    });    
    
    $("#grid").kendoGrid({
//        dataSource: dataSource,
        navigatable: true,
        pageable: true,
        height: 550,
        toolbar: ["create"],
        columns: [            
            {
                field: "ClaseArticulo",
                title: "Clase de articulo",                
                editor: roleViewModel.categoryEditor
            },
            {
                field: "Articulo",
                title: "Articulo"
            },
            {
                field: "Descripcion",
                title: "Descripción"
            },
            {
                field: "Cantidad",
                title: "Cantidad"
            },
            {
                field: "Descuento",
                title: "Descuento"
            },
            {
                field: "IVA",
                title: "IVA"
            },
            {
                field: "ValorUnitario",
                title: "Valor unitario"
            },
            {
                field: "ValorTotal",
                title: "Valor total"
            },
            {
                field: "CodAmortizacion",
                title: "Código de amortizacion"
            },
            {
                field: "DiasAmortizacion",
                title: "Días de amortización"
            },
            { command: ["edit", "destroy"], title: "&nbsp;", width: 150 }],
        editable: "popup"
    });
});

function validaDocumento(){
    var usuario="amonserrate"
    var sucursal= $("#ipSucursal").val();
    var claDocumento= $("#ipCDocumento").val();    
    var nitCliente="000458324";
    var condiPagos="0";
    var fecha = "2016-08-19";
    var fechaVencimeinto ="2016-08-19"
    var descuento="";
    var divisa="USD";
    var tasa="3000";
    var fletes="";
    var observaciones="Factura de prueba";
    var cabeceraValida="";
    
    var jSonData = new Object();
    jSonData.dsttgfcfac = new Object();
    jSonData.dsttgfcfac.ttdatauser = new Array();
    jSonData.dsttgfcfac.ttdatauser[0] = new Object();
    jSonData.dsttgfcfac.ttdatauser[0].picusrcod = usuario;
    jSonData.dsttgfcfac.ttdatauser[0].picfiid = "982606324590544896";        
    jSonData.dsttgfcfac.ttgfcfac = new Array();
    jSonData.dsttgfcfac.ttgfcfac[0] = new Object();
    jSonData.dsttgfcfac.ttgfcfac[0].clccod = claDocumento;
    jSonData.dsttgfcfac.ttgfcfac[0].cptocod = "1"; // ???
    jSonData.dsttgfcfac.ttgfcfac[0].dpcfec = fechaVencimeinto;
    jSonData.dsttgfcfac.ttgfcfac[0].facdto = descuento;
    jSonData.dsttgfcfac.ttgfcfac[0].facest = "1"; // ???
    jSonData.dsttgfcfac.ttgfcfac[0].facfec = fecha;
    jSonData.dsttgfcfac.ttgfcfac[0].facobs = observaciones;
    jSonData.dsttgfcfac.ttgfcfac[0].lisnum = "12";  // este dato aún no esta en la intefaz
    jSonData.dsttgfcfac.ttgfcfac[0].loccod = "1"; // ???
    jSonData.dsttgfcfac.ttgfcfac[0].mndcla = divisa;
    jSonData.dsttgfcfac.ttgfcfac[0].mndfec = "2016-05-06"; // por el momento se coloca la misma fecha de factura pero esta es la fecha de la tasa
    jSonData.dsttgfcfac.ttgfcfac[0].mndval = tasa;
    jSonData.dsttgfcfac.ttgfcfac[0].pagocod = condiPagos;
    jSonData.dsttgfcfac.ttgfcfac[0].succod = sucursal;
    jSonData.dsttgfcfac.ttgfcfac[0].ternit = nitCliente;
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios + baseFactura +"ValidaCabecera",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            cabeceraValida = JSON.stringify(resp.dsttgfcfac.ttestados[0].estado);
            
        },
        error: function (e) {
            alert("Error" + JSON.stringify(e));
        }
    }).done(function(){
        if(cabeceraValida=='"OK"'){
            alert("Cabecera valida");
            console.log("Cabecera valida \n" + cabeceraValida);                    
            
        }else{                    
            alert("Cabecera invalida"+cabeceraValida);
            console.log("Datos  \n" + cabeceraValida);                
        }
    });
}

function calcularFechaVencimiento(){
    var fecha = $("#ipFecha").val();
    var fechaVencimiento="";
    var opcionDePago=document.getElementById("ipCdePago").value;    
     if(opcionDePago=="1"){
         fechaVencimiento=fecha;         
     }else{
         var valor = $("#ipCdePago option:selected").html();
    alert(valor);
     }
     $("#ipFechaVencimiento").kendoDatePicker({        
        format: "yyyy/MM/dd",
        disableDates: ["sa", "su"],
        value: new Date(fechaVencimiento)        
    }); 
}

function cargarParametros(){
    // sucursal
    var dataSucursal = [
        {text: "Bogotá", value:"111"},
        {text: "Medellín", value:"112"},
        {text: "Cali", value:"215"}                        
    ];
    
    $("#ipSucursal").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataSucursal,
        height: 100
    });
    
    var kendoComboBoxSucursal = $("#ipSucursal").data("kendoComboBox");
    var setValueSucursal = function(e) {
        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
            kendoComboBoxSucursal.value($("#value").val());
    }
    
    // Clase de documento
    var dataClaseDocumento = [
        {text: "Factura de venta", value:"1"},
        {text: "Factura venta exterior", value:"2"}        
    ];
    
    $("#ipCDocumento").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: dataClaseDocumento,
        height: 100
    });
    
    var kendoComboBoxClaseDocumento = $("#ipCDocumento").data("kendoComboBox");
    var setValueClaseDocumento = function(e) {
        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
            kendoComboBoxClaseDocumento.value($("#value").val());
    }
    
    // Formas de pago
    var dataFormasPago = [
        {text: "Contado", value:"1", dias:"0"},
        {text: "15 días", value:"2", dias:"15"},
        {text: "30 días", value:"3", dias:"30"},
        {text: "45 días", value:"4", dias:"45"},
        {text: "60 días", value:"5", dias:"60"},
        {text: "90 días", value:"6", dias:"90"}
        
    ];
    
    $("#ipCdePago").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: dataFormasPago,
        height: 100
    });
    
    var kendoComboBoxFormasPago = $("#ipCdePago").data("kendoComboBox");
    var setValueClaseDocumento = function(e) {
        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
            kendoComboBoxFormasPago.value($("#value").val());
    }
    
    // Divisa
    var dataDivisa = [
        {text: "COP", value:"1"},
        {text: "USD", value:"2"},
        {text: "EUR", value:"3"},
        {text: "MXN", value:"4"}        
    ];
    
    $("#ipDivisa").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",        
        dataSource: dataDivisa,
        height: 100
    });
    
    var kendoComboBoxDivisa = $("#ipDivisa").data("kendoComboBox");
    var setValueDivisa = function(e) {
        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
            kendoComboBoxDivisa.value($("#value").val());
    }
}