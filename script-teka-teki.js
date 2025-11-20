// ========================================
// DATA SOAL - GAMPANG DIMODIFIKASI!
// ========================================
const questionsData = [
    {
        mediaType: "image",
        imgSrc: "./images/lingkungansekolah.png",
        question: "AKU TEMPAT KAMU BELAJAR, BERMAIN, BERLARI, DAN BERTEMU GURU. KAMU DATANG HAMPIR SETIAP HARI, TAPI AKU BUKAN RUMAHMU. SIAPAKAH AKU?",
        answer: "LINGKUNGAN SEKOLAH"
    },
    {
        mediaType: "image",
        imgSrc: "./images/kincirangin.jpg",
        question: "AKU BERPUTAR SETIAP HARI, MENUNJUKKAN ARAH ANGIN, DAN DIPASANG TINGGI DI LUAR RUANGAN. SIAPAKAH AKU??",
        answer: "KINCIR ANGIN"
    },
    {
        mediaType: "image",
        imgSrc: "./images/buku-pelajaran.jpg",
        question: "AKU SERING KAMU BUKA SEBELUM BELAJAR. AKU PENUH WARNA, GAMBAR, DAN INFORMASI, TAPI AKU BUKAN KOMIK. SIAPAKAH AKU?",
        answer: "BUKU PELAJARAN"
    },
    {
        mediaType: "image",
        imgSrc: "./images/kapal.png",
        question: "AKU DIGUNAKAN UNTUK PERGI KE TEMPAT JAUH. AKU TIDAK BERJALAN DI DARAT DAN TIDAK TERBANG DI UDARA, TETAPI MENGAPUNG DI ATAS AIR. SIAPAKAH AKU?",
        answer: "KAPAL LAUT"
    },
    {
        mediaType: "image",
        imgSrc: "./images/pohonbuah.jpg",
        question: "AKU TUMBUH DARI BIJI, PUNYA BATANG, DAUN, DAN SERING MENGHASILKAN BUAH UNTUK MANUSIA. SIAPAKAH AKU?",
        answer: "POHON BUAH"
    },
    {
        mediaType: "image",
        imgSrc: "./images/kotakmakan.jpg",
        question: "AKU KOTAK KECIL YANG KAMU BAWA KE SEKOLAH. AKU MENYIMPAN MAKANANMU AGAR KAMU TIDAK LAPAR SAAT BELAJAR. SIAPAKAH AKU?",
        answer: "KOTAK MAKAN"
    },
    {
        mediaType: "image",
        imgSrc: "./images/senter.jpg",
        question: "AKU MEMANCARKAN CAHAYA DI TEMPAT GELAP. AKU DIBAWA DENGAN TANGAN DAN SERING DIGUNAKAN SAAT MALAM. SIAPAKAH AKU?",
        answer: "SENTER TANGAN"
    },
    {
        mediaType: "image",
        imgSrc: "./images/gajah.jpg",
        question: "AKU HEWAN BESAR, HIDUP DI DARAT, PUNYA TELINGA LEBAR DAN BELALAI PANJANG. SIAPAKAH AKU?",
        answer: "GAJAH"
    },
    {
        mediaType: "image",
        imgSrc: "./images/lompattali.jpg",
        question: "AKU PERMAINAN YANG MEMAKAI TALI DAN MEMBUAT BADANMU BERGERAK SEHAT. BIASANYA DIMAINKAN DI LUAR RUANGAN. SIAPAKAH AKU?",
        answer: "LOMPAT TALI"
    },
    {
        mediaType: "image",
        imgSrc: "./images/kursi.jpg",
        question: "AKU BENDA YANG KAMU DUDUKI SETIAP HARI DI DALAM KELAS. AKU SELALU BERDAMPINGAN DENGAN MEJA. SIAPAKAH AKU?",
        answer: "KURSI SEKOLAH"
    }
];

// ========================================
// SOUND EFFECTS - WEB AUDIO API
// ========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

// Inisialisasi Audio Context (harus setelah user interaction)
function initAudio() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
}

