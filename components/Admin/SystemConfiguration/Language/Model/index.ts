export interface IFormLanguageInputs {
    title?: string
    field_trans_en: string
    field_trans_bn: string,
    moduleId: string,
    submoduleId?: string
}

export interface IFormLanguageUpdate {
    title: string
    field_trans_en: string
    field_trans_bn: string
}

export interface ILanguage {
    id: string
    title: string
    field_trans_en: string
    field_trans_bn: string
    status: number
}

export interface ILanguageList {
    id: string
    title: string
    field_trans_en: string
    field_trans_bn: string
    status: number,
    field_type: string,
    moduleId: {
        name_en: string
    },
    submoduleId: {
        name_en: string,
        parentId?: {
            name_en?: string
        }
    }
}