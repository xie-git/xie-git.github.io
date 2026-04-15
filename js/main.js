// ===== THEME =====
function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
}

// ===== PROJECT DATA =====
const projects = {
    'homelab': {
        title: 'HomeLab & Smart-Condo Automation Platform',
        type: 'Infrastructure & DevOps',
        image: 'images/projects/homelab_image.png',
        overview: 'Built a fully containerized, self-hosted environment that powers home automation, real-time analytics, media streaming, and on-device AI while serving as a playground for DevOps experimentation.',
        tech_stack: ['Docker Compose', 'Ubuntu 24.04 LTS', 'Proxmox', 'Tailscale VPN', 'Home Assistant', 'InfluxDB', 'Grafana', 'Prometheus', 'Ollama LLM', 'Nextcloud', 'Plex'],
        features: [
            'Real-time environmental dashboard with sub-5s refresh',
            'Self-hosted cloud suite replacing iCloud/Google Drive',
            'Housing-market microservice with ML price-anomaly alerts',
            'Media & gaming hub streaming 4K HDR video',
            'Automated resilience with health-checks and failover'
        ],
        challenges: 'Unified heterogeneous hardware under single monitoring plane, tuned InfluxDB retention for 500ms refresh without data loss, hardened remote access eliminating exposed public ports.',
        impact: '99.9% service uptime over 12 months, reduced cloud-storage spend by $240/yr, improved HVAC efficiency by 8%, delivered reusable DevOps sandbox cutting work project iteration time by 40%.'
    },
    'real-estate': {
        title: 'Chicago Rental Analytics & Visualization Pipeline',
        type: 'Data Engineering & Visualization',
        image: 'images/projects/chicago_analytics_map.png',
        overview: 'Designed, built, and production-hardened a fully automated data platform that scrapes, cleans, enriches, and visualizes 75k+ Chicago apartment records, delivering investment-grade insights via ML models and Grafana dashboards.',
        tech_stack: ['Python 3.11', 'Docker Compose', 'PostgreSQL 14', 'Redis', 'scikit-learn', 'FastAPI', 'Folium', 'InfluxDB', 'Grafana', 'BeautifulSoup4'],
        features: [
            'Automated weekly pipeline processing 4,500 URLs in ~6h',
            'Random-Forest price prediction model (R² = 0.995, RMSE ≈ $50)',
            'Building-level insights with investment scores and risk metrics',
            'Interactive Folium-powered clustering map with live queries',
            'Six Grafana dashboards with sub-5s refresh',
            'One-command DevOps deployment with 100% E2E test coverage'
        ],
        challenges: 'Implemented Redis task queue for 5 parallel scrapers cutting collection time 40%, built ID-fuzzing logic achieving 85%+ data quality, added model drift detection with automated retraining.',
        impact: '75k+ property rows processed, 600 building insights generated, >99% weekly pipeline success rate over 6 months, enables neighborhood price comps and yield forecasts for investors.'
    },
    'ai-ml': {
        title: 'AI/ML Playground',
        type: 'Artificial Intelligence',
        image: 'images/projects/aigeneratedai.png',
        overview: 'A local AI development environment for experimenting with cutting-edge machine learning models while maintaining privacy and control.',
        tech_stack: ['Stable Diffusion', 'Ollama', 'Python', 'PyTorch', 'CUDA', 'FastAPI', 'Docker'],
        features: [
            'Local Stable Diffusion image generation',
            'Multiple LLM model hosting with Ollama',
            'Custom model fine-tuning pipeline',
            'API endpoints for integration',
            'Prompt engineering tools',
            'Model performance monitoring'
        ],
        challenges: 'Optimizing model performance on consumer hardware, managing GPU memory efficiently, and creating intuitive interfaces.',
        impact: 'Accelerated AI/ML learning and provided a foundation for integrating AI into other projects.'
    },
    'smart-home': {
        title: 'Smart-Home & IoT Ecosystem',
        type: 'IoT & Home Automation',
        image: 'images/projects/homeassistant.png',
        overview: 'Architected and maintain a tightly-integrated suite of DIY smart-home solutions built on open-source software and low-cost microcontrollers to drive comfort, security, and data-driven energy efficiency across 1,250 sq ft condo.',
        tech_stack: ['10× ESP32-WROOM-32', 'BME688 sensors', 'LD2450 mm-wave radars', 'ESPHome 2023.12', 'Home Assistant', 'Mosquitto MQTT', 'InfluxDB 2', 'Grafana', 'Tailscale VPN', 'Pi-hole DNS'],
        features: [
            'Sensor mesh coverage across 6 zones with real-time heat-maps',
            'Adaptive HVAC & blinds balancing IAQ and comfort automatically',
            'Presence-aware lighting with <100ms response via LD2450 radar',
            'Energy & network dashboards with Slack anomaly alerting',
            'Voice-first control via Mycroft AI (completely offline)',
            'Whole-home ad-blocking via Pi-hole reducing WAN data 25%'
        ],
        challenges: 'Achieved low-latency telemetry without Wi-Fi saturation via tuned ESP32 QoS, calibrated sensor accuracy in mixed HVAC airflow, secured remote access migrating from port-forwards to Tailscale mesh.',
        impact: 'Maintained temp ±1°C and humidity 40-55% year-round, achieved 99.9% service uptime, collected 2M+ time-series points, cut annual energy use 8%, provided DevOps sandbox shortening POC cycles 40%.'
    }
};

// ===== MODAL =====
function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalType').textContent = project.type;

    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;opacity:1;">`;

    document.getElementById('modalOverview').textContent = project.overview;
    document.getElementById('modalChallenges').textContent = project.challenges;
    document.getElementById('modalImpact').textContent = project.impact;

    const techStackContainer = document.getElementById('modalTechStack');
    techStackContainer.innerHTML = '';
    project.tech_stack.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techStackContainer.appendChild(tag);
    });

    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });

    const modal = document.getElementById('projectModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal clicking outside or pressing Escape
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) closeModal();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeModal();
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modal is hidden on load
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('show');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
