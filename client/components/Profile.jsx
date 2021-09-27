import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { postUserThunk } from '../actions/users'
import Nav from './Nav'
import { useHistory } from 'react-router-dom'
import { getSuburbs} from '../apis/suburb_api'

import { autocompleteClasses } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl'
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListSubHeader from '@mui/material/ListSubheader'

import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// })

function Profile (props)  {
  const { dispatch } = props

  const [values, setValues] = useState({
    first: '',
    last: '',
    email: '',
    bio: '',
  })

  useEffect(() => {
    getSuburbs()
    .then(res => setSuburbs(res)
    )
  },[])

  const [editing, setEditing] = useState(false)
  const [gender, setGender] = useState('')
  const [newSuburb, setSuburb] = useState(0)
  const [theSuburbs, setSuburbs] = useState([])
  
  const handleSuburb = (e) => {
    e.preventDefault()
    setSuburb(e.target.value)
  }  
  
  const handleGender =(e) => {
    e.preventDefault()
    setGender(e.target.value)

  }  

  const toggleEditing = () => {
    setEditing(!editing)    
  }

  const handleChange =(e) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })  

  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      first_name: values.first,
      last_name: values.last,
      email: user.email,
      suburb_id: newSuburb,
      bio: values.bio,
      gender: gender, 

    }  
      dispatch(postUserThunk(updatedUser))  

      // props.history.push('/profile') 
  }


  const { first, last, bio} = values
  
  return (

    <>
    <Container sx={{ p: 2, margin: 'auto', mt: 10, width: '67.3vh', height: '70vh', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Box>
          <Grid item sx={{ mt: 7}}>
          <Avatar
              alt="Profile picture"
              src="/images/avatar.jpeg"
              border= "1px solid"
              sx={{ width: 110, height: 110 }}
              />
          </Grid>
          <Button sx={{ml: 1}}size="small">Edit Photo</Button>
        </Box>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" fontSize="h5.fontSize">
                Profile
              </Typography>
              <Divider sx={{width: '23ch'}}/>
              {/* <Typography sx={{mt: 2}}variant="body2" gutterBottom fontSize="h6.fontSize">
                About me:
              </Typography> */}

              <Stack sx={{ pr: 0 }}direction="row" justifyContent="">
                <Typography sx={{pr: 2, mt: 2}}variant="body2" gutterBottom fontSize="large">
                  Name: 
                </Typography>

                {editing?
                  <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '13ch' },
                  }}
                  noValidate
                  autoComplete="on"
                >
                    <TextField
                      label="First Name"
                      id="standard-size-small"
                      defaultValue="F.Name"
                      size="small"
                      variant="standard"
                      value={first}
                      onChange={handleChange}
                    />
                </Box>
              :<Typography sx={{mt: 2, pl:.5}}variant="body2" gutterBottom fontSize="large">
                  First
                </Typography>}

                {editing?
              <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '13ch' },
                  }}
                  noValidate
                  autoComplete="on"
                >
                    <TextField
                      label="Last Name"
                      id="standard-size-small"
                      defaultValue="L.Name"
                      size="small"
                      variant="standard"
                      value={last}
                      onChange={handleChange}
                    />
                </Box>
              :<Typography sx={{mt: 2, pl: 1}}variant="body2" gutterBottom fontSize="large">
                  Last
                </Typography>}
              </Stack>

              <Stack sx={{ pr: 0 }}direction="row" justifyContent="">
                <Typography sx={{pr: 1, mt: 0}}variant="body2" gutterBottom fontSize="large">
                  Gender: 
                </Typography>

                {editing?
              <Box>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label='Gender'
                  onChange={handleGender}
                  sx={{ width: '21ch' }}>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='gender diverse'>Gender Diverse</MenuItem>
                  <MenuItem value='prefer not to say'>Prefer not to say</MenuItem>
                </Select>
                </FormControl>
              </Box>
              :<Typography sx={{mt: 0}}variant="body2" gutterBottom fontSize="large">
                  CurrentGender
                </Typography>}
              </Stack>
              
              <Stack sx={{ pr: 0 }}direction="row" justifyContent="">
                <Typography sx={{pr: 1, mt: 0}}variant="body2" gutterBottom fontSize="large">
                  Suburb: 
                </Typography>

                {editing?
              <Box>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Suburb</InputLabel>
          <Select
            defaultValue=''
            onChange={handleSuburb}
            value={newSuburb}
            sx={{ width: '21ch' }}
            label='Suburb'>
             

            <ListSubHeader>Wellington</ListSubHeader>
            {theSuburbs && theSuburbs.filter(s => s.region === 'Wellington').map(s => ( 
            <MenuItem value={s.id}>{s.name}</MenuItem>
            ))}
            <ListSubHeader>Lower Hutt</ListSubHeader>
            {theSuburbs && theSuburbs.filter(s => s.region === 'Lower Hutt').map(s => (
            <MenuItem value={s.id}>{s.name}</MenuItem>
            ))}


            <ListSubHeader>Upper Hutt</ListSubHeader>
            {theSuburbs && theSuburbs.filter(s => s.region === 'Upper Hutt').map(s => (
            <MenuItem value={s.id}>{s.name}</MenuItem>
            ))}

            <ListSubHeader>Porirua</ListSubHeader>
            {theSuburbs && theSuburbs.filter(s => s.region === 'Porirua').map(s => (
            <MenuItem value={s.id}>{s.name}</MenuItem>
            ))}

          </Select>
              </FormControl>
              </Box>

              :<Typography sx={{mt: 0}}variant="body2" gutterBottom fontSize="large">
              CurrentSuburb
            </Typography>}
          </Stack>

              {editing?
              <TextField sx={{ mt: 4 }}  fullWidth id = 'outlined-required' multiline rows={6}  label = 'About me' name='bio' value={bio} onChange={handleChange}/>
              :
              <Stack sx={{ pr: 0 }}direction="row" justifyContent="">
              <Typography sx={{pr: 0, mt: 0}}variant="body2" gutterBottom fontSize="large">
                About Me:
              </Typography>
              <Typography sx={{pl: .4, mt: 0}}variant="body2" gutterBottom fontSize="large">
                Current bio information goes here
              </Typography>
              </Stack>}
            </Grid>

            <Stack direction="row" item sx={{pt: 0}}>
              <Box sx={{ "& button": { ml: 2, p: 0 } }}>
                {editing?
                <>
                <Button size="small" onClick={toggleEditing}>Cancel</Button>
                <Button size="small" onClick={handleSubmit}>Save Changes</Button>
                </>
                :<Button size="small" onClick={toggleEditing}>Edit Details</Button>}
              </Box>
            </Stack>

          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </>


  )}
  

  export default connect()(Profile) 