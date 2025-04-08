interface Data {
  view: string;
  entries: any[];
  editing: null;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function writeEntry(): void {
  const entryJSON = JSON.stringify(data);
  localStorage.setItem('entry', entryJSON);
  console.log('entryJSON:', entryJSON);
}

function readEntry(): any {
  const entryStorage = localStorage.getItem('entry');
  if (!entryStorage) {
    return data;
  } else {
    return JSON.parse(entryStorage);
  }
}

console.log(writeEntry());
console.log(readEntry());
