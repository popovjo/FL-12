const structure = [
  {
    'folder': true,
    'title': 'Films',
    'children': [
      {
        'title': 'Iron Man.avi'
      },
      {
        'folder': true,
        'title': 'Fantasy',
        'children': [
          {
            'title': 'The Lord of the Rings.avi'
          },
          {
            'folder': true,
            'title': 'New folder 1',
            'children': false
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Documents',
    'children': [
      {
        'folder': true,
        'title': 'EPAM Homework answers',
        'children': null
      }
    ]
  }
];

const rootNode = document.getElementById('root');

function createFileTree(structure, node) {
  const newList = document.createElement('ul');
  for (let el of structure) {
      const newItem = document.createElement('li');
      const itemName = document.createElement('p');
      const itemImg = document.createElement('i');
      itemImg.classList.add('material-icons');
      itemName.innerHTML = el.title;
      itemName.prepend(itemImg);
      newItem.append(itemName);
      newList.append(newItem);
      if (el.folder) {
          itemName.classList.add('folder');
          if (newList.parentNode !== node) {
              newList.classList.toggle('closed');
          }
          itemImg.innerHTML = 'folder';
          itemName.onclick = function() {
              if (itemImg.innerHTML === 'folder') {
                  itemImg.innerHTML = 'folder_open';
              } else {
                  itemImg.innerHTML = 'folder';
              }
              newItem.querySelector('.closed').classList.toggle('open');
          }
          if (el.children) {
              createFileTree(el.children, newItem);
          } else {
              const emptyFolder = document.createElement('p');
              emptyFolder.classList.add('empty', 'closed');
              emptyFolder.innerHTML = 'Folder is empty';
              newItem.append(emptyFolder);
          }
      } else {
          itemName.classList.add('file');
          itemImg.innerHTML = 'insert_drive_file';
      }
  }
  node.append(newList);   
}
createFileTree(structure, rootNode);