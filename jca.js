
function redirect1(e){if(e.ctrlKey&&85==e.which)return window.location.replace("https://google.com/"),!1}
function redirect2(e){if(3==e.which)return window.location.replace("https://google.com/"),!1}
document.onkeydown=redirect1,
document.oncontextmenu=redirect2;
