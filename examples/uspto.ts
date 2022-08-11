/* eslint-disable */
import type { GetRequest, PostRequest, PutRequest, PatchRequest, OptionsRequest, DeleteRequest } from 'openapi-tsrf'
export const toQuery = (o: {[key: string]: any}): string => {
  const q = Object.keys(o)
    .map(k => ({k, v: o[k]}))
    .filter(x => x.v !== undefined && x.v !== null)
    .map(x => Array.isArray(x.v)
      ? x.v.map(v => `${encodeURIComponent(x.k)}=${encodeURIComponent(v)}`).join('&')
      : `${encodeURIComponent(x.k)}=${encodeURIComponent(x.v)}`)
    .join('&')
  return q ? `?${q}` : ''
}
export const toFormData = (o: Record<string, any>): FormData => {
  const fd = new FormData()
  Object.entries(o).forEach(([key, data]) => fd.append(key, data))
  return fd
}
export interface dataSetList {
  total?: number
  apis?: Array<{apiKey?: string, apiVersionNumber?: string, apiUrl?: string, apiDocumentationUrl?: string}>
}
export abstract class RequestFactory {
  static listDataSets(): GetRequest<dataSetList> {
    return {
      method: 'GET',
      url: '/',
    }
  }
  static listSearchableFields({ dataset, version, }: { dataset: string, version: string, }): GetRequest<string> {
    return {
      method: 'GET',
      url: `/${dataset}/${version}/fields`,
    }
  }
  static performSearch({ body, version, dataset, }: { body: {criteria: string, start?: number, rows?: number}, version: string, dataset: string, }): PostRequest<{criteria: string, start?: number, rows?: number}, Array<{}>> {
    return {
      method: 'POST',
      url: `/${dataset}/${version}/records`,
      data: body,
    }
  }
}
