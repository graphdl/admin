import {
  BooleanField,
  Datagrid,
  DateField,
  EmailField,
  List,
  NumberField,
  ReferenceField,
  RichTextField,
  TextField,
  UrlField,
} from 'react-admin'
import { Noun } from '../../typings'
import { isDate, isEmail, isUrl } from '../utils'

export default function ResourceList({ graph, noun }: any) {
  let nounFields: Noun<string, any> = {}

  if (noun) {
    nounFields = Object.entries(noun).reduce((acc: Noun<string, any>, [key, value]) => {
      if (
        !key.startsWith('_') &&
        !graph._list?.exclude?.includes(key) &&
        !noun._list?.exclude?.includes(name) &&
        !(noun._list?.fields && !noun._list?.fields.includes(key))
      ) {
        acc[key] = value
      }
      return acc
    }, {})
  }

  return (
    <List hasCreate empty={false} perPage={10}>
      <Datagrid
        sx={{ '& .RaDatagrid-headerCell': { whiteSpace: 'nowrap' } }}
        bulkActionButtons={false}
        rowClick="show"
        size="medium"
      >
        {Object?.entries((nounFields as Noun<string, any>) || {}).map(([key, field], index: number) => {
          const [refNoun, refProp] = (typeof field === 'string' && field.split('.')) || []
          console.log({ refNoun, refProp })
          if (refProp) return <ReferenceField key={index} label={refNoun} source={key} reference={refNoun} link="show" />
          console.log({ field })
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
  )
}
