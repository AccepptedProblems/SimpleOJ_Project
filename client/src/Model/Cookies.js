
class CookieManager{
    static getCookieWithName(name) {
        var cookiesName = name + "=";
        var cookies = document.cookie.split(';');

        for(let cookie in cookies) {
            //Remove whitespace before cookie string  
            while (cookie.charAt(0)==' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookiesName) == 0) {
                return cookie.substring(cookiesName.length, cookie.length);
            }
        }
    
        return "";
    }

    static saveCookie(name, value, expiredDay) {
        var date = new Date()
        date.setTime(date.getTime() + expiredDay*24*60*60*1000) 

        var expires = "expires="+ date.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    }

    static deleteCookie(name){
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

}

export default CookieManager