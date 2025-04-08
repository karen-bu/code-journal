'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeEntry() {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('entry', entryJSON);
  console.log('entryJSON:', entryJSON);
}
function readEntry() {
  const entryStorage = localStorage.getItem('entry');
  if (!entryStorage) {
    return data;
  } else {
    return JSON.parse(entryStorage);
  }
}
