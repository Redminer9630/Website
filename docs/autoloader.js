Promise.all([
  import('/lang.js'),
  import('/elements.js'),
  import('/embed.js")
]).then(([lang]) => {
  document.querySelectorAll('[lang]').forEach(el => {
    const key = el.getAttribute('lang');
    const value = lang.default?.[key] || `[[${key}]]`;
    el.innerText = value;
  });
});
