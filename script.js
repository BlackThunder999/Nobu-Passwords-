const password = document.getElementById("password");
const showBtn = document.getElementById("showBtn");
const copyBtn = document.getElementById("copyBtn");
const refreshBtn = document.getElementById("refreshBtn");
const generateBtn = document.getElementById("generateBtn");

const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const langEn = document.getElementById("langEn");
const langRu = document.getElementById("langRu");

const themeBtn = document.getElementById("themeBtn");

let currentLanguage =
localStorage.getItem("language") || "en";

let currentTheme =
localStorage.getItem("theme") || "dark";

const dictionary = {

    en:{

        title:"Nobu Password Generator",

        subtitle:"Create secure passwords in seconds",

        length:"Password Length",

        upper:"Uppercase Letters",

        lower:"Lowercase Letters",

        numbers:"Numbers",

        symbols:"Symbols",

        generate:"Generate Password",

        privacy:"🔒 Privacy",

        privacyText:"All passwords are generated locally in your browser. Nobu never stores or receives your passwords.",

        weak:"Weak",

        medium:"Medium",

        strong:"Strong",

        veryStrong:"Very Strong",

        copied:"Copied",

        copy:"Copy"

    },

    ru:{

        title:"Генератор паролей Nobu",

        subtitle:"Создавайте надёжные пароли за секунды",

        length:"Длина пароля",

        upper:"Заглавные буквы",

        lower:"Строчные буквы",

        numbers:"Цифры",

        symbols:"Спецсимволы",

        generate:"Сгенерировать пароль",

        privacy:"🔒 Конфиденциальность",

        privacyText:"Все пароли создаются локально в вашем браузере. Nobu не хранит и не получает ваши пароли.",

        weak:"Слабый",

        medium:"Средний",

        strong:"Надёжный",

        veryStrong:"Очень надёжный",

        copied:"Скопировано",

        copy:"Копировать"

    }

};
function setLanguage(lang){

    currentLanguage = lang;

    localStorage.setItem("language", lang);

    document.getElementById("title").textContent =
        dictionary[lang].title;

    document.getElementById("subtitle").textContent =
        dictionary[lang].subtitle;

    document.getElementById("lengthText").textContent =
        dictionary[lang].length;

    document.getElementById("uppercaseText").textContent =
        dictionary[lang].upper;

    document.getElementById("lowercaseText").textContent =
        dictionary[lang].lower;

    document.getElementById("numbersText").textContent =
        dictionary[lang].numbers;

    document.getElementById("symbolsText").textContent =
        dictionary[lang].symbols;

    document.getElementById("generateBtn").textContent =
        dictionary[lang].generate;

    document.getElementById("privacyTitle").textContent =
        dictionary[lang].privacy;

    document.getElementById("privacyText").textContent =
        dictionary[lang].privacyText;

    langEn.classList.remove("active");
    langRu.classList.remove("active");

    if(lang==="en"){
        langEn.classList.add("active");
    }else{
        langRu.classList.add("active");
    }

    updateStrength(password.value);

}

langEn.onclick=()=>setLanguage("en");

langRu.onclick=()=>setLanguage("ru");

function setTheme(theme){

    currentTheme = theme;

    localStorage.setItem("theme", theme);

    if(theme==="light"){

        document.body.classList.add("light");

        themeBtn.textContent="☀️";

    }else{

        document.body.classList.remove("light");

        themeBtn.textContent="🌙";

    }

}

themeBtn.onclick=()=>{

    if(currentTheme==="dark"){

        setTheme("light");

    }else{

        setTheme("dark");

    }

};

setLanguage(currentLanguage);

setTheme(currentTheme);
length.oninput = () => {

    lengthValue.textContent = length.value;

    generatePassword();

};

[uppercase, lowercase, numbers, symbols].forEach(item => {

    item.onchange = generatePassword;

});

generateBtn.onclick = generatePassword;

refreshBtn.onclick = generatePassword;

showBtn.onclick = () => {

    if(password.type === "password"){

        password.type = "text";

        showBtn.textContent = "🙈";

    }else{

        password.type = "password";

        showBtn.textContent = "👁";

    }

};

copyBtn.onclick = async () => {

    if(!password.value) return;

    await navigator.clipboard.writeText(password.value);

    copyBtn.textContent = "✅";

    setTimeout(()=>{

        copyBtn.textContent = "📋";

    },1500);

};

function randomChar(chars){

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return chars[array[0] % chars.length];

}

function generatePassword(){

    let chars = "";

    if(uppercase.checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(lowercase.checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if(numbers.checked)
        chars += "0123456789";

    if(symbols.checked)
        chars += "!@#$%^&*()_-+=<>?/{}[]";

    if(chars.length===0){

        password.value="";

        return;

    }

    let result="";

    for(let i=0;i<Number(length.value);i++){

        result += randomChar(chars);

    }

    password.value=result;

    updateStrength(result);

}
function updateStrength(pass){

    let score = 0;

    if(pass.length >= 8) score++;
    if(pass.length >= 12) score++;
    if(pass.length >= 16) score++;

    if(/[A-Z]/.test(pass)) score++;
    if(/[a-z]/.test(pass)) score++;
    if(/[0-9]/.test(pass)) score++;
    if(/[^A-Za-z0-9]/.test(pass)) score++;

    if(score <= 2){

        strengthFill.style.width = "25%";
        strengthFill.style.background = "#EF4444";
        strengthText.textContent =
            dictionary[currentLanguage].weak;

    }

    else if(score <= 4){

        strengthFill.style.width = "50%";
        strengthFill.style.background = "#F59E0B";
        strengthText.textContent =
            dictionary[currentLanguage].medium;

    }

    else if(score <= 6){

        strengthFill.style.width = "75%";
        strengthFill.style.background = "#22C55E";
        strengthText.textContent =
            dictionary[currentLanguage].strong;

    }

    else{

        strengthFill.style.width = "100%";
        strengthFill.style.background =
            "linear-gradient(90deg,#7C3AED,#9333EA)";

        strengthText.textContent =
            dictionary[currentLanguage].veryStrong;

    }

}

lengthValue.textContent = length.value;

generatePassword();

window.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        generatePassword();

    }

});
