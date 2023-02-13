export interface IFormUpazilaInputs {
  name_en: string
  name_bn: string,
  districtId: string,
  divisionId: string
}

export interface IUpazila {
  id: string
  name_en: string
  name_bn: string
}

export interface IUpazilaUpdate {
  id: string
  name_en: string
  name_bn: string,
  districtId: string,
  divisionId: string
}

export interface IUpazilaList {
  id: string,
  name_en: string,
  name_bn: string,
  divisionId: string,
  districtId: {
    name_en: string,
    name_bn: string,
    division: {
      name_en: string,
      name_bn: string,
    }
  }

  status: number
}