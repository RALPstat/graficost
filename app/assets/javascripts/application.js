// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require_tree .

var papel = 3.5;
var planchas = [20000, 30000]; // *cara*color
var pruebas = [30000, 40000]; // *cara
var arranque = [15000, 23000]; // *cara*color
var impresion = 10000; // *cara*color*millar
var	tintas = 5000; // *millar, 10000 primer millar
var refile = 5000; // *millar, 10000 primer millar
var plast_mate = 860; // metro cuadrado
var plast_brillante = 550; // metro cuadrado
var cabida = [1, 2, 4, 8];
//precio del papel = (3.5*ancho*alto*gramaje*cantidad)


function calcularGTO(){
	debugger;
	var cantidad = parseInt($("#cantidad1").val());
	var caras;
	var colores;
	var cantidadPapel;
	if($("#retiro").val()=="blank"){
		caras=1; 
		colores=parseInt($("#tiro").val());
	}else{
		caras=2;
		colores=parseInt($("#tiro").val())+parseInt($("#retiro").val());
	}
	if($("#size").val()=="media-carta"){
		if(cantidad>=10000){
			cantidadPapel = cantidad/cabida[3]*1.1;
		}else{
			cantidadPapel = cantidad/cabida[3]+250;
		}
		var precioPapel = papel*0.3*0.45*parseInt($("#gramaje").val())*cantidadPapel;
		var precioPlanchas = planchas[0]*Math.max(parseInt($("#tiro").val()), parseInt($("#retiro").val()));
		var precioPruebas = pruebas[0]*caras;
		var precioArranque = arranque[0]*caras*colores;
		var precioImpresion = impresion*caras*colores*(Math.floor(cantidadPapel/1000)+1);
		var precioTintas = 10000+tintas*(Math.floor(cantidadPapel/1000));
		var precioRefile = 10000+refile*(Math.floor(cantidad/1000));
		var total = precioPapel+precioPlanchas+precioPruebas+precioArranque+precioImpresion+precioTintas+precioRefile;
		return total;   
	}
}

function calcularSM(){
	return 0;
}

$(document).ready(function(){
	$("#tiro").on("mouseup", function(){
		$("#retiro").prop("disabled", false);
	});
	$("#cantidad1").on("mouseup", function(){
		if($("#producto").val()=="blank" || $("#size").val()=="blank" || $("#papel").val()=="blank" || $("#gramaje").val()=="blank" || $("#tiro").val()=="blank"){
			alert("No puede haber espacios en blanco");
			$("#cantidad1").val("blank");
		}else{
			var precioGTO = calcularGTO();
			var precioSM = calcularSM();
			if(precioSM!==0){
				$("#price1").val("$" + Math.min(precioGTO, precioSM));
			}else{
				$("#price1").val("$" + precioGTO);
		}
	}
});
});	
		



		//alert($(".cantidad").parent().html()