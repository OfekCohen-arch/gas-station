export const utilService = {
    makeId,
    getDate
}
function makeId(length = 6) : string {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function getDate(timestamp:number) : string{
const dateObject = new Date(timestamp);

// תוצאה לדוגמה: "30.4.2024"
const formattedDate = dateObject.toLocaleDateString('he-IL'); 
return formattedDate
}