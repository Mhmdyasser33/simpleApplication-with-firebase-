import React from 'react'
import { Alert, Card, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useContextAuth } from '../../context/AuthContext';
import { useState , useRef } from 'react';

export const ForgotPassword = () => {
  const {resetpassword} = useContextAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message , setMessage] = useState("") ;
  const emailRef = useRef() ;
  const handleSubmit = async (e) => {
    e.preventDefault() ;
    try {
      setError("");
      setMessage("")
      setLoading(true);
      await resetpassword(emailRef.current.value);
     setMessage("check your inbox to reset your password")
    } catch (error) {
      setError("Failed to reset password " + error);
    }
    setLoading(false);
  };
  return (
  <Container style={{marginTop: "110px "}}>
    <Card>
        <Card.Body>
            <h2 className='text-center'> Reset Password  </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label htmlFor='emailRef'>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id='emailRef' ref={emailRef} />
      </Form.Group>
      <Button variant="primary" type="submit" className='w-100' disabled={loading}>
       Reset
      </Button>
    </Form>
    <div className='text-center w-100 m-2'>
        <Link to="/login">Login</Link>
    </div>
        </Card.Body>
    </Card>
    <div className='w-100 m-2 text-center'>
     Need an account?<Link to="/signup" className='ml-2'> Sign Up </Link>
    </div>
  </Container>
  )
}
