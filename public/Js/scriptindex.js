class Usuario{
    constructor(user, pass, puntaje,rompecabeza){
        this.user=user;
        this.pass=pass;
        this.puntaje=puntaje;
        var arrRompecabezas=[];
        rompecabeza.forEach( function(rompecbz){
            arrRompecabezas.push(new Rompecabeza(rompecbz.piezas, rompecbz.espacios));
        });
        this.rompecabeza=arrRompecabezas;
    }
}

class Rompecabeza{
    constructor(piezas,espacios){
        var arrPiezas=[];
        piezas.forEach( function(pieza){
            arrPiezas.push(new Piezas(pieza.id, pieza.posx,pieza.posy,pieza.url));
        });
        this.piezas=arrPiezas;
                       
        var arrEspacios=[];
        espacios.forEach( function(espacio){
            arrEspacios.push(new Espacios(espacio.id, espacio.posx,espacio.posy,espacio.url));
        });               
        this.espacios=arrEspacios;
    }
    
}
class Piezas {
    constructor(id, posx, posy, url){
        this.id = id;
        this.posx = posx;
        this.posy = posy;
        this.url = url;
    }
}
class Espacios {
    constructor(id, posx, posy, url){
        this.id = id;
        this.posx = posx;
        this.posy = posy;
        this.url = url;
    }
}

    var arrUsers= [];
    
    $.getJSON('ejemplo.json', function(data){
        
        $.each(data, function(i, resultado){
          arrUsers.push(new Usuario(resultado.user, resultado.pass, resultado.puntaje, resultado.rompecabeza));
        });
        console.log(arrUsers);
        var data= "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrUsers));
        
        $("#descargarjson").attr("href","data:"+data);
        $("#descargarjson").attr("download","ejemplo.json");
    });
    

$(".uno").click(function(){
    console.log("avatar uno");
    var flag= true;
});
/*
function updateImg(num){
   if(num===1) {
       $('#avatarN').load("./avatarEscogido.html").add("<img src='./images/avatar1.png' />").appendTo(document.body);
       $('.hi').add("<h3> hi </h3>").appendTo(document.body);
   }
}*/

$("input").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
        
        var file = e.originalEvent.srcElement.files[i];
        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onloadend = function() {
             img.src = reader.result;
        }
        reader.readAsDataURL(file);
        $("#content1").after(img);
    }
});

var dos = document.getElementById("dos");
var tres = document.getElementById("tres");
var cuatro = document.getElementById("cuatro");

$(".dos").click(function(){
    console.log("2x2");
    var num = 2;
    console.log(num);
    return num;
});
$(".tres").click(function(){
    console.log("3x3");
    var num = 3;
    console.log(num);
    return num;
});
$(".cuatro").click(function(){
    console.log("4x4");
    var num = 4;
    console.log(num);
    return num;
});

$(".crearPuzzle").click(function(){
    alert("Puzzle creado!");
    
    window.location.href = "admin.html";
});
