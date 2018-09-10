/*
$(".uno").click(function(){
    console.log("avatar uno");
    var flag= true;
});

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
        $("#contentImg").after(img);
    }
});