const visitorLabels = [
    "Stalkers",
    "Future Besties",
    "Rubber Tree Fans",
    "People Avoiding Work",
    "Lost Souls",
    "Curious Cats",
    "Witnesses",
    "Code Reviewers",
    "Accidental Clicks",
    "Midnight Scrollers",
    "Coffee Addicts",
    "Bored Net Surfers",
    "Recruiters Spying",
    "Pixel Peepers",
    "Keyboard Smashers",
    "Digital Nomads",
    "Tab Hoarders",
    "Procrastinators",
    "Ghost Viewers",
    "Bot Overlords",
    "Snooping Exes",
    "Local Hosts",
    "Time Travelers",
    "Vibe Checkers",
    "404 Finders",
    "Syntax Errors",
    "Hidden Admirers"
];
document.getElementById('visitor-label').innerText = visitorLabels[Math.floor(Math.random() * visitorLabels.length)];

const body = document.getElementById('body');

// --- Modal Logic ---
function openBioModal() {
    document.getElementById('bioModal').classList.add('active');
}

function closeBioModal(e) {
    // Check if triggered by event (overlay click) or direct call (button)
    if (!e || e.target.id === 'bioModal') {
        document.getElementById('bioModal').classList.remove('active');
        // Also close dog if open
        document.getElementById('dogPopup').classList.remove('active');
    }
    // If direct call (button)
    if (!e) {
        document.getElementById('bioModal').classList.remove('active');
        document.getElementById('dogPopup').classList.remove('active');
    }
}

function openGuestbookModal() {
    document.getElementById('guestbookModal').classList.add('active');
    document.getElementById('guestbookFeedback').classList.add('hidden');
    document.getElementById('guestbookMessage').value = '';
}

function closeGuestbookModal(e) {
    if (!e || e.target.id === 'guestbookModal') {
        document.getElementById('guestbookModal').classList.remove('active');
    }
    if (!e) {
        document.getElementById('guestbookModal').classList.remove('active');
    }
}

function openAdminModal() {
    document.getElementById('adminModal').classList.add('active');
    document.getElementById('adminPassword').value = '';
}

function closeAdminModal(e) {
    if (!e || e.target.id === 'adminModal') {
        document.getElementById('adminModal').classList.remove('active');
    }
    if (!e) {
        document.getElementById('adminModal').classList.remove('active');
    }
}

function submitAdmin(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (password) {
        window.location.href = '/admin/guestbook?secret=' + encodeURIComponent(password);
    }
}

async function submitGuestbook(e) {
    e.preventDefault();
    const messageInput = document.getElementById('guestbookMessage');
    const submitBtn = document.getElementById('guestbookSubmit');
    const feedback = document.getElementById('guestbookFeedback');
    const message = messageInput.value.trim();

    if (!message) return;

    submitBtn.disabled = true;
    submitBtn.innerText = 'Leaving Trace...';

    try {
        const response = await fetch('/api/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        if (response.ok) {
            feedback.innerText = "Trace left successfully! Refreshing...";
            feedback.classList.remove('hidden', 'text-red-500');
            feedback.classList.add('text-green-500');

            // Reload page after a short delay to see the updated marquee
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            throw new Error('Failed to save message');
        }
    } catch (error) {
        console.error(error);
        feedback.innerText = "Oops, something went wrong. Try again later.";
        feedback.classList.remove('hidden', 'text-green-500');
        feedback.classList.add('text-red-500');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Leave It';
    }
}

function toggleDog(e) {
    e.stopPropagation();
    const dogPopup = document.getElementById('dogPopup');
    dogPopup.classList.toggle('active');
}

function toggleTheme() {
    body.classList.toggle('dark');

    // Invert colors manually if needed for specific elements, 
    // but Tailwind 'dark' class applied to body handles most via styling variables
    if (body.classList.contains('dark')) {
        body.classList.remove('bg-gold', 'text-black');
        body.classList.add('bg-black', 'text-gold');
    } else {
        body.classList.remove('bg-black', 'text-gold');
        body.classList.add('bg-gold', 'text-black');
    }
}

function toggleSection(id) {
    const section = document.getElementById(id);
    const allSections = document.querySelectorAll('.content-panel');

    // Close others
    allSections.forEach(s => {
        if (s.id !== id) s.classList.remove('open');
    });

    // Toggle current
    section.classList.toggle('open');

    // Optional: Scroll to section if opening
    if (section.classList.contains('open')) {
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}



function toggleInstaLazy() {
    const msg = document.getElementById('insta-msg');
    msg.classList.toggle('hidden');
}