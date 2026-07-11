const password = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
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

const dictionary = {
    en: {
        title: "Nobu Password Generator",
        subtitle: "Create secure passwords in seconds",
        length: "Password Length",
        upper: "Uppercase Letters",
        lower: "Lowercase Letters",
        numbers: "Numbers",
        symbols: "Symbols",
        generate: "Generate Password",
        privacy: "🔒 Privacy",
        privacyText: "All passwords are generated locally in your browser. Nobu does not collect, store, transmit or have access to your passwords.",
        weak: "Weak",
        medium: "Medium",
        strong: "Strong",
        veryStrong: "Very Strong"
    },
    ru: {
        title: "Генератор паролей Nobu",
        subtitle: "Создавайте надёжные пароли за секунды",
        length: "Длина пароля",
        upper: "Заглавные буквы",
        lower: "Строчные буквы",
        numbers: "Цифры",
        symbols: "Спецсимволы",
        generate: "Сгенерировать пароль",
        privacy: "🔒 Конфиденциальность",
        privacyText: "Все пароли создаются локально в вашем браузере. Nobu не получает, не сохраняет, не передаёт и не имеет доступа к вашим паролям.",
        weak: "Слабый",
        medium: "Средний",
        strong: "Надёжный",
        veryStrong: "Очень надёжный"
    }
};

let currentLang = "en";

function translate(lang) {

    currentLang = lang;

    document.getElementById("title").textContent = dictionary[lang].title;
    document.getElementById("subtitle").textContent = dictionary[lang].subtitle;
    document.getElementById("lengthText").textContent = dictionary[lang].length;
    document.getElementById("uppercaseText").textContent = dictionary[lang].upper;
    document.getElementById("lowercaseText").textContent = dictionary[lang].lower;
    document.getElementById("numbersText").textContent = dictionary[lang].numbers;
    document.getElementById("symbolsText").textContent = dictionary[lang].symbols;
    document.getElementById("privacyTitle").textContent = dictionary[lang].privacy;
    document.getElementById("privacyText").textContent = dictionary[lang].privacyText;
    generateBtn.textContent = dictionary[lang].generate;

    langEn.classList.toggle("active", lang === "en");
    langRu.classList.toggle("active", lang === "ru");

    updateStrength(password.value);
}

langEn.onclick = () => translate("en");
langRu.onclick = () => translate("ru");

length.oninput = () => {
    lengthValue.textContent = length.value;
    generatePassword();
};

[uppercase, lowercase, numbers, symbols].forEach(item => {
    item.onchange = generatePassword;
});

generateBtn.onclick = generatePassword;

copyBtn.onclick = async () => {

    if (!password.value) return;

    await navigator.clipboard.writeText(password.value);

    copyBtn.textContent = "✅";

    setTimeout(() => {
        copyBtn.textContent = "📋";
    }, 1500);

};

function randomChar(chars) {

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return chars[array[0] % chars.length];

}

function generatePassword() {

    let chars = "";

    if (uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers.checked) chars += "0123456789";
    if (symbols.checked) chars += "!@#$%^&*()_-+=<>?/{}[]";

    if (chars.length === 0) {
        password.value = "";
        return;
    }

    let result = "";

    for (let i = 0; i < Number(length.value); i++) {
        result += randomChar(chars);
    }

    password.value = result;

    updateStrength(result);

}

function updateStrength(pass) {

    let score = 0;

    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (pass.length >= 16) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) {

        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = dictionary[currentLang].weak;

    } else if (score <= 4) {

        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = dictionary[currentLang].medium;

    } else if (score <= 6) {

        strengthFill.style.width = "75%";
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = dictionary[currentLang].strong;

    } else {

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#7C3AED";
        strengthText.textContent = dictionary[currentLang].veryStrong;

    }

}

generatePassword();
translate("en");
