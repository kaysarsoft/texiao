/*禁用F12*/ 
document.onkeydown = function(){
    if(window.event && window.event.keyCode == 123) {
        layer.msg("大佬，别扒了！不妨加个友链？");
        event.keyCode=0;
        event.returnValue=false;
    }
}