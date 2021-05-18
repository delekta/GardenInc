# GardenInc
## Bazy Danych Czwartek 16:15 A
### Autorzy:
- Michał Faciszewski
- Kamil Delekta
- Paulina Adamczyk
# Opis
Projekt przedstaiwa system obsługi internetowego sklepu ogrodniczego. Baza  danych będzie przetrzymywała informacje o dostępnych produktach, pracownikach  dostawcach, będzie umożliwiała wprowadzanie i modyfikacje danych. System ogranicza dostęp do danych względem uprawnień użytkowników.  Rodzaje użytkowników:
- Administrator,
- Klient,
- Pracownik

**Klient** ma dostęp do aktualnie dostępnych produktów znajdujących się w sklepie. Może dodawać je do swojego koszyka i modyfikować zamówienia. Ma on swoją  historię zamówień. Może filtrować wyniki wyszukiwania.

**Pracownik** może modyfikować dane dotyczące produktów, dodawać/usuwać  produkty z bazy. Rejestruje w bazie dostawę. Może przyjmować zwroty.

**Administrator** ma pełny dostęp do bazy i może zarządzać kontami innych  użytkowników.

### Wykorzystane technologie
- [x] MongoDB
- [x] Node.js
- [x] Express.js
- [x] Angular
# Struktura projektu
Projekt składa się z 3 bazowych elementów:
 - Baza dnaych MongoDB przechowująca dokumenty w postaci struktury opisanej w rozdziale [Struktura bazy danych MongoDB](#struktura-bazy-danych-MongoDB),
 - serwer API komunikujący się z bazą danych, obsługujący zapytania wysyłane przez formularz internetowy,
 - SAP reprezentująca interfejs użytkownika, która w prosty i wygodny sposób umożliwia wprowadzania zmian oraz wydobywanie dancyh z bazy MongoDB.

Wszystkie powyższe elementy są zamknięte w osobnych dockerowych kontenerach, połączonych siecią dostępną również poza obrębem kontenerów.

**UWAGA**: Na potrzeby tworzenia i rozwoju projektu dane celowo zapisywane są w folderach zawartych w repozytorium, wczytywanych jako wolumeny do dockerowych kontenerów. Rozwiązanie to nie jest optymalne, docelowo baza danych będzie korzystała z osobnego wolumenu z danymi, w celu wyodrębnienia jej zależności z systemu plików.

# Struktura bazy danych MongoDB
Baza danych składa się z 8 kolekcji:
 - [] **[customer](###customer)** - zawiera informacje dotyczące klientów,
 - [] **[order](###order)** - agreguje wszelkie zamówienia,
 - [] **[returned](###returned)** - agreguje zwroty zakupów,
 - [] **[delivery](###delivery)** - przechowuje informacje na temat dostaw zamówień,
 - [x] **[item](###item)** - przechowuje wszystkie produkty oferowane w sklepie,
 - [] **[category](###category)** - zbiera wszystkie kateogorie razem z możliwymi filtrami i podkategoriami,
 - [] **[employee](###employee)** - zawiera informacje oo wszystkich pracownikach,
 - [] **[supplier](###supplier)** - przechowuje dane dostawców, wraz z dostawami,

Przykładowe struktury poszczególnych dokumentów:
### **customer:**
```json
{
  "_id":"hashedUserId",
  "name":"User354",
  "email":"user354@mail.com",
  "password":"user354Pass!",
  "cart":{
    "items":[
      {
        "item_id":"hashedItem1Id",
        "amount":2
      },
      {
        "item_id":"hashedItem2Id",
        "amount":10
      }
    ],
    "modification_date":"2021-05-18T09:00:14.572Z"
  },
  "hist":[
    "hashedOrder1Id",
    "hashedOrder3Id"
  ]
}
```
### **order**
```json
{
  "_id":"hashedOrderId",
  "ordered":[
    {
      "item_id":"hashedItem1Id",
      "amount":2
    },
    {
      "item_id":"hashedItem2Id",
      "amount":10
    }
  ],
  "order_date":"2021-05-18T09:00:14.572Z"
}
```
### **returned**
```json
{
  "_id":"hashedReturnId",
  "order_id":"hashedOrderId",
  "returned":[
    {
      "item_id":"hashedItem1Id",
      "amount":2
    },
    {
      "item_id":"hashedItem2Id",
      "amount":10
    }
  ],
  "return_date":"2021-05-18T09:00:14.572Z"
}
```
### **delivery**
```json
{
  "_id":"hashedDeliveryId",
  "supplier_id":"hashedSupplierId",
  "delivered":[
    {
      "item_id":"hashedItem1Id",
      "amount":2
    },
    {
      "item_id":"hashedItem2Id",
      "amount":10
    }
  ],
  "delivery_date":"2021-05-18T09:00:14.572Z"
}
```
### **item**
```json
{
  "_id":"hashedItemId",
  "name":"itemName",
  "price":123.12,
  "tax":0.23,
  "on_stock":15,
  "categories":[
    "category1Name",
    "category2Name"
  ]
}
```
### **category**
```json
{
  "_id":"hashedCategoryId",
  "name":"categoryName",
  "sub_categories":[
    "hashedChildCategory1Id",
    "hashedChildCategory2Id"
  ],
  "parent_id":"hashedParentCategoryId"
}
```
### **employee**
```json
{
  "_id":"hashedEmployeId",
  "firstname":"employeeFirstname",
  "lastname":"employeeLastname",
  "position":"employeePosition",
  "supervised_category":[
    "categoryName1",
    "categoryName2"
  ],
  "auth":{
    "login":"employeeLogin",
    "password":"employeePassword!"
  }
}
```
### **supplier**
```json
{
  "_id":"hashedSupplierId",
  "company_name":"supplierCompanyName",
  "supply_category":[
    "categoryName1",
    "categoryName2"
  ],
  "contact":{
    "mail":[
      "companyMail1@mail.com",
      "companyMail2@mail.com"
    ],
    "phone_no":[
      "123123123",
      "987987987"
    ],
    "adress":{
      "street":"companyStreet",
      "building_no":12,
      "flat_no":null,
      "city":"companyCity",
      "postal_code":"12-345",
      "post":"postCity"
    }
  }
}
```

 # Uruchamianie
 W celu uruchomienia niezbędne będzie posiadanie aktualnej instalacji Dockera ([Windows](https://docs.docker.com/docker-for-windows/install/), [Linux](https://docs.docker.com/engine/install/ubuntu/)).

 Następnie należy uruchomić aplikację Docker Desktop (Windows/MAC OS), aby działała w tle. Dla systemów Linux przydatna może być komenda `$ sudo service docker start`.

 W kolejnym kroku należy przejść do folderu głównego projektu, zawierajacego między innymi plik `docker-compose.yml` i wywołać polecenie utworzenia kontenerów `docker-compose up`. Spowoduje to przy pierwszym uruchomieniu zbudowanie kontenerów z zapisanych obrazów, utworzenie wolumenów i linków symbolicznych, a następnie ich uruchomienie, co powinno zostać potwierdzone wyświetleniem następujących komunikatów:
 ```docker
 Starting projektbazydanych_mongodb_1 ... done
Starting projektbazydanych_gardenincbackend_1 ... done
Starting projektbazydanych_gardenincfrontend_1 ... done
 ```
Uruchomiany serwer:
```docker
gardenincbackend_1   | 
gardenincbackend_1   | > garden-inc-backend@1.0.0 start /usr/src/app
gardenincbackend_1   | > nodemon -L server.js
gardenincbackend_1   |
gardenincbackend_1   | [nodemon] 2.0.7
gardenincbackend_1   | [nodemon] to restart at any time, enter `rs`
gardenincbackend_1   | [nodemon] watching path(s): *.*
gardenincbackend_1   | [nodemon] watching extensions: js,mjs,json
gardenincbackend_1   | [nodemon] starting `node server.js`
gardenincbackend_1   | Server is running on port 3000.
gardenincbackend_1   | Connected to the database!
```
Serwer bazydanych oczekujący na połączenia:
```docker
mongodb_1            | {"t":{"$date":"2021-05-18T11:42:31.915+00:00"},"s":"I",  "c":"NETWORK",  "id":23015,   "ctx":"listener","msg":"Listening on","attr":{"address":"/tmp/mongodb-27017.sock"}}
mongodb_1            | {"t":{"$date":"2021-05-18T11:42:31.915+00:00"},"s":"I",  "c":"NETWORK",  "id":23015,   "ctx":"listener","msg":"Listening on","attr":{"address":"0.0.0.0"}}
mongodb_1            | {"t":{"$date":"2021-05-18T11:42:31.915+00:00"},"s":"I",  "c":"NETWORK",  "id":23016,   "ctx":"listener","msg":"Waiting for connections","attr":{"port":27017,"ssl":"off"}}
```
Angularowy SAP poprawnie działający:
```docker
gardenincfrontend_1  | ✔ Browser application bundle generation complete.
gardenincfrontend_1  |
gardenincfrontend_1  | Initial Chunk Files | Names         |      Size
gardenincfrontend_1  | vendor.js           | vendor        |   2.73 MB
gardenincfrontend_1  | polyfills.js        | polyfills     | 128.55 kB
gardenincfrontend_1  | main.js             | main          |  48.55 kB
gardenincfrontend_1  | runtime.js          | runtime       |   6.58 kB
gardenincfrontend_1  | styles.css          | styles        | 120 bytes
gardenincfrontend_1  |
gardenincfrontend_1  | | Initial Total |   2.91 MB
gardenincfrontend_1  |
gardenincfrontend_1  | Build at: 2021-05-18T11:42:46.819Z - Hash: f31b4f2a0c27f141e59b - Time: 15920ms
gardenincfrontend_1  |
gardenincfrontend_1  | ** Angular Live Development Server is listening on 0.0.0.0:8080, open your browser on http://localhost:8080/ **
gardenincfrontend_1  |
gardenincfrontend_1  |
gardenincfrontend_1  | ✔ Compiled successfully.
```
Po poprawnym uruchomieniu środowiska, widok strony internetowej dostępny będzie pod adresem: [http://localhost:8080/](http://localhost:8080/), natomiast zapytania do API powinny być kierowane na adres [http://localhost:3000/](http://localhost:3000/). Dostęp do bazy danych będzie możliwy poprzez odwołanie się do adresu [http://localhost:27017/](http://localhost:27017/).

Więcej informacji na temat komunikowania się z API znajdude się w sekcji [API](#API).

W celu zatrzymania usług należy nacisnąć kombinację klawiszy `Ctrl+C`, a następnie poczekać na zamknięcie działajacych usług.
```docker
Gracefully stopping... (press Ctrl+C again to force)
Stopping projektbazydanych_gardenincfrontend_1 ... done
Stopping projektbazydanych_gardenincbackend_1  ... done
Stopping projektbazydanych_mongodb_1           ... done
```

W razie wszelkich problemów i wątpliwosći proszę o kontakt z obsługą klienta:
- mail: [faciszewski@student.agh.edu.pl](faciszewski@student.agh.edu.pl)
- fb: [Michał Faciszewski](https://www.facebook.com/profile.php?id=100004596824271)
# API

W celu otrzymania danych z serwera bazodanowego należy kierować odpowiednie requesty na adres [http://localhost:3000/app/`<collection>s`](http://localhost:3000/app/items), gdzie `<collection>` to identyfikator danej kolekcji, tj.: dla kolekcji **item** poprawny adres http będzie wyglądał nastepująco: [http://localhost:3000/app/items](http://localhost:3000/app/items).

# Postępy prac
| Zadanie                               | Wykonano          | Kto                   |
|:-------------:                        |:-------------:    |:-----:                |
| Stworzyć plan bazy danych             |[x]                | Michał, Kamil,Paulina |
| Dokonać podziału prac                 |[x]                | Michał, Kamil,Paulina |
| zbudować serwer                       |[x]                | Kamil                 |
| postawić aplikację angularową         |[x]                | Kamil                 |
| utworzyć kontenery Docker             |[x]                | Michał                |
| połączyć aplikację przez Dockera      |[x]                | Michał                |
| Utworzyć dokumentację                 |[x]                | Michał                |