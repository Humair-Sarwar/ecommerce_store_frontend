import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";


import { useFormik } from "formik";
import { generateSlug } from "../../utils/apis/slugGenerate";
import { addImageApi, createBrandApi, createCategoryApi } from "../../utils/apis/APIs";
import { handleError, handleSuccess } from "../../toast";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}






const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BrandModal() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [imageCategory, setImageCategory] = useState(null);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        is_active: true,
        brand_name: "",
        sort_order: 1,
      },
      validationSchema: yup.object({
        brand_name: yup.string().min(3).max(200).required('Brand name is required!'),
        sort_order: yup.number().required('Sort order is required!'),
      }),
      onSubmit: async (values, action) => {
        let slug = generateSlug(values.brand_name)
        console.log("created category testing...", values, slug);

        const res = await createBrandApi({...values, business_id: "123", slug})
        if(res.status == 201){
          handleSuccess('New Brand Added Successfully!');
          action.resetForm();
          setOpen(false);
          setParentCategoryIdSelect()
        }else{
          handleError('Internal Server Error!');
        }
      },
    });

    

    const getPhoto = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Show preview
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImageCategory(reader.result); // this is just for preview
  };

  // Upload the actual file to backend
  const formData = new FormData();
  formData.append('userfile', file); // `userfile` must match your backend

  try {
    const res = await addImageApi(formData);
    console.log(res.data.result); // { fieldname, filename, path, etc. }
  } catch (err) {
    console.error('Image upload error:', err);
  }
};



const nameInputRef = React.useRef(null);

React.useEffect(() => {
  if (open) {
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100); // Small delay to ensure DOM is ready
  }
}, [open]);

console.log(imageCategory, '------------------------>>>>>>>>>>>')
  const DrawerList = (
    <Box
      sx={{ width: 630, p: 2 }}
      role="presentation"
      className="inner-modal-search-view-set"
    >
      <Box sx={{ textAlign: "start" }} onClick={toggleDrawer(false)}>
        <CloseIcon sx={{ cursor: "pointer" }} />
      </Box>
      <Typography sx={{mb: 1, fontWeight: '600'}}>Create Brand</Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 2, sm: 2, md: 2 }}>
          <Box  sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgb(197, 196, 196)",
              borderRadius: "10px",
              padding: "8px 8px",
              height: '100%'
            }}>
              <Box component="label" sx={{border: '1px dotted black', cursor: 'pointer', borderRadius: '5px', position: 'relative'}} className='image-upload-box-target'><img src={imageCategory == null ? "/empty-image.jpg" : imageCategory}/>
                            <VisuallyHiddenInput type="file" name='photo' accept="image/jpg, image/jpeg, image/png" onChange={getPhoto}/>

                <AddCircleIcon sx={{backgroundColor: 'white', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', color: '#9c27b0', position: 'absolute', right: '-5px', bottom: '-5px'}}/>
                {/* <RemoveCircleIcon sx={{backgroundColor: 'white', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', color: 'red', position: 'absolute', right: '-5px', bottom: '-5px'}}/> */}
              </Box>
            
            </Box>













        </Grid>
       <Grid size={{ xs: 10 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgb(197, 196, 196)",
                    borderRadius: "10px",
                    padding: "2px 15px",
                    height: '100%'
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "13px",
                      textWrap: "nowrap",
                      mr: 1,
                    }}
                  >
                    Is Active :
                  </Typography>

                    <Switch  name="is_active"
                    color="secondary"
                    checked={values.is_active}
                    onChange={handleChange} />

                </Box>
              </Grid>

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
              <Grid size={{ xs: 8 }}>
                <TextField
  fullWidth
  size="small"
  color="secondary"
  label="Name"
  variant="outlined"
  type="text"
  name="brand_name"
  value={values.brand_name}
  onChange={handleChange}
  onBlur={handleBlur}
  error={Boolean(errors.brand_name && touched.brand_name)}
   inputRef={nameInputRef} // 👈 this enables auto-focus
/>

{touched.brand_name && errors.brand_name && (
  <Typography sx={{ fontSize: '12px', color: 'red', mt: 0.5 }}>
    {errors.brand_name}
  </Typography>
)}
              </Grid>
              <Grid size={{ xs: 4 }}>
                <TextField
                  fullWidth
                  size="small"
                  color="secondary"
                  label="Sort Order"
                  variant="outlined"
                  type="number"
  name="sort_order"
  value={values.sort_order}
  onChange={handleChange}
  onBlur={handleBlur}
  error={Boolean(errors.sort_order && touched.sort_order)}
                />
                {touched.sort_order && errors.sort_order && (
  <Typography sx={{ fontSize: '12px', color: 'red', mt: 0.5 }}>
    {errors.sort_order}
  </Typography>
)}
              </Grid>
       
              

             

            
              

              <Box sx={{ textAlign: "end", width: "100%" }}>
                <Button
  type="submit"
  className="custom-secondary-btn-admin-side"
>
  Create Brand
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
      <Button
        onClick={toggleDrawer(true)}
        className="custom-secondary-btn-admin-side"
      >
        <AddIcon sx={{ mr: 1 }} /> Create Brand
      </Button>
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
