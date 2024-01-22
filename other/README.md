
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


## Run Locally

**Prerequisiti**:

- Xampp in macchina locale con un database chiamato project
- Nella cartella htdocs avere una cartella chiamata 5ia
- Eseguire il file project.sql nel database project

Clone the project

```bash
  git clone https://github.com/gherardiD/project
```

Copy the folder forms in to 5ia

Start Xampp and open this url: 
```bash
  http://127.0.0.1/5ia/forms/front-end/
```

Creare un nuovo account o accedere come amministratore usando:
```bash
  email: dani.ghera05@gmail.com
  psw: daniele
```


## Schema logico
- utente/account
    - pk id    
    -  email
    -  password
    -  nome
    -  cognome
    -  data nascita
- valuta/currencies
    - pk codice/code
    - simbolo
    - ?stati?
- operazione/transaction
    - pk id
    - ammontare/amount (+-)
    - data
    - tipo
    - fk utente_id
    - fk valuta_cod
## Schema ER
![ER_definitivo](https://github.com/gherardiD/project/assets/101709520/3383e288-40c7-4d9e-a000-abf8364b779b)
## Screenshots

![mockup_login](https://github.com/gherardiD/project/assets/101709520/0d1b4c94-5221-4926-9f4b-a25968067771)
![mokcup_landing](https://github.com/gherardiD/project/assets/101709520/57c89275-844f-4efc-84a9-134853f7dec0)
![mockup_currencies](https://github.com/gherardiD/project/assets/101709520/5ed7eb2c-afb6-4ee8-9a55-71d80baadf09)
![mockuo_transactions](https://github.com/gherardiD/project/assets/101709520/de52459c-e763-492c-b7a3-59d4fd90c448)


## FAQ

#### Posso gestire soldi reali?

Attualmente no, è solo possibile tenere traccia manualmente dei propri soldi e vedere l'andamento del proprio portafoglio virtuale nelle varie valute di riferimento.

#### Si puo avere uno storico dei movimenti?

Si, sono i movimenti sono registrati con una data quindi è possibile avere un resoconto.
