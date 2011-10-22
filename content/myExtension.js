/**
 * XULSchoolChrome namespace.
 */
if ("undefined" == typeof(XULSchoolChrome)) {
  var XULSchoolChrome = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
XULSchoolChrome.BrowserOverlay = {
  /**
   * Says 'Hello' to the user.
   */
  sayHello : function(aEvent) {
    let stringBundle = document.getElementById("xulschoolhello-string-bundle");
    let message = stringBundle.getString("xulschoolhello.greeting.label");

    window.alert(message);
  }
};





var LinkModifier ={
	init: function(){
		//Browser.getBookmarks();
		//Browser.getHistory();
		var appcontent=document.getElementById("appcontent");
		if(appcontent){
			appcontent.addEventListener("DOMContentLoaded", LinkModifier.onPageLoad,true);
			appcontent.addEventListener("click", LinkModifier.clickLinks, true);   
		}
	},
	
	onPageLoad: function(event){
		//alert(event.type);
		//alert("haha1");
		var linkString="";
		if(event.originalTarget instanceof HTMLDocument){
			var doc = event.originalTarget;
			var length=doc.links.length;
			//var scrollbar=doc.getElementsByTagName("scrollbar");
			//alert("scrollbar"+scrollbar.getAttribute("increment"));
			//alert(length+"links is loaded \n" +doc.location.hostname);
			//doc.alinkColor = "blue";
			var hostname = "www.youku.com";
			if(doc.location.hostname.indexOf(hostname) == 0 && hostname.indexOf(doc.location.hostname) == 0){
			var file = LocalStorage.getLocalDirectory();
			file.append("www.youku.com1.txt");
			var data = LocalStorage.readFile(file);
			var lines = data.split("\n");
			//alert(data);
			var fileRevisited = LocalStorage.getLocalDirectory();
			fileRevisited.append("www.youku.com_Revisit.txt");
			var dataRevisited = LocalStorage.readFile(fileRevisited);	
			var linesRevisited = dataRevisited.split("\n");
			
			//alert(dataRevisited);
			
			for(var i = 0; i < doc.links.length; i++){
				var flag = 0;
				var flagRevisited = 0;
				var link = doc.links[i].getAttribute("href") + " " + doc.links[i].innerHTML;
				for(var j = 0; j < lines.length; j++){
					
					if(link.indexOf(lines[j]) == 0 && lines[j].indexOf(link) == 0){
						flag = 1;
						break;
					}
				}
				for(var k=0; k<linesRevisited.length; k++){
					if(link.indexOf(linesRevisited[k]) == 0 && linesRevisited[k].indexOf(link) == 0){
						flagRevisited = 1;
						break;
					}
				}
				if(flag == 0){
					doc.links[i].setAttribute("style",""+doc.links[i].getAttribute("style")+
					";border:5px solid red;");
				}
				if(flagRevisited == 1){
					doc.links[i].setAttribute("style",""+doc.links[i].getAttribute("style")+
					";border:5px solid blue;");
				}
				
				linkString += link + "\n";
			}
			var fileName=doc.location.hostname+".txt";
			var fileString=linkString;
			LocalStorage.createFile(fileName,fileString);
			}
		}
	},
	
	unLoad: function(event) {
		alert("Bye in "+getTime());
	},
	
	scrollTimes : function(event) {
		//alert("滚屏1次");
	},
	
	clickLinks : function(event) {
		var url = event.target.getAttribute("href");		
		if(event.target.getAttribute("href")){
			//alert(event.target + event.target.innerHTML+"\n"+"got you");
			var file = LocalStorage.getLocalDirectory();
			var fileName = "www.youku.com_Revisit.txt";
			file.append(fileName);
			var data = LocalStorage.readFile(file);
			var newLink=event.target.getAttribute("href")+ " " + event.target.innerHTML+"\n";
			data += newLink;
			LocalStorage.createFile(fileName,data);
		}
	}
}

var Browser = {
	
	getBookmarks : function() {
			var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"]
	                                        .getService(Components.interfaces.nsINavHistoryService);
	         var options = historyService.getNewQueryOptions();
	         var query = historyService.getNewQuery();

	         var bookmarksService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"]
	                                          .getService(Components.interfaces.nsINavBookmarksService);
	         var toolbarFolder = bookmarksService.toolbarFolder;

	         query.setFolders([toolbarFolder], 1);

	         var result = historyService.executeQuery(query, options);
	         var rootNode = result.root;
	         rootNode.containerOpen = true;
	         
	         var bookmarkString;
	         // iterate over the immediate children of this folder and dump to console
	         for (var i = 0; i < rootNode.childCount; i ++) {
	           var node = rootNode.getChild(i);
	           var Ci = Components.interfaces;
	           switch(node.type) {
	             case node.RESULT_TYPE_URI:
	               alert("URI result " + node.uri + "\n");
	               break;
	             case node.RESULT_TYPE_VISIT:
	               var visit = node.QueryInterface(Ci.nsINavHistoryVisitResultNode);
	               alert("Visit result " + node.uri + " session = " + visit.sessionId + "\n");
	               break;
	             case node.RESULT_TYPE_FULL_VISIT:
	               var fullVisit = node.QueryInterface(Ci.nsINavHistoryFullVisitResultNode);
	               alert("Full visit result " + node.uri + " session = " + fullVisit.sessionId + " transitionType = " +
	                    fullVisit.transitionType + "\n");
	               break;
	             case node.RESULT_TYPE_HOST:
	               var container = node.QueryInterface(Ci.nsINavHistoryContainerResultNode);
	               alert("Host " + container.title + "\n");
	               break;
	             case node.RESULT_TYPE_REMOTE_CONTAINER:
	               var container = node.QueryInterface(Ci.nsINavHistoryContainerResultNode);
	               alert("Remote container " + container.title + " type = " + container.remoteContainerType + "\n");
	               break;
	             case node.RESULT_TYPE_QUERY:
	               var query = node.QueryInterface(Ci.nsINavHistoryQueryResultNode);
	               alert("Query, place URI = " + query.uri + "\n");
	               break;
	             case node.RESULT_TYPE_FOLDER:
	               // Note that folder nodes are of type nsINavHistoryContainerResultNode by default, but
	               // can be QI'd to nsINavHistoryQueryResultNode to access the query and options that
	               // created it.
	               alert("Folder " + node.title + " id = " + node.itemId + "\n");
	               break;
	             case node.RESULT_TYPE_SEPARATOR:
	               alert("-----------\n");
	               break;
	           }
	           bookmarkString+="Child: " + node.title + " " + node.id +"\n";
	         }
	         //alert(bookmarkString);
	         // close a container after using it!
	         rootNode.containerOpen = false;
	},

	getHistory : function() {
		var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"]
		                                        .getService(Components.interfaces.nsINavHistoryService);

		         // No query options set will get all history, sorted in database order,
		         // which is nsINavHistoryQueryOptions.SORT_BY_NONE.
		         var options = historyService.getNewQueryOptions();

		         // No query parameters will return everything
		         var query = historyService.getNewQuery();

		         // execute the query
		         var result = historyService.executeQuery(query, options);
		         alert(result);
	}
}

var LocalStorage = {
		getLocalDirectory : function() {
		  let directoryService =
		    Cc["@mozilla.org/file/directory_service;1"].
		      getService(Ci.nsIProperties);
		  // this is a reference to the profile dir (ProfD) now.
		  let localDir = directoryService.get("ProfD", Ci.nsIFile);

		  localDir.append("myExtension");

		  if (!localDir.exists() || !localDir.isDirectory()) {
		    // read and write permissions to owner and group, read-only for others.
		    localDir.create(Ci.nsIFile.DIRECTORY_TYPE, 0774);
		  }

		  return localDir;
		},
		
		createFile : function(fileName,fileString){
			let myFile = LocalStorage.getLocalDirectory();
			//fileString="hello world";
			//alert(fileName+fileString);
			//alert("filestring="+fileString);
			myFile.append(fileName);
			// do stuff with the file.
			//fileString="hello";
			//if(filename.match(":")) return;
			if (!myFile.exists()){
				myFile.create(Ci.nsIFile.NORMAL_FILE_TYPE, 0774);
			}
			Components.utils.import("resource://gre/modules/NetUtil.jsm");
			Components.utils.import("resource://gre/modules/FileUtils.jsm");
			
			// file is nsIFile, data is a string

			// You can also optionally pass a flags parameter here. It defaults to
			// FileUtils.MODE_WRONLY | FileUtils.MODE_CREATE | FileUtils.MODE_TRUNCATE;
			var ostream = FileUtils.openSafeFileOutputStream(myFile)

			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
			                createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			var istream = converter.convertToInputStream(fileString);

			// The last argument (the callback) is optional.
			NetUtil.asyncCopy(istream, ostream, function(status) {
			  if (!Components.isSuccessCode(status)) {
			    // Handle error!
			    return;
			  }

			  // Data has been written to the file.
			});
		},
		
		readFile : function(file) {
			// |file| is nsIFile
			var data = "";
			var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
			              createInstance(Components.interfaces.nsIFileInputStream);
			var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].
			              createInstance(Components.interfaces.nsIConverterInputStream);
			fstream.init(file, -1, 0, 0);
			cstream.init(fstream, "UTF-8", 0, 0); // you can use another encoding here if you wish

			let (str = {}) {
			  let read = 0;
			  do { 
			    read = cstream.readString(0xffffffff, str); // read as much as we can and put it in str.value
			    data += str.value;
			  } while (read != 0);
			}
			cstream.close(); // this closes fstream

			return data;
		}
}

var DifferenceDetector = {
	
}
	function exampleTabAdded(event) {
	  var browser = gBrowser.getBrowserForTab(event.target);
	  alert("Hello in "+Time.getNowTime());
	  // browser is the XUL element of the browser that's been added
	}

	function exampleTabMoved(event) {
	  var browser = gBrowser.getBrowserForTab(event.target);
	  // browser is the XUL element of the browser that's been moved
	}

	function exampleTabRemoved(event) {
	
	  var browser = gBrowser.getBrowserForTab(event.target);
	  
		 
		alert("Bye in "+Time.getNowTime());
	  // browser is the XUL element of the browser that's been removed
	}

	// During initialization
	var container = gBrowser.tabContainer;
	container.addEventListener("TabOpen", exampleTabAdded, false);
	container.addEventListener("TabMove", exampleTabMoved, false);
	container.addEventListener("TabClose", exampleTabRemoved, false);
	  

	//init();

	//程序关键的入口
	window.addEventListener("load", function() {LinkModifier.init(); }, false);  
	
	window.addEventListener("DOMMouseScroll", function() {LinkModifier.scrollTimes(); }, false);  
	
	window.addEventListener("click", function() {LinkModifier.clickLinks(); }, false);  