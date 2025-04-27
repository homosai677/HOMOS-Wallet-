
let currentUser = null;
let users = {};
let balances = {};

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        document.getElementById('login-error').innerText = "يرجى ملء جميع الحقول";
        return;
    }

    currentUser = email;
    if (!balances[email]) balances[email] = 0;
    document.getElementById('login-section').style.display = 'none';

    if (email === 'ahmedfouad01278837444@gmail.com') {
        document.getElementById('admin-section').style.display = 'block';
    } else {
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('user-email').innerText = email;
        document.getElementById('balance').innerText = balances[email];
    }
}

function logout() {
    location.reload();
}

function back() {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    if (currentUser === 'ahmedfouad01278837444@gmail.com') {
        document.getElementById('admin-section').style.display = 'block';
    } else {
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('user-email').innerText = currentUser;
        document.getElementById('balance').innerText = balances[currentUser];
    }
}

function showDeposit() {
    document.getElementById('user-section').style.display = 'none';
    document.getElementById('deposit-section').style.display = 'block';
}

function showWithdraw() {
    document.getElementById('user-section').style.display = 'none';
    document.getElementById('withdraw-section').style.display = 'block';
}

function showTransfer() {
    document.getElementById('user-section').style.display = 'none';
    document.getElementById('transfer-section').style.display = 'block';
}

function copyPhone() {
    navigator.clipboard.writeText('01012265953');
    alert("تم نسخ الرقم!");
}

function sendDeposit() {
    const amount = document.getElementById('deposit-amount').value;
    const from = document.getElementById('deposit-from').value;

    if (!amount || !from) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    const link = `https://wa.me/201016553764?text=عملية إيداع:%0aالمبلغ: ${amount} جنيه%0aرقم المحول منه: ${from}`;
    window.open(link, '_blank');
}

function sendWithdraw() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    const phone = document.getElementById('withdraw-phone').value;

    if (!amount || !phone) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    const fee = Math.max(amount * 0.015, 3);
    const total = amount + fee;

    if (balances[currentUser] < total) {
        alert("رصيد غير كافي");
        return;
    }

    balances[currentUser] -= total;

    const link = `https://wa.me/201016553764?text=عملية سحب:%0aالمبلغ: ${amount} جنيه%0aالرسوم: ${fee.toFixed(2)} جنيه%0aرقم التحويل: ${phone}`;
    window.open(link, '_blank');
    back();
}

function transferMoney() {
    const email = document.getElementById('transfer-email').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);

    if (!email || !amount) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    if (balances[currentUser] < amount) {
        alert("رصيد غير كافي");
        return;
    }

    balances[currentUser] -= amount;
    if (!balances[email]) balances[email] = 0;
    balances[email] += amount;

    back();
}

function addBalance() {
    const email = document.getElementById('admin-email').value;
    const amount = parseFloat(document.getElementById('admin-amount').value);

    if (!email || !amount) {
        alert("يرجى ملء جميع الحقول");
        return;
    }

    if (!balances[email]) balances[email] = 0;
    balances[email] += amount;

    alert("تمت الإضافة بنجاح");
}
