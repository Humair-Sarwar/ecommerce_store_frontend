import { Box, Button, Grid, IconButton, Pagination, Tooltip, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Wishlist = () => {
  return (
    <>
      <Box sx={{width: '100%'}}>
              <Typography variant='h2' sx={{fontSize: '25px', fontWeight: '600', display: 'flex', alignItems: 'center', mb: 3}}><FavoriteBorderIcon sx={{mr: 1}}/> My Wishlist</Typography>

        <Grid container spacing={1}>
                                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mr: 1}}>New test product with open stock</Typography>
                                        </Box>
                                        </Box>
                                         <Box sx={{display: 'flex', alignItems: 'center'}}>
                   
                    <Tooltip title="View" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="success"
                          >
                            <VisibilityIcon sx={{fontSize: '19px'}}/>
                          </IconButton>
                        </Tooltip>
                     
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="error"
                          >
                            <DeleteIcon sx={{fontSize: '19px'}} />
                          </IconButton>
                        </Tooltip>
                        </Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mr: 1}}>New test product with open stock</Typography>
                                        </Box>
                                        </Box>
                                         <Box sx={{display: 'flex', alignItems: 'center'}}>
                   
                    <Tooltip title="View" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="success"
                          >
                            <VisibilityIcon sx={{fontSize: '19px'}}/>
                          </IconButton>
                        </Tooltip>
                     
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="error"
                          >
                            <DeleteIcon sx={{fontSize: '19px'}} />
                          </IconButton>
                        </Tooltip>
                        </Box>

                                      </Box>
                                    </Box>
                                  </Grid> <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Box sx={{borderRadius: '10px', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor: '#f3f5f9', border: '1px solid #e0e0e0'}}>
                                      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                          <Box className='card-order-detail-img-target'><img src="/Smart-Watches-Products-Eclat-UK.png" alt="" /></Box>
                                          <Box><Typography variant='h5' sx={{fontSize: '14px', mr: 1}}>New test product with open stock</Typography>
                                        </Box>
                                        </Box>
                                         <Box sx={{display: 'flex', alignItems: 'center'}}>
                   
                    <Tooltip title="View" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="success"
                          >
                            <VisibilityIcon sx={{fontSize: '19px'}}/>
                          </IconButton>
                        </Tooltip>
                     
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            
                            size="small"
                            aria-label="edit"
                            color="error"
                          >
                            <DeleteIcon sx={{fontSize: '19px'}} />
                          </IconButton>
                        </Tooltip>
                        </Box>

                                      </Box>
                                    </Box>
                                  </Grid>
                                  </Grid>
                                   <Box
                                                            sx={{
                                                              display: "flex",
                                                              justifyContent: "center",
                                                              alignItems: "center",
                                                              my: 2,
                                                            }}
                                                          >
                                                            <Pagination
                                                              count={3}
                                                              page={1}
                                                              // onChange={(event, value) => setPage(value)}
                                                              variant="outlined"
                                                              color="secondary"
                                                              sx={{ mt: 2 }}
                                                            />
                                                          </Box>
      </Box>
    </>
  )
}

export default Wishlist
