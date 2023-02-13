export interface LearningCenterList {
  id: string,
  code: string,
  name_en: string,
  name_bn: string,
  area: string,
  status: number,
  formation_date: String,
  centertypeId: {
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

export interface ILearningCenterCreate {
  code: string,
  name_en: string,
  name_bn: string,
  centertypeId: {
    id: string,
    name_bn: string,
    name_en: string,
  },
  description: string,
  latitude: string,
  longitude: string,
  formation_date: String,
  start_time: string
  end_time: string
  divisionId: string,
  districtId: string,
  upazilaId: string,
  union: string,
  area: string
  placeId: string,
  cityCorporationId: string
}
export interface ILearningCenterList {
  id: string
  name_en: string
  name_bn: string
  status: number
}