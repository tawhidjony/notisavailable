import { numbers } from "Utils/commonJson";
import { EnumGradeTypes } from "Utils/Enums/Grade";
import { EnumLangTypes } from "Utils/Enums/LangType";

export const listSelectModify = (arrayList: any) => arrayList?.map((data: { name_en: string, id: string }) => {
  return {
    name: data.name_en,
    id: data.id,
  }
})
export const listArrayModify = (arrayList: any, lang = EnumLangTypes.BANGLA) => arrayList?.map((data: { name_en: string, name_bn: string, id: string }) => {
  return {
    label: lang === EnumLangTypes.ENGLISH ? data?.name_en : data?.name_bn,
    value: data.id,
  }
})
export const listArrayModifyCenterCode = (arrayList: any) => arrayList?.map((data: { code: string, id: string }) => {
  return {
    label: data.code,
    value: data.id,
  }
})

export const listArrayModifyCenterNameCode = (arrayList: any, lang = EnumLangTypes.BANGLA) => arrayList?.map((data: { code: string, name_en: string, name_bn: string, id: string }) => {

  return {
    label: lang === EnumLangTypes.ENGLISH ? data?.name_en : data?.name_bn + ' - ' + data?.code,
    value: data.id,
  }
})

export const IndexSerial = (page: number, pageSize: number, index: number, lang = EnumLangTypes.BANGLA) => {
  let current_page = Number(page);
  let perPageSize = Number(pageSize);
  let row_index = (Number(index) + 1);
  let serial_num = numberConverter(lang, ((perPageSize * (current_page - 1)) + row_index));
  return serial_num
}

export const translate = (langData: any, language: string, key: string) => {
  if (langData?.length) {
    const langValue = langData?.find((lang: any) => lang.key === key);
    if (langValue && language === EnumLangTypes.ENGLISH) return langValue.field_trans_en;
    if (langValue && language === EnumLangTypes.BANGLA) return langValue.field_trans_bn;
    return null;
  }
  return null;
};

export const getGrade = (total: number) => {
  if (total > 100 || total < 0) {
    return EnumGradeTypes.INVALID;
  } else if (total >= 90 && total <= 100) {
    return EnumGradeTypes.A;
  } else if (total >= 80 && total <= 89) {
    return EnumGradeTypes.B;
  } else if (total >= 60 && total <= 79) {
    return EnumGradeTypes.C;
  } else if (total >= 0 && total < 60) {
    return EnumGradeTypes.D;
  } else {
    return EnumGradeTypes.INVALID
  }
};

export const numberConverter = (lang: string, inputValue: number) => {
  if (lang === EnumLangTypes.ENGLISH) {
    return inputValue;
  }
  const convertedNum: any[] = [];
  const stringInputValue = inputValue?.toString()?.split("");
  for (let i = 0; i < stringInputValue.length; i++) {
    convertedNum.push(numbers[+stringInputValue[i]]);
  }
  return convertedNum.join("");
}
