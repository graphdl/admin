import { Box, Card, CardContent } from '@mui/material'
import * as React from 'react'
import {
  Create,
  TabbedForm,
  TextInput,
  required,
  RichTextField,
  useResourceContext,
  useCreate,
  useCreateContext,
  useReference,
  useResourceDefinition,
  useResourceDefinitions,
  Form,
  CreateButton,
  SaveButton,
  RefreshButton,
  SimpleForm,
  DeleteButton,
} from 'react-admin'
import { unstable_HistoryRouter, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Noun } from '../../typings'

const ResourceCreate = ({ graph, noun }: any) => {
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
            <SaveButton />
          </CardContent>
        </Card>
      </Form>
    </Create>
  )
}

export default ResourceCreate

const Spacer = () => <Box width={20} component="span" />
