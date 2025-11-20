// ========================================
// DATA SOAL - GAMPANG DIMODIFIKASI!
// ========================================
const questionsData = [
    {
        hint: "Daerah ini terkenal dengan Candi Borobudur dan Prambanan. Kota budayanya adalah Yogyakarta.",
        correctAnswer: "Jawa Tengah",
        options: ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali"],
        imgSrc: "./images/candiborobudur.jpg",
    },
    {
        hint: "Pulau dewata yang terkenal dengan pantai Kuta, upacara keagamaan Hindu, dan tari Kecak.",
        correctAnswer: "Bali",
        options: ["Lombok", "Bali", "Nusa Tenggara Barat", "Sulawesi Selatan"],
        imgSrc: "./images/tarikecak.jpg",
    },
    {
        hint: "Daerah ini adalah ibu kota Indonesia dan memiliki Monas sebagai ikon kotanya.",
        correctAnswer: "DKI Jakarta",
        options: ["DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah"],
        imgSrc: "./images/monas.png",
    },
    {
        hint: "Provinsi ini terkenal dengan Danau Toba, rumah adat Batak, dan kota Medan.",
        correctAnswer: "Sumatera Utara",
        options: ["Sumatera Barat", "Sumatera Utara", "Riau", "Aceh"],
        imgSrc: "./images/danautoba.jpg",
    },
    {
        hint: "Daerah penghasil kopi terkenal, memiliki Jam Gadang di Bukittinggi, dan suku Minangkabau.",
        correctAnswer: "Sumatera Barat",
        options: ["Sumatera Selatan", "Sumatera Barat", "Bengkulu", "Jambi"],
        imgSrc: "./images/minangkabau.jpeg",
    },
    {
        hint: "Provinsi paling barat Indonesia, terkenal dengan Masjid Raya Baiturrahman dan tsunami 2004.",
        correctAnswer: "Aceh",
        options: ["Aceh", "Sumatera Utara", "Riau", "Sumatera Barat"],
        imgSrc: "./images/masjidaceh.jpg",
    },
    {
        hint: "Pulau Komodo dan hewan purba Komodo berada di provinsi ini.",
        correctAnswer: "Nusa Tenggara Timur",
        options: ["Nusa Tenggara Barat", "Nusa Tenggara Timur", "Bali", "Maluku"],
        imgSrc: "./images/komodo.jpg",
    },
    {
        hint: "Daerah ini terkenal dengan Taman Nasional Bunaken dan rumah adat Tongkonan dari Toraja.",
        correctAnswer: "Sulawesi Selatan",
        options: ["Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Gorontalo"],
        imgSrc: "./images/bunaken.jpeg",
    },
    {
        hint: "Ibu kota provinsi ini adalah Banjarmasin, terkenal dengan pasar terapung dan sungai-sungainya.",
        correctAnswer: "Kalimantan Selatan",
        options: ["Kalimantan Timur", "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Barat"],
        imgSrc: "./images/pasarterapung.jpg",
    },
    {
        hint: "Provinsi penghasil rempah-rempah seperti cengkeh dan pala, dijuluki 'Kepulauan Rempah'.",
        correctAnswer: "Maluku",
        options: ["Papua", "Maluku", "Sulawesi Utara", "Nusa Tenggara Timur"],
        imgSrc: "./images/rempah.jpg",
    }
];

// ========================================
// VARIABEL GAME
// ========================================
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let timerInterval;
let timeLeft = 50;
let username = "";

// ========================================
// ELEMEN DOM
// ========================================
const usernameScreen = document.getElementById('usernameScreen');
const gameScreen = document.getElementById('gameScreen');
const usernameInput = document.getElementById('usernameInput');
const startGameBtn = document.getElementById('startGameBtn');
const playerName = document.getElementById('playerName');
const questionImage = document.getElementById('questionImage');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const nextBtn = document.getElementById('nextBtn');
const feedback = document.getElementById('feedback');
const gameContainer = document.getElementById('gameContainer');
const resultScreen = document.getElementById('resultScreen');
const finalScore = document.getElementById('finalScore');
const finalPlayerName = document.getElementById('finalPlayerName');
const resultMessage = document.getElementById('resultMessage');
const warningMessage = document.getElementById('warningMessage');
const warningText = document.getElementById('warningText');

