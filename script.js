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
