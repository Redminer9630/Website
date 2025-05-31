let currentLang = localStorage.getItem('lang') || navigator.language.startsWith('de') ? 'de' : 'en';

export async function loadLang(lang = currentLang) {
  const translations = await import(`./${lang}.js`).then(m => m.default);
  return translations;
}

export function setLang(lang) {
  localStorage.setItem('lang', lang);
  location.reload();
}
