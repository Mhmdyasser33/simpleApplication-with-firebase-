import React from 'react'
import { Alert , Card,Container , Button} from 'react-bootstrap'
import { useContextAuth } from '../../context/AuthContext';
import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
export const HomePage = () => {
  const { currentUser} = useContextAuth() ;
  const {logout} = useContextAuth() ;
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleLogOut = async () =>{
      setError("") ;
      try{
       await logout() ;
       navigate("/login")
      }catch(error){
        setError("failed to log out " + error) ;
      }
  }
  return (
    <Container style={{marginTop: "110px "}}>
    <Card>
        <Card.Body>
            <h2 className='text-center'> Profile  </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
           <strong>Email : {currentUser && currentUser.email} </strong>
        <Link to="/update"className='btn btn-primary w-100 text-center mt-2 '> Update Profile  </Link>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button className='btn btn-primary' onClick={handleLogOut}> log out </Button>
    </div>

  </Container>
  )
}
