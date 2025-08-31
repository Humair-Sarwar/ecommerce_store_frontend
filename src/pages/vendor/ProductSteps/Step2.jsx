import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DraftsIcon from '@mui/icons-material/Drafts';
import PublishIcon from '@mui/icons-material/Publish';
import TextEditor from '../../../components/TextEditor';
import SaveIcon from '@mui/icons-material/Save';
import MultipleSelectChip from '../../../components/MultiSelectChip';


const Step2 = ({handleBackStep}) => {
   const [productType, setProductType] = React.useState(1);
        const handleChange = (event) => {
      setProductType(event.target.value);
    };
    console.log(productType)
  return (
    <>
      <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{mb: 2}}>
                    <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label" color='secondary'>Product Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    label="Age"
    onChange={handleChange}
    color='secondary'
  >
    <MenuItem value={1} sx={{fontSize: '14px'}}>Simple Product</MenuItem>
    <MenuItem value={2} sx={{fontSize: '14px'}}>Variable Product</MenuItem>
  </Select>
</FormControl>
                  </Grid>

                   {productType == 1 ? 
                   <>
                   <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                     <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "2px 15px",
                height: "100%",
              }}
            >
              

              <FormControlLabel
                sx={{
                    mr: 5,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="is_active_for_buy"
                    checked={true}
                    // onChange={handleChange}
                  />
                }
                label="Raw Material"
              />
               <FormControlLabel
                sx={{
                     mr: 5,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="is_active_for_buy"
                    checked={true}
                    // onChange={handleChange}
                  />
                }
                label="Is on sale"
              />
              
            </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="SKU" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                      <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label" color='secondary'>Product Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    label="Age"
    onChange={handleChange}
    color='secondary'
  >
    <MenuItem value={11} sx={{fontSize: '14px'}}>In Stock</MenuItem>
    <MenuItem value={22} sx={{fontSize: '14px'}}>Out of Stock</MenuItem>
  </Select>
</FormControl>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Min Stock Alert" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Regular Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Sale Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Wholesale Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
<FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label" color='secondary'>IMEI/Serial No</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    label="Age"
    onChange={handleChange}
    color='secondary'
  >
    <MenuItem value={11} sx={{fontSize: '14px'}}>IMEI No</MenuItem>
    <MenuItem value={22} sx={{fontSize: '14px'}}>Serial No</MenuItem>
  </Select>
</FormControl>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="IMEI/Serial No" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Autocomplete
                      disablePortal
                      options={['first']}
                      renderInput={(params) => <TextField {...params} label="Attach Warranty Policy" />}
                      size='small'
                      fullWidth
                      color='secondary'
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Autocomplete
                      disablePortal
                      options={['first']}
                      renderInput={(params) => <TextField {...params} label="Attach Return Policy" />}
                      size='small'
                      fullWidth
                      color='secondary'
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Weight(kg)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Length(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                       <TextField id="outlined-basic" label="Width(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Height(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                                       
                                      <Button
          className="custom-secondary-btn-admin-side"
                sx={{mr: 1}}
        >
          <HelpIcon sx={{ mr: 1 }} />Add Question/Options Or Description
        </Button>
        
                                      

                  </Grid></> : <>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Autocomplete
                      disablePortal
                      options={['first']}
                      renderInput={(params) => <TextField {...params} label="Select Attribute" />}
                      size='small'
                      fullWidth
                      color='secondary'
                    />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8 }}>
                    <MultipleSelectChip/>
                    </Grid>
                     <Grid size={{ xs: 12, sm: 6, md: 1 }}><Button
          // onClick={toggleDrawer(true)}
         
          className="custom-primary-btn-admin-side"
          sx={{mr: 1}}
        >
           Save
        </Button></Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}><Button
          // onClick={toggleDrawer(true)}
         
          className="custom-secondary-btn-admin-side"
          sx={{mr: 1}}
        >
           Get All Variations of Product
        </Button></Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}><Divider sx={{my: 4}}/></Grid>










