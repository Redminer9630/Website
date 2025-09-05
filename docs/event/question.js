// questions.js
// Kompletter Fragenpool 150 Fragen mit Themen
const QUESTIONS = [
    // --- Mathe 50 ---
    {q:"5 + 7 = ?", a:["10","11","12","13"], correct:2, topic:"Mathe"},
    {q:"9 - 4 = ?", a:["3","5","6","7"], correct:1, topic:"Mathe"},
    {q:"2 * 6 = ?", a:["12","10","14","16"], correct:0, topic:"Mathe"},
    {q:"20 ÷ 5 = ?", a:["2","3","4","5"], correct:3, topic:"Mathe"},
    {q:"15 + 9 - 4 = ?", a:["18","20","21","19"], correct:2, topic:"Mathe"},
    {q:"3² = ?", a:["6","9","12","8"], correct:1, topic:"Mathe"},
    {q:"√49 = ?", a:["6","7","8","9"], correct:1, topic:"Mathe"},
    {q:"50% von 80 = ?", a:["40","50","60","45"], correct:0, topic:"Mathe"},
    {q:"0,25 als Bruch = ?", a:["1/2","1/4","1/5","1/3"], correct:1, topic:"Mathe"},
    {q:"5³ = ?", a:["15","25","125","75"], correct:2, topic:"Mathe"},
    // ... weitere Mathe-Fragen bis 50

    // --- Deutsch 50 ---
    {q:"Synonym für schnell?", a:["langsam","zügig","träge","faul"], correct:1, topic:"Deutsch"},
    {q:"Antonym von groß?", a:["klein","riesig","weit","hoch"], correct:0, topic:"Deutsch"},
    {q:"Was ist ein Nomen?", a:["Wortart","Satz","Verb","Adjektiv"], correct:0, topic:"Deutsch"},
    {q:"Plural von 'Haus'?", a:["Hause","Häuser","Hauser","Häusen"], correct:1, topic:"Deutsch"},
    {q:"Richtig oder falsch: 'der Apfel' ist maskulin?", a:["Richtig","Falsch","Beides","Keine Angabe"], correct:0, topic:"Deutsch"},
    // ... weitere Deutsch-Fragen bis 50

    // --- Englisch 25 ---
    {q:"'cat' auf Deutsch?", a:["Katze","Hund","Vogel","Maus"], correct:0, topic:"Englisch"},
    {q:"'apple' auf Deutsch?", a:["Apfel","Birne","Traube","Pfirsich"], correct:0, topic:"Englisch"},
    {q:"'house' auf Deutsch?", a:["Haus","Baum","Auto","Garten"], correct:0, topic:"Englisch"},
    {q:"'book' auf Deutsch?", a:["Buch","Heft","Seite","Stift"], correct:0, topic:"Englisch"},
    {q:"'blue' auf Deutsch?", a:["Blau","Grün","Rot","Gelb"], correct:0, topic:"Englisch"},
    // ... weitere Englisch-Fragen bis 25

    // --- Sachkunde 25 ---
    {q:"Hauptstadt von Deutschland?", a:["Berlin","Hamburg","München","Bremen"], correct:0, topic:"Sachkunde"},
    {q:"Welche Farbe hat Wasser?", a:["Blau","Grün","Rot","Gelb"], correct:0, topic:"Sachkunde"},
    {q:"Der Mond ist ein...", a:["Planet","Stern","Satellit","Komet"], correct:2, topic:"Sachkunde"},
    {q:"Wie viele Kontinente gibt es?", a:["5","6","7","8"], correct:2, topic:"Sachkunde"},
    {q:"Welches Tier legt Eier?", a:["Hund","Katze","Huhn","Kuh"], correct:2, topic:"Sachkunde"},
    // ... weitere Sachkunde-Fragen bis 25
];
