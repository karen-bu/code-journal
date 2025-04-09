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
  // prevent the page from refreshing
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
