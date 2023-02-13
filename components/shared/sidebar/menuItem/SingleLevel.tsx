import { ElementType, ReactNode } from 'react';

// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface Props {
    item: any

}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
    ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
>(({ theme }) => ({
    borderBottom: "2px solid #133b3f",
    borderRadius: "10px",
    color: "#fff",
    "span": {
        fontSize: "16px",
        fontWeight: "400",
        fontFamily: 'solaimanlipi',
    },

    '&.active, &.active:hover': {
        backgroundColor: "#c2dcd1",
        color: "#1f5c4d",

    },
    '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
        color: "#1f5c4d",
    }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',

})

export const SingleLevel = ({ item }: Props) => {
    const router = useRouter()

    const IconTag: ReactNode = item.icon

    const isNavLinkActive = () => {
        if (router.pathname === item.path) {
            return true
        } else {
            return false
        }
    }
    return (

        <Box className='test'>
            <ListItem disablePadding className='nav-link'
                disabled={item.disabled || false} >
                <Link passHref href={item.path === undefined ? '/' : `${item.path}`} >
                    <MenuNavLink
                        component={'a'}
                        className={isNavLinkActive() ? 'active' : ''}
                        {...(item.openInNewTab ? { target: '_blank' } : null)}
                        onClick={e => {
                            if (item.path === undefined) {
                                e.preventDefault()
                                e.stopPropagation()
                            }
                        }}
                        sx={{
                            width: "100%",
                            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                        }}
                    >
                        <ListItemIcon className="navItemSingleIcon" >
                            {item.icon}
                        </ListItemIcon>
                        <Typography >{item.title}</Typography>
                    </MenuNavLink>
                </Link>
            </ListItem>
        </Box>



    );
};