document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initCompatibilityChart();
    initCounters();
    initAccordion();
});

// Premium Sidebar Slide Navigation Engine
function initMobileNav() {
    const burger = document.getElementById('mobile-burger');
    const closeBtn = document.getElementById('mobile-close');
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (burger && sidebar && overlay) {
        burger.addEventListener('click', () => {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden', 'opacity-0');
            overlay.classList.add('opacity-100');
        });

        const closeSidebar = () => {
            sidebar.classList.add('translate-x-full');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }
}

// Interactive Blood Compatibility Engine
function initCompatibilityChart() {
    const gridItems = document.querySelectorAll('.blood-grid-item');
    const givesToEl = document.getElementById('compat-gives');
    const receivesFromEl = document.getElementById('compat-receives');
    
    const rules = {
        'O-':  { give: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], receive: ['O-'] },
        'O+':  { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
        'A-':  { give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['O-', 'A-'] },
        'A+':  { give: ['A+', 'AB+'], receive: ['O+', 'O-', 'A+', 'A-'] },
        'B-':  { give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['O-', 'B-'] },
        'B+':  { give: ['B+', 'AB+'], receive: ['O+', 'O-', 'B+', 'B-'] },
        'AB-': { give: ['AB+', 'AB-'], receive: ['O-', 'A-', 'B-', 'AB-'] },
        'AB+': { give: ['AB+'], receive: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }
    };

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            gridItems.forEach(i => i.classList.remove('border-red-600', 'bg-red-950/40'));
            item.classList.add('border-red-600', 'bg-red-950/40');
            
            const group = item.dataset.group;
            if (rules[group]) {
                renderBadges(givesToEl, rules[group].give);
                renderBadges(receivesFromEl, rules[group].receive);
            }
        });
    });
}

function renderBadges(container, list) {
    if(!container) return;
    container.innerHTML = '';
    list.forEach(type => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1.5 bg-slate-800 border border-slate-700 text-white font-semibold rounded-md text-sm animate-fade-in';
        span.innerText = type;
        container.appendChild(span);
    });
}

// Dashboard Numbers Animation Logic
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const speed = target / 50; 
        
        const updateCount = () => {
            if(count < target) {
                count = Math.ceil(count + speed);
                counter.innerText = count.toLocaleString();
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target.toLocaleString() + (counter.dataset.plus ? '+' : '');
            }
        };
        updateCount();
    });
}

// Collapsible Accordion Core Engine
function initAccordion() {
    const accordions = document.querySelectorAll('.accordion-trigger');
    accordions.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.accordion-icon');
            content.classList.toggle('hidden');
            if(icon) icon.classList.toggle('rotate-180');
        });
    });
}

function handleFormSubmit(event, successMessage) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.innerHTML;
    
    btn.innerHTML = `Processing...`;
    btn.disabled = true;

    setTimeout(() => {
        form.reset();
        btn.innerHTML = origText;
        btn.disabled = false;
        
        const alertBox = document.createElement('div');
        alertBox.className = 'fixed bottom-6 right-6 px-6 py-4 bg-emerald-950 border border-emerald-500 text-emerald-200 glass-panel rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-fade-in';
        alertBox.innerHTML = `✅ <span>${successMessage}</span>`;
        document.body.appendChild(alertBox);
        
        setTimeout(() => alertBox.remove(), 5000);
    }, 1500);
}
