let userEmail = prompt('Enter your email:');
const five = 5;
const six = 6;
let userPassword;
let userVerfited = false;
let rightPassword = false;

if (!userEmail) {
  alert('Canceled');
} else if (userEmail.trim().length < five) {
  alert("I don't know any emails having name length less than 5 symbols");
} else if (userEmail.trim() === 'user@gmail.com') {
  userPassword = prompt('Enter your password:');
  if (!userPassword) {
    alert('Canceled');
  } else if (userPassword.trim() === 'UserPass') {
    alert('Correct password');
    userVerfited = true;
  } else {
    alert('Wrong password');
  }
} else if (userEmail.trim() === 'admin@gmail.com') {
  userPassword = prompt('Enter your password:');
  if (!userPassword) {
    alert('Canceled');
  } else if (userPassword.trim() === 'AdminPass') {
    alert('Correct password');
    userVerfited = true;
  } else {
    alert('Wrong password');
  }
} else {
  alert('I don’t know you');
}

if (userVerfited) {
  let changePassword = confirm('Do you want to change your password?');
  if (!changePassword) {
    alert('You have failed the change');
  } else {
    let oldPassword = prompt('Write your current password');
    if (!oldPassword) {
      alert('Canceled');
    } else if (oldPassword.trim() === userPassword.trim()) {
      rightPassword = true;
    } else {
      alert('Wrong password');
    }
  }
}

if (rightPassword) {
  let newPassword = prompt('Enter new password');
  if (!newPassword) {
    alert('Canceled');
  } else if (newPassword.length < six) {
    alert('It’s too short password. Sorry');
  } else if (newPassword === prompt('Enter new password again')) {
    alert('You have successfully changed your password.');
  } else {
    alert('You wrote the wrong password.');
  }
}