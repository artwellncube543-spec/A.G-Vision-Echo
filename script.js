/* ============================================
   VISIONBRIDGE — script.js
   All JavaScript for the A.G Echo Vision platform
   ============================================ */

/* ---- ACCESSIBILITY: Large Text Toggle ---- */
function toggleLargeText() {
  document.body.classList.toggle('large-text');
  const isOn = document.body.classList.contains('large-text');
  showToast(isOn ? '🔤 Large text ON' : '🔤 Large text OFF');
}

/* ---- ACCESSIBILITY: High Contrast Toggle ---- */
function toggleContrast() {
  document.body.classList.toggle('high-contrast');
  const isOn = document.body.classList.contains('high-contrast');
  showToast(isOn ? '◐ High contrast ON' : '◐ High contrast OFF');
}

/* ---- ACCESSIBILITY: Dyslexia Font Toggle ---- */
function toggleDyslexia() {
  const currentFont = document.body.style.fontFamily;
  if (currentFont.includes('OpenDyslexic') || currentFont.includes('serif')) {
    document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    showToast('Aa Standard font restored');
  } else {
    document.body.style.fontFamily = "Georgia, 'Times New Roman', serif";
    showToast('Aa Dyslexia-friendly font active');
  }
}

/* ---- VOICE GUIDE ---- */
function startVoiceGuide() {
  const messages = [
    'Welcome to A.G Echo Vision. Press Tab to navigate, Enter to select.',
    'Page sections: Navigation, Community, Stories, Marketplace, Sponsors.',
    'Current section: Homepage hero. Press Alt plus 1 through 5 to jump to sections.',
  ];

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    messages.forEach(function(msg, i) {
      setTimeout(function() {
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }, i * 3500);
    });
    showToast('🔊 Voice guide started');
  } else {
    showToast('🔊 Voice guide: Screen reader required');
  }
}

/* ---- MODAL: Open ---- */
function openModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('active');
  const firstInput = modal.querySelector('input');
  if (firstInput) firstInput.focus();
}

/* ---- MODAL: Close ---- */
function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

/* ---- MODAL: Close on background click ---- */
function closeModalOnBg(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

/* ---- FORM: Handle Join (modal) ---- */
function handleJoin() {
  closeModal();
  showToast('🎉 Welcome to A.G Echo Vision! Check your email.');
}

/* ---- FORM: Handle Sign Up (main form) ---- */
function handleSignup() {
  const emailInput = document.getElementById('signup-email');
  const email = emailInput.value.trim();
  if (email) {
    showToast("✅ You're in! Welcome to A.G Echo Vision.");
  } else {
    showToast('Please enter your email address.');
    emailInput.focus();
  }
}

/* ---- TOAST NOTIFICATION ---- */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(30px)';
  }, 3000);
}

/* ---- TABS: Switch between Community tabs ---- */
function switchTab(clickedBtn, tabId) {
  // Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  // Hide all tab content panels
  document.querySelectorAll('.tab-content').forEach(function(panel) {
    panel.classList.remove('active');
  });

  // Activate clicked tab button and its panel
  clickedBtn.classList.add('active');
  clickedBtn.setAttribute('aria-selected', 'true');
  document.getElementById(tabId).classList.add('active');
}

/* ---- SCROLL REVEAL ANIMATION ---- */
const revealObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});

/* ---- KEYBOARD SHORTCUTS ---- */
// Alt + 1-5 to jump to page sections
document.addEventListener('keydown', function(event) {
  if (event.altKey) {
    const sectionMap = {
      '1': 'navigate',
      '2': 'connect',
      '3': 'stories',
      '4': 'marketplace',
      '5': 'sponsors',
    };
    const targetId = sectionMap[event.key];
    if (targetId) {
      const section = document.getElementById(targetId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Escape key closes modal
  if (event.key === 'Escape') {
    closeModal();
  }
});

/* ---- PAGE LOAD: Announce keyboard shortcuts via speech ---- */
window.addEventListener('load', function() {
  setTimeout(function() {
    if ('speechSynthesis' in window) {
      const announcement = new SpeechSynthesisUtterance(
        'A.G Echo Vision loaded. Use Alt plus 1 through 5 to jump to page sections.'
      );
      announcement.volume = 0.1;
      window.speechSynthesis.speak(announcement);
    }
  }, 2000);
});
