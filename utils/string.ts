const stringToArray = (string:string,symbol:string) : Array<string> =>{
    return string.split(symbol);
}

const objectToQuery = (obj:Record<string, any>): string => {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return '?'+keyValuePairs.join('&');
}
export {stringToArray,objectToQuery}