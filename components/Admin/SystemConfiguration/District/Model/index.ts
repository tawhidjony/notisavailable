export interface ICreateDistricts {
  divisionId: string
  name_en: string
  name_bn: string
}
export interface IUpdateDistricts {
  divisionId: any
  name_en: string
  name_bn: string
  status: number
}

export interface IDistrictList {
  id: string
  division: {
    id: string
    name_en: string
    name_bn: string
  };
  name_en: string
  name_bn: string
  status: number
}