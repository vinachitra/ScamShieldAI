// =======================
// SCROLL HERO BUTTON
// =======================

const btnCheck = document.getElementById("btn-check");

if(btnCheck){
    btnCheck.addEventListener("click", () => {
        document.getElementById("checker").scrollIntoView({
            behavior:"smooth"
        });
    });
}

// =======================
// NAVBAR SHADOW
// =======================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";
    } else {
        header.style.boxShadow = "0 3px 12px rgba(0,0,0,.05)";
    }
})

// =======================
// QUIZ
// =======================

const quizData = [
    {
        question: "Seseorang mengaku dari bank meminta kode OTP melalui WhatsApp. Apa yang harus kamu lakukan?",
        answers: [
            "Berikan OTP agar akun tetap aman.",
            "Hubungi bank melalui nomor resmi dan jangan berikan OTP.",
            "Kirim foto kartu ATM.",
            "Klik link yang dikirim."
        ],
        correct: 1
    },

    {
        question: "Kamu menerima pesan 'Selamat! Anda memenangkan iPhone 17 Pro Max. Klik link berikut.' Apa tindakan terbaik?",
        answers: [
            "Klik link agar hadiah tidak hangus.",
            "Isi data pribadi.",
            "Abaikan dan cek informasi di website resmi.",
            "Bagikan ke teman."
        ],
        correct: 2
    },

    {
        question: "Website meminta login tetapi alamatnya 'tokopedia-login.xyz'. Apa yang harus dilakukan?",
        answers: [
            "Langsung login.",
            "Masukkan email saja.",
            "Periksa URL dan jangan login jika mencurigakan.",
            "Refresh halaman."
        ],
        correct: 2
    },

    {
        question: "Seseorang menawarkan investasi dengan keuntungan 50% per minggu. Apa yang harus dilakukan?",
        answers: [
            "Segera transfer uang.",
            "Cari informasi dan cek legalitas investasi.",
            "Pinjam uang untuk investasi.",
            "Ajak teman ikut."
        ],
        correct: 1
    },

    {
        question: "Kurir mengirim file APK dan meminta kamu menginstalnya untuk melihat resi. Apa tindakan yang benar?",
        answers: [
            "Install aplikasi tersebut.",
            "Matikan antivirus lalu install.",
            "Tolak instalasi dan gunakan aplikasi resmi ekspedisi.",
            "Bagikan APK ke keluarga."
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const answers = document.querySelector(".answers");
const questionNumber = document.getElementById("question-number");
const quizResult = document.getElementById("quiz-result");

function loadQuestion(){
    const q = quizData[currentQuestion];

    questionNumber.textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${quizData.length}`;

    question.textContent = q.question;
    answers.innerHTML = "";
    quizResult.innerHTML = "";

    q.answers.forEach((answer,index)=>{
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = answer;
        btn.onclick = ()=>selectAnswer(index);
        answers.appendChild(btn);
    });
}

function selectAnswer(index){
    if(index === quizData[currentQuestion].correct){
        score++;
    }
    currentQuestion++;

    if(currentQuestion < quizData.length){
        loadQuestion();
    }else{
        showFinalScore();
    }
}

function showFinalScore(){

    let title="";
    let color="";

    if(score===5){
        title="🛡 Digital Guardian";
        color="#22C55E";
    }else if(score>=3){
        title="👍 Cukup Waspada";
        color="#F59E0B";
    }else{
        title="⚠ Perlu Belajar Lagi";
        color="#EF4444";
    }

    questionNumber.innerHTML="";
    question.innerHTML=`Skor Kamu : ${score}/${quizData.length}`;
    answers.innerHTML="";

    quizResult.innerHTML= `
        <div class="score-card">

            <h2 style="color:${color}">
                ${title}
            </h2>

            <p>
                Skor kamu adalah <strong>${score}/${quizData.length}</strong>.
                Terima kasih telah mengikuti kuis.
            </p>

            <div class="quiz-actions">
                <button id="restartQuiz">
                    🔄 Ulangi Quiz
                </button>

                <button id="goChecker">
                    🤖 Coba AI Checker
                </button>
            </div>

        </div>
    `;

    document.getElementById("restartQuiz").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;

        loadQuestion();

        document.getElementById("quiz").scrollIntoView({
            behavior: "smooth"
        });
    });

    document.getElementById("goChecker").addEventListener("click", () => {
        document.getElementById("checker").scrollIntoView({
            behavior: "smooth"
        });
    });
}

if(question){
    loadQuestion();
}

// =======================
// AI CHECKER (DUMMY)
// =======================

const analyzeBtn = document.getElementById("analyze");
if(analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeMessage);
}

const result = document.getElementById("result");
const message = document.getElementById("message");

function analyzeMessage(){
    const text = message.value.trim();

    if(text === ""){
        alert("Silakan masukkan pesan terlebih dahulu.");
        return;
    }

    result.innerHTML = `
        <h3>🔄 Sedang menganalisis...</h3>
        <p>AI sedang membaca pesan Anda.</p>
    `;

    setTimeout(() => {
        analyzeScam(text);
    }, 2000);
}

// ==============================
// DUMMY DETECTION
// ==============================

function analyzeScam(text) {
    const lower = text.toLowerCase();
    const keywords = [
        "otp", "hadiah", "klik", "transfer",
        "rekening", "verifikasi", "password", "akun",
        "bank", "uang", "link", "whatsapp"
    ];

    let score = 0;

    keywords.forEach(keyword => {
        if(lower.includes(keyword)) {
            score++;
        }
    });

    showResult(score);
}

// ==============================
// RESULT
// ==============================

function showResult(score){

    let level = "";
    let color = "";
    let tips = "";

    if(score >= 4){

        level = "🔴 Risiko Tinggi";
        color = "#EF4444";

        tips = `
        <ul>
            <li>Jangan klik tautan.</li>
            <li>Jangan memberikan OTP.</li>
            <li>Verifikasi ke pihak resmi.</li>
        </ul>
        `;

    }else if(score >= 2){

        level = "🟠 Risiko Sedang";
        color = "#F59E0B";

        tips = `
        <ul>
            <li>Periksa kembali identitas pengirim.</li>
            <li>Pastikan website resmi.</li>
        </ul>
        `;

    }else {

        level = "🟢 Risiko Rendah";
        color = "#22C55E";

        tips = `
        <ul>
            <li>Tetap berhati-hati.</li>
            <li>Jangan membagikan data pribadi.</li>
        </ul>
        `;
    }

    result.style.borderLeft = `8px solid ${color}`;

    result.innerHTML = `
        <h2>${level}</h2>

        <p>
        AI menemukan beberapa indikator yang berkaitan
        dengan pola penipuan online.
        </p>

        <h3>Tips</h3>

        ${tips}
    `;
}

loadQuestion();