export function getTodaysDate(str) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = str ? new Date(str) : new Date();

    return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function getShortMonthDay(strDate) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const dateList = strDate.split('-');
    return `${monthNames[parseInt(dateList[1], 10) - 1]} ${dateList[2]}`;
}