// ========================================
// SOUND EFFECTS SYSTEM
// ========================================
const SoundEffects = {
    playClick: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
    },
    
    playCorrect: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // First note
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        osc1.frequency.value = 800;
        osc1.type = 'sine';
        gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        osc1.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.2);
        
        // Second note
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 1000;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.2);
        }, 100);
    },
    
    playWrong: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 300;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    },
    
    playTimeout: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
};

// ========================================
// DATA SOAL
// ========================================
const allQuestions = [
    {
        sentence: "Air di daun keladi",
        hint: "Peribahasa tentang Seseorang yang berbicara tetapi tidak bisa dipercaya."
    },
    {
        sentence: "Berat sama dipikul ringan sama dijinjing",
        hint: "Peribahasa tentang gotong royong"
    },
    {
        sentence: "Seperti pungguk merindukan bulan",
        hint: "Peribahasa tentang mengharapkan sesuatu yang mustahil"
    },
    {
        sentence: "Sekali layar terkembang pantang surut ke belakang",
        hint: "Peribahasa tentang tekad yang kuat"
    },
    {
        sentence: "Bagai api dalam sekam",
        hint: "Peribahasa tentang masalah tersembunyi yang berbahaya"
    },
    {
        sentence: "Ada udang di balik batu",
        hint: "Peribahasa tentang maksud tersembunyi"
    },
    {
        sentence: "Seperti katak dalam tempurung",
        hint: "Peribahasa tentang orang yang berpikiran sempit"
    },
    {
        sentence: "Dimana bumi dipijak disana langit dijunjung",
        hint: "Peribahasa tentang menyesuaikan diri dengan tempat baru"
    },
    {
        sentence: "Tong kosong nyaring bunyinya",
        hint: "Peribahasa tentang orang yang banyak bicara tapi kosong isinya"
    },
    {
        sentence: "Sekali dayung dua tiga pulau terlampaui.",
        hint: "Peribahasa tentang Tindakan kecil tapi hasilnya besar karena tepat sasaran"
    },
    {
        sentence: "Besar pasak daripada tiang",
        hint: "Peribahasa tentang pengeluaran lebih besar dari pemasukan"
    },
    {
        sentence: "Sambil menyelam minum air",
        hint: "Peribahasa tentang melakukan dua keuntungan sekaligus"
    }
];

// ========================================
// VARIABEL GAME
// ========================================
let username = '';
let questions = []; // Will be shuffled
let currentQuestionIndex = 0;
let score = 0;
let currentAnswer = [];
let availableWords = [];
let correctSentence = [];
let timer = 30;
let timerInterval = null;

// ========================================
// ELEMEN DOM
// ========================================
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const usernameInput = document.getElementById('usernameInput');
const usernameWarning = document.getElementById('usernameWarning');
const startGameBtn = document.getElementById('startGameBtn');
const playerName = document.getElementById('playerName');
const questionHint = document.getElementById('questionHint');
const answerArea = document.getElementById('answerArea');
const wordBank = document.getElementById('wordBank');
const questionNumber = document.getElementById('questionNumber');
const totalQuestions = document.getElementById('totalQuestions');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const checkBtn = document.getElementById('checkBtn');
const clearBtn = document.getElementById('clearBtn');
const nextBtn = document.getElementById('nextBtn');
const feedback = document.getElementById('feedback');
const gameContainer = document.getElementById('gameContainer');
const resultScreen = document.getElementById('resultScreen');
const finalScore = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');
const resultPlayerName = document.getElementById('resultPlayerName');

// ========================================
// USERNAME VALIDATION (NEW)
// ========================================
function validateUsername(name) {
    const trimmedName = name.trim();
    return trimmedName.length >= 2;
}

function showUsernameWarning() {
    usernameWarning.style.display = 'flex';
    usernameInput.classList.add('error');
    SoundEffects.playWrong();
}

function hideUsernameWarning() {
    usernameWarning.style.display = 'none';
    usernameInput.classList.remove('error');
}

// Real-time validation while typing
usernameInput.addEventListener('input', () => {
    const inputValue = usernameInput.value.trim();
    
    if (inputValue.length > 0 && inputValue.length < 2) {
        showUsernameWarning();
    } else {
        hideUsernameWarning();
    }
});

