import React from 'react'
import { useAirtable } from 'use-airtable'

const AIRTABLE_API_KEY = 'keyl0A56Sw6XVQcY9'
const AIRTABLE_BASE_ID = 'appMulAtpemumqDLV'

const App = () => {
  const [records, createRecord, updateRecord, deleteRecord] = useAirtable(
    'Tasks',
    AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID
  )

  return (
    <div>
      <div>
        {records.map((record) => (
          <div key={record.id}>
            {`${record.fields.Status}: ${record.fields.Name}`}
            <button
              onClick={() => updateRecord(record.id, { Status: 'In progress' })}
            >
              update
            </button>
            <button onClick={() => deleteRecord(record.id)}>delete</button>
          </div>
        ))}
      </div>
      <button
        onClick={() =>
          createRecord({
            Name: 'Name',
            Status: 'Todo'
          })
        }
      >
        Create record
      </button>
    </div>
  )
}

export default App
