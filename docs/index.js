        const keywords = [
            { keyword: "Youtube", url: "youtube.com/channel/UCdpkm8rpRnIi88zWSuubbOQ?sub_confirmation=1", text: "Youtube", group: "youtube" },
            { keyword: "Twitch", url: "twitch.tv/Redminer9630", text: "Twitch", group: "twitch" },
            { keyword: "Coden Lernen", url: "https://chatgpt.com/share/67110a56-5680-800e-8ca1-d17b15a3a3fa", text: "Coden Lernen", group: "chatgpt" },
            { class: "hiddenItem", keyword: "MCJE", url: "wiki", text: "Minecraft Java Edition Wiki", group: "mcjewiki" },            
            { class: "hiddenItem", keyword: "MCJE Wiki", url: "wiki", text: "Minecraft Java Edition Wiki", group: "mcjewiki" },
            { class: "hiddenItem", keyword: "Minecraft Java Edition", url: "wiki", text: "Minecraft Java Edition Wiki", group: "mcjewiki" },
            { keyword: "Downloads", url: "downloads", text: "Download-Seite", group: "downloads" },
            { class: "hiddenItem", keyword: "Skin Editor", text: "Skin Editor", group: "skin" },
            { keyword: "Command Generator", url: "generator/recipe_generator", text: "Command Generatoren", group: "generator" },
            { keyword: "Taschenrechner", url: "tools", text: "Taschenrechner Tools", group: "tools_calc" },
            { keyword: "Nether Portal Koordinaten Berechner", url: "tools?tool=nether&hideURL=1", text: "Nether Portal Tools", group: "tools_nether" },
            { keyword: "Item Listen Multiplikator", url: "tools?tool=item&hideURL=1", text: "Item Listen Multiplikator Tools", group: "tools_item_list" },
            { keyword: "Calculator", url: "calculator", text: "Taschenrechner", group: "tools_calc" },
            { keyword: "Wiki", url: "https://github.com/Redminer9630de/redminer9630de.github.io/wiki", text: "GitHub Wiki-Seite", group: "githubwiki" },
            { keyword: "Github Wiki", url: "https://github.com/Redminer9630de/redminer9630de.github.io/wiki", text: "GitHub Wiki-Seite", group: "githubwiki" },
            { keyword: "Discord", url: "https://discord.gg/", text: "Discord", group: "discord" },
            { keyword: "Feedback", url: "feedback/", text: "Feedback", group: "feedback" },
            { keyword: "Github", url: "https://github.com/Redminer9630de/mc/wiki", text: "GitHub Wiki-Seite", group: "githubwiki" },
            { keyword: "MC Server Status team", url: "server", text: "MC Server - Team", group: "serverteam" }
        ];
        const searchInput = document.getElementById('searchInput');
        const suggestionList = document.createElement('ul');
        suggestionList.classList.add('suggestions');
        document.querySelector('.search-container').appendChild(suggestionList);
        const searchLoad = "";
        searchInput.addEventListener('input', function() { handleSearch(this.value.toLowerCase()); });
        function handleSearch(searchValue) {
            suggestionList.innerHTML = ""; // Leere die Vorschlagsliste
            const groupsShown = new Set(); // Set zum Verhindern von Duplikaten
            const filteredKeywords = keywords.filter(keyword => keyword.keyword.toLowerCase().includes(searchValue));
            filteredKeywords.slice(0, 15).forEach(keyword => {
                if (!groupsShown.has(keyword.group)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = keyword.text; // Zeige den Vorschlagstext an
                    listItem.addEventListener('click', function() { window.location.href = keyword.url; });
                    suggestionList.appendChild(listItem);
                    groupsShown.add(keyword.group); // Füge die Gruppe zur Set-Liste hinzu
                }
            });
            if (searchValue === "") {
                suggestionList.innerHTML = "";
                const searchLoad = suggestionList.innerHTML; 
            }
        }
        document.getElementById('moreInfoBtn').addEventListener('click', function() {
            var moreInfo = document.getElementById('moreInfo');
            moreInfo.style.display = moreInfo.style.display === 'none' ? 'block' : 'none';
        });
        const urlParams = new URLSearchParams(window.location.search);
        const openLink = urlParams.get('openlink');
        const links = {
            1: "https://m.youtube.com/channel/UCdpkm8rpRnIi88zWSuubbOQ?sub_confirmation=1",
            2: "https://m.twitch.tv/redminer9630",
            3: "wiki",
            4: "downloads",
            5: "calculator",
            6: "generators",
            7: "tutorials",
            8: "feedback"
        };
        const search = urlParams.get('search');
        const menu = urlParams.get('menu');     
        if (search) {
            searchInput.value = search;
            handleSearch(search);
        }
        if (menu === 'out') { document.getElementById('navMenu').classList.add('active'); }
        const hiddenItem = urlParams.get('hiddenItem');
        document.querySelectorAll('.hiddenItem').forEach(item => { if (hiddenItem) { item.style.display = 'list-item'; } else { item.style.display = 'none'; } });
        function checkLiveStreamStatus() {
            fetch('https://api.twitch.tv/helix/streams?user_login=Redminer9630')
                .then(response => response.json())
                .then(data => { if (data.isLive) { document.getElementById('liveStreamLink').style.display = 'list-item'; document.getElementById('twitch').style.display = 'none'; } else { document.getElementById('liveStreamLink').style.display = 'none'; document.getElementById('twitch').style.display = 'list-item'; } })
                .catch(error => {
                    console.error('Fehler beim Überprüfen des Live-Streams:', error);
                    document.getElementById('liveStreamLink').style.display = 'none';
                });
        }
