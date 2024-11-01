const googleDomains = [
  "www.google.com.af",
  "www.google.al",
  "www.google.dz",
  "www.google.as",
  "www.google.ad",
  "www.google.co.ao",
  "www.google.com.ai",
  "www.google.com.ag",
  "www.google.com.ar",
  "www.google.am",
  "www.google.ac",
  "www.google.com.au",
  "www.google.at",
  "www.google.az",
  "www.google.bs",
  "www.google.com.bh",
  "www.google.com.bd",
  "www.google.by",
  "www.google.be",
  "www.google.com.bz",
  "www.google.bj",
  "www.google.com.bo",
  "www.google.ba",
  "www.google.co.bw",
  "www.google.com.br",
  "www.google.io",
  "www.google.vg",
  "www.google.com.bn",
  "www.google.bg",
  "www.google.bf",
  "www.google.bi",
  "www.google.com.kh",
  "www.google.cm",
  "www.google.ca",
  "www.google.cv",
  "www.google.cat",
  "www.google.cf",
  "www.google.td",
  "www.google.cl",
  "www.google.com.hk",
  "www.g.cn",
  "www.google.cc",
  "www.google.com.co",
  "www.google.co.ck",
  "www.google.co.cr",
  "www.google.hr",
  "www.google.com.cu",
  "www.google.com.cy",
  "www.google.cz",
  "www.google.cd",
  "www.google.dk",
  "www.google.dj",
  "www.google.dm",
  "www.google.com.do",
  "www.google.com.ec",
  "www.google.com.eg",
  "www.google.com.sv",
  "www.google.ee",
  "www.google.com.et",
  "www.google.fm",
  "www.google.com.fj",
  "www.google.fi",
  "www.google.fr",
  "www.google.gf",
  "www.google.ga",
  "www.google.gm",
  "www.google.ge",
  "www.google.de",
  "www.google.com.gh",
  "www.google.com.gi",
  "www.google.gr",
  "www.google.gl",
  "www.google.gp",
  "www.google.com.gt",
  "www.google.gg",
  "www.google.gy",
  "www.google.ht",
  "www.google.hn",
  "www.google.com.hk",
  "www.google.hu",
  "www.google.is",
  "www.google.co.in",
  "www.google.co.id",
  "www.google.iq",
  "www.google.ie",
  "www.google.im",
  "www.google.co.il",
  "www.google.it",
  "www.google.ci",
  "www.google.com.jm",
  "www.google.co.jp",
  "www.google.je",
  "www.google.jo",
  "www.google.kz",
  "www.google.co.ke",
  "www.google.ki",
  "www.google.com.kw",
  "www.google.kg",
  "www.google.la",
  "www.google.lv",
  "www.google.com.lb",
  "www.google.co.ls",
  "www.google.com.ly",
  "www.google.li",
  "www.google.lt",
  "www.google.lu",
  "www.google.mk",
  "www.google.mg",
  "www.google.mw",
  "www.google.com.my",
  "www.google.mv",
  "www.google.ml",
  "www.google.com.mt",
  "www.google.mu",
  "www.google.com.mx",
  "www.google.md",
  "www.google.mn",
  "www.google.me",
  "www.google.ms",
  "www.google.co.ma",
  "www.google.co.mz",
  "www.google.com.mm",
  "www.google.com.na",
  "www.google.nr",
  "www.google.com.np",
  "www.google.nl",
  "www.google.co.nz",
  "www.google.com.ni",
  "www.google.ne",
  "www.google.com.ng",
  "www.google.nu",
  "www.google.com.nf",
  "www.google.no",
  "www.google.com.om",
  "www.google.com.pk",
  "www.google.ps",
  "www.google.com.pa",
  "www.google.com.pg",
  "www.google.com.py",
  "www.google.com.pe",
  "www.google.com.ph",
  "www.google.pn",
  "www.google.pl",
  "www.google.pt",
  "www.google.com.pr",
  "www.google.com.qa",
  "www.google.cg",
  "www.google.ro",
  "www.google.ru",
  "www.google.rw",
  "www.google.sh",
  "www.google.com.lc",
  "www.google.com.vc",
  "www.google.ws",
  "www.google.sm",
  "www.google.com.sa",
  "www.google.sn",
  "www.google.rs",
  "www.google.sc",
  "www.google.com.sl",
  "www.google.com.sg",
  "www.google.sk",
  "www.google.si",
  "www.google.com.sb",
  "www.google.so",
  "www.google.co.za",
  "www.google.co.kr",
  "www.google.es",
  "www.google.lk",
  "www.google.se",
  "www.google.ch",
  "www.google.st",
  "www.google.com.tw",
  "www.google.com.tj",
  "www.google.co.tz",
  "www.google.co.th",
  "www.google.tl",
  "www.google.tg",
  "www.google.tk",
  "www.google.to",
  "www.google.tt",
  "www.google.com.tn",
  "www.google.com.tr",
  "www.google.tm",
  "www.google.co.ug",
  "www.google.com.ua",
  "www.google.ae",
  "www.google.co.uk",
  "www.google.com",
  "www.google.co.vi",
  "www.google.com.uy",
  "www.google.co.uz",
  "www.google.vu",
  "www.google.co.ve",
  "www.google.com.vn",
  "www.google.com",
  "www.google.co.zm",
  "www.google.co.zw"
];
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const url = new URL(activeTab.url);

    if (
      !googleDomains.includes(url.hostname) ||
      !url.pathname.startsWith("/search")
    ) {
      document.body.innerHTML = "<p>Please visit a Google SERP</p>";
    } else {
      document.getElementById("downloadHtml").addEventListener("click", () => {
        let filename = generateFilename(url, "html", false);
        console.log("filename", filename);
        captureHTMLAndDownload(filename);
      });
      document
        .getElementById("fullPageScreenshot")
        .addEventListener("click", () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              chrome.runtime.sendMessage({ action: "startCapture" });
            } else {
              console.error("No active tab found.");
            }
          });
        });

      document
        .getElementById("aboveFoldScreenshot")
        .addEventListener("click", () => {
          let filename = generateFilename(url, "png", true);
          chrome.runtime.sendMessage({
            action: "captureScreenshot",
            filename: filename
          });
        });
    }
  });
});
function captureHTMLAndDownload(filename) {
  if (!filename) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: scrollAndCaptureHTML
      },
      (results) => {
        if (results && results[0] && results[0].result) {
          const htmlContent = results[0].result;
          const blob = new Blob([htmlContent], { type: "text/html" });
          const url = URL.createObjectURL(blob);

          chrome.runtime.sendMessage({
            action: "download",
            url: url,
            filename: filename
          });
        } else {
          alert("Failed to capture HTML content.");
        }
      }
    );
  });
}

