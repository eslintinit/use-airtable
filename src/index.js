import { useState, useEffect } from 'react'

const Airtable = require('airtable')

export const useAirtable = (tableName, apiKey, baseId) => {
  const [records, setRecords] = useState([])
  const base = new Airtable({ apiKey }).base(baseId)

  const getRecords = () => {
    base('Tasks')
      .select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        view: 'Grid view'
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          setRecords(records)
          records.forEach(function (record) {
            console.log('Retrieved', record.get('Name'))
          })

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
          }
        }
      )
  }

  useEffect(() => {
    getRecords()
  }, [])

  const createRecord = (fields) =>
    base(tableName).create(fields, (err, record) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(record)
    })

  const updateRecord = (id, fields) => {
    base('Tasks').update(
      [
        {
          id,
          fields
        }
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          console.log(record.get('Status'))
        })
      }
    )
  }

  const deleteRecord = (recordId) =>
    base('Tasks').destroy(recordId, function (err, deletedRecord) {
      if (err) {
        console.error(err)
        return
      }
      console.log(deletedRecord)
    })

  return [records, createRecord, updateRecord, deleteRecord]
}
