<script>(function(){
  const _0xabc1=["warn","[Anti-Hack] Versuch erkannt: ","log","console-use","devtools-open","Konsole wurde geöffnet","Bitte keine Entwicklerwerkzeuge verwenden!","secretCheck","variable-inspect","Unzulässiger Zugriff auf interne Variablen!","console-tamper","console.log wurde manipuliert","toString","[native code]","get"];function reportHack(type,detail){console[_0xabc1[0]](_0xabc1[1],type,detail)}
  ['log','warn','error','info','debug'].forEach(fn=>{const original=console[fn];console[fn]=function(...args){reportHack(_0xabc1[3],{fn,args});return original.apply(console,args)}});
  let devtoolsOpen=false;const element=new Image();Object.defineProperty(element,'id',{get:function(){if(!devtoolsOpen){devtoolsOpen=true;reportHack(_0xabc1[4],_0xabc1[5]);alert(_0xabc1[6])}}});console[_0xabc1[2]](element);
  Object.defineProperty(window,_0xabc1[7],{get:function(){reportHack(_0xabc1[8],_0xabc1[7]);alert(_0xabc1[9]);return"Verboten"},configurable:false});
  setInterval(()=>{if(console.log[_0xabc1[12]]().indexOf(_0xabc1[13])===-1){reportHack(_0xabc1[10],_0xabc1[11]);alert(_0xabc1[11])}},2000);})();</script>
