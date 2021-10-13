let inputDiv = document.getElementById("inputs");
let buttonDiv = document.getElementById("buttons");
let settings = null;

function addClicked(event) {
	let input = document.createElement("input");
	input.type = "text";
	input.className = "sites"
	inputDiv.appendChild(input);
	inputDiv.appendChild(document.createElement("br"))
}

function saveClicked(event) {
  inputs = document.querySelectorAll(".sites")
  sites = []
  for (let input of inputs){
	sites.push(input.value)
  }
  
  if(settings){
	settings.sites = sites
  }
  else{
	settings = {sites:sites}
  }
  chrome.storage.sync.set({ settings });
  console.log('set', settings)
}

chrome.storage.sync.get("settings", (data) => {
	if("settings" in data){
		settings = data.settings
		console.log('get', settings)
			
		for (let site of settings.sites) {
		  let input = document.createElement("input");
		  input.type = "text";
		  input.value = site;
		  input.className = "sites"
		  inputDiv.appendChild(input);
		  inputDiv.appendChild(document.createElement("br"))
		}
	}
});

button = document.createElement("button");
button.textContent = "+"
buttonDiv.appendChild(button)
button.addEventListener("click", addClicked);

button = document.createElement("button");
button.textContent = "Save"
buttonDiv.appendChild(button)
button.addEventListener("click", saveClicked);

