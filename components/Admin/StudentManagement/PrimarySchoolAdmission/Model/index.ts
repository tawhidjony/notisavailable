export interface StudentManagementList {
  id: string;
  employee_id: string;
  name_en: string;
  name_bn: string;
  roll_number: string;
  dob: string;
  age: string;
  bcn: string;
  nid: string;
  union: string;
  ward: string;
  village: string;
  doa: string;
  is_another_institute: string;
  institute_name: string;
  profession: string;
  father_name_bn: string;
  father_name_en: string;
  father_nid: string;
  father_occupation: string;
  father_mobile: string;
  mother_name_bn: string;
  mother_name_en: string;
  mother_nid: string;
  mother_occupation: string;
  mother_mobile: string;
  is_guardian_absent: string;
  guardian_name_bn: string;
  guardian_name_en: string;
  guardian_nid: string;
  guardian_occupation: string;
  guardian_mobile: string;
  photo: string;
  learningcentertypeId: {
    id: string;
    code: string;
    name_bn: string;
    name_en: string;
    centertypeId: {
      id: string;
      name_bn: string;
      name_en: string;
    }
  },
  learningCenterInfo: {
    id: string;
    code: string;
    name_bn: string;
    name_en: string;
    centertypeId: {
      id: string;
      name_bn: string;
      name_en: string;
    },
    divisionId: {
      id: string;
      name_bn: string;
      name_en: string;
    };
    districtId: {
      id: string;
      name_bn: string;
      name_en: string;
    },
    upazilaId: {
      id: string;
      name_bn: string;
      name_en: string;
    },
  },
  sessionInfo: {
    id: string;
    name_bn: string;
    name_en: string;
  },
  status: number;
}