// Fungsi untuk membuat suara klik keyboard
function playClickSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Fungsi untuk suara backspace
function playBackspaceSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 400;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Fungsi untuk suara tombol action (help, clear, check)
function playButtonSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Fungsi untuk suara jawaban benar
function playCorrectSound() {
    if (!audioContext) return;
    
    // Nada pertama
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.value = 523; // C5
    osc1.type = 'sine';
    gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    osc1.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.3);
    
    // Nada kedua
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.value = 659; // E5
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    osc2.start(audioContext.currentTime + 0.1);
    osc2.stop(audioContext.currentTime + 0.4);
    
    // Nada ketiga
    const osc3 = audioContext.createOscillator();
    const gain3 = audioContext.createGain();
    osc3.connect(gain3);
    gain3.connect(audioContext.destination);
    osc3.frequency.value = 784; // G5
    osc3.type = 'sine';
    gain3.gain.setValueAtTime(0.3, audioContext.currentTime + 0.2);
    gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
    osc3.start(audioContext.currentTime + 0.2);
    osc3.stop(audioContext.currentTime + 0.6);
}

// Fungsi untuk suara jawaban salah
function playWrongSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Fungsi untuk suara hint/bantuan
function playHintSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Fungsi untuk suara warning
function playWarningSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 400;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// ========================================
// VARIABEL GAME
// ========================================
let questions = []; // Akan diisi dengan soal yang sudah di-shuffle
let username = "";
let currentQuestionIndex = 0;
let score = 0;
let correctAnswerCount = 0;
let wrongAnswerCount = 0;
let helpRemaining = 3;
let helpUsedTotal = 0;
let currentAnswer = [];
let correctAnswer = "";
let fullAnswer = ""; // Jawaban lengkap dengan spasi
let revealedLetters = new Set();
let timer = 50;
let timerInterval = null;

// ========================================
// ELEMEN DOM
// ========================================
const usernameScreen = document.getElementById('usernameScreen');
const mainScreen = document.getElementById('mainScreen');
const usernameForm = document.getElementById('usernameForm');
const usernameInput = document.getElementById('usernameInput');
const displayUsername = document.getElementById('displayUsername');
const resultUsername = document.getElementById('resultUsername');

const mediaContainer = document.getElementById('mediaContainer');
const questionText = document.getElementById('questionText');
const letterBoxes = document.getElementById('letterBoxes');
const keyboard = document.getElementById('keyboard');
const currentQuestion = document.getElementById('currentQuestion');
const totalQuestions = document.getElementById('totalQuestions');
const scoreDisplay = document.getElementById('score');
const progressFill = document.getElementById('progressFill');
const timerDisplay = document.getElementById('timerDisplay');

const helpBtn = document.getElementById('helpBtn');
const helpCount = document.getElementById('helpCount');
const clearBtn = document.getElementById('clearBtn');
const checkBtn = document.getElementById('checkBtn');
const feedback = document.getElementById('feedback');
const nextContainer = document.getElementById('nextContainer');
const nextBtn = document.getElementById('nextBtn');
const gameContainer = document.getElementById('gameContainer');
const resultScreen = document.getElementById('resultScreen');
const finalScore = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');
const correctCount = document.getElementById('correctCount');
const wrongCount = document.getElementById('wrongCount');
const helpUsed = document.getElementById('helpUsed');

// ========================================
// KEYBOARD LAYOUT
// ========================================
const keyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

// ========================================
// FUNGSI SHUFFLE ARRAY
// ========================================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ========================================
// USERNAME FORM SUBMIT
// ========================================
usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Inisialisasi audio saat user pertama kali berinteraksi
    initAudio();
    
    const inputValue = usernameInput.value.trim();
    
    if (inputValue.length < 2) {
        // Tampilkan peringatan yang lebih bagus
        playWarningSound();
        usernameInput.classList.add('error-shake');
        showUsernameError('Nama harus minimal 2 karakter!');
        
        // Hapus efek shake setelah animasi selesai
        setTimeout(() => {
            usernameInput.classList.remove('error-shake');
        }, 500);
        return;
    }
    
    playButtonSound();
    username = inputValue;
    displayUsername.textContent = username;
    resultUsername.textContent = username;
    
    // Hide username screen, show game
    usernameScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    
    // Shuffle soal dan mulai game
    questions = shuffleArray(questionsData);
    initGame();
});

