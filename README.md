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
# Uruchamianie

# API
