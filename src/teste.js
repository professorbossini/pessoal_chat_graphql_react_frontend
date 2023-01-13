import React, { useState } from 'react'
import {  gql, useApolloClient } from '@apollo/client'

const ambiente = "11"
const EXISTE = gql`
  query Existe ($nome: String!, $senha: String!) {
    existe (nome: $nome, senha: $senha){
      nome
      id
    }
  }
`
const MENSAGENS_POR_AMBIENTE = gql`
  query MensagensPorAmbiente($ambiente: ID!){
    mensagensPorAmbiente(ambiente: $ambiente){
      texto
    }
  }
`
const REGISTRAR_MENSAGEM = gql`
  mutation RegistrarMensagem($texto: String!, $usuario: ID!, $ambiente: ID!){
    registrarMensagem(texto: $texto, usuario: $usuario, ambiente: $ambiente)
  }
`
const App = () => {
  const client = useApolloClient()
  const [nome, setNome] = useState ('')
  const [senha, setSenha] = useState('')
  const [usuariosOnline, setUsuariosOnline] = useState([])
  const [mensagensPorAmbiente, setMensagensPorAmbiente] = useState([])
  
  const fazerLogin = async () => {
    try{
      const result = await client.query({
        query: EXISTE,
        variables: {nome, senha}
      })
      setUsuariosOnline([...usuariosOnline, nome])
      const mensagens = await client.query({
        query: MENSAGENS_POR_AMBIENTE,
        variables: {ambiente}
      })
      console.log(mensagens.data.mensagensPorAmbiente)
      setMensagensPorAmbiente(mensagens.data.mensagensPorAmbiente) 
    }
    catch (e){
      console.log(e)
    }
  }
  return (
    <div className="container border round my-5">
      <div className="row">
        <div className="col-6">

          <div className="form-floating my-3">
            <input type="text" className="form-control" id="usuarioInput" placeholder="Usuário"  value={nome} onChange={e => setNome(e.target.value)}/>
            <label htmlFor="usuarioInput">Usuário</label>
          </div>

        </div>
        <div className="col-6">

          <div className="form-floating my-3">
            <input type="password" className="form-control" id="senhaInput" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
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
      <div className="row">
        <div className="col-4">
          <ul className="list-group">
            {
              usuariosOnline.map(u => (
                <li className="list-group-item">{u}</li>
              ))
            }
          </ul>
        </div>
        <div className="col-8">
          <ul className="list-group">
            {
              mensagensPorAmbiente.map(m => (
                <li className="list-group-item">{m.texto}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App