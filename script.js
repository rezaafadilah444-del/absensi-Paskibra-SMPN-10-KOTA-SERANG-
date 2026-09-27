// ==========================================
// LOGIN
// ==========================================

const USERNAME = "paskibra";
const PASSWORD = "psb123";


// ==========================================
// LOGIN
// ==========================================

function login() {

    const username =
        document.getElementById(
            "username"
        ).value.trim();

    const password =
        document.getElementById(
            "password"
        ).value.trim();

    const error =
        document.getElementById(
            "loginError"
        );


    if (
        username === USERNAME &&
        password === PASSWORD
    ) {

        error.textContent = "";

        document
            .getElementById("loginPage")
            .classList.remove("active");

        document
            .getElementById("attendancePage")
            .classList.add("active");

        tampilkanAbsensi();

    }

    else {

        error.textContent =
            "Username atau password salah.";

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    document
        .getElementById("attendancePage")
        .classList.remove("active");

    document
        .getElementById("loginPage")
        .classList.add("active");

    document
        .getElementById("username")
        .value = "";

    document
        .getElementById("password")
        .value = "";

}


// ==========================================
// DATA ABSENSI
// ==========================================

function ambilData() {

    const data =
        localStorage.getItem(
            "dataAbsensiPaskibra"
        );

    if (data) {

        return JSON.parse(data);

    }

    return [];

}


// ==========================================
// SIMPAN DATA
// ==========================================

function simpanData(data) {

    localStorage.setItem(
        "dataAbsensiPaskibra",
        JSON.stringify(data)
    );

}


// ==========================================
// ABSEN
// ==========================================

function absen() {

    const nama =
        document
            .getElementById("nama")
            .value
            .trim();

    const kelas =
        document
            .getElementById("kelas")
            .value;

    const message =
        document.getElementById(
            "attendanceMessage"
        );


    // Cek nama

    if (!nama) {

        message.textContent =
            "⚠️ Nama harus diisi.";

        message.style.color =
            "#dc2626";

        return;

    }


    // Cek kelas

    if (!kelas) {

        message.textContent =
            "⚠️ Silakan pilih kelas.";

        message.style.color =
            "#dc2626";

        return;

    }


    let data = ambilData();


    // ======================================
    // CEK DUPLIKAT
    // ======================================

    const sudahAbsen =
        data.some(item =>

            item.nama.toLowerCase() ===
            nama.toLowerCase()

            &&

            item.kelas === kelas

        );


    if (sudahAbsen) {

        message.textContent =
            "⚠️ Nama tersebut sudah melakukan absensi.";

        message.style.color =
            "#dc2626";

        return;

    }


    // ======================================
    // WAKTU
    // ======================================

    const sekarang =
        new Date();


    const waktu =
        sekarang.toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const tanggal =
        sekarang.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    // ======================================
    // DATA BARU
    // ======================================

    const dataBaru = {

        nama: nama,

        kelas: kelas,

        waktu: waktu,

        tanggal: tanggal

    };


    data.push(dataBaru);


    simpanData(data);


    // ======================================
    // BERSIHKAN FORM
    // ======================================

    document
        .getElementById("nama")
        .value = "";

    document
        .getElementById("kelas")
        .value = "";


    message.textContent =
        "✅ Absensi berhasil! Nama kamu sudah masuk.";

    message.style.color =
        "#16a34a";


    tampilkanAbsensi();

}


// ==========================================
// TAMPILKAN ABSENSI
// ==========================================

function tampilkanAbsensi() {

    const data =
        ambilData();


    const container =
        document.getElementById(
            "daftarHadir"
        );


    const jumlah =
        document.getElementById(
            "jumlahHadir"
        );


    jumlah.textContent =
        data.length +
        " anggota hadir";


    if (data.length === 0) {

        container.innerHTML = `

            <div class="empty">

                Belum ada yang absen.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    data.forEach(
        (item, index) => {

            container.innerHTML += `

                <div class="attendance-item">

                    <div class="nomor">

                        ${index + 1}

                    </div>


                    <div class="attendance-info">

                        <strong>

                            ${escapeHTML(
                                item.nama
                            )}

                        </strong>


                        <small>

                            Kelas ${escapeHTML(
                                item.kelas
                            )}

                            •

                            ${item.tanggal}

                            •

                            ${item.waktu}

                        </small>

                    </div>


                    <div class="status">

                        HADIR

                    </div>

                </div>

            `;

        }
    );

}


// ==========================================
// KEAMANAN TAMPILAN NAMA
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ==========================================
// RESET ABSENSI
// ==========================================

function resetAbsensi() {

    const yakin =
        confirm(
            "Yakin ingin menghapus seluruh daftar hadir?"
        );


    if (!yakin) {

        return;

    }


    localStorage.removeItem(
        "dataAbsensiPaskibra"
    );


    tampilkanAbsensi();

    alert(
        "Daftar absensi berhasil direset."
    );

}