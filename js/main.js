"use strict";
// ---------------- ISSUE 1 ---------------- //
// PHOTO PREVIEW FROM PASTING URL //
const $photoURL = document.querySelector('#photo-url');
if (!$photoURL)
    throw new Error('$photoURL does not exist!');
const $image = document.querySelector('img');
if (!$image)
    throw new Error('$image does not exist!');
$photoURL.addEventListener('input', (event) => {
    const inputURL = event.target;
    $image.src = inputURL.value;
});
const $entryForm = document.querySelector('form');
if (!$entryForm)
    throw new Error('$entryForm does not exist!');
const $entryFormInputs = $entryForm.elements;
// test url: https://64.media.tumblr.com/1b54e834bda85fc26bc6a018e5f9b444/a3ba198d6b60f48d-cd/s1280x1920/4b031174a9cb50953918afe5ca37e1143ff5ee80.jpg
$entryForm.addEventListener('submit', (event) => {
    // prevents the page from refreshing
    event.preventDefault();
    // stores the form's input values in a new object + assigns entryID property
    const newEntry = {
        entryTitle: $entryFormInputs.title.value,
        entryPhotoURL: $entryFormInputs.photoURL.value,
        entryNotes: $entryFormInputs.notes.value,
        entryID: data.nextEntryId,
    };
    console.log(newEntry);
    // increments the nextEntryId property of the data model
    data.nextEntryId++;
    // adds the new object to the beginning of the data model's array of entries
    data.entries.unshift(newEntry);
    // resets the preview image's src attribute back to the placeholder image
    $image.src = './images/placeholder-image-square.jpg';
    // resets the form
    $entryForm.reset();
    // writes the modified data model to localStorage
    writeEntry();
});
// ---------------- ISSUE 2 ---------------- //
// VIEWING ENTRIES
// generating and returning a DOM tree for a single entry in the UL
function renderEntry(entry) {
    return data.entries[entry];
}
// event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < data.entries.length; i++) {
        // creating new entry
        const $ul = document.querySelector('ul');
        const $newEntry = document.createElement('li');
        $newEntry.setAttribute('class', 'journal-entry');
        const $newEntryRow = document.createElement('div');
        $newEntryRow.setAttribute('class', 'row');
        const $newEntryColumn1 = document.createElement('div');
        $newEntryColumn1.setAttribute('class', 'column-half entry-img');
        const $newEntryPhoto = document.createElement('img');
        $newEntryPhoto.setAttribute('src', renderEntry(i).entryPhotoURL);
        const $newEntryColumn2 = document.createElement('div');
        $newEntryColumn2.setAttribute('class', 'column-half entry-text');
        const $newEntryH1 = document.createElement('h1');
        $newEntryH1.textContent = renderEntry(i).entryTitle;
        const $newEntryNotes = document.createElement('p');
        $newEntryNotes.textContent = renderEntry(i).entryNotes;
        // appending new entries to DOM
        $ul?.appendChild($newEntry);
        $newEntry?.appendChild($newEntryRow);
        $newEntryRow?.appendChild($newEntryColumn1);
        $newEntryColumn1?.appendChild($newEntryPhoto);
        $newEntryRow?.appendChild($newEntryColumn2);
        $newEntryColumn2?.appendChild($newEntryH1);
        $newEntryColumn2?.appendChild($newEntryNotes);
    }
});
// create a function to toggle no entries text to show or hide when the function is called
function toggleNoEntries() {
    if (data.nextEntryId === 1) {
        const $noEntryDiv = document.querySelector('.no-entries');
        if (!$noEntryDiv)
            throw new Error('$noEntryDiv does not exist!');
        $noEntryDiv.className = 'column-full no-entries';
    }
    else
        readEntry();
}
toggleNoEntries();
// create function to swap views between entries or entry-form
function viewSwap(viewName) {
    const $entryForm = document.querySelector('.view.entryform');
    if (!$entryForm)
        throw new Error('$entryForm does not exist!');
    const $entryList = document.querySelector('.view.entrylist');
    if (!$entryList)
        throw new Error('$entryList does not exist!');
    if (viewName === 'entries') {
        $entryForm.className = 'view entryform hidden';
        $entryList.className = 'view entrylist';
        data.view = 'entries';
        console.log(data);
    }
    else if (viewName === 'entry-form') {
        $entryForm.className = 'view entryform';
        $entryList.className = 'view entrylist hidden';
        data.view = 'entry-form';
        console.log(data);
    }
}
// add anchor to navbar to show 'entries' view
// for the entry list view
const $entriesAnchorEntries = document.querySelector('#entries-anchor-entries');
$entriesAnchorEntries?.addEventListener('click', (event) => {
    console.log(event.target);
    viewSwap('entries');
});
// for the entry form view
const $entriesAnchorForm = document.querySelector('#entries-anchor-entryform');
$entriesAnchorForm?.addEventListener('click', (event) => {
    console.log(event.target);
    viewSwap('entries');
});
