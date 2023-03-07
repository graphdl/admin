import { Grid } from '@mui/material'

import { Box, Card, CardContent } from '@mui/material'
import {
  BooleanField,
  DateField,
  EditButton,
  EmailField,
  NumberField,
  ReferenceField,
  RichTextField,
  ShowBase,
  ShowButton,
  SimpleShowLayout,
  TextField,
  UrlField,
  useResourceContext,
} from 'react-admin'
import { Noun } from '../../typings'
import ResourceList from './ResourceList'
import Sublist from './Sublist'

export default function ResourceShow({ graph, noun, link = 'edit' }: any) {
  const { _list, _detail } = noun
  const resource = useResourceContext()

  console.log('ResourceShow', { _detail })
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

  const fields = Object?.entries(nounFields)?.length
  let midPoint = Math.ceil(fields / 2)

  return (
    <ShowBase resource={resource}>
      <>
        <div className="flex justify-end w-full">
          
            {link === 'edit' ? (
              <EditButton sx={{ letterSpacing: 0.7, fontSize: 13 }} label="Edit Contact" />
            ) : (
              <ShowButton label="Show Contact" />
            )}
          
        </div>
        <Card>
          <CardContent>
            <Box display="flex" maxWidth={900} sx={{ display: 'flex' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SimpleShowLayout spacing={4}>
                    {Object.entries(nounFields)
                      .slice(0, midPoint)
                      .map(([key, field], index: number) => {
                        const [refNoun, refProp] = (typeof field === 'string' && field.split('.')) || []
                        if (refProp) {
                          return (
                            <ReferenceField key={index} label={refNoun} source={key} reference={refNoun} link="show" />
                          )
                        }
                        switch (field) {
                          case 'string':
                            return <TextField key={index} source={key} noWrap className="Text_Field" />
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
                  </SimpleShowLayout>
                </Grid>
                <Grid item xs={6}>
                  <SimpleShowLayout spacing={4}>
                    {Object.entries(nounFields)
                      .slice(midPoint)
                      .map(([key, field], index) => {
                        const [refNoun, refProp] = (typeof field === 'string' && field.split('.')) || []
                        if (refProp) {
                          return (
                            <ReferenceField key={index} label={refNoun} source={key} reference={refNoun} link="show" />
                          )
                        }
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
                  </SimpleShowLayout>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {_detail?.lists &&
          _detail.lists.map((list: string | number, i: number) => {

            return <Sublist key={i} graph={graph} noun={list} />
          })}
      </>
    </ShowBase>
  )
}

function ResourceForm({nouns, midPoint}: any) {
  return (
    <SimpleShowLayout spacing={4}>
      {Object.entries(nouns)
        .slice(midPoint)
        .map(([key, field], index) => {
          const [refNoun, refProp] = (typeof field === 'string' && field.split('.')) || []
          if (refProp) {
            return <ReferenceField key={index} label={refNoun} source={key} reference={refNoun} link="show" />
          }
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
    </SimpleShowLayout>
  )
}
