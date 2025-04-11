"use strict";
const data = readEntry();
function writeEntry() {
    const entryJSON = JSON.stringify(data);
    localStorage.setItem('entry-storage', entryJSON);
}
function readEntry() {
    let data;
    const entryStorage = localStorage.getItem('entry-storage');
    if (entryStorage) {
        data = JSON.parse(entryStorage);
    }
    else {
        data = {
            view: 'entry-form',
            entries: [],
            editing: null,
            nextEntryId: 1,
        };
    }
    return data;
}
