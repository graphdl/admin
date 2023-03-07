import React from 'react'
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  DateField,
  NumberField,
  EmailField,
  UrlField,
  BooleanField,
  RichTextField,
} from 'react-admin'
import { Noun } from '../../typings'

export default function Sublist({ graph, noun }: { graph: any; noun: any }) {
  console.log('Sublist', { graph, noun })
  const resource = graph[noun]

  let nounFields: Noun<string, any> = {}

  if (resource) {
    nounFields = Object.entries(resource).reduce((acc: Noun<string, any>, [key, value]) => {
      if (
        !key.startsWith('_') &&
        !graph._list?.exclude?.includes(key) &&
        !resource._list?.exclude?.includes(name) &&
        !(resource._list?.fields && !resource._list?.fields.includes(key))
      ) {
        acc[key] = value
      }
      return acc
    }, {})
  }

  return (
    <>
      <div className='pt-10 -mb-14'>
        <h1 className='text-xl font-medium'>{noun}</h1>
      </div>

      <List hasCreate empty={false} perPage={10} resource={noun} title={noun}>
        <Datagrid
          sx={{ '& .RaDatagrid-headerCell': { whiteSpace: 'nowrap' } }}
          bulkActionButtons={false}
          rowClick="show"
          size="medium"
        >
          {Object?.entries((nounFields as Noun<string, any>) || {}).map(([key, field], index: number) => {
            const [refNoun, refProp] = (typeof field === 'string' && field.split('.')) || []

            if (refProp)
              return <ReferenceField key={index} label={refNoun} source={key} reference={refNoun} link="show" />

            switch (field) {
              case 'string':
                return <TextField key={index} source={key} noWrap />
              case 'datetime':
                return <DateField key={index} source={key} />
              case 'date':
                return <DateField key={index} source={key} />
              case 'number':
                return <NumberField key={index} source={key} noWrap />
              case 'int':
                return <NumberField key={index} source={key} noWrap />
              case 'phone':
                return <NumberField key={index} source={key} noWrap />
              case 'email':
                return <EmailField key={index} source={key} noWrap />
              case 'url':
                return <UrlField key={index} source={key} />
              case 'bool':
                return <BooleanField key={index} source={key} />
              case 'richtext':
                return <RichTextField key={index} source={key} />
              case 'entityId':
                return <ReferenceField key={index} source={key} reference={refNoun} link="show" />
              default:
                return <TextField key={index} source={key} noWrap />
            }
          })}
        </Datagrid>
      </List>
    </>
  )
}
