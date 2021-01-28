# use-airtable

> Airtable CRUD to be used in react components

[![NPM](https://img.shields.io/npm/v/use-airtable.svg)](https://www.npmjs.com/package/use-airtable) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-airtable
```

## Usage

```jsx
import { useAirtable } from 'use-airtable'

const TodoList = () => {
  const [records, createRecord, updateRecord, deleteRecord] = useAirtable('Tasks', AIRTABLE_API_KEY, TABLE_BASE_ID)

  return (
    <div>
      {records.map(record => <span>{record.fields.Name}</span>)}
      <button onClick={() => createRecord({ Name: 'New record' })}>Add record</button>
    </div>
  )
}
```


### Update

```jsx
<button onClick={() => updateRecord(record.id, { Status: 'In progress' })}>
  Update
</button>
```

### Delete

```jsx
<button onClick={() => deleteRecord(record.id)}>
  Delete
</button>
```

## License

MIT © [ignatif](https://github.com/ignatif)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
