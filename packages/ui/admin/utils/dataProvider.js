import { stringify } from 'query-string'
import { fetchUtils } from 'react-admin'

const apiUrl = 'https://admin.graphdl.org'
const httpClient = fetchUtils.fetchJson

const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      // sort: JSON.stringify([field, order]),
      // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      // filter: JSON.stringify(params.filter),
    }
    const url = `${apiUrl}/${resource}`

    const { headers, json } = await httpClient(url)
    return {
      data: json.data,
      total: parseInt(headers.get('content-range')?.split('/')?.pop(), 10),
    }
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json.data,
    })),

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    const { json } = await httpClient(url)
    return { data: json.data, }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    const { headers, json } = await httpClient(url)
    return {
      data: json.data,
      total: parseInt(headers.get('content-range')?.split('/')?.pop(), 10),
    }
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json.data, })),

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    })
    return { data: json.data,}
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    })
    return { data: json.data, }
  },
}

export default dataProvider
