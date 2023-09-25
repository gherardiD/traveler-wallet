# project
A personal deposit account to manage and track your money when you travel 

**basic db structure**
EMAIL  PASSWORD  NOME  COGNOME  DATA_DI_NASCITA  (?NUM_CONTO)  DISPONIBILITA  VALUTA  NUM_TELEFONO  ENTRATE  USCITE  (?TIPO_DI_ACCOUNT)

**functionalities**
- creazione account
- eliminazione account
- ricarica
- (?pagamento)
- (?scambio soldi)
- cambio password
- invio di email
- cambio valuta
- multiWallet in different currencies

**entities**
- utente/account
    -  email
    -  password
    -  nome
    -  cognome
    -  data nascita
    -  **portafoglio/wallet** (1 a 1)
- portfoglio/wallet
    - numero/number
    - disponibilita/amount (nella valuta scelta)
    - **valute/currencies** (1 a *)
    - **operazione/transactons** (1 a *)
- valuta/currencies
    - codice/code
    - simbolo
    - ?stati?
- operazione/transaction
    - numero/number
    - ammontare/amount (+-)
    - **valuta/currencies** (1 a 1)
