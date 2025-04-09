interface Data {
  view: string;
  entries: any[];
  editing: null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeEntry(): void {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('entry-storage', entryJSON);
}

function readEntry(): any {
  const entryStorage = localStorage.getItem('entry-storage') as string;
  if (entryStorage !== '') {
    return JSON.parse(entryStorage);
  } else {
    return data;
  }
}

data = readEntry();
