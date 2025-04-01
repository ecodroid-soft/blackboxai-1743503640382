// Utility function to format time
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
}

// Function to show loading state
function showLoading() {
    document.querySelectorAll('.result-card').forEach(card => {
        const numberDisplay = card.querySelector('.number-display');
        if (numberDisplay) {
            numberDisplay.classList.add('loading');
        }
    });
}

// Function to hide loading state
function hideLoading() {
    document.querySelectorAll('.result-card').forEach(card => {
        const numberDisplay = card.querySelector('.number-display');
        if (numberDisplay) {
            numberDisplay.classList.remove('loading');
        }
    });
}

// Function to show error state
function showError(message) {
    const resultGrid = document.querySelector('.result-grid');
    if (!resultGrid) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
        <button onclick="retryFetch()">Retry</button>
    `;
    
    resultGrid.appendChild(errorDiv);
}

// Function to clear error state
function clearError() {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Function to retry fetching results
async function retryFetch() {
    clearError();
    await fetchResults();
}

// Enhanced fetch results function with loading and error states
async function fetchResults() {
    clearError();
    showLoading();
    
    try {
        const response = await fetch('results.php');
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        updateResults(data.results);
        hideLoading();
    } catch (error) {
        console.error('Error fetching results:', error);
        hideLoading();
        showError('Unable to fetch results. Please try again later.');
    }
}

// Function to update results in the UI with enhanced animations
function updateResults(results) {
    const resultGrid = document.querySelector('.result-grid');
    if (!resultGrid) return;

    Object.entries(results).forEach(([key, result]) => {
        const card = resultGrid.querySelector(`[data-game="${key}"]`);
        if (card) {
            const numberElement = card.querySelector('.number');
            const statusElement = card.querySelector('.status');
            const animationElement = card.querySelector('.number-animation');
            
            // Animate number change with enhanced effects
            if (numberElement && numberElement.textContent !== result.result) {
                // Add transition class
                numberElement.classList.add('number-updating');
                
                // Create and animate particles
                createNumberParticles(card);
                
                // Update number with animation
                setTimeout(() => {
                    numberElement.textContent = result.result;
                    numberElement.style.transform = 'scale(1.2)';
                    numberElement.style.color = '#fff';
                    
                    if (animationElement) {
                        animationElement.style.transform = 'scale(1.5)';
                        animationElement.style.opacity = '0.8';
                    }
                    
                    setTimeout(() => {
                        numberElement.style.transform = 'scale(1)';
                        numberElement.style.color = '#ffff00';
                        numberElement.classList.remove('number-updating');
                        
                        if (animationElement) {
                            animationElement.style.transform = 'scale(1)';
                            animationElement.style.opacity = '0.2';
                        }
                    }, 500);
                }, 200);
            }

            // Update status with icon animation
            if (statusElement) {
                statusElement.innerHTML = `
                    <i class="fas fa-check-circle"></i> ${result.status}
                `;
                statusElement.className = `status ${result.status.toLowerCase()}`;
            }
        }
    });
}

// Function to create number update particles
function createNumberParticles(card) {
    const particles = document.createElement('div');
    particles.className = 'number-particles';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--delay', `${i * 0.1}s`);
        particles.appendChild(particle);
    }
    
    card.appendChild(particles);
    setTimeout(() => particles.remove(), 1000);
}

// Countdown timer function
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    let [minutes, seconds] = countdownElement.textContent.split(':').map(Number);
    
    const timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                fetchResults();
                countdownElement.textContent = '05:00';
                updateCountdown();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to the Satta King button
const sattaKingBtn = document.querySelector('.satta-king-btn');
if (sattaKingBtn) {
    sattaKingBtn.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });

    sattaKingBtn.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });

    sattaKingBtn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 200);
    });
}

// Add floating button animations
const floatingButtons = document.querySelectorAll('.floating-buttons > div');
floatingButtons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add WhatsApp click handler
const whatsappIcon = document.querySelector('.whatsapp-icon');
if (whatsappIcon) {
    whatsappIcon.addEventListener('click', function() {
        window.open('https://wa.me/9262372454', '_blank');
    });
}

// Add Telegram click handler
const telegramIcon = document.querySelector('.telegram-icon');
if (telegramIcon) {
    telegramIcon.addEventListener('click', function() {
        window.open('https://t.me/your-telegram-username', '_blank');
    });
}

// Add notification badge animation
const notificationBadge = document.querySelector('.notification-badge');
if (notificationBadge) {
    setInterval(() => {
        notificationBadge.style.transform = 'scale(1.2)';
        setTimeout(() => {
            notificationBadge.style.transform = 'scale(1)';
        }, 200);
    }, 2000);
}

// Add mobile menu toggle functionality
const navLinks = document.querySelector('.nav-links');
if (window.innerWidth <= 768) {
    navLinks.style.display = 'none';
    
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'menu-toggle';
    document.querySelector('.navbar').prepend(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'none') {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Add dynamic date update
function updateDate() {
    const dateElement = document.createElement('div');
    dateElement.className = 'current-date';
    dateElement.style.textAlign = 'center';
    dateElement.style.padding = '10px';
    dateElement.style.backgroundColor = '#800000';
    dateElement.style.color = '#fff';
    dateElement.style.marginTop = '10px';
    
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('hi-IN', options);
    
    document.querySelector('.content-header').appendChild(dateElement);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize date display
    updateDate();
    
    // Initialize countdown timer
    updateCountdown();
    
    // Initial results fetch
    fetchResults();
    
    // Set up periodic results fetch (every 5 minutes)
    setInterval(fetchResults, 300000);
    
    // Add particle effects to result cards
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            createNumberParticles(card);
        });
    });
    
    // Initialize floating button animations
    initializeFloatingButtons();
});

// Initialize floating button animations
function initializeFloatingButtons() {
    const buttons = document.querySelectorAll('.floating-buttons > div');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateX(10px)';
            if (button.querySelector('.notification-badge')) {
                button.querySelector('.notification-badge').style.transform = 'scale(1.2)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateX(0)';
            if (button.querySelector('.notification-badge')) {
                button.querySelector('.notification-badge').style.transform = 'scale(1)';
            }
        });
    });
}
