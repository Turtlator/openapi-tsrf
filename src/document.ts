import type { Swagger } from './swagger'
import type { AsyncDocumentParts } from './output'
import { DecIndent, IncIndent } from './output'
import {
  generateFormDataHelper,
  generateImportRequestTypes,
  generateQueryHelper,
} from './static-generators'
import { iterateDictionary, methods } from './iteration-helpers'
import { generateSchema } from './schemas'
import { generateOperation } from './operations'

export function* generateDocumentParts(
  document: Swagger.Spec3,
): AsyncDocumentParts {
  yield* generateImportRequestTypes()
  yield* generateQueryHelper()
  yield* generateFormDataHelper()
  for (const [name, schemaObj] of iterateDictionary(
    document.components.schemas,
  )) {
    yield* generateSchema(name, schemaObj)
  }

  yield 'export abstract class RequestFactory {'
  yield IncIndent
  for (const [pathStr, pathObj] of iterateDictionary(document.paths)) {
    for (const [method, operation] of methods(pathObj)) {
      yield* generateOperation(pathStr, method, operation)
    }
  }
  yield DecIndent
  yield '}'
}
