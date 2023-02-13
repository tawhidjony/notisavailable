import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";



const BreadCrumb = (props: any) => {

  const { listItems } = props && props

  const breadCrumbStyle = {
    "& .MuiBreadcrumbs-separator": {
      margin: "unset",
    },
  };

  return (
    <Box >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={breadCrumbStyle}
      >
        <nav className="breadChild">
          {listItems.map((page: { href: string, label: string }, index: number) => {
            return (
              <React.Fragment key={index}>
                {index > 0 && ' > '}
                <Link href={page.href}>
                  {page.label}
                </Link>
              </React.Fragment>
            )
          })}
        </nav>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
