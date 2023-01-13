import React, { useState } from 'react'
import {  gql, useApolloClient } from '@apollo/client'

const EXISTE = gql`
  query Existe ($nome: String!, $senha: String!) {
    existe (nome: $nome, senha: $senha){
      nome
      id
    }
  }
`
const ambiente = '11'
const REGISTRAR_ENTRADA = gql`
  mutation RegistrarEntrada ($usuario: ID!, $ambiente: ID!){
    registrarEntrada(usuario: $usuario, ambiente: $ambiente){
      entrada
      saida
    }
  }
`

const App = () => { 
  const client = useApolloClient()
  const [nome, setNome] = useState ('')
  const [senha, setSenha] = useState('')
  const [usuarioAtivo, setUsuarioAtivo] = useState()
  const fazerLogin = async () => {
    try{
      const result = await client.query({
          query: EXISTE,
          variables: {nome, senha}
      })
      // console.log(result)
      const {id} = result.data.existe
      console.log({id, nome})
      setUsuarioAtivo({id, nome})
      const participacao = await client.mutate({
        mutation: REGISTRAR_ENTRADA,
        variables: {usuario: id, ambiente}
      })
      console.log(participacao)
    }
    catch (e){
      console.log(e)
    }
  }   
  return (
    <div className="container border round my-5">
      <div className="row">
        <div className="col-6">

          <div
            className="form-floating my-3">
            <input 
              type="text" 
              className="form-control" 
              id="usuarioInput" 
              placeholder="Usuário"
              value={nome}
              onChange={e => setNome(e.target.value)}/>
            <label 
              htmlFor="usuarioInput">Usuário</label>
          </div>

        </div>
        <div className="col-6">

          <div 
            className="form-floating my-3">
            <input 
              type="password" 
              className="form-control" 
              id="senhaInput" 
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)} />
            <label htmlFor="senhaInput">Senha</label>
          </div>

        </div>
        <div className="col-12">
          <button 
            className="btn btn-primary w-100 mb-2"
            onClick={fazerLogin}>
              OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default App