import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { calcularMarca, obtenerDiferenciaYear, obtenerPlan } from '../helpers/helpers';

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px; //grow shrink
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  padding: 1rem;

  transition: background-color .3s ease;
  margin-top: 2rem;
  /* sintaxis de sass */
    &:hover{
      background-color: #26C6DA;
      cursor: pointer;
    }
`;

const Error1 = styled.div`
  background-color: red;
  color: #fff;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ( { guardarResumen, guardarCargando } ) => {

  // 091 Leyendo la informacion que el usuario Selecciona
  const [datos, guardarDatos] = useState({
    marca: '',
    year: '',
    plan: '',
  });

  // nohay error hasta que deja vacio los campos marca year plan
  const [ error, guardarError ] = useState( false );

  const { marca, year, plan } = datos;

  // Leer los datos del formulario y colocarlos en el state
  const obtenerInformacion = e => {
    guardarDatos({
      ...datos,
      [ e.target.name ] : e.target.value,
    })
  }

  // Cuando el usuario presiona submit
  const cotizarSeguro = e => {
    e.preventDefault();

    if ( marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
      guardarError( true );
      return;
    }
    guardarError(false );
    // Al pasar la validación.
    // Una base de 2000
    let resultado = 2000;

    // obtener la diferencia de años
    const diferencia = obtenerDiferenciaYear( year );
    // console.log(diferencia);

    // por cada año restar el 3%    
    resultado -= ( ( diferencia * 3 ) * resultado ) / 100;
    // console.log(resultado);

    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    resultado = calcularMarca( marca ) * resultado; //incremento
    // console.log(resultado);

    // Plan Básico aumenta 20%
    // completo 50%
    const incrementoPlan = obtenerPlan( plan );
    // console.log(incrementoPlan);

    resultado = parseFloat(( incrementoPlan * resultado).toFixed(2) );

    // console.log(resultado);
    guardarCargando( true );
    
    setTimeout(() => {
      
      guardarCargando( false );
      // Con esto resumen en el App.js, tendrá la info resultado y datos
      guardarResumen( {
        cotizacion: Number(resultado),
        datos, // del state
      })
    }, 2000);
    
    
  }

  return ( 
    <form
      onSubmit= { cotizarSeguro }
    >
      { error ? <Error1>Todos los campos son obligatorios</Error1> : null}
      <Campo>
        <Label>Marca</Label>
        <Select
          name= "marca"
          value= { marca }
          onChange= {obtenerInformacion }
        >
          <option value="">-- Seleccione -- </option>
          <option value="americano" >Americano </option>
          <option value="europeo" >Europeo </option>
          <option value="asiatico">Asiatico </option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año</Label>
        <Select
          name= "year"
          value= { year }
          onChange= {obtenerInformacion }
        >
        <option value="">-- Seleccione --</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
        <option value="2013">2013</option>
        <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Plan</Label>
        <InputRadio 
          type="radio" 
          name="plan"
          value="basico"
          checked= { plan === 'basico'}
          onChange= {obtenerInformacion }
        /> Básico
        
        <InputRadio
          type="radio" 
          name="plan"
          value="completo"
          checked= { plan === 'completo'}
          onChange= {obtenerInformacion }
        /> Completo
      </Campo>

      <Boton type="submit">Cótizar</Boton>

    </form>
   );
}

Formulario.propTypes = {
  guardarResumen: PropTypes.func.isRequired,
  guardarCargando: PropTypes.func.isRequired
}

export default Formulario;