// ========================================
// SOUND EFFECTS
// ========================================
const sounds = {
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
    correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'),
    wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'),
    finish: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3')
};

// Set volume untuk semua sound
Object.keys(sounds).forEach(key => {
    sounds[key].volume = 0.3;
});

// ========================================
// FUNGSI UNTUK PLAY SOUND
// ========================================
function playSound(soundName) {
    try {
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(err => {
            console.log('Audio play error:', err);
        });
    } catch (error) {
        console.log('Sound error:', error);
    }
}

// ========================================
// USERNAME VALIDATION & WARNING
// ========================================
function showWarning(message) {
    warningText.textContent = message;
    warningMessage.style.display = 'flex';
    usernameInput.classList.add('error');
    usernameInput.classList.remove('success');
}

function hideWarning() {
    warningMessage.style.display = 'none';
    usernameInput.classList.remove('error');
}

function showSuccess() {
    hideWarning();
    usernameInput.classList.add('success');
}

// Real-time validation saat mengetik
usernameInput.addEventListener('input', () => {
    const value = usernameInput.value.trim();
    
    if (value === '') {
        hideWarning();
        usernameInput.classList.remove('success');
    } else if (value.length < 2) {
        showWarning('Username minimal 2 karakter!');
    } else {
        showSuccess();
    }
});

// ========================================
// USERNAME HANDLING
// ========================================
startGameBtn.addEventListener('click', startGame);

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startGame();
    }
});

function startGame() {
    username = usernameInput.value.trim();
    
    if (username === '') {
        showWarning('Mohon masukkan username terlebih dahulu!');
        usernameInput.focus();
        return;
    }
    
    if (username.length < 2) {
        showWarning('Username minimal 2 karakter!');
        usernameInput.focus();
        return;
    }
    
    // Shuffle questions at start
    questions = shuffleArray([...questionsData]);
    
    // Hide username screen, show game screen
    usernameScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // Set username display
    playerName.textContent = username;
    
    // Initialize game
    initGame();
}

// ========================================
// INISIALISASI GAME
// ========================================
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    totalQuestions.textContent = questions.length;
    loadQuestion();
}

