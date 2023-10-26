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
 


**MOCKUP**
![mockup_login](https://github.com/gherardiD/project/assets/101709520/0d1b4c94-5221-4926-9f4b-a25968067771)

![mokcup_landing](https://github.com/gherardiD/project/assets/101709520/57c89275-844f-4efc-84a9-134853f7dec0)
![mockup_currencies](https://github.com/gherardiD/project/assets/101709520/5ed7eb2c-afb6-4ee8-9a55-71d80baadf09)
![mockuo_transactions](https://github.com/gherardiD/project/assets/101709520/de52459c-e763-492c-b7a3-59d4fd90c448)
