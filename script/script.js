let dataWarga = [];
    let jadwal = [];
    let indexEdit = -1;

    function tambahWarga() {
        let nama = document.getElementById("nama").value;

        nama = nama.trim();

        dataWarga.push({nama});

        tampilkanWarga();

        alert("Warga Berhasil Ditambahkan!");
    }

    function tampilkanWarga() {
        let tabel = document.getElementById("tabelWarga");
        tabel.innerHTML = "";

        dataWarga.forEach((warga, index) =>{
            tabel.innerHTML += `
            <tr>
                <td>${warga.nama.toUpperCase()}</td>
                <td>
                    <button onclick="editWarga(${index})">Edit</button>
                    <button onclick="hapusWarga(${index})" class="delete">Hapus</button>
                </td>
            </tr>
            `;
        });
    }

    function editWarga(index) {
        let warga = dataWarga[index];

        document.getElementById("nama").value = warga.nama;

        indexEdit = index;
    }

    function updateWarga() {
        if (indexEdit === -1) return;

        let nama = document.getElementById("nama").value;

        dataWarga[indexEdit] = {nama};

        indexEdit = -1;
        tampilkanWarga();
    }

    function hapusWarga(index) {
        if (!confirm("Hapus warga ini?")) return;

        dataWarga.splice(index, 1);
        tampilkanWarga();
    }

    function tampilTanggal() {
        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

        let sekarang = new Date();

        let text = "Hari ini: " + hari[sekarang.getDay()] + ", " + sekarang.getDate() + "/" + (sekarang.getMonth() + 1) + "/" + sekarang.getFullYear();

        document.getElementById("tanggal").textContent = text;
    }

    tampilTanggal();

    function buatJadwal() {
        if (dataWarga.length < 2) {
            alert("Minimal 2 Warga!");
            return;
        }

        if (!confirm("Buat jadwal ronda 1 bulan?")) return;

        jadwal = [];

        let daftar = [...dataWarga];

        let hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

        // RANDOM
        for (let i = daftar.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            let temp = daftar[i];
            daftar[i] = daftar[j];
            daftar[j] = temp;
        }

        let sekarang = new Date();

        let index = 0;

        for (let i = 0; i < 30; i++) {
            let tanggal = new Date();
            tanggal.setDate(sekarang.getDate() + i);

            let h = hari[tanggal.getDay()];

            let p1 = daftar[index % daftar.length].nama;
            let p2 = daftar[(index + 1) % daftar.length].nama;

            jadwal.push({
                tanggal: tanggal.toDateString(),
                hari: h,
                petugas: p1 + " & " + p2
            });

            index += 2;
        }

        tampilkanJadwal();

        alert("jadwal 1 bulan berhasil dibuat!");
    }

    function tampilkanJadwal() {
        let list = document.getElementById("jadwal");

        list.innerHTML = "";

        let today = new Date().toDateString();

        jadwal.forEach(j => {
            let li = document.createElement("li");

            li.textContent = j.hari + " : " + j.petugas;

            if (j.tanggal === today) {
                li.classList.add("today");
            }

            list.appendChild(li);
        });
    }

    function cekHariIni() {
        let today = new Date().toDateString();

        let data = jadwal.find(j => j.tanggal === today);

        if (data) {
            alert("Petugas ronda hari ini: " + data.petugas);
        } else {
            alert("Belum ada jadwal");
        }
    }

    // Reset
    function resetJadwal() {
        if (!confirm("Hapus semua jadwal?")) return;

        jadwal = [];
        tampilkanJadwal();
    }