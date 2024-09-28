const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');
const ageInput = document.getElementById('age');
const identifiantInput = document.getElementById('identifiant');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const cguInput = document.getElementById('cgu');
const passwordStrengthDisplay = document.getElementById('passwordStrength');

const ageError = document.getElementById('ageError');
const identifiantError = document.getElementById('identifiantError');
const passwordConfirmError = document.getElementById('passwordConfirmError');
const cguError = document.getElementById('cguError');

function validateForm() {
    let valid = true;

    // Reset error messages
    ageError.textContent = "";
    identifiantError.textContent = "";
    passwordConfirmError.textContent = "";
    cguError.textContent = "";
    
    const prenomInput = document.getElementById('prenom');
    const nomInput = document.getElementById('nom');
    
    // Check if all fields are filled
    if (
        prenomInput.value.trim() === "" || 
        nomInput.value.trim() === "" || 
        ageInput.value === "" || 
        identifiantInput.value === "" || 
        passwordInput.value === "" || 
        passwordConfirmInput.value === "" || 
        !cguInput.checked
    ) {
        valid = false;
    }

    if (ageInput.value !== "" && ageInput.value < 18) {
        ageError.textContent = "Vous devez avoir au moins 18 ans.";
        valid = false;
    }

    if (identifiantInput.value !== "" && !/^[a-zA-Z]{1,12}$/.test(identifiantInput.value)) {
        identifiantError.textContent = "L'identifiant doit contenir uniquement des lettres (12 caractères max).";
        valid = false;
    }

    if (prenomInput.value !== "" && prenomInput.value.trim() === "") {
        const prenomError = document.getElementById('prenomError') || document.createElement('span');
        prenomError.id = 'prenomError';
        prenomError.className = "error text-danger";
        prenomError.textContent = "Le prénom est requis.";
        prenomInput.parentNode.appendChild(prenomError);
        valid = false;
    }

    if (nomInput.value !== "" && nomInput.value.trim() === "") {
        const nomError = document.getElementById('nomError') || document.createElement('span');
        nomError.id = 'nomError';
        nomError.className = "error text-danger";
        nomError.textContent = "Le nom est requis.";
        nomInput.parentNode.appendChild(nomError);
        valid = false;
    }

    if (passwordInput.value !== "" && passwordInput.value !== passwordConfirmInput.value) {
        passwordConfirmError.textContent = "Les mots de passe ne correspondent pas.";
        valid = false;
    }

    if (!cguInput.checked) {
        cguError.textContent = "Vous devez accepter les CGU.";
        valid = false;
    }

    submitBtn.disabled = !valid;
}


function calculatePasswordStrength() {
    let strength = 0;
    const password = passwordInput.value;

    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20;

    passwordStrengthDisplay.textContent = `Force : ${strength}%`;

    validateForm();
}

form.addEventListener('input', validateForm);
passwordInput.addEventListener('input', calculatePasswordStrength);
passwordConfirmInput.addEventListener('input', validateForm);
cguInput.addEventListener('change', validateForm);