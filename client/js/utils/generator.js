var Generator = (function () {
    var charsCollection = {
            'letters': 'qwertyuiopasdfghjklzxcvbnm',
            'lettersUpper': 'qwertyuiopasdfghjklzxcvbnm'.toUpperCase(),
            'numbers': '0123456789',
            'symbols': '!@#$%^&*()_+-={}[]:;|?<>/"\'~'
        },
        nuberOfChars = 2,
        numberOfSorting = 30;
    
    //Password generation
    //returns random char from passed string
    function getRandomChar (string) {
        var stringLength = string.length,
            randomCharNum = Math.floor(Math.random()*stringLength);
        
        return string[randomCharNum];
    }
    
    //returns string with random chars for password
    function setPasswordChars () {
        var password = '';
        
        for (var key in charsCollection) {
            for (var i = 0; i < nuberOfChars; i++) {
                password += getRandomChar(charsCollection[key]);
            }
        }
        
        return password;
    }
    
    //randomize passwords chars, returns ready password
    function randomizePassword () {
        var password = setPasswordChars().split('');
        
        for (var i = 0; i < numberOfSorting; i++) {
            password.sort(function () {
                return Math.round(Math.random());
            }); 
        }
        
        return password.join('');
    }
    
    //Login generation
    //generate login by name and lastname
    function generateLogin (_name, _lastName) {
        var nameFirstLetter = _name.substr(0,1),
            lastnemeLetters = _lastName.substr(0, 5),
            result = nameFirstLetter + lastnemeLetters;
        
        result = result.toLowerCase();
        result = checkLoginLength(result);
        
        return result;
    }
    
    //add additional symbols if login shorter than 6 chars
    function checkLoginLength (login) {
        var result = '',
            additionalLetters = 'ita';
        
        if (login.length === 6) {
            result = login;    
        } else {
            login += additionalLetters;
            result = login.substr(0, 6);
        }
        
        return result;
    }
    
    // replace last char in passed string to next char in alpabet
    function uniqualization (_login) {
        var login = _login,
            loginLastCharIndex = login.length - 1,
            lastChar = login.charCodeAt(loginLastCharIndex) + 1,
            newChar = String.fromCharCode(lastChar);
        
        if (newChar !== '{') {
            login = login.substring(0, loginLastCharIndex) + newChar;    
        } else {
            login = login.substring(0, loginLastCharIndex) + Math.floor((Math.random() * 9) + 1);
        }
        
        //login = login.substring(0, loginLastCharIndex) + newChar;
        
        return login;
    }
    
    return {
        'getPass': function () {
            return randomizePassword();
        },
        'generateLogin': function (name, lastName) {
            return generateLogin(name, lastName);
        },
        'uniqualization': function (login) {
            return uniqualization(login);
        }
    };
})();