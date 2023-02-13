import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText, SxProps } from "@mui/material";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import MenuItem from ".";
import { navItemStyle } from '../navItemStyle';
type Props = {
    item: any;
};

export const MultiLevel = ({ item }: Props) => {
    const router = useRouter()
    const { items: children } = item;
    const [open, setOpen] = useState(false);

    const handleClick = (singleItem: any) => {
        setOpen((prev) => !prev);
    };

    useEffect(() => {
        const result = children?.map((ele: any) => {
            if (ele.items) {
                const res2 = ele.items?.map((ele2: any) => ele2.path === router.pathname)
                return res2;
            } else {
                return ele.path === router.pathname;
            }
        })
        result?.flat().map((item: any) => item && setOpen(true))
    }, [children])

    return (
        <Box sx={{ ...navItemStyle } as SxProps}>
            <ListItem button onClick={() => handleClick(item)} className='navItemContent'>
                <ListItemIcon className="dropdownItemIcon">{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {(open) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit >
                <List component="div" className="subMenuDropdown" disablePadding >
                    {children.map((child: any, key: any) => (
                        <Link href={item.path} key={key} >
                            <MenuItem key={key} item={child} keyProp={key} />
                        </Link>
                    ))}
                </List>
            </Collapse>
        </Box>
    );
};