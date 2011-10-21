


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
};

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
};

