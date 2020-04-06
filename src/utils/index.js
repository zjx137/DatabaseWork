/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function strToDate(str) {
  let d = new Date(str);
  let datetime=d.getFullYear() + '-'
  datetime += d.getMonth() >= 9 ? (d.getMonth()+1) : ('0'+(1+d.getMonth()))
  datetime += '-'
  datetime += d.getDate() <= 9 ? ('0'+d.getDate()) : d.getDate() 
  
  return datetime
}

export function strToNum(str) {
  let num = str - 0;
  return num
}

export function getDay(day){
  function doHandleMonth(month){
   
    　　var m = month;
     
    　　if(month.toString().length == 1){
     
    　　　　m = "0" + month;
     
    　　}
     
    　　return m;
     
    }
 
  　　var today = new Date();
   
   
   
  　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
   
   
   
  　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
   
   
   
  　　var tYear = today.getFullYear();
   
  　　var tMonth = today.getMonth();
   
  　　var tDate = today.getDate();
   
  　　tMonth = doHandleMonth(tMonth + 1);
   
  　　tDate = doHandleMonth(tDate);
   
  　　return tYear+"-"+tMonth+"-"+tDate;
   
  }

export function compare_time(x,y) {
  var a = x.date
  var b = y.date
  var arr=a.split("-");
  var starttime=new Date(arr[0],arr[1],arr[2]);
  var starttimes=starttime.getTime();
  var arrs=b.split("-");
  var endtime=new Date(arrs[0],arrs[1],arrs[2]);
  var endtimes=endtime.getTime();
  if(starttimes>endtimes)//开始大于结束
  {
  return 1;
  }
  else{
  return -1;
  }
  }
   
  