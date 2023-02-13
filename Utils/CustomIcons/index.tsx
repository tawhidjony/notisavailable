import Image from "next/image";

const ExcelIcon = () => <Image src={'/assets/icons/excel.png'} alt="excel-icon" width={17} height={17} />
const PdfIcon = () => <Image src={'/assets/icons/pdf.png'} alt="excel-icon" width={17} height={17} />
const AddIcon = () => <Image src={'/assets/icons/add.png'} alt="Add-icon" width={17} height={17} />
const PrintIcon = () => <Image src={'/assets/icons/print.png'} alt="print-icon" width={17} height={17} />
const EditIcon = () => <Image src={'/assets/icons/edit.svg'} alt="edit-icon" width={17} height={17} />
const ViewIcon = () => <Image src={'/assets/icons/view.svg'} alt="edit-icon" width={20} height={20} />
const DeleteIcon = () => <Image src="/assets/icons/delete.svg" alt="delete-icon" width={17} height={17} />



export {
  PrintIcon,
  ExcelIcon,
  PdfIcon,
  AddIcon,
  EditIcon,
  ViewIcon,
  DeleteIcon
};
