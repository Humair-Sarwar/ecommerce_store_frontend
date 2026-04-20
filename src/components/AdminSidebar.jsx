import { Box, List, ListItem } from "@mui/material";

import { NavLink, useNavigate, useNavigation } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hook/auth/useLogout";
import { handleSuccess } from "../toast";

const AdminSidebar = ({ navigation, sidebarOpen, title }) => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const [menuChildren, setMenuChildren] = useState();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean); // removes empty strings
  const lastSlug = `/${segments[segments.length - 1]}`;
  const lastSlug2 = `/${segments[segments.length - 2]}`;

  console.log(lastSlug); // "/sale"
  const handleLogout = () => {
  logoutMutation.mutate(undefined, {
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      handleSuccess("You are logout!");
      navigate("/login");
    },
    onError: () => {
      localStorage.clear();
      navigate("/login");
    }
  });
};
  return (
    <Box
      className={
        sidebarOpen
          ? "admin-side-style-show admin-side-style"
          : "admin-side-style"
      }
    >
      <Box className="logo-sidebar">
        <img src="/self_mart_1755699970080.png" alt="" />
      </Box>
      <Box
        component={"h3"}
        sx={{ px: 3, fontSize: "12px", textTransform: "uppercase" }}
      >
        {title}
      </Box>
      <Box>
        <List className="menu-list">
          {navigation.map((navItem, index) => (
            <>
              <ListItem className="item" key={index}>
                <NavLink
                  to={navItem.children ? "" : navItem.segment}
                  className={({ isActive }) => {
                    const pathname = location.pathname;
                    const currentSegments = pathname.split("/").filter(Boolean);
                    const lastSlug = `/${currentSegments[currentSegments.length - 1]}`;

                    if (navItem.children && navItem.children.length > 0) {
                      const matchesChild = navItem.children.some((item) => {
                        const itemSegments = item.segment
                          .split("/")
                          .filter(Boolean);
                        const itemLastSlug = `/${itemSegments[itemSegments.length - 1]}`;
                        return (
                          itemLastSlug === lastSlug ||
                          itemLastSlug === lastSlug2
                        );
                      });

                      return matchesChild ? "active-item" : "";
                    } else {
                      return isActive ? "active-item" : "";
                    }
                  }}
                  onClick={(e) => {
                    if (navItem.children) {
                      e.preventDefault();
                      // Toggle logic
                      if (menuChildren === navItem.children) {
                        setMenuChildren(null); // 🔽 Close if already open
                      } else {
                        setMenuChildren(navItem.children); // 🔼 Open
                      }
                    } else {
                      setMenuChildren(null);
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <span className="icons-sidebar-menu">{navItem.icon}</span>
                    <span>{navItem.title}</span>
                  </Box>
                  {navItem.children && (
                    <KeyboardArrowDownIcon
                      sx={{ mr: 1 }}
                      className={`arrow-icon-d-style ${menuChildren === navItem.children ? "arrow-icon-d-style-open" : "arrow-icon-d-style-close"}`}
                    />
                  )}
                </NavLink>

                {navItem.children && (
                  <List
                    className={`menu-list expand-menu-target ${menuChildren === navItem.children ? "expand-menu-target-open" : ""}`}
                    sx={{ display: "block", width: "100%" }}
                  >
                    {navItem.children?.map((item) => (
                      <ListItem
                        className="item"
                        key={index}
                        sx={{ paddingRight: "0" }}
                      >
                        <NavLink
                          to={item.segment}
                          className={({ isActive }) =>
                            isActive ? "active-item-child" : ""
                          }
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "center",
                            }}
                          >
                            <span className="icons-sidebar-menu-sub">
                              {item.icon}
                            </span>{" "}
                            {item.title}
                          </Box>
                        </NavLink>
                      </ListItem>
                    ))}
                  </List>
                )}
              </ListItem>
            </>
          ))}
          <ListItem className="item">
            <NavLink
              to={"#"}
              // className={({ isActive }) =>
              //   isActive ? "active-item" : ""
              // }
              onClick={handleLogout}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span className="icons-sidebar-menu">
                  <LogoutIcon />
                </span>{" "}
                <span>Logout</span>
              </Box>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
