import { Box, Button, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import SaveIcon from "@mui/icons-material/Save";

import Editor from "@monaco-editor/react";
import { useState } from "react";

import { createUpdateMenuApi, getMenuApi } from "../../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../../toast";
import LoaderSpinner from "../../../components/LoaderSpinner";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const GeneralMenu = ({ keyMenu }) => {
  const [stateChange, setStateChange] = useState(false);
  const [menuId, setMenuId] = useState(null);
  const [jsonValue, setJsonValue] = useState(JSON.stringify([], null, 2));
  const [isActive, setIsActive] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');
  const [isLoading, setLoading] = useState(true);

  const handleEditorChange = (value) => {
    setJsonValue(value);
  };

  let handleSaveChangesMenu = async () => {
    let data = {
      menu: jsonValue,
      key: keyMenu,
      is_active: isActive,
      business_id: 123,
      id: menuId,
      menu_title: menuTitle

    };
    let res = await createUpdateMenuApi(data);
   
    if (res.status == 201) {
      handleSuccess("Save Changes Successfully!");
      setStateChange(!stateChange);

    } else {
      handleError("Internal Server Error!");
    }
  };
  let handleIsActiveChange = (e) => {
    setIsActive(event.target.checked);
  };
  const getMenuList = async () => {
    let data = {
      business_id: 123,
      key: keyMenu,
    };
    setLoading(true);
    let res = await getMenuApi(data);
    if (res.status == 200) {
      setJsonValue(res.data.data?.menu);
      setMenuId(res.data.data?.id);
      setMenuTitle(res.data.data?.menu_title)
      setIsActive(res.data.data?.is_active || false);
      setLoading(false);
    } else {

      handleError("Internal Server Error!");
    }
  };
  useEffect(() => {
    getMenuList();
  }, [stateChange]);
let handleChangeMenuTitle = (e)=> {
  setMenuTitle(e.target.value)
}
  return (isLoading ? <LoaderSpinner/> : <Box>
      
      <TextField
        id="outlined-basic"
        label="Menu Title"
        variant="outlined"
        fullWidth
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
