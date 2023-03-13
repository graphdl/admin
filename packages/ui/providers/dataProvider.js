import { fetchUtils } from 'react-admin'
import { stringify } from 'querystring'

/* eslint-disable import/no-anonymous-default-export */
const apiUrl = 'https://admin.graphdl.org/' //'https://local.db.mw/'
const httpClient = fetchUtils.fetchJson

export default {
  getList: async (resource, params) => {
    const { page, perPage} = params?.pagination
    const { field, order } = params?.sort
   
    const baseUrl = `${apiUrl}${resource}`
   
    const { json } = await httpClient(`${baseUrl}?expand=true`)
    console.log('json', json)
    const records = Object.entries(json.data).map(([key, value]) => {
      console.log('keyvalue',  value['entityId'] )
      return { id: value['entityId'], ...value }
    })
    return {
      data: records,
      total: json.totalDocuments
    }
    console.log('records', records)
  },
  getOne: async (resource, params) => {
    const record = await httpClient(`${apiUrl}${resource}/${params.id}`)
    return { data: { id: record.json.data.entityId, ...record.json.data}}
  },
  getMany: async (resource, params) => {

  },
  getManyReference: async (resource, params) => {},
  update: async (resource, params) => {},
  updateMany: async (resource, params) => {},
  create: async (resource, params) => {},
  delete: async (resource, params) => {},
  deleteMany: async (resource, params) => {},
}
