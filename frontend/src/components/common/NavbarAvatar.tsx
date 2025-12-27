"use client";
import api from "@/src/lib/api/api";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { useAuth } from "@/src/context/AuthContext";

export default function NavbarAvatar() {
  const router = useRouter();

  const { user } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {}, []);

  const logout = () => {
    api.post("/logout").then(() => {
      router.push("/login");
    });
  };

  return (
    <React.Fragment>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: "center" }} color="text.secondary">
            {user?.name}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ThemeToggleButton />
        </MenuItem>
        <MenuItem onClick={logout}>
          <Typography sx={{ textAlign: "center" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
