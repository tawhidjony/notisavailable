export interface ResourcecenterList {
  id: string,
  code: string,
  name_en: string,
  name_bn: string,
  area: string,
  status: number,
  resourcecentertypeId: {
    name_bn: string,
    name_en: string,
  },
  divisionId: {
    name_bn: string,
    name_en: string,
  },
  districtId: {
    name_bn: string,
    name_en: string,
  },
  upazilaId: {
    name_bn: string,
    name_en: string,
  },
  placeId: {
    name_bn: string,
    name: string,
  }
}