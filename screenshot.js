function generateFilename(url, extension) {
  const urlObj = new URL(url);
  const urlParams = new URLSearchParams(urlObj.search);

  let text = urlParams.get("q") || "default";
  text = text.replace(/\s+/g, "-").replace(/\+/g, "-").toLowerCase();

  const date = new Date();
  const timestamp = `${date.getFullYear()}${String(
    date.getMonth() + 1
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(
    date.getHours()
  ).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(
    date.getSeconds()
  ).padStart(2, "0")}`;

  return `${text}-${timestamp}.${extension}`;
}

async function startFullPageScreenshot() {
  const screenshots = [];
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const totalHeight = document.documentElement.scrollHeight;
  const totalWidth = document.documentElement.scrollWidth;

  function hideStickyElements() {
    const stickyElements = document.querySelectorAll(
      "nav, header, .sticky, .minidiv, [style*='position: sticky'], [style*='position: fixed'], .CvDJxb"
    );
    stickyElements.forEach((el) => {
      el.dataset.originalDisplay = el.style.display;
      el.style.display = "none";
    });
  }

  function showStickyElements() {
    const stickyElements = document.querySelectorAll(
      "nav, header, .sticky, .minidiv, [style*='position: sticky'], [style*='position: fixed'], .CvDJxb"
    );
    stickyElements.forEach((el) => {
      el.style.display = el.dataset.originalDisplay || "";
    });
  }

  function hideScrollbar() {
    document.body.style.overflowY = "hidden";
  }

  function showScrollbar() {
    document.body.style.overflowY = "";
  }

  async function captureVisibleTab() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "capture" }, (dataUrl) => {
        if (dataUrl) {
          resolve(dataUrl);
        } else {
          console.error("Failed to capture screenshot.");
          resolve(null);
        }
      });
    });
  }

  window.scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 500));

  hideScrollbar();

  const firstScreenshot = await captureVisibleTab();
  if (firstScreenshot) {
    screenshots.push({
      image: firstScreenshot,
      y: 0,
      height: viewportHeight
    });
  }

  hideStickyElements();

  let scrollY = viewportHeight;
  while (scrollY < totalHeight) {
    window.scrollTo(0, scrollY);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let captureHeight = viewportHeight;
    if (scrollY + viewportHeight > totalHeight) {
      captureHeight = totalHeight - scrollY;
    }

    const screenshot = await captureVisibleTab();
    if (screenshot) {
      screenshots.push({
        image: screenshot,
        y: scrollY,
        height: captureHeight
      });
    }

    scrollY += viewportHeight;
  }

  showStickyElements();
  showScrollbar();

  await stitchScreenshots(
    screenshots,
    totalWidth,
    totalHeight,
    viewportWidth,
    viewportHeight
  );
}

async function stitchScreenshots(
  screenshots,
  fullWidth,
  fullHeight,
  viewportWidth,
  viewportHeight
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const devicePixelRatio = window.devicePixelRatio;

  canvas.width = fullWidth * devicePixelRatio;
  canvas.height = fullHeight * devicePixelRatio;

  let accumulatedHeight = 0;

  for (let i = 0; i < screenshots.length; i++) {
    const img = new Image();
    img.src = screenshots[i].image;
    const height = screenshots[i].height * devicePixelRatio;
    await new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(
          img,
          0,
          (viewportHeight - screenshots[i].height) * devicePixelRatio,
          viewportWidth * devicePixelRatio,
          height,
          0,
          accumulatedHeight,
          viewportWidth * devicePixelRatio,
          height
        );
        accumulatedHeight += height;
        resolve();
      };
    });
  }

  const finalImage = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = finalImage;
  link.download = generateFilename(document.location.href, "png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

startFullPageScreenshot();
