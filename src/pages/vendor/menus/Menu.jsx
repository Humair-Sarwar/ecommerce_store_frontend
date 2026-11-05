import { Box, Button, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Editor from "@monaco-editor/react";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";
import {
  fetchJsonMenu,
  useSaveMenu,
} from "../../../hook/vendor/useSiteSettings";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const GeneralMenu = ({ keyMenu }) => {
  const [stateChange, setStateChange] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [jsonValue, setJsonValue] = useState(JSON.stringify([], null, 2));
  const [isActive, setIsActive] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");

  const handleEditorChange = (value) => {
    setJsonValue(value);
  };

  const { mutateAsync: saveMenu } = useSaveMenu();
  const handleSaveChangesMenu = async () => {
    const data = {
      menu: jsonValue,
      key: keyMenu,
      is_active: isActive,
      id: menuId,
      menu_title: menuTitle,
    };

    try {
      const res = await saveMenu(data);
      if (res.status === 200) {
        handleSuccess("Save Changes Successfully!");
      } else {
        handleError("Internal Server Error!");
      }
    } catch (error) {
      handleError("Internal Server Error!");
    }
  };

  let handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };
  const { data: menuItemsList, isLoading } = fetchJsonMenu({ key: keyMenu });

  useEffect(() => {
    if (menuItemsList?.data) {
      setJsonValue(menuItemsList.data.menu || "");
      setMenuTitle(menuItemsList.data.menu_title || "");
      setIsActive(menuItemsList.data.is_active || false);
      setMenuId(menuItemsList.data.uuid || null);
    }
  }, [menuItemsList]);

  let handleChangeMenuTitle = (e) => {
    setMenuTitle(e.target.value);
  };

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <Box>
      <TextField
        id="outlined-basic"
        label="Menu Title"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2, mt: 0.5 }}
        onChange={handleChangeMenuTitle}
        value={menuTitle}
      />
      <Box
        sx={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #0f172a",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
        }}
      >
        <Editor
          height="420px"
          defaultLanguage="json"
          value={jsonValue}
          onChange={handleEditorChange}
          theme="vs-dark"
          className="json-editor-menu-box-target"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2.5,
          p: 2,
          borderRadius: "16px",
          bgcolor: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "13.5px",
              fontWeight: 700,
              color: "#0f172a",
            },
          }}
          control={
            <Checkbox
              {...label}
              checked={isActive}
              onChange={handleIsActiveChange}
              sx={{
                color: "#cbd5e1",
                "&.Mui-checked": { color: "#10b981" },
              }}
            />
          }
          label="Is Active"
        />

        <Button
          className="custom-secondary-btn-admin-side"
          onClick={handleSaveChangesMenu}
        >
          <SaveOutlinedIcon sx={{ mr: 0.75, fontSize: 18 }} /> Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralMenu;
