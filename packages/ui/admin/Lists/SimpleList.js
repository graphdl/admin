import { List, Datagrid, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin'

// export const SimpleList = props => {
//   return <ListGuesser {...props} />
// }

const filters = [
  <TextInput label='Search' source='q' />,
  <TextInput label='Title' source='title' defaultValue='Hello, World!' />,
  <ReferenceInput source='userId' reference='users' />,
]

export const SimpleList = ({graph,noun}) => props => {
  console.log(noun)
  return (
    <List filters={filters} hasCreate={true} exporter={false} >
      <Datagrid rowClick='show'>
        {Object.entries(noun).map(([name, field]) => {
          if (!name.startsWith('_') && !graph._list?.exclude?.includes(name) && !noun._list?.exclude?.includes(name) &&
            !(noun._list?.fields && !noun._list?.fields.includes(name))) {

            const [ refNoun, refProp ] = field.split('.')

            

            if (refProp) {
              console.log({refNoun, refProp})
              return <ReferenceField key={name} source={refNoun} reference={refProp} link='show' />
            }

            switch (field) {
              case 'string': return <TextField key={name} source={name} />
            
              default:
                return <TextField key={name} source={name} />
            }
            
          }
        })}
        {/* <ReferenceField source='userId' reference='users' link='show' />
        <TextField source='id' />
        <TextField source='title' />
        <TextField source='body' /> */}
      </Datagrid>
    </List>
)}