GLOBAL PROJECT LOGIC NOTES
==========================

- nama project Toney PiPong


MISI
----
Membangunkan aplikasi pengurusan mini tournament ping pong yang:
- Mesra pengguna (user-friendly)
- Mobile-first design
- Menyokong pelbagai format pertandingan

---------------------------------
MODUL UTAMA
---------------------------------
1. Modul untuk menguruskan tournament mini
---------------------------------
SYSTEM PIN 4 DIGIT
---------------------------------
- Field wajib diisi oleh creator saat membuat Tournament
- Hanya Superadmin dan Admin/creator yang boleh lihat PIN
- Digunakan untuk melantik AJK

Proses Penggunaan PIN:
1. Admin beri PIN kepada rakan
2. Rakan apply PIN di halaman tournament (box enter/apply pin)
3. Jika berjaya: user dapat status "user with pin access"
4. User dengan pin access boleh:
   - Akses halaman senarai pemain & scoreboard
   - Bantu tambah nama pemain
   - Jadi umpire
5. PIN boleh ditukar oleh admin (PIN lama automatik expired)

Aliran Akses User+Pin:
1. Log in → Pilih tournament → Apply pin
2. Halaman pemain: Tekan edit
3. Halaman scoreboard: Tekan umpire

---------------------------------
PEMAIN
---------------------------------
- Dimasukkan manual oleh admin/AJK
- Hanya nama diperlukan (tanpa log in)

---------------------------------
TOURNAMENT TYPES
---------------------------------
1. ROUND ROBIN
   - Format liga (kumpul mata terbanyak menang)
   - Auto-generate jadual berdasarkan bilangan pemain
   - PENTING

2. ROUND ROBIN KNOCKOUT
   - Fasa 1: Round Robin
   - Fasa 2: Auto-generate (1st vs 2nd, 3rd vs 4th)

3. GROUP ROUND ROBIN
   - Beberapa kumpulan (2,3,4...)
   - Ada Quarterfinal, Semifinal, Penentuan 3rd/4th, Final
   - Creator tentukan bilangan kumpulan
   - Kumpulan boleh tak seimbang
   - PENTING

4. SINGLE ELIMINATION
   - Kalah sekali terus tersingkir
   - Boleh buat 2 pool atau tiada pool
   - Elak pemain kuat bertembung awal

5. DOUBLE ELIMINATION
   - Kalah sekali → masuk Lower Bracket
   - Masih ada peluang kedua
   - Boleh buat 1 pool atau lebih
   - Elak pemain kuat bertembung awal

6. FRIENDLY
   - Tentukan bilangan team (2 penjuru/3 penjuru)
   - Pemain daftar ikut team
   - Manual add matches (single & double)
   - Contoh: Team A vs Team B → pilih pemain dari senarai team
   - PENTING

---------------------------------
GAME TYPE
---------------------------------
- Single
- Double

---------------------------------
TOURNAMENT DETAIL
---------------------------------
[Required Fields]
- Title (nama kejohanan)
- Organisation/Club (penganjur)
- Description
- Location (sokong Google Maps link)
- Security PIN (4 digit)

[Schedule]
- Default: 1 tarikh
- Boleh tambah tarikh lain

---------------------------------
TOURNAMENT STRUCTURE
---------------------------------
- Tournament Types: Round Robin, RR Knockout, Group RR, dll.
- Game Type: Single/Double
- Stages:
  1. Group Stage
  2. Knockout Stage (Quarterfinal, Semifinal, Final)
  3. 3rd/4th Place Match (optional)
- Scoring System:
  - Round Robin: kira mata
  - Knockout: menang/tewas

---------------------------------
STATUS BADGES
---------------------------------
Tournament Status:
- Pending
- Ongoing
- Finished

Match Status:
- Not Started
- Ongoing
- Completed
- Verified (umpire)
- Cancelled

---------------------------------
NOTIFICATION SYSTEM
---------------------------------
- Recent activity: umumkan tournament baru & status
- Umumkan keputusan match semasa

---------------------------------
NAVIGATION BAR
---------------------------------
1. Header Bar:
   - Kiri: Logo + "Toney PiPong"
   - Kanan: Notification icon + Google Avatar/Guest
     * Dropdown menu: Settings, Log in/Sign in/Log out
     * Settings: Language (EN/BM), Theme, Dark Mode

2. Bottom Navbar (Mobile):
   - Ikon: Home, Tournament, Player, Matches, Result

---------------------------------
PAGES STRUCTURE
---------------------------------
1. HOME PAGE
   - Hero + "Create Tournament" button (login required)
   - Tournament calculator widget
   - Recent Activity (4 terkini) → "View All" (child page)
   - My Tournament (jika user ada)
   - Other Tournament (5 terkini) → "View More" (child page)
   - Tournament Card Components:
     * Grafik, nama kejohanan, club, creator, lokasi
     * Status badge: Pending/Ongoing/Finished
     * Jika finished: pamer pemenang (Johan, Naib, Ke-3)
   - Tiada bottom navbar