// ========================================
// TIMER FUNCTIONS
// ========================================
function startTimer() {
    timeLeft = 50;
    timerDisplay.textContent = timeLeft;
    timerDisplay.classList.remove('warning');
    
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Warning when time < 10 seconds
        if (timeLeft <= 10) {
            timerDisplay.classList.add('warning');
        }
        
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function handleTimeOut() {
    if (hasAnswered) return;
    
    hasAnswered = true;
    
    const question = questions[currentQuestionIndex];
    const allButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allButtons.forEach(btn => {
        btn.disabled = true;
        // Show correct answer
        if (btn.textContent === question.correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    playSound('wrong');
    showFeedback(`⏰ Waktu Habis! Kamu Belum Menjawab, Jawaban yang Benar adalah: ${question.correctAnswer}`, 'wrong');
    nextBtn.style.display = 'block';
}

// ========================================
// LOAD SOAL
// ========================================
function loadQuestion() {
    hasAnswered = false;
    nextBtn.style.display = 'none';
    feedback.style.display = 'none';
    
    const question = questions[currentQuestionIndex];
    
    console.log('Loading question:', currentQuestionIndex + 1);
    console.log('Image path:', question.imgSrc);
    
    // Start timer
    startTimer();
    
    // Update nomor soal
    questionNumber.textContent = currentQuestionIndex + 1;
    
    // Update image dengan error handling
    questionImage.src = question.imgSrc;
    questionImage.alt = `Gambar ${question.correctAnswer}`;
    
    // Error handling untuk gambar
    questionImage.onerror = function() {
        console.error('❌ Gagal memuat gambar:', question.imgSrc);
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="16" text-anchor="middle" fill="%23999"%3EGambar tidak dapat dimuat%3C/text%3E%3Ctext x="50%25" y="60%25" font-size="12" text-anchor="middle" fill="%23666"%3E' + question.imgSrc + '%3C/text%3E%3C/svg%3E';
        this.alt = 'Gambar tidak tersedia';
    };
    
    // Success handler
    questionImage.onload = function() {
        console.log('✅ Gambar berhasil dimuat:', question.imgSrc);
    };
    
    // Update teks soal
    questionText.textContent = question.hint;
    
    // Bersihkan opsi lama
    optionsContainer.innerHTML = '';
    
    // Acak urutan opsi
    const shuffledOptions = shuffleArray([...question.options]);
    
    // Buat tombol opsi
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => {
            playSound('click');
            checkAnswer(option, button);
        };
        optionsContainer.appendChild(button);
    });
}

// ========================================
// CEK JAWABAN
// ========================================
function checkAnswer(selectedAnswer, buttonElement) {
    if (hasAnswered) return;
    
    hasAnswered = true;
    stopTimer();
    
    const question = questions[currentQuestionIndex];
    const allButtons = document.querySelectorAll('.option-btn');
    
    // Nonaktifkan semua tombol
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === question.correctAnswer) {
        // JAWABAN BENAR
        buttonElement.classList.add('correct');
        
        // Bonus points based on time left
        let points = 10;

        
        score += points;
        scoreDisplay.textContent = score;
        
        playSound('correct');
        showFeedback(`✅ Benar! Mantap! (+${points} poin)`, 'correct');
    } else {
        // JAWABAN SALAH
        buttonElement.classList.add('wrong');
        
        // Tampilkan jawaban yang benar
        allButtons.forEach(btn => {
            if (btn.textContent === question.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        playSound('wrong');
        showFeedback(`❌ Jawaban Salah! Jawaban yang Benar adalah: ${question.correctAnswer}`, 'wrong');
    }
    
    // Tampilkan tombol next
    nextBtn.style.display = 'block';
}

// ========================================
// TAMPILKAN FEEDBACK
// ========================================
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = 'block';
}

// ========================================
// SOAL BERIKUTNYA
// ========================================
nextBtn.addEventListener('click', () => {
    playSound('click');
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// ========================================
// TAMPILKAN HASIL
// ========================================
function showResult() {
    stopTimer();
    
    // Play finish sound
    playSound('finish');
    
    gameContainer.style.display = 'none';
    resultScreen.style.display = 'flex';
    
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    finalScore.textContent = `${score} / ${maxScore}`;
    finalPlayerName.textContent = username;
    
    // Pesan berdasarkan skor
    if (percentage >= 90) {
        resultMessage.textContent = '🏆 Sempurna! Kamu master budaya Indonesia!';
    } else if (percentage >= 70) {
        resultMessage.textContent = '🌟 Bagus sekali! Kamu paham budaya Indonesia!';
    } else if (percentage >= 50) {
        resultMessage.textContent = '👍 Lumayan! Terus belajar ya!';
    } else {
        resultMessage.textContent = '💪 Jangan menyerah! Coba lagi!';
    }
}

// ========================================
// RESTART GAME
// ========================================
function restartGame() {
    // Reset semua variabel
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    
    // Shuffle questions again
    questions = shuffleArray([...questionsData]);
    
    // Hide result, show game
    resultScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    
    // Initialize game
    initGame();
}

// ========================================
// FUNGSI HELPER: ACAK ARRAY
// ========================================
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ========================================
// CLEANUP ON PAGE UNLOAD
// ========================================
window.addEventListener('beforeunload', () => {
    stopTimer();
});

// ========================================
// JALANKAN SAAT HALAMAN DIMUAT
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Game dimuat!');
    console.log('📊 Total soal:', questionsData.length);
    
    // Fokus ke input username
    usernameInput.focus();
    
    // Check jika ada elemen yang tidak ditemukan
    const requiredElements = {
        usernameScreen,
        gameScreen,
        usernameInput,
        startGameBtn,
        playerName,
        questionImage,
        questionText,
        optionsContainer,
        questionNumber,
        totalQuestions,
        scoreDisplay,
        timerDisplay,
        nextBtn,
        feedback,
        gameContainer,
        resultScreen,
        finalScore,
        finalPlayerName,
        resultMessage,
        warningMessage,
        warningText
    };
    
    let missingElements = [];
    for (let [name, element] of Object.entries(requiredElements)) {
        if (!element) {
            missingElements.push(name);
            console.error(`❌ Element tidak ditemukan: ${name}`);
        }
    }
    
    if (missingElements.length > 0) {
        console.error('⚠️ Ada element yang hilang! Pastikan ID di HTML sesuai dengan JavaScript.');
    } else {
        console.log('✅ Semua element ditemukan!');
    }
});