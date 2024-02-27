


### Anotações

- Value-Objects sao propriedades de uma entity com regra de negocio propria
- Acessors para validacoes
  - setters apenas para coisas que fazem sentido serem alteradas
  - entidade + casos de uso = dominio

- subdominios = setores (microsservicos ou pastas) do problema que vamos resolver
  - subdominio.application =  camada application, q tem repositories, use-cases, logica de aplicacao
  - subdominio.enterprise =  camada enterprise, q tem entities, logica de empresa

- sut = system under test

- a.b = 2 chama o set b(val) {}

- fetch = + de 1 retorno, get = 1 retorno
- findMany = + de 1 retorno, findBy = 1 retorno

- classe abstrata = somente extendida, nao instanciavel

- typescript this is left e this is right
  quando chamo this is Right, pro typescript, depois do isRight(), o tipo é Right

