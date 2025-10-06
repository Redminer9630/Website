const puzzles = [
  { id:1, title:"Zahlrätsel", required:"START-000", question:"12 + ? = 16 → Welche Zahl fehlt?", hint:"Differenz zwischen 16 und 12", answer:"4", unlock:"UNL-1", next:2 },
  { id:2, title:"Buchstaben", required:"UNL-1", question:"Nimm die ersten Buchstaben: Katze, Elefant, Maus → Was ist die Zeichenfolge?", hint:"Schau dir die Anfangsbuchstaben an", answer:"KEM", unlock:"UNL-2", next:3 },
  { id:3, title:"Logik", required:"KEM", question:"Wenn A links von B steht und B links von C, wer ist in der Mitte?", hint:"Reihe A B C", answer:"B", unlock:"UNL-3", next:4 },
  { id:4, title:"Rückwärts", required:"UNL-3", question:"Welches Wort entsteht, wenn du 'NEBEL' rückwärts liest?", hint:"Denk rückwärts", answer:"LEBEN", unlock:"UNL-4", next:5 },
  { id:5, title:"Binary", required:"UNL-4", question:"Was ist die Dezimalzahl von 1010 (Binär)?", hint:"1010 binär = 8+2", answer:"10", unlock:"UNL-5", next:6 },
  { id:6, title:"Morse", required:"UNL-5", question:"Morse: '.-' entspricht welchem Buchstaben?", hint:".- ist der erste Buchstabe", answer:"A", unlock:"UNL-6", next:7 },
  { id:7, title:"Vokale zählen", required:"UNL-6", question:"Wieviele Vokale hat das Wort 'Schule'?", hint:"Zähle a,e,i,o,u (auch ä, ö, ü nicht hier)", answer:"2", unlock:"UNL-7", next:8 },
  { id:8, title:"Ecken", required:"UNL-7", question:"Wie viele Ecken hat ein Rechteck?", hint:"Ein Rechteck hat gleich viele Ecken wie ein Quadrat", answer:"4", unlock:"UNL-8", next:9 },
  { id:9, title:"Rätsel", required:"UNL-8", question:"Was hat viele Tasten, aber kann keine Türen öffnen? (ein deutsches Wort)", hint:"Musikinstrument mit Tasten", answer:"KLAVIER", unlock:"UNL-9", next:10 },
  { id:10, title:"Quersumme", required:"UNL-9", question:"Was ist die Quersumme von 47?", hint:"4 + 7", answer:"11", unlock:"UNL-10", next:11 },
  { id:11, title:"Potenz", required:"UNL-10", question:"Was ist 4 hoch 2 (4^2)?", hint:"4·4", answer:"16", unlock:"UNL-11", next:12 },
  { id:12, title:"Letzte Stufe", required:"UNL-11", question:"Letzte Aufgabe: Tippe FREI um den Türcode zu erhalten.", hint:"GROSSbuchstaben, einfach tippen", answer:"FREI", unlock:"DOOR-7359", next:null }
];

function id(n){return document.getElementById(n)}
function show(el){el.style.display="block"}
function hide(el){el.style.display="none"}

document.addEventListener("DOMContentLoaded",()=> {
  const pid = window.PUZZLE_ID || 1;
  const p = puzzles.find(x=>x.id===Number(pid));
  if(!p){ id("main").innerHTML = "<div class='card'>Fehler: Puzzle nicht gefunden.</div>"; return }

  id("pageTitle").textContent = `iPad ${p.id} — ${p.title}`;
  id("instrText").textContent = `Dieses iPad benötigt zuerst den Code vom vorherigen iPad. Gib den Code ein und drücke Prüfen. (Benutze Groß-/Kleinschreibung ist egal.)`;

  // initial view: code input
  id("requiredLabel").textContent = `Benötigter Code: ${p.required}`;
  id("checkBtn").addEventListener("click",()=>{
    const v = id("inCode").value.trim().toUpperCase();
    if(!v){ id("status").textContent="Bitte Code eingeben"; id("status").className="muted"; return }
    if(v===p.required.toUpperCase()){ id("status").textContent="Code korrekt — Rätsel freigeschaltet"; id("status").className="ok"; id("unlockArea").style.display="block"; id("lockArea").style.display="none"; id("pQuestion").textContent = p.question } else { id("status").textContent="Falscher Code"; id("status").className="danger" }
  });

  // hint
  id("hintBtn").addEventListener("click", ()=> { id("hintBox").textContent = p.hint; id("hintBox").style.display="block" })

  // answer check
  id("solveBtn").addEventListener("click", ()=>{
    const ans = id("answer").value.trim().toUpperCase();
    if(!ans){ id("ansStatus").textContent="Bitte Antwort eingeben"; id("ansStatus").className="muted"; return }
    const ok = ans===String(p.answer).toUpperCase();
    if(ok){
      // show unlock code
      id("ansStatus").textContent = `Richtig! Unlock-Code: ${p.unlock}`; id("ansStatus").className="ok";
      id("showUnlock").textContent = p.unlock;
      id("nextInfo").textContent = p.next ? `Gehe zu iPad ${p.next} und gib dort den Code ein.` : "Du bist am letzten iPad — hier ist der Türcode.";
      id("copyUnlock").addEventListener("click", ()=> navigator.clipboard && navigator.clipboard.writeText(p.unlock));
      // if final
      if(!p.next){ id("finalDoor").style.display="block"; id("finalCode").textContent = p.unlock }
    } else { id("ansStatus").textContent="Falsche Antwort"; id("ansStatus").className="danger" }
  });

  // teacher quick-start: if teacher wants to bypass code
  id("teacherUnlock").addEventListener("click", ()=> { id("unlockArea").style.display="block"; id("lockArea").style.display="none"; id("pQuestion").textContent = p.question; id("status").textContent="Freigeschaltet (Lehrer)"; id("status").className="small" })
});