// ========================================
// FUNGSI SHOW USERNAME ERROR
// ========================================
function showUsernameError(message) {
    // Hapus error sebelumnya jika ada
    const existingError = document.querySelector('.username-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Buat elemen error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'username-error';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠️</span>
        <span class="error-text">${message}</span>
    `;
    
    // Tambahkan ke form
    usernameForm.appendChild(errorDiv);
    
    // Hapus setelah 3 detik
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// ========================================
// INISIALISASI GAME
// ========================================
function initGame() {
    totalQuestions.textContent = questions.length;
    helpCount.textContent = helpRemaining;
    createKeyboard();
    loadQuestion();
}

// ========================================
// CREATE KEYBOARD (DENGAN SOUND)
// ========================================
function createKeyboard() {
    keyboard.innerHTML = '';
    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(letter => {
            const button = document.createElement('button');
            button.className = 'key-btn';
            
            // Khusus untuk tombol backspace
            if (letter === '⌫') {
                button.classList.add('backspace-btn');
                button.innerHTML = '<span class="backspace-icon">⌫</span>';
                button.onclick = () => {
                    playBackspaceSound();
                    deleteLastLetter();
                };
            } else {
                button.textContent = letter;
                button.dataset.letter = letter;
                button.onclick = () => {
                    playClickSound();
                    typeLetter(letter, button);
                };
            }
            
            rowDiv.appendChild(button);
        });
        
        keyboard.appendChild(rowDiv);
    });
}

// ========================================
// TIMER FUNCTIONS
// ========================================
function startTimer() {
    // Reset timer
    timer = 50;
    timerDisplay.textContent = timer;
    timerDisplay.classList.remove('warning');
    
    // Clear previous interval if exists
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Start new interval
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        
        // Warning pada 5 detik terakhir
        if (timer <= 10) {
            timerDisplay.classList.add('warning');
            // Play warning sound pada detik terakhir
            if (timer === 10 || timer === 5 || timer === 1) {
                playWarningSound();
            }
        }
        
        // Waktu habis
        if (timer <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function timeUp() {
    playWrongSound();
    wrongAnswerCount++;
    
    // Disable buttons
    checkBtn.disabled = true;
    clearBtn.disabled = true;
    helpBtn.disabled = true;
    document.querySelectorAll('.key-btn').forEach(btn => btn.disabled = true);
    
    // PERBAIKAN: Show correct answer dengan mapping yang benar
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    boxes.forEach((box) => {
        const actualIndex = parseInt(box.dataset.index);
        box.textContent = correctAnswer[actualIndex]; // Gunakan correctAnswer (tanpa spasi)
        box.classList.add('wrong');
    });
    
    showFeedback('⏰ Waktu Habis! Anda Belum Menjawab, Jawaban yang Benar: ' + fullAnswer, 'wrong');
    nextContainer.style.display = 'block';
}

// ========================================
// LOAD QUESTION
// ========================================
function loadQuestion() {
    // Reset state
    currentAnswer = [];
    revealedLetters.clear();
    feedback.style.display = 'none';
    nextContainer.style.display = 'none';
    checkBtn.disabled = false;
    clearBtn.disabled = false;
    
    // Reset tombol help untuk setiap soal
    if (helpRemaining > 0) {
        helpBtn.disabled = false;
        helpBtn.classList.remove('disabled');
    }
    
    // Enable all keyboard buttons
    document.querySelectorAll('.key-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('used', 'correct', 'wrong', 'revealed');
    });
    
    const question = questions[currentQuestionIndex];
    
    // Simpan jawaban lengkap (dengan spasi) dan tanpa spasi terpisah
    fullAnswer = question.answer;
    correctAnswer = question.answer.replace(/\s/g, '');
    
    // Update progress
    currentQuestion.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Load media as HTML img element
    loadMediaAsHTML(question);
    
    // Update question text
    questionText.textContent = question.question;
    
    // Create letter boxes
    createLetterBoxes();
    
    // Start timer
    startTimer();
}

// ========================================
// LOAD MEDIA AS HTML
// ========================================
function loadMediaAsHTML(question) {
    mediaContainer.innerHTML = '';
    
    if (question.mediaType === 'image') {
        const img = document.createElement('img');
        
        // Gunakan imgSrc jika ada, jika tidak gunakan mediaUrl
        if (question.imgSrc) {
            img.src = question.imgSrc;
        } else if (question.mediaUrl) {
            img.src = question.mediaUrl;
        }
        
        img.alt = 'Gambar Soal';
        img.className = 'media-content';
        
        // Error handling jika gambar gagal load
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="20" text-anchor="middle" fill="%23999"%3EGambar tidak dapat dimuat%3C/text%3E%3C/svg%3E';
        };
        
        mediaContainer.appendChild(img);
    } else if (question.mediaType === 'video') {
        const video = document.createElement('video');
        video.src = question.mediaUrl;
        video.className = 'media-content';
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        mediaContainer.appendChild(video);
    }
}

// ========================================
// CREATE LETTER BOXES
// ========================================
function createLetterBoxes() {
    letterBoxes.innerHTML = '';
    const answer = fullAnswer; // Gunakan fullAnswer
    let letterIndex = 0; // Track index huruf (tanpa spasi)
    
    for (let i = 0; i < answer.length; i++) {
        const box = document.createElement('div');
        const char = answer[i];
        
        if (char === ' ') {
            box.className = 'letter-box space';
        } else {
            box.className = 'letter-box';
            box.dataset.index = letterIndex; // Gunakan letterIndex untuk mapping
            letterIndex++;
        }
        
        letterBoxes.appendChild(box);
    }
}

// ========================================
// TYPE LETTER
// ========================================
function typeLetter(letter, button) {
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    
    for (let box of boxes) {
        if (!box.textContent) {
            box.textContent = letter;
            currentAnswer.push(letter);
            break;
        }
    }
}

// ========================================
// DELETE LAST LETTER (BACKSPACE)
// ========================================
function deleteLastLetter() {
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    
    // Cari kotak terakhir yang terisi dan bukan revealed
    for (let i = boxes.length - 1; i >= 0; i--) {
        if (boxes[i].textContent && !revealedLetters.has(parseInt(boxes[i].dataset.index))) {
            boxes[i].textContent = '';
            boxes[i].classList.remove('correct', 'wrong');
            currentAnswer.pop();
            break;
        }
    }
}

// ========================================
// CLEAR ANSWER (DENGAN SOUND)
// ========================================
clearBtn.addEventListener('click', () => {
    playButtonSound();
    currentAnswer = [];
    
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    boxes.forEach((box) => {
        const boxIndex = parseInt(box.dataset.index);
        if (!revealedLetters.has(boxIndex)) {
            box.textContent = '';
            box.classList.remove('correct', 'wrong');
        }
    });
    
    document.querySelectorAll('.key-btn').forEach(btn => {
        btn.classList.remove('used');
    });
});

// ========================================
// HELP BUTTON
// ========================================
helpBtn.addEventListener('click', () => {
    if (helpRemaining <= 0) {
        playWarningSound();
        showFeedback('❌ Bantuan sudah habis!', 'warning');
        return;
    }
    
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    const emptyIndices = [];
    
    // Cari kotak yang kosong dan belum di-reveal
    boxes.forEach((box) => {
        const actualIndex = parseInt(box.dataset.index);
        if (!box.textContent && !revealedLetters.has(actualIndex)) {
            emptyIndices.push({ box: box, actualIndex: actualIndex });
        }
    });
    
    // Notifikasi jika semua kotak terisi
    if (emptyIndices.length === 0) {
        playWarningSound();
        showFeedback('✅ Semua kotak sudah terisi! Cek jawabanmu atau hapus untuk menggunakan bantuan.', 'warning');
        return;
    }
    
    playHintSound();
    
    // Pilih random dari kotak kosong dan ambil huruf yang benar
    const randomItem = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const correctLetter = correctAnswer[randomItem.actualIndex]; // Gunakan correctAnswer (tanpa spasi)
    
    randomItem.box.textContent = correctLetter;
    randomItem.box.classList.add('revealed');
    revealedLetters.add(randomItem.actualIndex);
    
    // Highlight tombol keyboard yang sesuai
    document.querySelectorAll('.key-btn').forEach(btn => {
        if (btn.dataset.letter === correctLetter) {
            btn.classList.add('revealed');
        }
    });
    
    helpRemaining--;
    helpUsedTotal++;
    helpCount.textContent = helpRemaining;
    
    if (helpRemaining === 0) {
        helpBtn.disabled = true;
        helpBtn.classList.add('disabled');
    }
    
    showFeedback('💡 Bantuan digunakan! 1 huruf terungkap', 'help');
});

// ========================================
// CHECK ANSWER (DENGAN SOUND)
// ========================================
checkBtn.addEventListener('click', () => {
    const boxes = document.querySelectorAll('.letter-box:not(.space)');
    let userAnswer = '';
    
    boxes.forEach(box => {
        userAnswer += box.textContent || '';
    });
    
    if (userAnswer.length !== correctAnswer.length) {
        playWarningSound();
        showFeedback('⚠️ Isi semua huruf dulu!', 'warning');
        return;
    }
    
    playButtonSound();
    
    // Stop timer
    stopTimer();
    
    // Disable buttons
    checkBtn.disabled = true;
    clearBtn.disabled = true;
    helpBtn.disabled = true;
    document.querySelectorAll('.key-btn').forEach(btn => btn.disabled = true);
    
    if (userAnswer === correctAnswer) {
        // BENAR
        playCorrectSound();
        correctAnswerCount++;
        const points = 10 - helpUsedTotal;
        score += Math.max(points, 5);
        scoreDisplay.textContent = score;
        
        boxes.forEach(box => {
            if (!box.classList.contains('space')) {
                box.classList.add('correct');
            }
        });
        
        showFeedback('✅ Benar! +' + Math.max(points, 5) + ' poin', 'correct');
    } else {
        // SALAH
        playWrongSound();
        wrongAnswerCount++;
        
        // Bandingkan dengan mapping yang benar
        boxes.forEach((box) => {
            if (!box.classList.contains('space')) {
                const actualIndex = parseInt(box.dataset.index);
                if (box.textContent === correctAnswer[actualIndex]) {
                    box.classList.add('correct');
                } else {
                    box.textContent = correctAnswer[actualIndex];
                    box.classList.add('wrong');
                }
            }
        });
        
        showFeedback('❌ Jawaban Salah! Jawaban yang Benar adalah: ' + fullAnswer, 'wrong');
    }
    
    nextContainer.style.display = 'block';
});

// ========================================
// SHOW FEEDBACK
// ========================================
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = 'block';
}

// ========================================
// NEXT QUESTION (DENGAN SOUND)
// ========================================
nextBtn.addEventListener('click', () => {
    playButtonSound();
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// ========================================
// SHOW RESULT
// ========================================
function showResult() {
    stopTimer();
    gameContainer.style.display = 'none';
    resultScreen.style.display = 'flex';
    
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    finalScore.textContent = score;
    correctCount.textContent = correctAnswerCount;
    wrongCount.textContent = wrongAnswerCount;
    helpUsed.textContent = helpUsedTotal;
    
    if (percentage >= 90) {
        playCorrectSound();
        resultMessage.textContent = '🏆 Sempurna! Kamu master teka-teki!';
    } else if (percentage >= 70) {
        playCorrectSound();
        resultMessage.textContent = '🌟 Hebat! Kamu sangat pintar!';
    } else if (percentage >= 50) {
        playButtonSound();
        resultMessage.textContent = '👍 Bagus! Terus berlatih!';
    } else {
        playButtonSound();
        resultMessage.textContent = '💪 Ayo main lagi! Kamu pasti bisa!';
    }
}

// ========================================
// JALANKAN SAAT HALAMAN DIMUAT
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    // Fokus ke input username
    usernameInput.focus();
});