// ========================================
// START GAME
// ========================================
startGameBtn.addEventListener('click', () => {
    const inputName = usernameInput.value.trim();
    
    if (inputName === '') {
        showUsernameWarning();
        usernameInput.focus();
        return;
    }
    
    if (!validateUsername(inputName)) {
        showUsernameWarning();
        usernameInput.focus();
        return;
    }
    
    SoundEffects.playCorrect();
    username = inputName;
    playerName.textContent = username;
    
    // Shuffle questions for new game
    questions = shuffleArray([...allQuestions]).slice(0, 10);
    
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    initGame();
});

// ========================================
// INISIALISASI GAME
// ========================================
function initGame() {
    totalQuestions.textContent = questions.length;
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    loadQuestion();
}

// ========================================
// TIMER FUNCTIONS
// ========================================
function startTimer() {
    timer = 50;
    timerDisplay.textContent = timer;
    timerDisplay.className = 'value timer-value';
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        
        // Warning state
        if (timer <= 10 && timer > 5) {
            timerDisplay.className = 'value timer-value warning';
        }
        // Danger state
        else if (timer <= 5) {
            timerDisplay.className = 'value timer-value danger';
        }
        
        // Time's up!
        if (timer <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ========================================
// HANDLE TIMEOUT
// ========================================
function handleTimeout() {
    SoundEffects.playTimeout();
    
    checkBtn.disabled = true;
    clearBtn.disabled = true;
    
    const correctAnswer = correctSentence.join(' ');
    showFeedback(`⏰ Waktu Habis! Anda Belum Menjawab, Jawaban yang benar: "${correctAnswer}"`, 'timeout');
    
    // Highlight as wrong
    highlightAnswer(false);
    
    // Show next button
    nextBtn.style.display = 'block';
}

// ========================================
// LOAD SOAL
// ========================================
function loadQuestion() {
    // Reset state
    currentAnswer = [];
    checkBtn.disabled = false;
    clearBtn.disabled = false;
    nextBtn.style.display = 'none';
    feedback.style.display = 'none';
    
    const question = questions[currentQuestionIndex];
    
    // Update nomor soal
    questionNumber.textContent = currentQuestionIndex + 1;
    
    // Update hint
    if (question.hint) {
        questionHint.textContent = `💡 Petunjuk: ${question.hint}`;
        questionHint.style.display = 'block';
    } else {
        questionHint.style.display = 'none';
    }
    
    // Simpan jawaban yang benar
    correctSentence = question.sentence.split(' ');
    
    // Acak kata-kata
    availableWords = shuffleArray([...correctSentence]);
    
    // Render answer area dan word bank
    renderAnswerArea();
    renderWordBank();
    
    // Start timer
    startTimer();
}

// ========================================
// RENDER ANSWER AREA
// ========================================
function renderAnswerArea() {
    answerArea.innerHTML = '';
    
    if (currentAnswer.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'answer-placeholder';
        placeholder.textContent = 'Klik kata di bawah untuk menyusun kalimat';
        answerArea.appendChild(placeholder);
    } else {
        currentAnswer.forEach((word, index) => {
            const wordElement = createWordElement(word, 'answer', index);
            answerArea.appendChild(wordElement);
        });
    }
}

// ========================================
// RENDER WORD BANK
// ========================================
function renderWordBank() {
    wordBank.innerHTML = '';
    
    if (availableWords.length === 0) {
        wordBank.innerHTML = '<div class="word-bank-empty">Semua kata sudah digunakan</div>';
    } else {
        availableWords.forEach((word, index) => {
            const wordElement = createWordElement(word, 'bank', index);
            wordBank.appendChild(wordElement);
        });
    }
}

// ========================================
// CREATE WORD ELEMENT
// ========================================
function createWordElement(word, type, index) {
    const wordElement = document.createElement('div');
    wordElement.className = 'word-chip';
    wordElement.textContent = word;
    wordElement.dataset.word = word;
    wordElement.dataset.index = index;
    
    if (type === 'answer') {
        wordElement.onclick = () => {
            SoundEffects.playClick();
            moveWordToBank(index);
        };
    } else {
        wordElement.onclick = () => {
            SoundEffects.playClick();
            moveWordToAnswer(index);
        };
    }
    
    return wordElement;
}

// ========================================
// MOVE WORD TO ANSWER AREA
// ========================================
function moveWordToAnswer(index) {
    const word = availableWords[index];
    currentAnswer.push(word);
    availableWords.splice(index, 1);
    
    renderAnswerArea();
    renderWordBank();
}

// ========================================
// MOVE WORD TO BANK
// ========================================
function moveWordToBank(index) {
    const word = currentAnswer[index];
    availableWords.push(word);
    currentAnswer.splice(index, 1);
    
    renderAnswerArea();
    renderWordBank();
}

// ========================================
// CLEAR ANSWER (RESET)
// ========================================
clearBtn.addEventListener('click', () => {
    SoundEffects.playClick();
    availableWords = [...availableWords, ...currentAnswer];
    currentAnswer = [];
    
    renderAnswerArea();
    renderWordBank();
});

// ========================================
// CHECK ANSWER
// ========================================
checkBtn.addEventListener('click', () => {
    SoundEffects.playClick();
    
    // Cek apakah sudah mengisi semua kata
    if (currentAnswer.length === 0) {
        showFeedback('⚠️ Susun kata-kata dulu ya!', 'warning');
        return;
    }
    
    if (currentAnswer.length !== correctSentence.length) {
        showFeedback('⚠️ Jawaban Belum lengkap! Gunakan semua kata.', 'warning');
        return;
    }
    
    // Stop timer
    stopTimer();
    
    // Cek jawaban
    const userSentence = currentAnswer.join(' ');
    const correctAnswer = correctSentence.join(' ');
    
    // Nonaktifkan tombol
    checkBtn.disabled = true;
    clearBtn.disabled = true;
    
    if (userSentence === correctAnswer) {
        // JAWABAN BENAR
        SoundEffects.playCorrect();
        score += 10;
        scoreDisplay.textContent = score;
        showFeedback('✅ Benar! Susunan kalimatnya tepat!', 'correct');
        highlightAnswer(true);
    } else {
        // JAWABAN SALAH
        SoundEffects.playWrong();
        showFeedback(`❌ Jawaban Salah! Jawaban yang benar adalah: "${correctAnswer}"`, 'wrong');
        highlightAnswer(false);
    }
    
    // Tampilkan tombol next
    nextBtn.style.display = 'block';
});

// ========================================
// HIGHLIGHT ANSWER
// ========================================
function highlightAnswer(isCorrect) {
    const words = answerArea.querySelectorAll('.word-chip');
    words.forEach(word => {
        if (isCorrect) {
            word.classList.add('correct');
        } else {
            word.classList.add('wrong');
        }
    });
}

// ========================================
// SHOW FEEDBACK
// ========================================
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.style.display = 'block';
}

// ========================================
// NEXT QUESTION
// ========================================
nextBtn.addEventListener('click', () => {
    SoundEffects.playClick();
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
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'flex';
    
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;
    
    resultPlayerName.textContent = username;
    finalScore.textContent = `${score} / ${maxScore}`;
    
    // Pesan berdasarkan skor
    if (percentage === 100) {
        resultMessage.textContent = '🏆 Sempurna! Kamu master bahasa Indonesia!';
    } else if (percentage >= 70) {
        resultMessage.textContent = '🌟 Bagus sekali! Kamu paham peribahasa!';
    } else if (percentage >= 50) {
        resultMessage.textContent = '👍 Lumayan! Terus belajar ya!';
    } else {
        resultMessage.textContent = '💪 Jangan menyerah! Pelajari lagi peribahasanya!';
    }
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
// INITIALIZE ON PAGE LOAD
// ========================================
window.addEventListener('DOMContentLoaded', () => {
    // Focus on username input
    usernameInput.focus();
    
    // Allow Enter key to start game
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startGameBtn.click();
        }
    });
    
    console.log('🎮 Susun Kalimat - KOSAKA GAMES');
    console.log('✅ Sound effects enabled');
    console.log('⏱️ Timer enabled (50s per question)');
    console.log('🔀 Random questions enabled');
    console.log('✔️ Username validation enabled (min 2 chars)');
});