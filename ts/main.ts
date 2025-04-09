// ---------------- ISSUE 1 ---------------- //

// PHOTO PREVIEW FROM PASTING URL //

const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('$photoURL does not exist!');

const $image = document.querySelector('img') as HTMLImageElement;
if (!$image) throw new Error('$image does not exist!');

$photoURL.addEventListener('input', (event: Event) => {
  const inputURL = event.target as HTMLInputElement;
  $image.src = inputURL.value;
});

// SUBMITTING THE FORM

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface EntryObject {
  entryTitle: string;
  entryPhotoURL: string;
  entryNotes: string;
  entryID?: number;
}

const $entryForm = document.querySelector('form') as HTMLFormElement;
if (!$entryForm) throw new Error('$entryForm does not exist!');

const $entryFormInputs = $entryForm.elements as FormElements;

$entryForm.addEventListener('submit', (event: Event) => {
  // prevents the page from refreshing
  event.preventDefault();

  // stores the form's input values in a new object
  const entryTitle = $entryFormInputs.title.value;
  const entryPhotoURL = $entryFormInputs.photoURL.value;
  const entryNotes = $entryFormInputs.notes.value;
  const entryObject: EntryObject = { entryTitle, entryPhotoURL, entryNotes };

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

// generating and returning a DOM tree for a single entry in the UL
function renderEntry(entry: any): void {
  return data.entries[entry];
}

// event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', (event: Event) => {
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
