import React from 'react'
import { Alert, Card, Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useContextAuth } from '../../context/AuthContext';
import { useState , useRef} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';

export const Login = () => {
  const { login } = useContextAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation() ;
  const redirectRoute =    location.state?.path || "/" ;
  /* const redirectPage = location.state?.path|| "/" */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectRoute);
    } catch (error) {
      setError("Failed to log in ");
    }
    setLoading(false);
  };
  return (
  <Container style={{marginTop: "110px "}}>
    <Card>
        <Card.Body>
            <h2 className='text-center'> Login  </h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} />
      </Form.Group>


      <Button variant="primary" type="submit" className='w-100' disabled={loading}>
      Login
      </Button>
    </Form>
    <div className='text-center w-100 m-2'>
        <Link to="/forgot-password">Forgot Password</Link>
    </div>
        </Card.Body>

    </Card>
    <div className='w-100 m-2 text-center'>
     Need an account?<Link to="/signup" className='ml-2'> Sign Up </Link>
    </div>
  </Container>
  )
}
