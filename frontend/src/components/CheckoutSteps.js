import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';


function CheckoutSteps({step1, step2, step3, step4}) {
  
    
  
    return (
    <Nav className="justify-content-center mb-4" >
        <Nav.Item>
            {step1 ? (
                <LinkContainer to='/login' >
                    <Nav.Link>
                        Авторизоваться
                    </Nav.Link>

                </LinkContainer>
            ) : (
                <Nav.Link disabled >
                    Авторизоваться
                </Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/shipping' >
                    <Nav.Link>
                        Адрес доставки
                    </Nav.Link>

                </LinkContainer>
            ) : (
                <Nav.Link disabled >
                    Адрес доставки
                </Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/payment' >
                    <Nav.Link>
                        Способ оплаты
                    </Nav.Link>

                </LinkContainer>
            ) : (
                <Nav.Link disabled >
                    Способ оплаты
                </Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step4 ? (
                <LinkContainer to='/placeorder' >
                    <Nav.Link>
                        Размещение заказа
                    </Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled >
                    Размещение заказа
                </Nav.Link>
            )}
            
        </Nav.Item>
        
    </Nav>
  )
}

export default CheckoutSteps