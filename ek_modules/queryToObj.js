module.exports = (str) => {
    let tempArr = decodeURIComponent(unescape(str)).split('&');
    let tempObj = {};
    tempArr.forEach((item ,index) => {
        let itemArr = item.split('=');
        tempObj[itemArr[0]] = itemArr[1]
    })
    return tempObj;
}