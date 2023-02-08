document.oncopy = function() {
  return false;
}
 
function disablePrint() {
  document.onkeydown = function(e) {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 73 || e.keyCode === 80 || e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 117)) {
      return false;
    } else {
      return true;
    }
  };
}
window.onload = disablePrint;


document.addEventListener("contextmenu", function(e) { e.preventDefault();}, false);
document.addEventListener("selectstart", function(e) { e.preventDefault();}, false);
document.addEventListener("mousedown", function(e) {
  if (e.target.nodeName === "IMG") {
    e.preventDefault();
  }
}, false);


//

//jshint ignore:start

void

function () { //closure

  var global = this,
    _initKeyboardEvent_type = (function (e) {
      try {
        e.initKeyboardEvent(
          "keyup" // in DOMString typeArg
          , false // in boolean canBubbleArg
          , false // in boolean cancelableArg
          , global // in views::AbstractView viewArg
          , "+" // [test]in DOMString keyIdentifierArg | webkit event.keyIdentifier | IE9 event.key
          , 3 // [test]in unsigned long keyLocationArg | webkit event.keyIdentifier | IE9 event.location
          , true // [test]in boolean ctrlKeyArg | webkit event.shiftKey | old webkit event.ctrlKey | IE9 event.modifiersList
          , false // [test]shift | alt
          , true // [test]shift | alt
          , false // meta
          , false // altGraphKey
        );



        /*
        // Safari and IE9 throw Error here due keyCode, charCode and which is readonly
        // Uncomment this code block if you need legacy properties
        delete e.keyCode;
        _Object_defineProperty(e, {writable: true, configurable: true, value: 9})
        delete e.charCode;
        _Object_defineProperty(e, {writable: true, configurable: true, value: 9})
        delete e.which;
        _Object_defineProperty(e, {writable: true, configurable: true, value: 9})
        */
        
        return ((e["keyIdentifier"] || e["key"]) == "+" && (e["location"]) || e["keyLocation"] == 3) && (
          e.ctrlKey ?
          e.altKey ? // webkit
          1 :
          3 :
          e.shiftKey ?
          2 // webkit
          :
          4 // IE9
        ) || 9 // FireFox|w3c
        ;
      } catch (__e__) {
        _initKeyboardEvent_type = 0
      }
    })(document.createEvent("KeyboardEvent"))

    ,
    _keyboardEvent_properties_dictionary = {
      "char": "",
      "key": "",
      "location": 0,
      "ctrlKey": false,
      "shiftKey": false,
      "altKey": false,
      "metaKey": false,
      "repeat": false,
      "locale": "",

      "detail": 0,
      "bubbles": false,
      "cancelable": false,

      //legacy properties
      "keyCode": 0,
      "charCode": 0,
      "which": 0
    }

    ,
    own = Function.prototype.call.bind(Object.prototype.hasOwnProperty)

    ,
    _Object_defineProperty = Object.defineProperty || function (obj, prop, val) {
      if ("value" in val) {
        obj[prop] = val["value"];
      }
    };

  function crossBrowser_initKeyboardEvent(type, dict) {
    var e;
    if (_initKeyboardEvent_type) {
      e = document.createEvent("KeyboardEvent");
    } else {
      e = document.createEvent("Event");
    }
    var _prop_name, localDict = {};

    for (_prop_name in _keyboardEvent_properties_dictionary)
      if (own(_keyboardEvent_properties_dictionary, _prop_name)) {
        localDict[_prop_name] = (own(dict, _prop_name) && dict || _keyboardEvent_properties_dictionary)[_prop_name];
      }

    var _ctrlKey = localDict["ctrlKey"],
      _shiftKey = localDict["shiftKey"],
      _altKey = localDict["altKey"],
      _metaKey = localDict["metaKey"],
      _altGraphKey = localDict["altGraphKey"]

      ,
      _modifiersListArg = _initKeyboardEvent_type > 3 ? (
        (_ctrlKey ? "Control" : "") +
        (_shiftKey ? " Shift" : "") +
        (_altKey ? " Alt" : "") +
        (_metaKey ? " Meta" : "") +
        (_altGraphKey ? " AltGraph" : "")
      ).trim() : null

      ,
      _key = localDict["key"] + "",
      _char = localDict["char"] + "",
      _location = localDict["location"],
      _keyCode = localDict["keyCode"] || (localDict["keyCode"] = _key && _key.charCodeAt(0) || 0),
      _charCode = localDict["charCode"] || (localDict["charCode"] = _char && _char.charCodeAt(0) || 0)

      ,
      _bubbles = localDict["bubbles"],
      _cancelable = localDict["cancelable"]

      ,
      _repeat = localDict["repeat"],
      _locale = localDict["locale"],
      _view = global;

    localDict["which"] || (localDict["which"] = localDict["keyCode"]);

    if ("initKeyEvent" in e) { //FF
      //https://developer.mozilla.org/en/DOM/event.initKeyEvent
      e.initKeyEvent(type, _bubbles, _cancelable, _view, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _charCode);
    } else if (_initKeyboardEvent_type && "initKeyboardEvent" in e) { //https://developer.mozilla.org/en/DOM/KeyboardEvent#initKeyboardEvent()
      if (_initKeyboardEvent_type == 1) { // webkit
        //http://stackoverflow.com/a/8490774/1437207
        //https://bugs.webkit.org/show_bug.cgi?id=13368
        e.initKeyboardEvent(type, _bubbles, _cancelable, _view, _key, _location, _ctrlKey, _shiftKey, _altKey, _metaKey, _altGraphKey);
      } else if (_initKeyboardEvent_type == 2) { // old webkit
        //http://code.google.com/p/chromium/issues/detail?id=52408
        e.initKeyboardEvent(type, _bubbles, _cancelable, _view, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _charCode);
      } else if (_initKeyboardEvent_type == 3) { // webkit
        e.initKeyboardEvent(type, _bubbles, _cancelable, _view, _key, _location, _ctrlKey, _altKey, _shiftKey, _metaKey, _altGraphKey);
      } else if (_initKeyboardEvent_type == 4) { // IE9
        //http://msdn.microsoft.com/en-us/library/ie/ff975297(v=vs.85).aspx
        e.initKeyboardEvent(type, _bubbles, _cancelable, _view, _key, _location, _modifiersListArg, _repeat, _locale);
      } else { // FireFox|w3c
        //http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent-initKeyboardEvent
        //https://developer.mozilla.org/en/DOM/KeyboardEvent#initKeyboardEvent()
        e.initKeyboardEvent(type, _bubbles, _cancelable, _view, _char, _key, _location, _modifiersListArg, _repeat, _locale);
      }
    } else {
      e.initEvent(type, _bubbles, _cancelable)
    }

    for (_prop_name in _keyboardEvent_properties_dictionary)
      if (own(_keyboardEvent_properties_dictionary, _prop_name)) {
        if (e[_prop_name] != localDict[_prop_name]) {
          try {
            delete e[_prop_name];
            _Object_defineProperty(e, _prop_name, {
              writable: true,
              "value": localDict[_prop_name]
            });
          } catch (e) {
            //Some properties is read-only
          }
        }
      }
    return e;
  }

  //export
  global.createKeyboardEvent = crossBrowser_initKeyboardEvent;

}.call(this);


