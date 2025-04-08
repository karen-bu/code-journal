// Photo Preview from Pasting URL //

const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('$photoURL does not exist!');

const $image = document.querySelector('img') as HTMLImageElement;
if (!$image) throw new Error('$image does not exist!');

$photoURL.addEventListener('input', (event: Event) => {
  const inputURL = event.target as HTMLInputElement;
  $image.src = inputURL.value;
});

// Ref URL: https://64.media.tumblr.com/1b54e834bda85fc26bc6a018e5f9b444/a3ba198d6b60f48d-cd/s1280x1920/4b031174a9cb50953918afe5ca37e1143ff5ee80.jpg

// Submitting the Form

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface EntryObject {
  entryTitle: string;
  entryPhotoURL: string;
  entryNotes: string;
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
  console.log(entryObject);

  // assigns an entryID property to the new object, taken from the nextEntryID property of the data model
});

console.log($entryForm);
console.log($entryFormInputs);
