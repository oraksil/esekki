type FailData = {
  code: number
  message: string
}

export type Jsend = {
  status: string
  data: any | FailData
}
