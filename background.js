// chrome.declarativeNetRequest.updateDynamicRules({
//   addRules: [
//     {
//       id: 1,
//       priority: 1,
//       action: {
//         type: "redirect",
//         redirect: { url: chrome.runtime.getURL("block.html") },
//       },
//       condition: {
//         urlFilter: "*://*.instagram.com/*",
//         resourceTypes: ["main_frame"],
//       },
//     },
//   ],
//   removeRuleIds: [1],
// });

chrome.storage.sync.get(["startTime", "endTime"], ({ startTime, endTime }) => {
  if (startTime && endTime) {
    const currentTime = new Date().toLocaleTimeString("en-GB", {
      hour12: false,
    });

    // Check if the current time is within the blocking interval
    if (currentTime >= startTime && currentTime <= endTime) {
      // Add the rules to block Instagram
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
          {
            id: 1,
            priority: 1,
            action: {
              type: "redirect",
              redirect: { extensionPath: "/block.html" },
            },
            condition: {
              urlFilter: "*://*.instagram.com/*",
              resourceTypes: ["main_frame"],
            },
          },
        ],
        removeRuleIds: [1],
      });
    } else {
      // Remove the block rule outside of the time interval
      chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
    }
  }
});
