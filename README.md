# Traveler Wallet

Progetto per gestire un portaglio in diverse valute in modo da evitare commissioni di cambio valuta quando visiti paesi diversi molto spesso, inoltre offre la possibilita di tenere traccia delle spese e di impostare un budget di un determinato viaggio

## Target

L'app è stata creata per soddisfiare alcune necessita di nomadi digitali o semplicemente di persone che amano viaggiare.

## Funzionalità

**utente**

- creazione account
- eliminazione account
- aggiunta soldi
- cambio password (con invio di email)
- cambio valuta
- tracciamento movimenti
- resoconto movimenti

**amministratore**

- gestiscione valute (visualizzazione. modifica, aggiunta)
- gestione utenti
- visualizzazione utenti (per numero di movimenti, per saldo totale...)
- visualizzazione delle valute più usate

## Prerequisites

- avere nodejs > v18.0 e npm installato localmente
- environment variables in config.env

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server side code

`NODE_ENV`

`PORT`

`DATABASE`

`DATABASE_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`JWT_COOKIE_EXPIRES_IN`

`SALT`

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

**Currency**

- \_id (Primary Key)
- name
- code
- symbol

**Movement**

- \_id (Primary Key)
- name
- description
- type
- amount
- sign
- user_id (Foreign Key referencing User)
- currency_id (Foreign Key referencing Currency)
- date
- createdAt

## Schema ER

![SchemaER](https://github.com/gherardiD/traveler-wallet/assets/101709520/d45207cb-9619-4860-bf38-4ac01dcf5e77)


## Screenshots

![mockup_login](https://github.com/gherardiD/project/assets/101709520/0d1b4c94-5221-4926-9f4b-a25968067771)
![mokcup_landing](https://github.com/gherardiD/project/assets/101709520/57c89275-844f-4efc-84a9-134853f7dec0)
![mockup_currencies](https://github.com/gherardiD/project/assets/101709520/5ed7eb2c-afb6-4ee8-9a55-71d80baadf09)
![mockuo_transactions](https://github.com/gherardiD/project/assets/101709520/de52459c-e763-492c-b7a3-59d4fd90c448)

