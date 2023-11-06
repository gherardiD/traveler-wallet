# project
A personal deposit account to manage and track your money when you travel 

**target**
persone che amano viaggiare

**problema**
gestione soldi per viaggi, commissioni cambio valuta ad ogni transazione

**functionalities**
- creazione account
- eliminazione account
- aggiunta soldi
- cambio password (con invio di email)
- cambio valuta
- tracciamento movimenti
- multiWallet in diverse valute

**entities**
- utente/account
    -  email
    -  password
    -  nome
    -  cognome
    -  data nascita
    - **valute/currencies** (1 a *)
    - **operazione/transactons** (1 a *)
- valuta/currencies
    - codice/code
    - simbolo
    - ?stati?
    - **transaction** (1 a *)
- operazione/transaction
    - numero/number
    - ammontare/amount (+-) 

**ER**

![ER_definitivo](https://github.com/gherardiD/project/assets/101709520/3383e288-40c7-4d9e-a000-abf8364b779b)


**MOCKUP**

![mockup_login](https://github.com/gherardiD/project/assets/101709520/0d1b4c94-5221-4926-9f4b-a25968067771)
![mokcup_landing](https://github.com/gherardiD/project/assets/101709520/57c89275-844f-4efc-84a9-134853f7dec0)
![mockup_currencies](https://github.com/gherardiD/project/assets/101709520/5ed7eb2c-afb6-4ee8-9a55-71d80baadf09)
![mockuo_transactions](https://github.com/gherardiD/project/assets/101709520/de52459c-e763-492c-b7a3-59d4fd90c448)
