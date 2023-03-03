import { List, Datagrid, ReferenceField, ReferenceInput, TextField, TextInput } from 'react-admin'

// export const SimpleList = props => {
//   return <ListGuesser {...props} />
// }

// const filters = [
//   <TextInput label='Search' source='q' />,
//   <TextInput label='Title' source='title' defaultValue='Hello, World!' />,
//   <ReferenceInput source='userId' reference='users' />,
// ]

export const SimpleList = ({graph,noun}) => props => {
  console.log("Simplelist:", {graph,noun})

  const filters = []
  
  // const filters = Object.entries(noun).map(([name, field]) => {
  // if (!name.startsWith('_') && !graph._list?.exclude?.includes(name) && !noun._list?.exclude?.includes(name) &&
  //     !(noun._list?.fields && !noun._list?.fields.includes(name))) {
    
  //   const [ refNoun, refProp ] = (typeof(field) === 'string' && field.split('.')) || []

  //   return refProp ? <ReferenceInput source={name} reference={refNoun} /> : <TextInput label='Title' source='title' />

  //   }
  // })


  return (
    <List filters={filters} hasCreate={true} exporter={false} >
      <Datagrid rowClick='show' bulkActionButtons={false} size='medium'  sx={{ '& .RaDatagrid-headerCell': { whiteSpace: 'nowrap' } }}>
        {Object.entries(noun).map(([name, field]) => {
          if (!name.startsWith('_') && !graph._list?.exclude?.includes(name) && !noun._list?.exclude?.includes(name) &&
            !(noun._list?.fields && !noun._list?.fields.includes(name))) {

            const [ refNoun, refProp ] = (typeof(field) === 'string' && field.split('.')) || []
              console.log("refNount", {refNoun, refProp})
            if (refProp) {
            console.log("name, field, refNoun, refProp",{name, field, refNoun, refProp})
            
              return <ReferenceField key={name} source={refProp} reference={refNoun} link='show' noWrap />
            }

            switch (field) {
              case 'string': return <TextField key={name} source={name} noWrap />
            
              default:
                return <TextField key={name} source={name} noWrap />
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