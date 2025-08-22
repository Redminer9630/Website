(function() {
  const nativeAlert = window.alert;

  window.alert = function(msg, details="") {
    const alerts = localStorage.getItem("alerts") || "website";
    const adv = localStorage.getItem("alerts_advanced") === "true";

    let text = msg;
    if (adv && details) {
      text += "\n\nDetails:\n" + details;
    }

    if (alerts === "system") {
      nativeAlert(text);
    } else {
      if (window.showWebsiteAlert) {
        window.showWebsiteAlert(text);
      } else {
        nativeAlert(text);
      }
    }
  };

  const nativeConfirm = window.confirm;
  window.confirm = function(msg) {
    const alerts = localStorage.getItem("alerts") || "website";
    if (alerts === "system") return nativeConfirm(msg);

    if (window.showWebsiteConfirm) {
      return window.showWebsiteConfirm(msg);
    } else {
      return nativeConfirm(msg);
    }
  };

  const nativePrompt = window.prompt;
  window.prompt = function(msg, def="") {
    const alerts = localStorage.getItem("alerts") || "website";
    if (alerts === "system") return nativePrompt(msg, def);

    if (window.showWebsitePrompt) {
      return window.showWebsitePrompt(msg, def);
    } else {
      return nativePrompt(msg, def);
    }
  };
})();
