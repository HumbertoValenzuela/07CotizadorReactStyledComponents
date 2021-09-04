import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
// https://www.npmjs.com/package/react-transition-group
// npm i react-transition-group
// Librería para hacer transición ocuapando styled components
import { TransitionGroup, CSSTransition} from 'react-transition-group'; //autocompletado mejora

const Mensaje = styled.p`
  background-color: rgb(127, 224, 237);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;
// https://tobiasahlin.com/spinkit/

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: .5rem;
  border: 1px solid #26c6da;
  background-color: rgb(127, 224, 237);
  margin-top: 1rem;
  position: relative;
`;

const TextoCotizacion = styled.div`
  color: #00838F;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Resultado = ( { cotizacion } ) => {

  // Using React, findDOMNode is deprecated in StrictMode is thrown as a warning when using react-transition-group
  // Para corregir el warning agregar createRef. <CSSTransition nodeRef= {nodeRef}. <TextoCotizacion ref={ nodeRef } >
  const nodeRef = createRef(null);

  return ( 
    // valor inicial
    ( cotizacion === 0 ) 
      ? <Mensaje>Elige marca, año y tipo de seguros</Mensaje> 
      : 
        (
          <ResultadoCotizacion>
            {/* Lo que este dentro de group y css transition es lo que se anima */}
            <TransitionGroup              
              component= 'div' // nombre el elemento
              className= "resultado"
            >
              <CSSTransition
                nodeRef= {nodeRef}
                classNames= "resultado"
                key= {cotizacion}
                timeout= {{ enter: 500, exit: 500 }}
              >

                <TextoCotizacion ref={ nodeRef } >El total es: ${cotizacion}</TextoCotizacion>            

              </CSSTransition>

            </TransitionGroup>
          </ResultadoCotizacion>
        )

  );
}

Resultado.propTypes = {
  cotizacion: PropTypes.number.isRequired,  
}

export default Resultado;