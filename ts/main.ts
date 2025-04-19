// test url 1: https://64.media.tumblr.com/1b54e834bda85fc26bc6a018e5f9b444/a3ba198d6b60f48d-cd/s1280x1920/4b031174a9cb50953918afe5ca37e1143ff5ee80.jpg
// a drawing based on lyrics from the glass animals song, 'pools' from their 2014 album zaba. zaba was the band's debut album and established their signature style of offbeat percussion and psychedelic sounds incorporated into pop music.
// test url 2: https://64.media.tumblr.com/a676bf6547d045021cd4f0d59a5a6bcf/69b2f4deb5e1518b-c5/s1280x1920/2ed51076367f818726f73ff58c62fe5943a89aaf.jpg
// a drawing based on lyrics from the song 'i just want to sell out my funeral' by the wonder years from their 2013 album, 'the greatest generation.' the album received critical acclaim when released and was widely regarded to have pushed the boundaries of the pop-punk genre.
// test url 3: https://64.media.tumblr.com/81d06a9d4b7488ba4680367802e24e4d/dd16d4a1f06633be-10/s1280x1920/cda28cd49a068f497661b96065a359d48e93d308.jpg
// fanart of the anime character kyotaro sugishita, from the manga/anime 'wind breaker.' the manga was first released in 2021, and the first season of the anime released in 2024. wind breaker is considered a shonen fight anime.
// test url 4: https://64.media.tumblr.com/704b217831d890fee3e84c5f28646889/dfeae80de15b3de7-08/s1280x1920/78f8d964fcff80916d40ea5e6121afbc5562f283.jpg
// concept art of two original characters from a comic idea in development. the character on the left is 'godchild', a rapper who is a vampire. the character on the right is 'dogboy', a rapper who is a werewolf. the premise of the comic revolves around the two of them navigating the music industry .

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

const $entryForm = document.querySelector('form') as HTMLFormElement;
if (!$entryForm) throw new Error('$entryForm does not exist!');

const $entryFormInputs = $entryForm.elements as FormElements;

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  // store the form's input values in a new object + assigns entryID property
  const newEntry: JournalEntry = {
    entryTitle: $entryFormInputs.title.value,
    entryPhotoURL: $entryFormInputs.photoURL.value,
    entryNotes: $entryFormInputs.notes.value,
    entryID: data.nextEntryId,
  };

  // if data.editing is null ...
  if (data.editing === null) {
    viewSwap('entry-form');

    // increment the nextEntryId property of the data model
    data.nextEntryId++;

    // add the new object to the beginning of the data model's array of entries
    data.entries.unshift(newEntry);

    // reset the preview image's src attribute back to the placeholder image
    $image.src = './images/placeholder-image-square.jpg';

    // reset the form
    $entryForm.reset();

    // render a DOM tree for the newly submitted entry object
    const $ul = document.querySelector('ul');
    if (!$ul) throw new Error('$ul does not exist!');
    $ul.prepend(renderEntry(newEntry));
  }
  // if data.entries is not null ...
  else {
    // assign entry id value from data.editing to the new object w/updated form values
    newEntry.entryID = data.editing.entryID;
    // replace original object in the data.entries array for the new object w/edited data
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === newEntry.entryID) {
        data.entries[i] = newEntry;

        // change image
        const $entryImgNodeList = document.querySelectorAll('#entry-img');
        $entryImgNodeList[i].setAttribute('src', data.entries[i].entryPhotoURL);

        // change title
        const $entryTitleNodeList = document.querySelectorAll('#entry-title');
        $entryTitleNodeList[i].textContent = data.entries[i].entryTitle;

        // change notes
        const $entryNotesNodeList = document.querySelectorAll('#entry-notes');
        $entryNotesNodeList[i].textContent = data.entries[i].entryNotes;
      }
    }
  }
  data.editing = null;
  viewSwap('entries');
});

// VIEWING ENTRIES

