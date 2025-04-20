interface JournalEntry {
  entryTitle: string;
  entryPhotoURL: string;
  entryNotes: string;
  entryID: number;
}

interface Data {
  view: 'entries' | 'entry-form';
  entries: JournalEntry[];
  editing: null | JournalEntry;
  nextEntryId: number;
  themeName: string | null;
}

const data = readEntry();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeEntry(): void {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('entry-storage', entryJSON);
}

function readEntry(): Data {
  let data: Data;
  const entryStorage = localStorage.getItem('entry-storage') as string;
  if (entryStorage) {
    data = JSON.parse(entryStorage) as Data;
  } else {
    data = {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
      themeName: 'basic',
    };
  }
  return data;
}
