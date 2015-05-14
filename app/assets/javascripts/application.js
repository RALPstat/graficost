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
var tintas = 5000; // *millar, 10000 primer millar
var refile = 5000; // *millar, 10000 primer millar
var plastMate = 860; // metro cuadrado
var plastBrillante = 550; // metro cuadrado
var cabida = [1, 2, 4, 8];
//precio del papel = (3.5*ancho*alto*gramaje*cantidad)


function calcularGTO() {
    var cantidad = parseInt($("#cantidad1").val());
    var caras;
    var colores;
    var cantidadPapel;
    var plastificado = 0;
    if ($("#retiro").val() == 0) {
        caras = 1;
        colores = parseInt($("#tiro").val());
    } else {
        caras = 2;
        colores = parseInt($("#tiro").val());
    }
    //para tamaño media carta
    if ($("#size").val() == "media-carta") {
        if (cantidad > 10000) {
            cantidadPapel = cantidad / cabida[2] * 1.1;
        } else {
            cantidadPapel = cantidad / cabida[2] + 350;
        }
        var precioPapel = papel * 0.3 * 0.45 * parseInt($("#gramaje").val()) * cantidadPapel;
        var precioPlanchas = planchas[0] * Math.max(parseInt($("#tiro").val()), parseInt($("#retiro").val()));
        var precioPruebas = pruebas[0] * caras;
        var precioArranque = arranque[0] * caras * colores;
        var precioImpresion = impresion * caras * colores * (Math.floor(cantidadPapel / 1000) + 1);
        var precioTintas = 10000 + tintas * (Math.floor(cantidadPapel / 1000));
        var precioRefile = 10000 + refile * (Math.floor(cantidad / 1000));
        if ($("#plastificado").is(':checked')) {
            var carasPlast = 1
            if ($("#2caras").is(':checked')) {
                carasPlast = 2;
            }
            if ($("#mate").is(':checked')) {
                plastificado = 0.3 * 0.45 * carasPlast * cantidadPapel * plastMate;
            } else if ($("#brillante").is(':checked')) {
                plastificado = 0.3 * 0.45 * carasPlast * cantidadPapel * plastBrillante;
            }
        }
        var total = precioPapel + precioPlanchas + precioPruebas + precioArranque + precioImpresion + precioTintas + precioRefile + plastificado;
        total = (Math.floor(total / 1000)) * 1000
        debugger;
        return total;

    //para tamaño carta
    } else if ($("#size").val() == "carta") {
        if (cantidad > 5000) {
            cantidadPapel = cantidad / cabida[1] * 1.1;
        } else {
            cantidadPapel = cantidad / cabida[1] + 350;
        }
        var precioPapel = papel * 0.3 * 0.45 * parseInt($("#gramaje").val()) * cantidadPapel;
        var precioPlanchas = planchas[0] * Math.max(parseInt($("#tiro").val()), parseInt($("#retiro").val()));
        var precioPruebas = pruebas[0] * caras;
        var precioArranque = arranque[0] * caras * colores;
        var precioImpresion = impresion * caras * colores * (Math.floor(cantidadPapel / 1000) + 1);
        var precioTintas = 10000 + tintas * (Math.floor(cantidadPapel / 1000));
        var precioRefile = 10000 + refile * (Math.floor(cantidad / 1000));
        if ($("#plastificado").is(':checked')) {
            var carasPlast = 1
            if ($("#2caras").is(':checked')) {
                carasPlast = 2;
            }
            if ($("#mate").is(':checked')) {
                plastificado = 0.3 * 0.45 * carasPlast * cantidadPapel * plastMate;
            } else if ($("#brillante").is(':checked')) {
                plastificado = 0.3 * 0.45 * carasPlast * cantidadPapel * plastBrillante;
            }
        }
        var total = precioPapel + precioPlanchas + precioPruebas + precioArranque + precioImpresion + precioTintas + precioRefile + plastificado;
        total = (Math.floor(total / 1000)) * 1000

        return total;
    }
}

function calcularSM() {
    return 0;
}

$(document).ready(function () {
    $("#tiro").on("mouseup", function () {
        $("#retiro").prop("disabled", false);
    });
    $("#plastificado").change(function () {
        $(".plast").toggle("slow")
    });
    $("#papel").on("mouseup", function () {
        if ($("#papel").val() == "bond") {
            $("#plastificado").prop("disabled", true);
            $(".nobond").prop("disabled", true);
        } else {
            $("#plastificado").prop("disabled", false);
            $(".nobond").prop("disabled", false);
            $(".bond").prop("disabled", true)
        }
    });
    $("#gramaje").on("mouseup", function () {
        if (parseInt($("#gramaje").val()) <= 115) {
            $("#plastificado").prop("disabled", true);
        } else {
            $("#plastificado").prop("disabled", false);
        }
    });
    $("#cantidad1").on("mouseup", function () {
        if ($("#producto").val() == null || $("#size").val() == null || $("#papel").val() == null || $("#gramaje").val() == null || $("#tiro").val() == null) {
            alert("No puede haber espacios en blanco");
            $("#cantidad1").val("blank");
        } else {
            var unitGTO = Math.floor(calcularGTO() / $("#cantidad1").val())
            var precioGTO = unitGTO * $("#cantidad1").val();
            var unitSM = Math.floor(calcularSM() / $("#cantidad1").val())
            var precioSM = unitSM * $("#cantidad1").val();
            if (precioSM === 0) {
                $("#total1").val("Valor total = $" + precioGTO);
                $("#unit1").val("Valor unitario = $" + unitGTO);
            } else if (precioGTO === 0) {
                $("#total1").val("Valor total = $" + precioSM);
                $("#unit1").val("Valor unitario = $" + unitSM);
            } else {
                $("#total1").val("Valor total = $" + Math.min(precioGTO, precioSM));
                $("#unit1").val("Valor unitario = $" + Math.min(unitGTO, unitSM));
            }
        }
    });
});
		



		//alert($(".cantidad").parent().html()