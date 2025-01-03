# github-random-repository
O objetivo do projeto é introduzir sobre APIs externas, lidar com requisições assíncronas e gerenciar diferentes estados da interface do usuário com JavaScript.

Link para o [Projeto GitHub Random Repository](https://roadmap.sh/projects/github-random-repo)

![Exemplo para o projeto](https://assets.roadmap.sh/guest/github-repo-finder-n2qz4.png)

## Ferramentas utilizadas no desenvolvimento

- HTML
- CSS
- JavaScript
    - Trabalhar com APIs externas
    - Requisições assíncronas
    - Gerenciar diferentes estados da interface do usuário
- NPM
    - Octokit
    - Webpack
    - Webpack-CLI
- [VS Code Studio](https://code.visualstudio.com/)
    - Extensão: Live Server

## Observações
O comando abaixo é relacionado ao webpack-cli. Ele executará a ferramenta webpack do arquivo node_modules, iniciando com o arquivo script.js e encontrando quaisquer instruções necessárias para substitui-los pelo código apropriado. Assim, por padrão, será criado a pasta dist com o arquivo main.js que será utilizado na aplicação.
```bash
./node_modules/.bin/webpack ./script.js --mode=development
```
O arquivo webpack.config.js, localizado neste repositório, elimina a necessidade de escrever o comando inteiro, ficando na seguinte forma:
```bash
./node_modules/.bin/webpack
```
Quando o arquivo script.js for atualizado é necessário executar o comando novamente.
