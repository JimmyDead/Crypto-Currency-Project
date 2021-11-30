# Crypto-Currency-Project
Projeto de corretora de crypto moedas usando react-native para a aula de dispositivo moveis, Centro Universitario Senac Santo Amaro


Integrantes:
Marcos Vinícius Santos Souza

Tecnologias ultilizadas:
React js, React native, redux, use state, use , React Navigation, Flat list, Requisição GET em api, Bilioteca para graficos (react-native-chart-kit ,victory-native) etc

API
My Holdings para simular rentabilidade de uma carteira (os ativos que estão mostrando na aplicação estão mockados porém seus valores vem atraves da api)
https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}

Coin Market para dados de mercado
https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}


Uso do projeto:

SISTEMA UTILIZADO LINUX UBUNTU 20.04

Requisitos:

1- Yarn

2- Npx

3- Emulador do android, EX: Pixel_3a_API_29, OBS: PRECISA SER API 29 PARA FUNCIONAR

4- npx ou react native instalado


Resolver dependencias e cache:

1- Clone o repositorio

2- Navegue para dentro da pasta do projeto e abra o projeto (utilizei vscode)

3- abra um terminal

4- Limpar o cache do projeto

   1- Clear watchman watches: watchman watch-del-all
   
   2- Delete node_modules and run yarn install 
   
   3- Reset Metro's cache: yarn start --reset-cache
   
   4- Remove the cache: rm -rf /tmp/metro-*
   
   5- //dependendo pode ter que usar o npm install tambem, no geral apenas o yarn install já funciona
   
   
Rodar o projeto:

1- Abra 3 terminais dentro da raiz do projeto

2- Comando no 1° terminal: emulator -list-avds  //para verificar o nome do emulator de android instalado

3- Comando no 1° terminal: Apoś pegar o nome do emulador instalado do passo anterior vamos agora subir o emulador com o comando: EX: emulator -avd Pixel_3a_API_29  //Pixel_3a_API_29 nome do emulator instalado

4- Comando no 2° terminal: Agora vamos subir o servidor com npx react-native start ou react-native start //npx precisa estar instalado ou o react native para comandos em terminal

5- Comando no 3° terminal: Agora vamos buildar o projeto mesmo com o comando npx react-native run-android ou react-native run-android //OBS: só vai funcionar se os passos anteriores estiverem corretos
