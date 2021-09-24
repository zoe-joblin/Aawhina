import React from 'react'
import toggleLoginForm from './Welcome'
import connect from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'



function Login ()  {
  const { loginWithRedirect } = useAuth0()

  return (
  <>
  <Box sx={{ marginTop:8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
  <Button onClick={() => loginWithRedirect()}>Register/Log In</Button>
  </Box>
  </>
  )}

export default Login

// function Login () {
//   return (
//     <>
//       <h3>Login Component</h3 >
//       <p>form goes here</p>
//       <button >Submit</button>
//       <button onClick={toggleLoginForm}>Cancel</button>

//     </>
//   )
// }

// export default Login
// // export default connect()(Login)
