import { Box, Card, CardContent } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Create,
  Form,
  NumberInput,
  SaveButton,
  TextField,
  TextInput,
  useCreateContext,
  useGetList,
  useResourceContext,
} from 'react-admin'
import dataProvider from '../../providers/dataProvider'
import { Noun } from '../../typings'

const ResourceCreate = ({ graph, noun, name }: any) => {
  let nounFields: Noun<string, any> = {}
  const [entityId, setEntityId] = useState<string>('')
  const resource = window.location.href.split('/')[4]
  console.log('resource', resource)

  useEffect(() => {
    const getTotalRecords = async () => {
      const { data, total } = await dataProvider.getList(resource, {
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
        filter: {},
      })
      setEntityId(total + 1)
    }
    getTotalRecords()
  }, [resource])

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
    <Create>
      <Form>
        <Card>
          <CardContent>
            {nounFields &&
              Object?.keys(nounFields).map((item, i) => {
                return (
                  <Box key={i} mt={2} maxWidth={800}>
                    <TextInput source={item} fullWidth />
                    <Spacer />
                  </Box>
                )
              })}
            {/* {entityId && (
              <TextInput sx={{ display: 'none' }} resource={resource} defaultValue={entityId} source="entityId" />
            )} */}
            <SaveButton />
          </CardContent>
        </Card>
      </Form>
    </Create>
  )
}

export default ResourceCreate

const Spacer = () => <Box width={20} component="span" />
