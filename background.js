chrome.tabs.onUpdated.addListener(function(tabId, tabStatus, tab) {
	if(tabStatus.status == "complete"){	
		chrome.storage.sync.get("settings", (data) => {
			if('settings' in data){
				settings = data.settings
				for (let site of settings.sites){
					if(tab.url.includes(site)){
						if(tab.autoDiscardable){
							chrome.tabs.update(tab.id, {autoDiscardable: false});

							chrome.notifications.create({
							  type:     'basic',
							  iconUrl:  "/images/undiscard16.png",
							  title:    "UnDiscard",
							message:  `${site} UnDiscarded`
							});
							break
						}
					}
				}
			}
		});
	}
});