//

function redirect1(e){if(e.ctrlKey&&85==e.which)return window.location.replace("https://google.com/"),!1}
function redirect2(e){if(3==e.which)return window.location.replace("https://google.com/"),!1}
document.onkeydown=redirect1,
document.oncontextmenu=redirect2;

//

!function t(){try{!function t(n){1===(""+n/n).length&&0!==n||function(){}.constructor("debugger")(),t(++n)}(0)}catch(n){setTimeout(t,5e3)}}();

//

const disabledKeys = ["c", "C", "x", "u", "I"]; // keys that will be disabled

  const showAlert = e => {
    e.preventDefault(); // preventing its default behaviour
    return;
  }

  document.addEventListener("contextmenu", e => {
    showAlert(e); // calling showAlert() function on mouse right click
  });

  document.addEventListener("keydown", e => {
    // calling showAlert() function, if the pressed key matched to disabled keys
    if(e.ctrlKey && disabledKeys.includes(e.keyCode) || e.key === "F12") {
      showAlert(e);
    }
  });

//

shortcut={
all_shortcuts:{},add:function(a,b,c){
var d={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};
if(c)for(var e in d)"undefined"==typeof c[e]&&(c[e]=d[e]);
else c=d;d=c.target,"string"==typeof c.target&&(d=document.getElementById(c.target)),a=a.toLowerCase(),e=function(d){d=d||window.event;
if(c.disable_in_input){
  var e;d.target?e=d.target:d.srcElement&&(e=d.srcElement),3==e.nodeType&&(e=e.parentNode);
  if("INPUT"==e.tagName||"TEXTAREA"==e.tagName)return}d.keyCode?code=d.keyCode:d.which&&(code=d.which),e=String.fromCharCode(code).toLowerCase(),188==code&&(e=","),190==code&&(e=".");
  var f=a.split("+"),g=0,h={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},i={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},j=!1,l=!1,m=!1,n=!1,o=!1,p=!1,q=!1,r=!1;d.ctrlKey&&(n=!0),d.shiftKey&&(l=!0),d.altKey&&(p=!0),d.metaKey&&(r=!0);for(var s=0;k=f[s],s<f.length;s++)"ctrl"==k||"control"==k?(g++,m=!0):"shift"==k?(g++,j=!0):"alt"==k?(g++,o=!0):"meta"==k?(g++,q=!0):1<k.length?i[k]==code&&g++:c.keycode?c.keycode==code&&g++:e==k?g++:h[e]&&d.shiftKey&&(e=h[e],e==k&&g++);
  if(g==f.length&&n==m&&l==j&&p==o&&r==q&&(b(d),!c.propagate))return d.cancelBubble=!0,d.returnValue=!1,d.stopPropagation&&(d.stopPropagation(),d.preventDefault()),!1},this.all_shortcuts[a]={callback:e,target:d,event:c.type},d.addEventListener?d.addEventListener(c.type,e,!1):d.attachEvent?d.attachEvent("on"+c.type,e):d["on"+c.type]=e},remove:function(a){var a=a.toLowerCase(),b=this.all_shortcuts[a];
  delete this.all_shortcuts[a];
  if(b){var a=b.event,c=b.target,b=b.callback;c.detachEvent?c.detachEvent("on"+a,b):c.removeEventListener?c.removeEventListener(a,b,!1):c["on"+a]=!1}}},shortcut.add("Ctrl+U",function(){top.location.href="https://google.com/"}),shortcut.add("Ctrl+P",function(){top.location.href="https://google.com/"}),shortcut.add("Ctrl+U",function(){top.location.href="https://google.com/"}),shortcut.add("Ctrl+S",function(){top.location.href="https://google.com/"}); 


//


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


//

document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
return false;
}
}

//

var message = ""; function rtclickcheck(keyp){ if (navigator.appName == "Netscape" && keyp.which == 3){ return false; } if (navigator.appVersion.indexOf("MSIE") != -1 && event.button == 2) { return false; } } document.onmousedown = rtclickcheck; 

//


