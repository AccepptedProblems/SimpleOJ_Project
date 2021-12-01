
class CookieManager{
    constructor() {
    }

    static getCookieWithName(name) {
        var name = name + "=";
        var cookies = document.cookie.split(';');

        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];

            //Remove whitespace before cookie string  
            while (cookie.charAt(0)==' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
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

    static deletaCookie(name){
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

}

export default CookieManager