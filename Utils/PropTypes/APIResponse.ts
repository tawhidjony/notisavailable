export interface IResponse {
  data: {
    error: {
      fileds: {
        count: number,
        errors: any
      },
      system: {
        count: 0,
        errors: any
      }
    },
    message: string,
    metaData: {
      limit: number,
      page: number,
      totalCount: number,
      totalPage: number
    },
    nonce: number,
    payload: any,
    status: number
  }
}