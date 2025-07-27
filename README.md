# 🛍️ Mini Webshop – Frontend

Dobrodošli u **Mini Webshop** – jednostavnu web aplikaciju za prikaz, upravljanje i naručivanje proizvoda. Aplikacija je razvijena kao završni projekat sa osnovnim funkcijama za korisnike i administratore.

---

## 🚀 Pokretanje aplikacije lokalno

Prati ove korake da pokreneš frontend aplikaciju lokalno:

```bash
# 1. Idi u direktorij frontend
cd frontend

# 2. Instaliraj potrebne pakete
npm install

# 3. Pokreni razvojni server
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:3000`.

---

## 🌐 Deploy verzija (Firebase)

Frontend aplikacija je deployana na Firebase i dostupna na sljedećem linku:

🔗 [https://mini-webshop-xxxxx.web.app](https://mini-webshop-xxxxx.web.app)

---

## ⚙️ Funkcionalnosti

Aplikacija uključuje sljedeće funkcionalnosti:

* 🛒 **Pregled proizvoda** – svi korisnici mogu vidjeti proizvode
* ➕ **Dodavanje u korpu** – proizvodi se mogu dodavati u korpu
* 📦 **Kreiranje narudžbi** – korisnici mogu završiti narudžbu
* 🔐 **Login za admina** – samo admin ima pristup za upravljanje
* ✏️ **Upravljanje proizvodima** – admin može dodavati, uređivati i brisati proizvode
* 📁 **Pregled narudžbi** – admin može vidjeti sve narudžbe

---

## 👤 Vrste korisnika

### 👥 Gost korisnik (Guest)

* Može pregledati proizvode
* Može dodavati u korpu
* Može kreirati narudžbu

### 🔐 Administrator (Admin)

* Može se prijaviti putem admin panela
* Ima pristup svim narudžbama
* Može dodavati/uređivati/brisati proizvode

> **Admin kredencijali**
> 📧 Email: `admin@example.com`
> 🔑 Lozinka: `admin123`

---

## 🔗 Povezani repozitoriji

📁 **Frontend source code:**
🔗 [https://github.com/BelminHaracic/mini-webshop-frontend](https://github.com/BelminHaracic/mini-webshop-frontend)

📁 **Backend source code:**
🔗 [https://github.com/BelminHaracic/mini-webshop-backend](https://github.com/BelminHaracic/mini-webshop-backend)

---

## 🧪 API (za Postman)

API se koristi za komunikaciju sa backendom. Dokumentacija i URL-ovi su dostupni u backend repozitoriju.

🧹 **Primjer rute:**

* `GET /products`
* `POST /orders`
* `PUT /orders/:id`

---

## 📝 Napomene

* Aplikacija koristi **React** za frontend i **Flask/FastAPI** za backend.
* Deployovan je samo frontend putem Firebase.
* Cijeli projekat je edukativnog karaktera i može se proširivati dodatnim funkcijama.

---

✅ Ako želiš pokrenuti cijeli sistem lokalno (frontend + backend), pogledaj `README.md` fajl i backend repozitorij!
