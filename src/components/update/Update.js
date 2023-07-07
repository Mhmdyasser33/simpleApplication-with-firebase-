import React from 'react'
import {Card , Alert , Form , Button , Container} from 'react-bootstrap'
import { useState  , useRef } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useContextAuth } from '../../context/AuthContext';
export const Update = () => {
    const { updateUserMail ,  updateUserPassword , currentUser} = useContextAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const PasswordConfirmationRef = useRef();
  const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== PasswordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [] ;
    setError("") ;
    setLoading(true);
    if(emailRef.current.value !== currentUser.email){
      promises.push(updateUserMail(emailRef.current.value));
    }
    if(passwordRef.current.value){
      promises.push(updateUserPassword(passwordRef.current.value));
    }
    Promise.all(promises)
    .then(()=>{
      navigate("/")
    })
    .catch((error) =>{
      setError("failed to update account" + error) ;
    })
    .finally(()=>{
      setLoading(false) ;
    })
  };
  return <Container style={{ marginTop: "110px " }}>
  <Card>
    <Card.Body>
      <h2 className='text-center'> Update Profile  </h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" ref={passwordRef}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Enter ConfirmationPassword"  ref={PasswordConfirmationRef}  />
        </Form.Group>

        <Button variant="primary" type="submit" className='w-100'  disabled={loading} >
          Update
        </Button>
      </Form>
    </Card.Body>
  </Card>
  <div className='text-center m-2 w-100'>
<Link to="/" className='ml-2'> Cancel </Link>
  </div>
</Container>
}
