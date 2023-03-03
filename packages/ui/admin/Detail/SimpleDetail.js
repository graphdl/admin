import { NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin'
import { SimpleList } from '../Lists'

export const SimpleDetail = ({graph,noun}) => {
  const { _list, _detail } = noun
  // console.log({_list})
  return (
  <Show>
    <SimpleShowLayout>
      {Object.entries(noun).map(([name, field]) => {
        if (!name.startsWith('_') 
              // && !graph._detail?.exclude?.includes(name) && !noun._detail?.exclude?.includes(name) 
              // && !(noun._detail?.fields && !noun._detail?.fields.includes(name))
            ) {

            const [ refNoun, refProp ] = (typeof(field) === 'string' && field.split('.')) || []

            if (refProp) {
              return <ReferenceField key={name} source={name} reference={refNoun} link='show' />
            }
            switch (field) {
              case 'string': return <TextField key={name} source={name} />
              case 'int': return <NumberField key={name} source={name} />
              case 'decimal': return <NumberField key={name} source={name} />
            
              default:
                return <TextField key={name} source={name} />
            }
          }
      })}



      {_detail?.lists && _detail.lists.map(list => {
        {/* console.log({_detail, list})
        console.log({graph, noun: graph[list]}) */}
        const List = SimpleList({graph, noun: graph[list]})
        return <List key={name} />
      })}

      {/* <ReferenceField source="orderId" reference="orders" />
      <DateField source="discount" />
      <ReferenceField source="entityId" reference="entities" />
      <NumberField source="quantity" />
      <ReferenceField source="productId" reference="products" />
      <NumberField source="unitPrice" />
      <TextField source="id" /> */}
    </SimpleShowLayout>
  </Show>
)}

// export const SimpleList = props => {
//   return <ListGuesser {...props} />
// }

// const filters = [
//   <TextInput label='Search' source='q' />,
//   <TextInput label='Title' source='title' defaultValue='Hello, World!' />,
//   <ReferenceInput source='userId' reference='users' />,
// ]

// export const SimpleList = ({graph,noun}) => props => {
//   console.log(noun)
//   return (
//     <List filters={filters} hasCreate={true} exporter={false} >
//       <Datagrid rowClick='show'>
//         {Object.entries(noun).map(([name, field]) => {
//           if (!name.startsWith('_') && !graph._list?.exclude?.includes(name) && !noun._list?.exclude?.includes(name) &&
//             !(noun._list?.fields && !noun._list?.fields.includes(name))) {

//             const [ refNoun, refProp ] = field.split('.')

//             if (refProp) {
//           
//               return <ReferenceField key={name} source={refNoun} reference={refProp} link='show' />
//             }

//             switch (field) {
//               case 'string': return <TextField key={name} source={name} />
            
//               default:
//                 return <TextField key={name} source={name} />
//             }
            
//           }
//         })}
//         {/* <ReferenceField source='userId' reference='users' link='show' />
//         <TextField source='id' />
//         <TextField source='title' />
//         <TextField source='body' /> */}
//       </Datagrid>
//     </List>
// )}