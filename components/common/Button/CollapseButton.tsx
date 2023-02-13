import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

type IButtonProps = {} & ButtonProps

const CollapseButton: FC<IButtonProps> = ({ ...otherProps }) => {
    const CollapseButton = styled(Button)({
        borderRadius: "50%",
        minWidth: "35px",
        minHeight: "35px",
        border: "1px solid #198F51",
        fontSize: "1.1rem !important",
        padding: "0px",
        "& span.MuiButton-startIcon": {
            margin: "0px",
        }
    })
    return (
        <CollapseButton {...otherProps} />
    )
}

export default CollapseButton
