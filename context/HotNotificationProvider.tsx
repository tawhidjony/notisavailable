import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MessageDialog from 'components/common/DeleteModal/MessageDialog';
import { useRouter } from 'next/router';
import * as React from 'react';
import { createContext, useContext, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from 'Store';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  children: React.ReactNode;
}

type ISetNotification = {
  title?: string,
  message?: string
  icon?: string,
  url: string,
  button: boolean,
  autoClose: boolean,
  action: () => void
}

const NotificationContext = createContext(null)

export const HotNotificationProvider = (props: Props) => {
  const routes = useRouter()
  const { lang, langData } = useSelector((state: RootState) => state.lang);
  const [visible, setVisibility] = useState(false)
  const [message, setMessage] = useState<ISetNotification>({
    title: "সফল হয়েছে",
    message: "",
    icon: "yes",
    url: "#",
    button: false,
    autoClose: false,
    action: () => { }
  })

  const setNotification = React.useCallback((props: ISetNotification) => {
    setMessage((params: any) => ({ ...params, ...props }))
  }, [message, lang])

  const initialValue: any = {
    visible: false,
    setVisible: setVisibility,
    setNotification,
  }

  React.useEffect(() => {
    if (visible === false) {
      setMessage((params: any) => ({
        ...params,
        title: "সফল হয়েছে",
        message: "",
        icon: "yes",
        url: "#",
        button: false,
        autoClose: false,
        action: () => { }
      }))
    }
  }, [visible])


  return (
    <NotificationContext.Provider value={initialValue} >
      {props.children}
      <Dialog
        open={visible}
        TransitionComponent={Transition}
        keepMounted={false}
        onClose={() => setVisibility(!visible)}
        aria-describedby="alert-dialog-slide-description"
      >
        <MessageDialog items={message} close={setVisibility} open={visible} />
      </Dialog>

    </NotificationContext.Provider>
  )
}



export const useHotNotification = () => {
  const { visible, setVisible, setNotification } = useContext<any>(NotificationContext)
  return { visible, setVisible, setNotification }
}