"use strict";
let data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
function writeEntry() {
    const entryJSON = JSON.stringify(data);
    localStorage.setItem('entry-storage', entryJSON);
}
function readEntry() {
    const entryStorage = localStorage.getItem('entry-storage');
    if (entryStorage !== '') {
        return JSON.parse(entryStorage);
    }
    else {
        return data;
    }
}
data = readEntry();