function scrollAndCaptureHTML() {
  return new Promise((resolve) => {
    let currentPosition = 0;
    const scrollStep = 250;
    const scrollInterval = 100;

    function scrollPage() {
      currentPosition += scrollStep;
      window.scrollTo(0, currentPosition);

      if (currentPosition < document.body.scrollHeight) {
        setTimeout(scrollPage, scrollInterval);
      } else {
        setTimeout(() => {
          const htmlContent = document.documentElement.outerHTML;
          resolve(htmlContent);
        }, 2000);
      }
    }

    scrollPage();
  });
}

function getHTMLContent() {
  return document.documentElement.outerHTML;
}

function generateFilename(url, extension, aboveFold = false) {
  // Get the current URL
  const urlObj = new URL(url);
  const urlParams = new URLSearchParams(urlObj.search);

  // Extract the "q" query parameter and replace "+" with "-"
  let text = urlParams.get("q") || "default";
  text = text.replace(/\s+/g, "-").replace(/\+/g, "-").toLowerCase();

  // Get the current timestamp
  const date = new Date();
  const timestamp = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
    date.getHours()
  ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  // Construct and return the filename with the provided extension
  if (aboveFold) {
    return `${text}-above-fold-${timestamp}.${extension}`;
  } else {
    return `${text}-${timestamp}.${extension}`;
  }
}