// generating and returning a DOM tree for a single entry in the UL
function renderEntry(entry: JournalEntry): HTMLLIElement {
  // creating new entry
  const $newEntry = document.createElement('li');
  $newEntry.setAttribute('class', 'journal-entry');
  $newEntry.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryRow = document.createElement('div');
  $newEntryRow.setAttribute('class', 'row entry');
  $newEntryRow.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryColumnPhoto = document.createElement('div');
  $newEntryColumnPhoto.setAttribute('class', 'column-half entry-img');
  $newEntryColumnPhoto.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryPhoto = document.createElement('img');
  $newEntryPhoto.setAttribute('src', entry.entryPhotoURL);
  $newEntryPhoto.setAttribute('id', 'entry-img');
  $newEntryPhoto.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryColumnText = document.createElement('div');
  $newEntryColumnText.setAttribute('class', 'column-half');
  $newEntryColumnText.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryRowTitleIcon = document.createElement('div');
  $newEntryRowTitleIcon.setAttribute('class', 'row entry');
  $newEntryRowTitleIcon.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryColumnTitle = document.createElement('div');
  $newEntryColumnTitle.setAttribute('class', 'column-half');
  $newEntryColumnTitle.setAttribute('id', 'entry-title-div');
  $newEntryColumnTitle.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryColumnIcon = document.createElement('div');
  $newEntryColumnIcon.setAttribute('class', 'column-half');
  $newEntryColumnIcon.setAttribute('id', 'edit-icon-div');
  $newEntryColumnIcon.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryTitle = document.createElement('h2');
  $newEntryTitle.textContent = entry.entryTitle;
  $newEntryTitle.setAttribute('class', 'column-half font standard');
  $newEntryTitle.setAttribute('id', 'entry-title');
  $newEntryTitle.setAttribute('data-entry-id', String(entry.entryID));

  const $editEntryImg = document.createElement('i');
  $editEntryImg.setAttribute('class', 'fa-solid fa-pen-to-square edit-img');
  $editEntryImg.setAttribute('data-entry-id', String(entry.entryID));

  const $newEntryNotes = document.createElement('p');
  $newEntryNotes.setAttribute('class', 'font standard');
  $newEntryNotes.setAttribute('id', 'entry-notes');
  $newEntryNotes.setAttribute('data-entry-id', String(entry.entryID));
  $newEntryNotes.textContent = entry.entryNotes;

  // appending new entries to DOM
  // entry row
  $newEntry?.appendChild($newEntryRow);

  // column for first half of entry
  $newEntryRow?.appendChild($newEntryColumnPhoto);
  $newEntryColumnPhoto?.appendChild($newEntryPhoto);

  // column for second half of entry
  $newEntryRow?.appendChild($newEntryColumnText);

  // column to hold title + icon
  $newEntryColumnText?.appendChild($newEntryRowTitleIcon);
  $newEntryRowTitleIcon?.appendChild($newEntryColumnTitle);
  $newEntryColumnTitle?.appendChild($newEntryTitle);
  $newEntryRowTitleIcon?.appendChild($newEntryColumnIcon);
  $newEntryColumnIcon?.appendChild($editEntryImg);

  // row to hold notes
  $newEntryColumnText?.appendChild($newEntryNotes);

  return $newEntry;
}

