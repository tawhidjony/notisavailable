import {EnumAdminUserTypes} from "Utils/Enums/UserType";

export default function accessCheck(permissions: EnumAdminUserTypes[], userRole: EnumAdminUserTypes): boolean{
  return permissions.includes(userRole);
}