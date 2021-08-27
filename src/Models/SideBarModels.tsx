import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface Route {
  name: string
  path: string
  icon: IconDefinition
  additonalData?: any
}
