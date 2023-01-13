//não recebe coisa alguma e só exibe o texto
const helloTaggedTemplates = () => console.log('Hello, Tagged Templates')
helloTaggedTemplates``

//strings é uma lista com todas as strings literais (especificadas sem ${})
//a seguir temos uma lista de parâmetros. neste caso somente a idade
const podeDirigir = (strings, idade) => strings[0] + (idade >= 18 ? "" : "não ") + "pode dirigir"

console.log(podeDirigir`Com 17 anos uma pessoa ${17}`)
