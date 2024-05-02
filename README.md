# Traveler Wallet

Traveler Wallet permette di tenere traccia delle città e degli stati in cui si viaggia e inoltre fornisce uno storico delle spese per ogni città.

## Target

L'app è stata creata per soddisfare alcuni bisogni di chi ama viaggiare e che vuole avere un occhio di riguardo alle spese.

## Funzionalità

**utente**

- creazione account
- eliminazione account
- cambio password 
- tracciamento spese
- tracciamento città (e stati)

**amministratore**

- gestione utenti
- gestione spese
- gestione delle citta

## Prerequisites

- avere nodejs > v18.0 e npm installato localmente
- environment variables in config.env

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server side code

`NODE_ENV`

`SERVER_PORT`

`FRONT_END_PORT`

`DATABASE`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

`EMAIL_API_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/gherardiD/traveler-wallet
```

Start front end app:

```bash
  cd front-end
  npm i
  npm run dev
```

Start server

```bash
  cd back-end
  npm i
  node server.js {or npm start}
```

a questo punto recarsi all'indirizzo http://localhost:3000/ e iniziare ad utilizzare il programma

## Schema logico

**User**
- \_id (Primary Key)
- firstName
- lastName
- email
- dateOfBirth
- phone
- password
- passwordConfirm
- active
- role

**City**
- \_id (Primary Key)
- cityName
- position

**Country**
- _id (Primary Key)
- countryName
- flag

**Visita**
- _id (Primary Key)
- date
- notes
- user_id
- city_id

**Expense**
- \_id (Primary Key)
- description
- type
- amount
- createdAt

## Schema ER

![Cattura](https://github.com/gherardiD/traveler-wallet/assets/101709520/0368e94e-551a-46f7-95ff-997e723149d2)


## Screenshots

![landingPage](https://github.com/gherardiD/traveler-wallet/assets/101709520/73621e6d-3b3d-40ff-bb89-d5859feebdec)
![product](https://github.com/gherardiD/traveler-wallet/assets/101709520/d9d0e9b0-4b8e-42bb-b48f-bafa5d36a247)
![login](https://github.com/gherardiD/traveler-wallet/assets/101709520/1dd550dd-ca23-4bb3-8efd-0c7999d3b86c)
![cities](https://github.com/gherardiD/traveler-wallet/assets/101709520/dcb2639d-414e-4e05-b8cf-1812e889b0c6)


