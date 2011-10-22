


var Time = {
	getNowTime ：function(){
		var nowTime = new Date();
		var NowDateTime = nowTime.getFullYear() + "年" + 
        (nowTime.getMonth() + 1 )+ "月" + 
        nowTime.getDate() + "日"  + " " +
        nowTime.getHours() + ":" +
        nowTime.getMinutes() + ":" +
        nowTime.getSeconds() + "." +
        nowTime.getMilliseconds();
		return NowDateTime;
	}
}

function getTime(){
	var nowTime = new Date();
	var NowDateTime = nowTime.getFullYear() + "年" + 
    (nowTime.getMonth() + 1 )+ "月" + 
    nowTime.getDate() + "日"  + " " +
    nowTime.getHours() + ":" +
    nowTime.getMinutes() + ":" +
    nowTime.getSeconds() + "." +
    nowTime.getMilliseconds();
	return NowDateTime;
}

function HTMLParser(aHTMLString){
	  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
	    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
	  html.documentElement.appendChild(body);

	  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
	    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
	    .parseFragment(aHTMLString, false, null, body));

	  return html;
}