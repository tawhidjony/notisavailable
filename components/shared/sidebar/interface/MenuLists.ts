export interface MenuListType {
    key?: string,
    title: string,
    icon: React.ReactNode,
    path?: string,
    items: {
        key?: string,
        title: string,
        icon: React.ReactNode,
        path: string,
        items?: {
            key?: string,
            title: string,
            icon: React.ReactNode,
            path: string
        }[]
    }[],

}