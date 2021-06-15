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
Projekt składa się z 4 bazowych elementów:
 - Baza dnaych MongoDB przechowująca dokumenty w postaci struktury opisanej w rozdziale [Struktura bazy danych MongoDB](#struktura-bazy-danych-MongoDB),
 - Skrypt cyklicznie wykonujący zrzut bazy danych oraz przywracanie jej zawartości przy starcie kontenerów (`backup`). Jego głównym zadaniem jest co minutę wykonywać zrzut danych z bazy, a także przy rozpoczęciu pracy przywrócenie ostanio utworzonego zestawu danych,
 - serwer API komunikujący się z bazą danych, obsługujący zapytania wysyłane przez formularz internetowy. Zbudowany jest w oparciu o bibliotekę Express.js, przechowywany jest w katalogu `backend\app`. W jego skład wchodzą przede wszystkim modele dokumentowej bazy danych stworzone w oparciu o bibliotekę `Mongoose.js` (`backend\app\models`),a także kontrolery odpowiedzialne za modyfikację danych znajdujących się w bazie (`backend\app\controllers`). Poza tym w obrębie aplikacji możemy też znaleźć strukturę routingu opisaną w (`backend\app\routes`), konfigurację serwera, połączenia z bazą danych (`backend\app\config`) oraz główna część serwera (`backend\app\server.js`),
 - SAP reprezentująca interfejs użytkownika, która w prosty i wygodny sposób umożliwia wprowadzania zmian oraz wydobywanie dancyh z bazy MongoDB. Została ona stworzona przez nas w katalogu `frontend\GardenInc` z wykrozystaniem frameworku Angular, z tego względu w większości jej struktura jest zgodna z wzorcami projektowymi oferowanymi przez bibliotekę. Nawjażniejszym elementem są serwisy (`frontend\GardenInc\src\app\services`), które odpowiadają za komunikację z serwerem bazodanowy. W tym celu wykorzystują one proste zapytania http. Komponenty (`frontend\GardenInc\src\app\components`) w głównej mierze odpowiedzialne są natomiast za wyświetlanie uzyskanych wyników działania.

Wszystkie powyższe elementy są zamknięte w osobnych dockerowych kontenerach, połączonych siecią dostępną również poza obrębem kontenerów.

**UWAGA**: Na potrzeby tworzenia i rozwoju projektu zrzuty bazy danych celowo zapisywane są w folderze `tmp\backup` zawartym w repozytorium, a następnie wczytywanych do bazy danych przy uruchomieniu kontenera. Rozwiązanie to nie jest optymalne, docelowo baza danych będzie korzystała z osobnego wolumenu z danymi, w celu wyodrębnienia jej zależności z systemu plików.

# Struktura bazy danych MongoDB
Baza danych składa się z 8 kolekcji:
 - [x] **[customer](###customer)** - zawiera informacje dotyczące klientów,
 - [x] **[order](###order)** - agreguje wszelkie zamówienia,
 - [x] **[returned](###returned)** - agreguje zwroty zakupów,
 - [x] **[delivery](###delivery)** - przechowuje informacje na temat dostaw zamówień,
 - [x] **[item](###item)** - przechowuje wszystkie produkty oferowane w sklepie,
 - [x] **[category](###category)** - zbiera wszystkie kateogorie razem z możliwymi filtrami i podkategoriami,
 - [x] **[employee](###employee)** - zawiera informacje oo wszystkich pracownikach,
 - [x] **[supplier](###supplier)** - przechowuje dane dostawców, wraz z dostawami,

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

W celu otrzymania danych z serwera bazodanowego należy kierować odpowiednie requesty na adres [http://localhost:3000/api/`<collection>s`](http://localhost:3000/api/items), gdzie `<collection>` to identyfikator danej kolekcji, tj.: dla kolekcji **item** poprawny adres http będzie wyglądał nastepująco: [http://localhost:3000/api/items](http://localhost:3000/api/items). Serwer obsługuje dla każdej kolekcji wszystkie rodzaje zapytań CRUD, każda dodatkowa informacja jest przesyłana w formacie JSON:
|Akcja|Typ zapytania|Scieżka|
|:---:|:-----------:|:-----:|
|Dodanie dokumentu do kolekcji|POST|[http://localhost:3000/api/`<collection>s`](http://localhost:3000/api/items)|
|Odczytanie kolekcji|GET|[http://localhost:3000/api/`<collection>s`](http://localhost:3000/api/items)|
|Odczytanie danego dokukentu kolekcji|GET|[http://localhost:3000/api/`<collection>s/id`](http://localhost:3000/api/items/60bfc293c28da1066125577a)|
|Aktualizajcja dokumentu|POST|[http://localhost:3000/api/`<collection>s`/id](http://localhost:3000/api/items/60bfc293c28da1066125577a)|
|Usunięcie dokumentu|DELETE|[http://localhost:3000/api/`<collection>s`/id](http://localhost:3000/api/items/60bfc293c28da1066125577a)|
|Usunięcie całej kolekcji|DELETE|[http://localhost:3000/api/`<collection>s`](http://localhost:3000/api/items)|

Ponadto stworzone przez nas api oferuje inne funkcjonalności służące obsłudze sklepu internetowego:
## Autoryzacja
W celu dokonania autoryzacji i umożliwienia klientowi dostępu do sklepu można wysłać zapytanie POST na adres [http://localhost:3000/api/auth](http://localhost:3000/api/auth), zawierające w JSONie email i hasło użtkownika. Po pozytywnej weryfikacji danych serwer zwróci id użytkonika, bądź w przeciwnym wypadku informację o błędzie.

## Obsługa koszyka i zamówień
Po pozytywnej autoryzacji, użytkownik ma możliwość dokonywania zakupów, poprzez dodawanie danych artykułów do koszyka, a następnie dokonania ich zakupu. Aby dodać artykuł do koszyka należy przekazać JSON o nastepującej strukturze, na adres [http://localhost:3000/api/customer/cart](http://localhost:3000/api/customer/cart) metodą POST:
```json
{
  "customer_id":"60bd3efefbd863012d351c1c",
  "items": [{
      "item_id":"60bf8d3a568de3013f8327a2",
      "amount": 5
    }],
  "add":true
}
```
Natomiast jeśli chcemy usunąć dany artykuł z koszyka wykorzystujemy tę samą metodę i tą samą scieżkę adresu, jednakże modyfikujemy nieznacznie zawartosć JSONa
```json
{
  "customer_id":"60bd3efefbd863012d351c1c",
  "items": [{
      "item_id":"60bf8d3a568de3013f8327a2"
    }],
  "add":false
}
```
Na koniec aby dokonać zakupu należy z wykorzystaniem metody POST dokonać zakupou poprzez ścieżkę [http://localhost:3000/api/customer/cart/buy](http://localhost:3000/api/customer/cart/buy), przesyłając przy tym id klienta:
```json
{
  "customer_id":"60bd3efefbd863012d351c1c"
}
```

## Obsługa dostaw i wyszukiwanie dostawców
Dodawanie nowych dostawców i dostaw jest w głównej mierze oparte na rozszerzonych oprecjach CRUD. Np. przy dodawaniu nowej dostawy zmieniane są wartości dla każdego przedmiotu, który jest dostarczany, tak aby wartości te były aktualne. Dodatkowo uaktualniane są dane na temat dostarczanych przez dostawce kategorii tzn. jeśli dostawca A do tej posry dostarczał tylko kwiaty jego pole dostarczanych kategorii wygląda następująco: `supply_category:["flowers"]`, natomiast jeśli dokona on przynajmniej jednej dostawy sadzonek drzew pole dostarczanych kategorii zostanie zaktualizowne do wartości: `supply_category:["flowers", "trees"]`. Zabieg taki pozawala nam w łatwy wyciągnąć dostawców, którzy dostarczają dana kategorie produktów.
Funkcjonalność tę możemy osiągnąć wysyłając zapytanie typu POST na adres [localhost:3000/api/suppliers/getfromcategory](localhost:3000/api/suppliers/getfromcategory). W przypadku gdy zapytanie jest puste, bądź posiada niepoprawne wartości serwer zwróci wszystkich dostawców dla wszystkich kategorii. Natomiast jeśli zostanie przesłany plik JSON w następującej postaci:
```JSON
{
  "category":"categoryName"
}
```
w odpowiedzi otrzymamy wszystkich dostawców dostarczających daną kategorię.
## Wyszukiwanie przedmiotów z danych kategorii i ich subkategorii
Hierarchia głównych kategorii
<img src="./imgs/hierarchia.png" alt="Hierarchia">

Na stronie mamy możliwość przeglądania dostępnych przedmiotów. Mechanizm filtrowania oparty jest o hierarchie kategorii zamieszczoną wyżej.
Gdy wybierzamy kategorię interesujących nas przedmiotów. Zwracanę nam są wszystkie przedmioty z poddrzewa kategorii wybranej kategorii.
Żeby uzyskać pożądane przedmioty klient(aplikacja angularowa) wysyła zapytanie typu POST [localhost:3000/api/itemsOfCategory] do serwera.
Ciało zapytania ma postać:
```JSON
{
  "category":"categoryName"
}
```
Serwer zwraca tablicę wszystkich przedmiotów które należą do wybranych kategorii.
# Postępy prac
| Zadanie                                             | Wykonano            | Kto                   |
|:-------------:                                      |:-------------:      |:-----:                |
| Stworzyć plan bazy danych                           |✅                   | Michał, Kamil,Paulina |
| Dokonać podziału prac                               |✅                   | Michał, Kamil,Paulina |
| zbudować serwer                                     |✅                   | Kamil                 |
| postawić aplikację angularową                       |✅                   | Kamil                 |
| utworzyć kontenery Docker                           |✅                   | Michał                |
| połączyć aplikację przez Dockera                    |✅                   | Michał                |
| Utworzyć dokumentację                               |✅                   | Michał                |
| Dodać szatę graficzną strony                        |✅                   | Paulina               |
| Obsługa pracowników na stronie                      |✅                   | Paulina               |
| Dodać CRUD do wszystkich kolekcji (API)             |✅                   | Michał                |
| Dodać autoryzację (API)                             |✅                   | Michał                |
| Dodać możliwość kupowania (API)                     |✅                   | Michał                |
| Dodać tworzenie raportów od - do  (API)             |✅                   | Kamil                 |
| Dodać obsługę dostaw - dodawanie itemów  (API)      |                     |                       |
| Dodać pobieranie itemów z danej kategorii (API)     |✅                   | Kamil                 |
| Dodać wyszukiwanie dostwców dla danego itemu (API)  |                     |                       |
| Dodać obsługę kategorii np. wyciągnięcie wszystkich itemów z danej kategori i wszystkich jej podkategorii (API)  |✅                    |Kamil                       |
| Uwzględnić nowe funkcjonalności na stronce*         |                     |                       |
| Uzupełnić dokumentację o nowe funkcję               |✅                   |Michał                 |
| Uzupełnić dokumentację o opis struktury projektu    |✅                   |Michał                 |

*Później przy uzupełnianiu tego co zrobiliście, możecie rozbijać na mniejsze podzadania
