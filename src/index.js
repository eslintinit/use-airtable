import Airtable from 'airtable'
import { useState, useEffect } from 'react'

export const useAirtable = (tableName, apiKey, baseId) => {
  const [records, setRecords] = useState([])
  const base = new Airtable({ apiKey }).base(baseId)

  const getRecords = () => {
    base('Tasks')
      .select({
        view: 'Grid view'
      })
      .eachPage(
        function page(fetchedRecords, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          setRecords([...records, ...fetchedRecords])
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
    new Promise((resolve, reject) => {
      base(tableName).create(fields, (err, record) => {
        if (err) {
          reject(err)
          return
        }

        // on successful request -> update records state
        setRecords([...records, record])
        resolve(record)
      })
    })

  const updateRecord = (recordId, fields) =>
    new Promise((resolve, reject) => {
      base('Tasks').update(
        [
          {
            id: recordId,
            fields
          }
        ],
        function (err, updatedRecords) {
          if (err) {
            reject(err)
            return
          }
          updatedRecords.forEach((updatedRecord) => {
            // on successful request -> update records state
            setRecords(
              records.map((record) =>
                record.id === recordId ? updatedRecord : record
              )
            )
            resolve(updatedRecord)
          })
        }
      )
    })

  const deleteRecord = (recordId) =>
    new Promise((resolve, reject) => {
      base('Tasks').destroy(recordId, (err, deletedRecord) => {
        if (err) {
          reject(err)
          return
        }

        // on successful request -> update records state
        setRecords(records.filter((record) => record.id !== recordId))
        resolve()
      })
    })

  return [records, createRecord, updateRecord, deleteRecord]
}
