export default interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode | React.ReactNode[] ;
  maxWidht?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}