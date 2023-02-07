
var message="";
function clickdsb(){
if (event.button==2){
alert(message);
return false;
}
}
function clickbsb(e){
if (document.layers||document.getElementById&&!document.all){
if (e.which==2||e.which==3){
alert(message);
return false;
}
}
}
if (document.layers){
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=clickbsb;
}
else if (document.all&&!document.getElementById){
document.onmousedown=clickdsb;
}

document.oncontextmenu=new Function("return false")
