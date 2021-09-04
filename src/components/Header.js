import React from 'react';
import PropTypes from 'prop-types';
// 086 Agregando Emotion para Styled Components
// https://emotion.sh/docs/introduction
// npm i @emotion/styled @emotion/react
// import styled from '@emotion/styled/types/base';

// Extensions para autocompleto. Escribir en buscar extensions: styled components

// vscode-styled-components
// Syntax highlighting and IntelliSense for styled-components.

// Styled-Components Snippets for VSCode

// Styled-Snippets
// v1.0.3

import styled from '@emotion/styled';

// Nota en chrome que crea una class="Una serie de letras y números"
// <header class="css-1x3l0sf"><h1> Cotizador de Seguros </h1></header> */

// styled components
const ContenedorHeader = styled.header`
  background-color: #26C6DA;
  padding: 10px;
  font-weight: bold;
  color: #FFFFFF;
`;

const TextoHeader = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-family: 'Slabo 27px', serif ;
  text-align: center; 
`;

const Header = ( { titulo } ) => {
  return ( 
    <ContenedorHeader>
      
      <TextoHeader> { titulo } </TextoHeader>
      
    </ContenedorHeader>
   );
}
 
Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  
}

export default Header;