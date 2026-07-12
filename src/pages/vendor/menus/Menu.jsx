import { Box, Button, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import SaveIcon from "@mui/icons-material/Save";

import Editor from "@monaco-editor/react";
import { useState } from "react";

import { createUpdateMenuApi, getMenuApi } from "../../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";
import { fetchJsonMenu, useSaveMenu } from "../../../hook/vendor/useSiteSettings";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const GeneralMenu = ({ keyMenu }) => {
  const [stateChange, setStateChange] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [jsonValue, setJsonValue] = useState(JSON.stringify([], null, 2));
  const [isActive, setIsActive] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');

  const handleEditorChange = (value) => {
    setJsonValue(value);
  };

  const { mutateAsync: saveMenu, isPending } = useSaveMenu();
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
    setIsActive(event.target.checked);
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
let handleChangeMenuTitle = (e)=> {
  setMenuTitle(e.target.value)
}
  return (isLoading ? <LoaderSpinner/> : <Box>
      
      <TextField
        id="outlined-basic"
        label="Menu Title"
        variant="outlined"
        fullWidth
        color="secondary"
        size="small"
        sx={{ mb: 1, mt: 1 }}
        onChange={handleChangeMenuTitle}
        value={menuTitle}
      />
      <Box sx={{ py: 1, width: "100%" }}>
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
          mt: 3,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              {...label}
              checked={isActive}
              onChange={handleIsActiveChange}
              color="secondary"
            />
          }
          label="Is Active"
        />

        <Button
          className="custom-secondary-btn-admin-side"
          onClick={handleSaveChangesMenu}
        >
          <SaveIcon sx={{ mr: 1 }} /> Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralMenu;
