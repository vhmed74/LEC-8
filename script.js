document.addEventListener("DOMContentLoaded", () => {
    // Navigation Logic
    const navItems = document.querySelectorAll("#nav-list li");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active from all nav items
            navItems.forEach(nav => nav.classList.remove("active"));
            // Add active to clicked nav item
            item.classList.add("active");

            // Hide all sections
            sections.forEach(sec => {
                sec.classList.remove("active-section");
            });

            // Show targeted section
            const targetId = item.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active-section");
            }
        });
    });

    // Quiz Logic
    let score = 0;
    let answeredQuestions = 0;
    const totalQuestions = document.querySelectorAll('.quiz-card').length;
    const scoreBoard = document.getElementById('score-board');
    const scoreText = document.getElementById('score-text');

    const quizOptions = document.querySelectorAll('.option-btn');
    quizOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            const optionsContainer = this.parentElement;
            const correctIndex = optionsContainer.getAttribute('data-correct');
            const clickedIndex = this.getAttribute('data-index');
            const feedbackEl = optionsContainer.nextElementSibling;
            
            // Disable all buttons in this question
            const siblings = optionsContainer.querySelectorAll('.option-btn');
            siblings.forEach(s => s.disabled = true);
            
            if (clickedIndex === correctIndex) {
                this.classList.add('correct');
                feedbackEl.textContent = 'إجابة صحيحة! / Correct Answer!';
                feedbackEl.classList.add('success');
                score++;
            } else {
                this.classList.add('wrong');
                feedbackEl.textContent = 'إجابة خاطئة! / Wrong Answer!';
                feedbackEl.classList.add('error');
                // Highlight correct one
                siblings.forEach(s => {
                    if(s.getAttribute('data-index') === correctIndex) {
                        s.classList.add('correct');
                    }
                });
            }

            answeredQuestions++;
            if (answeredQuestions === totalQuestions) {
                scoreBoard.style.display = 'block';
                scoreText.textContent = `${score} / ${totalQuestions}`;
                // Scroll to scoreboard after a small delay
                setTimeout(() => {
                    scoreBoard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        });
    });
});


    // Exam Page Tabs Logic
    const examButtons = document.querySelectorAll('.exam-controls button');
    const examSections = document.querySelectorAll('.exam-section');
    if(examButtons.length > 0) {
        examButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                examButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const targetId = btn.getAttribute('data-exam');
                examSections.forEach(sec => {
                    sec.style.display = 'none';
                    sec.classList.remove('active-section');
                });
                
                const targetSec = document.getElementById(targetId);
                if(targetSec) {
                    targetSec.style.display = 'block';
                    targetSec.classList.add('active-section');
                }
            });
        });
        // Set initial state
        document.querySelector('.exam-controls button.active').click();
    }

    // MCQ Shuffling & Numbering Logic
    const mcqContainer = document.getElementById('mcq-container');
    if(mcqContainer) {
        let cards = Array.from(mcqContainer.querySelectorAll('.quiz-card'));
        // Shuffle the array
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        // Clear container and append in new order, updating question numbers
        mcqContainer.innerHTML = '';
        cards.forEach((card, index) => {
            // Find the <h4> inside the card that says "من المحاضرة X"
            // We want to add the question number "Q1: " before it or replace it.
            let h4 = card.querySelector('h4');
            if(h4) {
                h4.innerHTML = `<span style="color:var(--primary); font-weight:bold; font-size:1.1rem; margin-left:10px;">Q${index + 1}</span> ` + h4.innerHTML;
            }
            // Shuffle the options inside the card
            const optionsContainer = card.querySelector('.options');
            if (optionsContainer) {
                const correctIndex = parseInt(optionsContainer.getAttribute('data-correct'));
                const optionBtns = Array.from(optionsContainer.querySelectorAll('.option-btn'));
                
                // Keep track of the correct button
                const correctBtn = optionBtns[correctIndex];
                
                // Shuffle options
                for (let i = optionBtns.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [optionBtns[i], optionBtns[j]] = [optionBtns[j], optionBtns[i]];
                }
                
                optionsContainer.innerHTML = '';
                optionBtns.forEach((btn, newIndex) => {
                    optionsContainer.appendChild(btn);
                    if (btn === correctBtn) {
                        optionsContainer.setAttribute('data-correct', newIndex);
                    }
                    btn.setAttribute('data-index', newIndex);
                });
            }
            mcqContainer.appendChild(card);
        });
    }

function toggleAnswer(btn) { 
    const answer = btn.nextElementSibling; 
    if (answer.style.display === 'block') { 
        answer.style.display = 'none'; 
        btn.textContent = '🔍 إظهار الحل / الإجابة'; 
    } else { 
        answer.style.display = 'block'; 
        btn.textContent = '❌ إخفاء الحل / الإجابة'; 
    } 
}
});
