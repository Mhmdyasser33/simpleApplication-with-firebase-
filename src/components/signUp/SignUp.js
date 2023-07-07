import React, { useState } from 'react'
import { Alert, Card, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useContextAuth } from '../../context/AuthContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const { signup } = useContextAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const PasswordConfirmationRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== PasswordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error); // Log the error to the console for debugging
      setError("Failed to create an account: " + error.message);
    }

    setLoading(false);
  };

  return (
    <Container style={{ marginTop: "110px " }}>
      <Card>
        <Card.Body>
          <h2 className='text-center'> Signup </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Enter ConfirmationPassword" ref={PasswordConfirmationRef} />
            </Form.Group>

            <Button variant="primary" type="submit" className='w-100' disabled={loading}>
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='text-center m-2 w-100'>
        Already have an account?<Link to="/login" className='ml-2'> Log In </Link>
      </div>
    </Container>
  )
}