document.addEventListener('DOMContentLoaded', (): void => {
  const $ul = document.querySelector('ul');
  for (let i = 0; i < data.entries.length; i++) {
    $ul?.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
});

// create a function to toggle no entries text to show or hide when the function is called
function toggleNoEntries(): void {
  const $noEntryDiv = document.querySelector('.no-entries');
  if (!$noEntryDiv) throw new Error('$noEntryDiv does not exist!');

  if (data.view === 'entry-form') {
    $noEntryDiv.className = 'column-full no-entries hidden';
  } else if (data.view === 'entries' && data.entries.length === 0) {
    $noEntryDiv.className = 'column-full no-entries';
  } else if (data.view === 'entries' && data.entries.length > 0) {
    $noEntryDiv.className = 'column-full no-entries hidden';
  } else {
    readEntry();
  }
}

// create function to swap views between entries or entry-form
function viewSwap(viewName: any): void {
  const $entryForm = document.querySelector('.view.entryform');
  if (!$entryForm) throw new Error('$entryForm does not exist!');

  const $entryList = document.querySelector('.view.entrylist');
  if (!$entryList) throw new Error('$entryList does not exist!');

  if (viewName === 'entries') {
    $entryForm.className = 'view entryform hidden';
    $entryList.className = 'view entrylist';
    data.view = 'entries';
  } else if (viewName === 'entry-form') {
    $entryForm.className = 'view entryform';
    $entryList.className = 'view entrylist hidden';
    data.view = 'entry-form';
  }
  writeEntry();
  toggleNoEntries();
}

// add anchor to navbar to show 'entries' view
const $entriesAnchorEntries = document.querySelector('.entries-anchor');
$entriesAnchorEntries?.addEventListener('click', (): void => {
  viewSwap('entries');
});

// add an anchor to the entries view to show the entry-form via "new" button
const $newEntryButton = document.querySelector('#new-button');
$newEntryButton?.addEventListener('click', (): void => {
  viewSwap('entry-form');

  // title of form is "new entry"
  const $entryFormTitle = document.querySelector('.entry-form-title');
  if (!$entryFormTitle) throw new Error('$entryFormTitle does not exist!');
  $entryFormTitle.textContent = 'New Entry';

  // reset the form back to blank
  const $entryFormInputTitle = document.querySelector(
    '#title',
  ) as HTMLFormElement;
  if (!$entryFormInputTitle)
    throw new Error('$entryFormInputTitle does not exist!');

  const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
  if (!$photoURL) throw new Error('$photoURL does not exist!');

  const $image = document.querySelector('img') as HTMLImageElement;
  if (!$image) throw new Error('$image does not exist!');

  const $entryFormInputNotes = document.querySelector(
    '#notes',
  ) as HTMLFormElement;
  if (!$entryFormInputNotes)
    throw new Error('$entryFormInputNotes does not exist!');

  $entryFormInputTitle.value = '';
  $photoURL.value = '';
  $image.src = './images/placeholder-image-square.jpg';
  $entryFormInputNotes.value = '';
});

// EDITING THE FORM

const $ul = document.querySelector('ul');
if (!$ul) throw new Error('$ul does not exist!');

const $entryFormTitle = document.querySelector('.entry-form-title');
if (!$entryFormTitle) throw new Error('$entryFormTitle does not exist!');

$ul?.addEventListener('click', (event: Event): void => {
  // swaps views to the entry form
  viewSwap('entry-form');
  data.editing = null;

  // find entry object in the data.entries array whose id matches the data-entry-id attribute value of the clicked entry
  const editTarget = event.target as HTMLLIElement;
  const dataEntryID = Number(editTarget?.dataset.entryId);

  for (let i = 0; i < data.entries.length; i++) {
    if (dataEntryID === data.entries[i].entryID) {
      // assigns that entry’s object to the data.editing property
      data.editing = data.entries[i];

      // query for all elements to be autofilled
      const $entryFormInputTitle = document.querySelector(
        '#title',
      ) as HTMLFormElement;
      if (!$entryFormInputTitle)
        throw new Error('$entryFormInputTitle does not exist!');

      const $photoURL = document.querySelector('#photo-url') as HTMLFormElement;
      if (!$photoURL) throw new Error('$photoURL does not exist!');

      const $image = document.querySelector('img') as HTMLImageElement;
      if (!$image) throw new Error('$image does not exist!');

      const $entryFormInputNotes = document.querySelector(
        '#notes',
      ) as HTMLFormElement;
      if (!$entryFormInputNotes)
        throw new Error('$entryFormInputNotes does not exist!');

      // pre-populate the entry form with the clicked entry's values
      $entryFormInputTitle.value = data.editing.entryTitle;
      $photoURL.value = data.editing.entryPhotoURL;
      $image.src = data.editing.entryPhotoURL;
      $entryFormInputNotes.value = data.editing.entryNotes;
    }
  }
  // changes the title of the entry form to 'Edit Entry'
  $entryFormTitle.textContent = 'Edit Entry';

  // delete button shows up
  const $deleteButton = document.querySelector('#delete-button');
  if (!$deleteButton) throw new Error('$deleteButon does not exist!');
  $deleteButton.className = '';
});

// DELETING ENTRIES FROM THE FORM
const $deleteButton = document.querySelector('#delete-button');
if (!$deleteButton) throw new Error('$deleteButon does not exist!');

const $noDelete = document.querySelector('#no-delete');
if (!$noDelete) throw new Error('$noDelete does not exist!');

const $yesDelete = document.querySelector('#yes-delete');
if (!$yesDelete) throw new Error('$yesDelete does not exist!');

const $deleteEntry = document.querySelector(
  '#delete-entry',
) as HTMLDialogElement;

// bringing up the modal
$deleteButton.addEventListener('click', (event: Event) => {
  event.preventDefault();
  if (!$deleteEntry) throw new Error('$deleteEntry does not exist!');
  $deleteEntry.showModal();
});

// dismiss the modal if users choose not to delete
$noDelete.addEventListener('click', () => {
  $deleteEntry.close();
  data.editing = null;
});

// deleting the entry if users choose to delete
$yesDelete.addEventListener('click', () => {
  if (data.editing === null) {
    $deleteEntry.close();
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      // if the entryIDs match up ...
      if (data.editing.entryID === data.entries[i].entryID) {
        const entryToDelete = data.entries[i];
        // find all li elements
        const $entryList = document.querySelectorAll('li');

        // find the object with the matching entryIDs
        for (let i = 0; i < $entryList.length; i++) {
          if (Number($entryList[i].dataset.entryId) === data.editing.entryID) {
            // remove the entry object from the data.entries array
            data.entries.splice(data.entries.indexOf(entryToDelete), 1);

            // removes the li with the matching data-view-id
            $entryList[i].remove();
          }
        }
        $deleteEntry.close();
      }
    }
  }
  data.editing = null;
  viewSwap('entries');
});

// CHANGING THEMES
