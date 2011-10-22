
function toLogin(){
	
	window.open(
			"chrome://myExtension/content/login.xul",
			"MorningCoffeeAboutDialog",
			"chrome,dependent,centerscreen,modal"
		);
}

function login(){
	let url = "http://localhost:3000/users";
	let request = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"]
	              .createInstance(Components.interfaces.nsIXMLHttpRequest);
	request.onload = function(aEvent) {
	  window.alert("Response Text: " + aEvent.target.responseText);
	};
	request.onerror = function(aEvent) {
	   window.alert("Error Status: " + aEvent.target.status);
	};
	//request.open("GET", url, true);
	request.overrideMimeType("text/xml");
	request.open("POST", url, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	let username=document.getElementById("username");
	let password=document.getElementById("password");
	request.send("user[name]="+username+"&user[password]="+password+"&user[password_confirmation]="+password);

}