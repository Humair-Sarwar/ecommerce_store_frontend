import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { useFormik } from "formik";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {
  useCreateWarranty,
  useUpdateWarranty,
} from "../../../hook/vendor/usePolicies";
import { handleError, handleSuccess } from "../../../toast";
import TextEditor from "../../../components/TextEditor";

export default function WarrantyModal({
  showEditBtn,
  showCrtWarrantyBtn,
  title_heading,
  list,
}) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const createWarrantyMutation = useCreateWarranty();
  const updateWarrantyMutation = useUpdateWarranty();
  const isLoading =
    createWarrantyMutation.isPending || updateWarrantyMutation.isPending;
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
        .required("Warranty title is required!")
        .trim(),
    }),
    onSubmit: async (values, action) => {
      const payload = {
        title: values?.title,
        description: values?.description,
      };

      if (list?.id) {
        updateWarrantyMutation.mutate(
          {
            id: list.id,
            formData: payload,
          },
          {
            onSuccess: (res) => {
              handleSuccess(res?.message || "Warranty updated successfully");
              setOpen(false);
            },
            onError: (error) => {
              const status = error?.response?.status;
              if (status === 422) {
                handleError("Warranty already exist!");
              } else if (status === 404) {
                handleError("Warranty not found");
              } else {
                handleError("Failed to update warranty");
              }
            },
          },
        );
      } else {
        createWarrantyMutation.mutate(payload, {
          onSuccess: () => {
            handleSuccess("Warranty created successfully");
            setOpen(false);
            action.resetForm();
          },
          onError: (error) => {
            const status = error?.response?.status;
            if (status === 422) {
              handleError("Warranty already exist!");
            } else {
              handleError("Failed to create warranty");
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
      }, 100);
    }
  }, [open]);

  const DrawerList = (
    <Box
      sx={{
        width: { xs: "100vw", sm: 580 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2.5,
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#0f172a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
            }}
          >
            <VerifiedUserOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "17px", color: "#0f172a", lineHeight: 1.2 }}>
              {title_heading} Warranty Policy
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#64748b", fontWeight: 500, mt: 0.25 }}>
              Define warranty coverage terms and conditions
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={toggleDrawer(false)}
          size="small"
          sx={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#64748b",
            "&:hover": { bgcolor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  p: 2.5,
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
                }}
              >
                <Grid container spacing={2} sx={{ width: "100%" }}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Policy Title"
                      variant="outlined"
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.title && touched.title)}
                      inputRef={nameInputRef}
                    />
                    {touched.title && errors.title && (
                      <Typography sx={{ fontSize: "12px", color: "#ef4444", fontWeight: 600, mt: 0.5 }}>
                        {errors.title}
                      </Typography>
                    )}
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a", mb: 1 }}>
                      Policy Details
                    </Typography>
                    <TextEditor
                      value={values.description}
                      onChange={(content) => {
                        const baseContent =
                          content === "<p><br></p>" ? "" : content;
                        setFieldValue("description", baseContent);
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.25, mt: 1 }}>
                      <Button
                        type="button"
                        onClick={toggleDrawer(false)}
                        className="custom-primary-btn-admin-side"
                      >
                        Cancel
                      </Button>
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
                            ? "Update Policy"
                            : "Create Warranty"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );

  return (
    <>
      {showCrtWarrantyBtn && (
        <Button
          onClick={toggleDrawer(true)}
          className="custom-secondary-btn-admin-side"
        >
          <AddIcon sx={{ mr: 0.75, fontSize: 18 }} /> Add Warranty Policy
        </Button>
      )}
      {showEditBtn && (
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={toggleDrawer(true)}
            size="small"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              color: "#0f172a",
              ml: 0.75,
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
              "&:hover": { bgcolor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 16 }} />
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
