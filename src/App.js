import React, { useState } from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #FFFFFF;
  padding: 3rem;
`;

function App() {

  // 096 Creando un Componente para Resumen de cotización
  // guardarResumen pasa al componente Formulario. Toma los valores del Formulario y se guardan en resumen. Con esto se pasará a dos componentes diferentes 
  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: '',
    }
  });
  // Extraer datos
  const { cotizacion, datos } = resumen;

  // 100 Agregando un Spinner
  const [cargando, guardarCargando] = useState( false );

  return (  
    <Contenedor>
      <Header titulo='Cotizador de Seguros' />

      <ContenedorFormulario>
        <Formulario 
          guardarResumen={ guardarResumen } 
          guardarCargando= { guardarCargando }
        />

          {
            cargando ? <Spinner /> : null
          }
          
          <Resumen datos={ datos } />
          
          {
            !cargando
              ?            
              <Resultado cotizacion= { cotizacion } />
              : null
          }
        

      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