<Grid size={{ xs: 12, sm: 6, md: 12 }}>
                     <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid rgb(197, 196, 196)",
                borderRadius: "10px",
                padding: "2px 15px",
                height: "100%",
              }}
            >
              
              <Box sx={{border: '1px dotted #acacacff', borderRadius: '5px', padding: '2px 5px', mr: 2, fontWeight: '600', fontSize: '13px'}}>Ice Blue</Box>
              <FormControlLabel
                sx={{
                    mr: 5,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="is_active_for_buy"
                    checked={true}
                    // onChange={handleChange}
                  />
                }
                label="Raw Material"
              />
               <FormControlLabel
                sx={{
                     mr: 5,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                  },
                }}
                control={
                  <Checkbox
                    size="small"
                    color="secondary"
                    name="is_active_for_buy"
                    checked={true}
                    // onChange={handleChange}
                  />
                }
                label="Is on sale"
              />
              
            </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                   <TextField id="outlined-basic" label="Variation Title" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                   image
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="SKU" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
<FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label" color='secondary'>Product Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    label="Age"
    onChange={handleChange}
    color='secondary'
  >
    <MenuItem value={11} sx={{fontSize: '14px'}}>In Stock</MenuItem>
    <MenuItem value={22} sx={{fontSize: '14px'}}>Out of Stock</MenuItem>
  </Select>
</FormControl>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Min Stock Alert" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Regular Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Sale Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="Wholesale Price" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
<FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label" color='secondary'>IMEI/Serial No</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productType}
    label="Age"
    onChange={handleChange}
    color='secondary'
  >
    <MenuItem value={11} sx={{fontSize: '14px'}}>IMEI No</MenuItem>
    <MenuItem value={22} sx={{fontSize: '14px'}}>Serial No</MenuItem>
  </Select>
</FormControl>
                  </Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField id="outlined-basic" label="IMEI/Serial No" fullWidth size='small' color='secondary' variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Autocomplete
                      disablePortal
                      options={['first']}
                      renderInput={(params) => <TextField {...params} label="Attach Warranty Policy" />}
                      size='small'
                      fullWidth
                      color='secondary'
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Autocomplete
                      disablePortal
                      options={['first']}
                      renderInput={(params) => <TextField {...params} label="Attach Return Policy" />}
                      size='small'
                      fullWidth
                      color='secondary'
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Weight(kg)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Length(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                       <TextField id="outlined-basic" label="Width(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                        <TextField id="outlined-basic" label="Height(cm)" fullWidth size='small' color='secondary' variant="outlined" />

                  </Grid>
                 
                  <Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{mb: 2}}>
                    <Box component={'h3'} sx={{fontSize: '12px', mb: 1, mt: 2}}>Variation Description:</Box>
                     <TextEditor/></Grid>
                   <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Button
          className="custom-secondary-btn-admin-side"
                sx={{mr: 1}}
        >
          <HelpIcon sx={{ mr: 1 }} />Add Question/Options Or Description
        </Button><Button
          className="custom-primary-btn-admin-side"
       sx={{mr: 1}}
        >
          <SaveIcon sx={{ mr: 1 }} />Save
        </Button>
       
                                        </Box>

                  </Grid>












                  </>}
                  <Grid size={{ xs: 12, sm: 6, md: 12 }}><Divider sx={{my: 4}}/></Grid>
        <Button
          className="custom-secondary-btn-admin-side"
       sx={{mr: 1}}
        >
          <CheckBoxIcon sx={{ mr: 1 }} />Included In the Box
        </Button>
        <Button
          className="custom-secondary-btn-admin-side"
       sx={{mr: 1}}
        >
          <LocalMallIcon sx={{ mr: 1 }} />Buy It With
        </Button>
           <Grid size={{ xs: 12, sm: 6, md: 12 }}><Divider sx={{my: 4}}/></Grid>
<Grid size={{ xs: 12, sm: 6, md: 12 }} sx={{textAlign: 'end'}}>
  
  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <Button
          onClick={()=>handleBackStep()}
         
          className="custom-primary-btn-admin-side"
          sx={{mr: 1}}
        >
          <ArrowBackIcon/> Back
        </Button>
        <Box>
<Button
          // onClick={toggleDrawer(true)}
         
          className="custom-primary-btn-admin-side"
          sx={{mr: 1}}
        >
          <DraftsIcon sx={{mr: 1}}/> Draft
        </Button>
        <Button
          // onClick={toggleDrawer(true)}
         
          className="custom-primary-btn-admin-side"
          sx={{mr: 1}}
        >
          <PublishIcon sx={{mr: 1}}/> Publish
        </Button>
        <Button
          // onClick={toggleDrawer(true)}
         
          className="custom-secondary-btn-admin-side"
          sx={{mr: 1}}
        >
          <DraftsIcon sx={{mr: 1}}/> Draft And Stock
        </Button>
        <Button
          // onClick={toggleDrawer(true)}
         
          className="custom-secondary-btn-admin-side"
          
        >
          <PublishIcon sx={{mr: 1}}/> Publish And Stock
        </Button>
        </Box>
  </Box>
         
</Grid>
                  </Grid>
                    
    </>
  )
}

export default Step2
