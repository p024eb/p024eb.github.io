// Notice Banner ///////////////
(function () {
  const noticeBanner = document.querySelector(".noticeBanner");
  if (noticeBanner !== null) {
    let targetDataset = noticeBanner.dataset;

    // Default Setting
    let setDomain = "";
    let setPath = "/";
    let setMaxAge = "86400";
    const setSameSite = "Strict";

    if (targetDataset.domain !== setDomain) {
      setDomain = targetDataset.domain;
    } else {
      setDomain = setDomain;
    }
    if (targetDataset.path !== setPath) {
      setPath = targetDataset.path;
    } else {
      setPath = setPath;
    }
    if (targetDataset.domain !== setMaxAge) {
      setMaxAge = targetDataset.maxage;
    } else {
      setMaxAge = setMaxAge;
    }

    function getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, val) {
      let setCookie = `${name}=${val}; Domain=${setDomain}; Path=${setPath}; SameSite=${setSameSite}; max-age=${setMaxAge}; secure`;
      document.cookie = setCookie;
    }

    function acceptFunc() {
      console.log("accept");
      setCookie("actionConfirmed", "true");
      setCookie("setPrivacyCookie", "true");
      hideAnnounceFunc();
    }

    function rejectFunc() {
      console.log("reject");
      setCookie("actionConfirmed", "true");
      setCookie("setPrivacyCookie", "false");
      privacyFlag = false;
      deleteTagetTag();
      hideAnnounceFunc();
    }

    function hideAnnounceFunc() {
      if (document.querySelector(".noticeBannerWrap") !== null) {
        const noticeBanner = document.querySelector(".noticeBannerWrap");
        noticeBanner.remove();
      }
    }

    function deleteTagetTag() {
      const targetScript = document.querySelectorAll(".controlScript");
      for (let i = 0; i < targetScript.length; i++) {
        targetScript[i].remove();
      }
    }

    function parseBool(targetString) {
      let targetBool = true;
      if (targetString === "true") {
        targetBool = true;
      } else if (targetString === "false") {
        targetBool = false;
      } else {
        targetBool = undefined;
      }
      return targetBool;
    }

    let privacyCookieStatus = getCookie("setPrivacyCookie");
    let actionConfirmedStatus = getCookie("actionConfirmed");

    if (parseBool(actionConfirmedStatus) === true) {
      hideAnnounceFunc();
    } else if (parseBool(actionConfirmedStatus) === undefined) {
      setCookie("actionConfirmed", "false");
    }

    if (parseBool(privacyCookieStatus) === false) {
      deleteTagetTag();
    } else if (parseBool(privacyCookieStatus) === undefined) {
      setCookie("setPrivacyCookie", "true");
    }

    if (document.querySelector("#setAcceptButton") !== null) {
      const setAcceptButton = document.querySelector("#setAcceptButton");
      setAcceptButton.addEventListener("click", acceptFunc);
    }

    if (document.querySelector("#setRejectButton") !== null) {
      const setRejectButton = document.querySelector("#setRejectButton");
      setRejectButton.addEventListener("click", rejectFunc);
    }

    if (document.querySelector(".noticeBanner") !== null) {
      if (
        document
          .querySelector(".noticeBanner")
          .querySelector(".closeButton") !== null
      ) {
        const closeButton = document
          .querySelector(".noticeBanner")
          .querySelector(".closeButton");
        closeButton.addEventListener("click", hideAnnounceFunc);
      }
    }

    if (parseBool(actionConfirmedStatus) === true) {
      hideAnnounceFunc();
    }
  }
})();