2. CREATE TOURNAMENT FORM
   - Input fields: Title, Description, Club/Penganjur, Date
   - Upload: Banner, Logo Club
   - Location field
   - Game Type: Single/Double
   - ITTF law & regulation (radio button + description)

3. TOURNAMENT PAGE
   - Papar detail tournament & format perlawanan
   - Bottom navbar aktif
   - Creator boleh edit detail (kecuali tournament type)

4. TOURNAMENT EDIT FORM
   - Boleh edit semua detail kecuali tournament type
   - Untuk single/double: boleh modify nama pemain
   - PIN boleh ditukar

5. PLAYER PAGE
A. Paparan Senarai:
   - Semua pemain berdaftar
   - Carian/filter: nama, pasukan, kategori, kumpulan
   - Gambar profil (optional)

B. Edit Maklumat:
   - Butang "Edit" hanya untuk admin/user+pin
   - Editable: nama, pasukan, kategori, ranking, gambar
   - Kawalan edit: pemain tak boleh edit orang lain

C. Paparan Kategori:
   - Tunjuk Single/Double status
   - Untuk Double: papar nama pasangan
   - Untuk RR: group pemain dalam kumpulan

6. MATCHES PAGE
A. Paparan Perlawanan:
   - Susun ikut tarikh/masa/kategori
   - Filter: kategori (single/double), kumpulan, status
   - Carian: nama pemain/pasukan

B. Maklumat Perlawanan:
   - Nama pemain/pasukan
   - Kategori (single/double)
   - Tarikh & masa mula
   - Lokasi/meja
   - Status dengan badge warna:
     * Belum Bermula (kelabu)
     * Sedang Bermula (hijau)
     * Tamat (merah)
     * Sahkan/Verify (biru)
   - Skor live per set

C. Fungsi Aksi:
   - Klik card match → ke scoreboard page
   - User perlu PIN untuk jadi umpire

7. RESULT PAGE (BERDASARKAN TYPE)
1. ROUND ROBIN:
   - Papar senarai perlawanan & mata terkumpul
   - Klik pemain → statistik & history

2. ROUND ROBIN KNOCKOUT:
   - Papar carta knockout + keputusan
   - Klik pemain → statistik & history

3. GROUP ROUND ROBIN:
   - Papar klasemen kumpulan + carta knockout
   - Klik pemain → statistik & history

4. SINGLE ELIMINATION:
   - Papar carta knockout
   - Klik pemain → statistik & history

5. DOUBLE ELIMINATION:
   - Papar Upper/Lower Bracket
   - Klik pemain → statistik & history

6. FRIENDLY:
   - Papar skor match & jumlah mata per team
   - Klik pemain → statistik & history

8. SCOREBOARD PAGE (Child of Matches Page)
- Akses: Klik matchup card
- Akses terhad: Superadmin/Admin/user+pin sahaja
- Komponen:
  * Nama/team + match round/number
  * Senarai set (best of 3/5/7)
  * Tunjuk siapa serve
  * Sistem kiraan 11 mata (+deuce)
  * UI skor: [-1] [SCORE1] vs [SCORE2] [-1]
    - Klik angka untuk tambah point
    - Klik "-" untuk kurangkan point
  * Auto detect pemenang (jika cukup set dimenangi)
  * "Verify" button untuk muktamadkan keputusan
- Scoreboard Access Logs (accordion bawah):
  * Rekod user yang akses sebagai umpire/admin
  * Papar nama, tarikh & masa akses
  * Logs bebas (tak perlu bind permission)

---------------------------------
TIE-BREAK SYSTEM
---------------------------------
Urutan Kiraan Seri:
1. Head-to-Head (H2H)
2. Set Ratio (SR) = Jumlah Set Menang / Jumlah Set Kalah
3. Point Ratio (PR) = Jumlah Mata Dapat / Jumlah Mata Hilang
4. Undian

Contoh Aplikasi:
[Kasus] 3 pemain seri (5 mata):
- Ali: SR 1.8, H2H menang vs Abu
- Abu: SR 1.5, H2H menang vs Mei
- Mei: SR 1.2, H2H menang vs Ali
Penyelesaian:
1. H2H: Seri (1-1-1)
2. SR: Ali (1.8) > Abu (1.5) > Mei (1.2)

Nota:
- Round Robin: Gunakan semua peringkat tie-break
- Knockout: Tiada seri (perlu pemenang)
- Liga: Prioriti H2H > SR > PR



---------------------------------
GLOBAL LOGIC
---------------------------------
- Semua format sokong Single/Double
- Format tournament terkunci selepas ciptaan
- Automasi jadual berdasarkan format
- Skor update ranking pemain/kelab
- Friendly match tak jejas ranking rasmi
- Optimized untuk mobile view

---------------------------------
TECH STACK
---------------------------------
Frontend: HTML + CSS + JS + TailwindCSS
Framework: React + Next.js (JavaScript)
