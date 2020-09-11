let rootNode = document.getElementById('root');
let sets = JSON.parse(localStorage.getItem('listSet')) || [];

function createMainPage(sets) {
  console.log(sets);
  console.log(sets.length);
  let html = '<h1>Main page.</h1> <input type="button" class="add-btn" value="Add new">';
  if (sets.length) {
    const BTN = '<input type="button" value="Delete"> <input type="button" value="Edit">';
    for (let i = 0; i < sets.length; i++) {
      if (!sets[i].isRead) {
        html += `<div class="un-read" data-pos="${i}"><p>${sets[i].name}</p>${BTN}</div>`;
      }
    }
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].isRead) {
        html += `<div class="read" data-pos="${i}"><p>${sets[i].name}</p>${BTN}</div>`;
      }
    }
  }
  rootNode.innerHTML = html;
}

function createAddPage() {
  const ZERO = 0;
  const HASH = location.hash;
  const NUM_SET = HASH.match(/(\d+)/);
  const VALUE = NUM_SET !== null ? sets[+NUM_SET[ZERO]].name : '';
  const ADD_TERM_BTN = '<input type="button" value="Add term">';
  const SAVE_BTN = '<input type="button" value="Save changes">';
  const CANCEL_BTN = '<input type="button" value="Cancel">';
  let html = `<h1>Add new set.</h1><input id="name" value="${VALUE}">` + ADD_TERM_BTN + SAVE_BTN + CANCEL_BTN;
  rootNode.innerHTML = html;
  if (VALUE) {
    addTerm(+NUM_SET[ZERO]);
  }
}

function addTerm(numSet) {
  if (numSet !== undefined) {
    let terms = sets[numSet].children;
    console.log(terms);
    for (let item of terms) {
      let div = document.createElement('div');
      let html = `<input class="term" value="${item.term}">` +
                 `<input class="def" value="${item.definition}">` +
                 `<input type="button" value="Remove">`;
      div.innerHTML = html;
      rootNode.append(div);
    }
  } else {
    let div = document.createElement('div');
    let html = '<input class="term"><input class="def"><input type="button" value="Remove">';
    div.innerHTML = html;
    rootNode.append(div);
  }
}

function saveSet() {
  const ZERO = 0;
  const HASH = location.hash;
  const NUM_SET = HASH.match(/(\d+)/);
  let name = document.getElementById('name').value;
  if (!name) {
    alert('Please, enter name!');
    return;
  }
  let termsContainers = rootNode.getElementsByTagName('div');
  let terms = [];
  for (let item of termsContainers) {
    let nameTerm = item.querySelector('.term').value;
    let description = item.querySelector('.def').value;
    if (!nameTerm || !description) {
      alert('All term and definition must be fill!');
      return;
    }
    terms.push({term: nameTerm, definition: description});
  }
  if (NUM_SET !== null) {
    sets[NUM_SET[ZERO]] = {name: name, isRead: sets[NUM_SET[ZERO]].isRead, children: terms};
  } else {
    sets.push({name: name, isRead: false, children: terms});
  }
  localStorage.setItem('listSet', JSON.stringify(sets));
  location.hash = '';
}

createMainPage(sets);

document.addEventListener('click', function(event) {
  if (event.target.value === 'Add new') {
    location.hash = '#/add';
  }
  if (event.target.value === 'Add term') {
    addTerm();
  }
  if (event.target.value === 'Cancel') {
    location.hash = '';
  }
  if (event.target.value === 'Save changes') {
    saveSet();
  }
  if (event.target.value === 'Edit') {
    let parent = event.target.parentNode;
    location.hash = `#/modify/${parent.dataset.pos}`;
  }
  if (event.target.value === 'Remove') {
    let parent = event.target.parentNode;
    parent.remove();
  }
  if (event.target.value === 'Delete') {
    let parent = event.target.parentNode;
    sets.splice(+parent.dataset.pos, 1);
    localStorage.setItem('listSet', JSON.stringify(sets));
    createMainPage(sets);
  }
  if (event.target.className === 'un-read') {
    let pos = event.target.dataset.pos;
    sets[pos].isRead = true;
    localStorage.setItem('listSet', JSON.stringify(sets));
    event.target.className = 'read';
    createMainPage(sets);
  }
});

window.addEventListener('hashchange', function(event) {
  if (location.hash === '#/add') {
    createAddPage();
  }
  if (location.hash === '') {
    createMainPage(sets);
  }
  if (location.hash.includes('modify')) {
    createAddPage();
  }
});