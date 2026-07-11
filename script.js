const password = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

generatePassword();

function generatePassword() {

    let chars = "";

    if (uppercase.checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lowercase.checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if (numbers.checked)
        chars += "0123456789";

    if (symbols.checked)
        chars += "!@#$%^&*()_-+=<>?/{}[]";

    if (chars.length === 0) {
        alert("Select at least one option.");
        return;
    }

    let result = "";

    for (let i = 0; i < Number(lengthSlider.value); i++) {

        const random =
            Math.floor(Math.random() * chars.length);

        result += chars[random];

    }

    password.value = result;

    updateStrength(result);

}

function copyPassword() {

    if (!password.value) return;

    navigator.clipboard.writeText(password.value);

    copyBtn.textContent = "✅";

    setTimeout(() => {

        copyBtn.textContent = "📋";

    }, 1500);

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
        strengthText.textContent = "Weak";

    }

    else if (score <= 4) {

        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = "Medium";

    }

    else if (score <= 6) {

        strengthFill.style.width = "75%";
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strong";

    }

    else {

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#7c3aed";
        strengthText.textContent = "Very Strong";

    }

}
