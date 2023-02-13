export interface ITeacherInfoList {
  id: string,
  status: number,
  name_en: string,
  name_bn: string,
  cluster_number: string,
  nid: string,
  father_name: string,
  mother_name: string,
  dob: string,
  mobile: string,
  doj: string,
  start_time: string,
  end_time: string,
  area: string,
  bank_name: string,
  branch_name: string,
  account: string,
  routing: string,
  nature: string,
  training: string,
  photo: string,
  learning_center_id: {
    name_en: string,
    name_bn: string
  },
  divisionId: {
    name_en: string,
    name_bn: string
  },
  districtId: {
    name_en: string,
    name_bn: string
  },
  upazilaId: {
    name_en: string,
    name_bn: string
  },
  gender_id: {
    name_en: string,
    name_bn: string
  }
}
