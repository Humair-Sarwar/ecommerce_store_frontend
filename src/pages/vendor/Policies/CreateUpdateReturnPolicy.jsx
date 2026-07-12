import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import {
    useCreateReturn,
  useCreateWarranty,
  useUpdateReturn,
  useUpdateWarranty,
} from "../../../hook/vendor/usePolicies";
import { handleError, handleSuccess } from "../../../toast";
import TextEditor from "../../../components/TextEditor";

export default function ReturnModal({
  showEditBtn,
  showCrtReturnBtn,
  title_heading,
  list,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const createReturnMutation = useCreateReturn();
  const updateReturnMutation = useUpdateReturn();
  const isLoading =
    createReturnMutation.isPending || updateReturnMutation.isPending;
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: list?.title || "",
      description: list?.description ?? "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .min(2)
        .max(200)
        .required("Return title is required!")
        .trim(),
    }),
    onSubmit: async (values, action) => {
      const payload = {
        title: values?.title,
        description: values?.description,
      };

      if (list?.id) {
        updateReturnMutation.mutate(
          {
            id: list.id,
            formData: payload,
          },
          {
            onSuccess: (res) => {
              handleSuccess(res?.message || "Return updated successfully");
              setOpen(false); // drawer close
              console.log('oo')
            },

            onError: (error) => {
              const status = error?.response?.status;

              if (status === 422) {
                handleError("Return already exist!");
              } else if (status === 404) {
                handleError("Warranty not found");
              } else {
                handleError("Failed to update return");
              }
            },
          },
        );
      } else {
        createReturnMutation.mutate(payload, {
          onSuccess: () => {
            handleSuccess("Return created successfully");
            setOpen(false); // modal close
            action.resetForm();
          },
          onError: (error) => {
            const status = error?.response?.status;

            if (status === 422) {
              handleError("Return already exist!");
            } else {
              handleError("Failed to create return");
            }
          },
        });
      }
    },
  });

  const nameInputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [open]);

  const DrawerList = (
    <Box
      sx={{ width: 630, p: 2 }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ mb: 1, fontWeight: "600" }}>
          {title_heading} Return Policy
        </Typography>
        <Box sx={{ textAlign: "start" }} onClick={toggleDrawer(false)}>
          <CloseIcon sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "8px",
              }}
            >
              <Grid container spacing={1} sx={{ width: "100%" }}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    label="Title"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.title && touched.title)}
                    inputRef={nameInputRef} // 👈 this enables auto-focus
                  />

                  {touched.title && errors.title && (
                    <Typography
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.title}
                    </Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextEditor
                    value={values.description}
                    onChange={(content) => {
                      const baseContent =
                        content === "<p><br></p>" ? "" : content;
                      setFieldValue("description", baseContent);
                    }}
                  />
                </Grid>

                <Box sx={{ textAlign: "end", width: "100%" }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="custom-secondary-btn-admin-side"
                    sx={{
                      opacity: isLoading ? 0.6 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading
                      ? "Saving..."
                      : list?.id
                        ? "Update"
                        : "Create Return"}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );

  return (
    <>
      {showCrtReturnBtn && (
        <Button
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 1 }} /> Add Return Policy
        </Button>
      )}
      {showEditBtn && (
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{
              color: "#1976d2",
              ml: 1,
              bgcolor: "#e3f2fd",
              "&:hover": { bgcolor: "#bbdefb" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        className="search-modal-panel-style-set"
        sx={{ zIndex: "6000" }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
