# Weather App — OpenWeatherMap + Node.js

App simples de clima: front-end em HTML/JS puro, back-end em Node.js/Express que atua como proxy seguro para a API do OpenWeatherMap.

## Por que usar um back-end?

A API key do OpenWeatherMap não deve ficar exposta no JavaScript do navegador (qualquer pessoa poderia abrir o "Ver código-fonte" e roubá-la). Por isso, o front-end chama sempre `/api/weather` no seu próprio servidor, e é o servidor Node.js quem chama a OpenWeatherMap usando a chave guardada no `.env`.

```
Navegador (HTML/JS)  --->  Seu servidor Node.js  --->  API OpenWeatherMap
                     /api/weather?city=...       api.openweathermap.org
```

## Passo a passo

1. **Crie uma conta gratuita** em https://openweathermap.org/ e gere uma API key em "My API keys" (pode levar alguns minutos para ativar).

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure sua chave:**
   Abra o `server.js` e substitua `'SUA_CHAVE_AQUI'` pela sua API key, na linha:
   ```js
   const API_KEY = 'SUA_CHAVE_AQUI';
   ```

4. **Rode o servidor:**
   ```bash
   npm start
   ```

5. Abra http://localhost:3000 no navegador.

## Estrutura

```
weather-app/
├── server.js          # Backend Express (proxy para a API, com a API key)
├── package.json
└── public/
    ├── index.html      # Interface
    ├── style.css       # Estilo
    └── script.js       # Lógica do front-end (chama /api/weather)
```

## Endpoints

- `GET /api/weather?city=São Paulo` — clima por nome de cidade
- `GET /api/weather?lat=-23.55&lon=-46.63` — clima por coordenadas

## Próximos passos possíveis

- Adicionar previsão de 5 dias (endpoint `/data/2.5/forecast` do OpenWeatherMap)
- Cache das respostas para evitar bater o limite gratuito da API (60 chamadas/min)
- Ícones de clima usando o campo `weather[0].icon` retornado pela API
