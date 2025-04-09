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
$entryForm.addEventListener('submit', (event) => {
    // prevents the page from refreshing
    event.preventDefault();
    // stores the form's input values in a new object
    const entryTitle = $entryFormInputs.title.value;
    const entryPhotoURL = $entryFormInputs.photoURL.value;
    const entryNotes = $entryFormInputs.notes.value;
    const entryObject = { entryTitle, entryPhotoURL, entryNotes };
    // assigns an entryID property to the new object, taken from the nextEntryID property of the data model
    entryObject.entryID = data.nextEntryId;
    // increments the nextEntryId property of the data model
    data.nextEntryId++;
    // adds the new object to the beginning of the data model's array of entries
    data.entries.unshift(entryObject);
    // resets the preview image's src attribute back to the placeholder image
    $image.src = './images/placeholder-image-square.jpg';
    // resets the form
    $entryForm.reset();
    // writes the modified data model to localStorage
    writeEntry();
});
// ---------------- ISSUE 2 ---------------- //
// VIEWING ENTRIES
function renderEntry(entry) {
    const $journalEntry = data.entries[entry];
    console.log($journalEntry);
}
