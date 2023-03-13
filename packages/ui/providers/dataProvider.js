import { fetchUtils } from 'react-admin'
import { stringify } from 'querystring'

/* eslint-disable import/no-anonymous-default-export */
// 'https://admin.graphdl.org/'
const apiUrl = 'https://local.db.mw/'
const httpClient = fetchUtils.fetchJson

export default {
  getList: async (resource, params) => {
    const { page, perPage } = params?.pagination
    const { field, order } = params?.sort

    const baseUrl = `${apiUrl}${resource}`

    const { json } = await httpClient(`${baseUrl}?expand=true`)
    const records = Object.entries(json.data).map(([key, value]) => {
      return { id: value['entityId'], ...value }
    })
    console.log('records', records)
    return {
      data: records,
      total: json.totalDocuments,
    }
  },
  getOne: async (resource, params) => {
    console.log('params', params)
    const record = await httpClient(`${apiUrl}${resource}/${params.id}`)
    return { data: { id: record.json.data.entityId, ...record.json.data } }
  },
  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }

    const url = `${apiUrl}${resource}?${stringify(query)}&expand=true`
    const { json } = await httpClient(url)
    const records = Object.entries(json.data).map(([key, value]) => {
      return { id: value['entityId'], ...value }
    })
    console.log('getMany', records)
    return { data: records }
  },
  getManyReference: async (resource, params) => {
    const { page, perPage } = params?.pagination
    const { field, order } = params?.sort

    // const query = {
    //   filter: JSON.stringigy({ ...params?.filter, [params?.target]: params?.id }),
    //   sort: JSON.stringify([field, order]),
    //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    // }

    const url = `${apiUrl}${resource}?expand=true&${stringify(query)}`
    const { json } = await httpClient(url)
    const records = Object.entries(json.data).map(([key, value]) => {
      return { id: value['entityId'], ...value }
    })
    return {
      data: records,
      total: json.totalDocuments,
    }
  },
  create: async (resource, params) => {
    const { data } = params
    const { json } = await httpClient(`${apiUrl}${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return { data: { id: json.data.entityId, ...json.data } }
  },
  update: async (resource, params) => {
    const { data } = params
    const { json } = await httpClient(`${apiUrl}${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return { data: { id: json.data.entityId, ...json.data } }
  },
  updateMany: async (resource, params) => {
    const { data } = params
    const { json } = await httpClient(`${apiUrl}${resource}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    const records = Object.entries(json.data).map(([key, value]) => {
      return { id: value['entityId'], ...value }
    })
    return {
      data: records,
    }
  },
  delete: async (resource, params) =>
    await httpClient(`${apiUrl}${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json.data })),

  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${apiUrl}${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data }))
  },
}
