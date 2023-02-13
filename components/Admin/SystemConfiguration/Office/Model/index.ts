export interface IFormOfficeInputs {
  name_en: string
  name_bn: string
  officetypeId: string,
  divisionId: string,
  districtId: string,
  upazilaId: string,
  address: string
}
export interface IFormOfficeInputsUpdate {
  id: string,
  name_en: string
  name_bn: string
  officetypeId: string,
  divisionId: string,
  districtId: string,
  upazilaId: string,
  address: string
}
export interface IOffice {
  id: string
  name_en: string
  name_bn: string,
  address: string
}
export interface IOfficeList {
  id: string,
  name_en: string
  name_bn: string,
  address: string,
  status: number,
  officetypeId: {
    name_en: string
    name_bn: string
  },
  divisionId: {
    name_en: string
    name_bn: string
  }
  districtId: {
    name_en: string
    name_bn: string
  },
  upazilaId: {
    name_en: string
    name_bn: string
  }

}