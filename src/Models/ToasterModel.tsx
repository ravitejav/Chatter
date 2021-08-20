export interface ToasterProps {
  type: toasterType
  message: string
  time: time
  styles?: any
  showToast?: boolean
}

export type toasterType = 'ERROR' | 'SUCCESS' | 'WARNING' | 'NON'
type time = 0.5 | 0.75 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5
