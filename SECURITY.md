# Sicherheitsrichtlinie

## Allgemeine Informationen

Diese Website verarbeitet keine persönlichen Nutzerdaten und verwendet keine Login-Systeme oder Passwörter.  
Alle benutzerspezifischen Einstellungen wie Theme oder Schriftart werden ausschließlich lokal im Browser gespeichert (`localStorage`).

## Verwendung von APIs

Diese Website nutzt öffentliche oder clientseitige APIs ausschließlich zur Anzeige von Statusinformationen oder lokalen Tools:

- GitHub API: Online-Status, PR-Infos
- Discord API: Online-Status (ohne Login)
- TOTP-Generator: wird vollständig im Browser berechnet, keine Serveranfragen
- Weitere kleine Tools

Alle API-Zugriffe erfolgen **ohne Speicherung** und ausschließlich clientseitig.

## Melden von Sicherheitsproblemen

Wenn dir ein sicherheitsrelevantes Problem auffällt, z. B.:
- Lecks von Tokens oder API-Schlüsseln
- Missbrauch von API-Raten
- TOTP-Schwächen
- Script Injection / XSS

…dann melde es bitte verantwortungsvoll über GitHub Issues oder per E-Mail an: `redminer9630@gmail.com`(nicht empfolen).

Wir bemühen uns, Sicherheitsprobleme zeitnah zu prüfen und zu beheben.
