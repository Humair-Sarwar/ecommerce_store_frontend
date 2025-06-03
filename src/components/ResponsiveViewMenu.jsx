import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router";

export default function ResponsiveViewMenu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
      <Button
        onClose={toggleDrawer(false)}
        sx={{
          border: "1px solid #ccc",
          borderRadius: "50%",
          height: "35px",
          minWidth: "25px",
          color: "black",
          mb: 1
        }}
      >
        <svg
          role="presentation"
          stroke-width="2"
          focusable="false"
          width="19"
          height="19"
          class="icon icon-close"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.658 6.343 6.344 17.657M17.658 17.657 6.344 6.343"
            stroke="currentColor"
          ></path>
        </svg>
      </Button>
      <Box sx={{height: '82vh', overflowY: 'auto'}}>
        <List className="responsive-menu-list-style">
            <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>

             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>

             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>

             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>

             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>


             <ListItem className="menu-item-list-l">
                <Link to={'/'}>
                <Typography sx={{fontWeight: '600'}}>Mobile & Computing</Typography></Link><Button sx={{height: '22px', minWidth: '5px'}} className="move-next-btn-style"><svg role="presentation" focusable="false" width="5" height="8" class="icon icon-chevron-right-small reverse-icon" viewBox="0 0 5 8">
        <path d="m.75 7 3-3-3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path>
      </svg></Button>
            </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton size="large" color="black" onClick={toggleDrawer(true)}>
        <svg
          role="presentation"
          stroke-width="1.5"
          focusable="false"
          width="22"
          height="22"
          class="icon icon-hamburger"
          viewBox="0 0 22 22"
        >
          <path
            d="M1 5h20M1 11h20M1 17h20"
            stroke="currentColor"
            stroke-linecap="round"
          ></path>
        </svg>
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ borderRadius: "15px" }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
