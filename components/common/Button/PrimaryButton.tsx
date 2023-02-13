import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

type IButtonProps = {
    children: React.ReactNode
} & ButtonProps

const PrimaryButton: FC<IButtonProps> = ({ children, ...otherProps }) => {
    const CollapseButton = styled(Button)({
        borderRadius: "5em",
        fontSize: "1.1rem !important",
        '&:hover': {
            backgroundColor: '#066e38',
            borderColor: '1px solid #066e38',
            boxShadow: 'none',
            color: '#fff',
        },
    })
    return (
        <CollapseButton {...otherProps} >{children}</CollapseButton >
    )
}

export default PrimaryButton
