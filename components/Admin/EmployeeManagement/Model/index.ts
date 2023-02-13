export interface EmployeeManagementList {
  id: string;
  employee_id: string;
  name_en: string;
  name_bn: string;
  father_name: string;
  mother_name: string;
  nid: string;
  employeetypeId: {
    id: string;
    name_bn: string;
    name_en: string;
  };
  officeId: {
    id: string;
    name_bn: string;
    name_en: string;
  },
  designationId: {
    id: string;
    name_bn: string;
    name_en: string;
  },
  join_date: string;
  email: string;
  mobile: string;
  address: string;
  photo: string;
  status: number;
}
