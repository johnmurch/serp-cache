chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download") {
    chrome.downloads.download({
      url: message.url,
      filename: message.filename,
      saveAs: false
    });
  }

  if (message.action === "captureScreenshot") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const activeTabId = tabs[0].id;

      if (activeTabId !== undefined) {
        console.log("Injecting scroll function into active tab...");

        chrome.scripting.executeScript(
          {
            target: { tabId: activeTabId },
            func: () => {
              window.scrollTo(0, 0); // Scroll to the top-left corner
            }
          },
          () => {
            setTimeout(() => {
              chrome.tabs.captureVisibleTab(
                null,
                { format: "png" },
                (dataUrl) => {
                  if (dataUrl) {
                    chrome.downloads.download({
                      url: dataUrl,
                      filename: message.filename
                    });
                    console.log(
                      "Successfully captured and downloaded the screenshot."
                    );
                  } else {
                    console.error("Failed to capture visible area.");
                  }
                }
              );
            }, 300);
          }
        );
      } else {
        console.error("Active tab ID is undefined.");
      }
    });
  }

  if (message.action === "startCapture") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const activeTabId = tabs[0].id;
      if (activeTabId) {
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ["screenshot.js"]
        });
      } else {
        console.error("No active tab found.");
      }
    });
  }

  if (message.action === "capture") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        console.error("Error capturing screenshot:", chrome.runtime.lastError);
        sendResponse(null);
      } else {
        sendResponse(dataUrl);
      }
    });
    return true; // Keep the message channel open for asynchronous sendResponse
  }

  if (message.action === "stitch") {
    console.log("Stitching screenshots...");

    const { screenshots } = message; // Receive screenshots array from content script

    if (!screenshots || screenshots.length === 0) {
      console.error("No screenshots to stitch.");
      return;
    }

    // Create a canvas to stitch screenshots
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageHeight = screenshots.length * window.innerHeight;
    const imageWidth = window.innerWidth;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    screenshots.forEach((dataUrl, index) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, index * window.innerHeight);
        if (index === screenshots.length - 1) {
          const finalImage = canvas.toDataURL("image/png");
          console.log("Final stitched image ready:", finalImage);
          // You can save finalImage, display it, or download it here
        }
      };
      img.src = dataUrl;
    });
  }
});
