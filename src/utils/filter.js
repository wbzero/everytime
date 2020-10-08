const formattime = (val, format) => {
    let data = new Date(val * 1000);
    let y = data.getFullYear();
    let mon = data.getMonth() + 1<10?'0'+data.getMonth() + 1:data.getMonth() + 1;
    let day = data.getDate()<10?'0'+data.getDate():data.getDate();
    let h = data.getHours()<10?'0'+data.getHours():data.getHours();
    let min = data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes();
    let str = '';
    if(format == 'yyyy/mm/dd hh:mm'){
        str = `${y}/${mon}/${day} ${h}:${min}`
    }else if(format == 'mm月dd日 hh:mm') {
        str = `${mon}月${day}日 ${h}:${min}`
    }else if(format == 'hh:mm'){
        str = `${h}:${min}`
    }
    return str
}

export default {
    formattime
}