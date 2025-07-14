// Canvas setup
const canvases = {
    sky: document.getElementById('skyCanvas'),
    cloud: document.getElementById('cloudCanvas'),
    rain: document.getElementById('rainCanvas'),
    lightning: document.getElementById('lightningCanvas')
};

const contexts = {
    sky: canvases.sky.getContext('2d'),
    cloud: canvases.cloud.getContext('2d'),
    rain: canvases.rain.getContext('2d'),
    lightning: canvases.lightning.getContext('2d')
};

let currentWeatherState = 'calm';
let rainIntensity = 0;

function resizeCanvases() {
    Object.values(canvases).forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

resizeCanvases();
window.addEventListener('resize', resizeCanvases);

// Dynamic sky with time-based color changes
function drawSky() {
    const ctx = contexts.sky;
    ctx.clearRect(0, 0, canvases.sky.width, canvases.sky.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvases.sky.height);
    
    if (currentWeatherState === 'storm') {
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f3460');
    } else if (currentWeatherState === 'rain') {
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(0.5, '#34495e');
        gradient.addColorStop(1, '#2c3e50');
    } else {
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(0.5, '#5dade2');
        gradient.addColorStop(1, '#2c3e50');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvases.sky.width, canvases.sky.height);
    
    // Add twinkling stars for night mode
    if (currentWeatherState === 'storm') {
        drawStars(ctx);
    }
    
    requestAnimationFrame(drawSky);
}

function drawStars(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvases.sky.width;
        const y = Math.random() * canvases.sky.height * 0.6;
        const size = Math.random() * 2;
        const twinkle = Math.sin(Date.now() * 0.005 + i) * 0.5 + 0.5;
        
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

// Enhanced cloud system
const clouds = [];
for (let i = 0; i < 8; i++) {
    clouds.push({
        x: Math.random() * canvases.cloud.width,
        y: Math.random() * (canvases.cloud.height * 0.4),
        size: Math.random() * 120 + 80,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.3 + 0.4,
        verticalFloat: Math.random() * 2
    });
}

function drawClouds() {
    const ctx = contexts.cloud;
    ctx.clearRect(0, 0, canvases.cloud.width, canvases.cloud.height);
    
    clouds.forEach((cloud, index) => {
        cloud.x += cloud.speed;
        cloud.y += Math.sin(Date.now() * 0.001 + index) * 0.1;
        
        if (cloud.x > canvases.cloud.width + cloud.size) {
            cloud.x = -cloud.size;
            cloud.y = Math.random() * (canvases.cloud.height * 0.4);
        }
        
        // Cloud color based on weather
        let cloudColor = `rgba(255, 255, 255, ${cloud.opacity})`;
        if (currentWeatherState === 'storm') {
            cloudColor = `rgba(80, 80, 100, ${cloud.opacity + 0.3})`;
        } else if (currentWeatherState === 'rain') {
            cloudColor = `rgba(150, 150, 170, ${cloud.opacity + 0.2})`;
        }
        
        ctx.fillStyle = cloudColor;
        
        // Draw fluffy cloud shape
        ctx.beginPath();
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = cloud.size * (0.6 + Math.sin(angle * 3) * 0.2);
            const x = cloud.x + Math.cos(angle) * radius;
            const y = cloud.y + Math.sin(angle) * radius * 0.6;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    });
    
    requestAnimationFrame(drawClouds);
}

// Advanced rain system
const rainDrops = [];
for (let i = 0; i < 300; i++) {
    rainDrops.push({
        x: Math.random() * canvases.rain.width,
        y: Math.random() * canvases.rain.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 8 + 4,
        opacity: Math.random() * 0.6 + 0.3,
        wind: Math.random() * 2 - 1
    });
}

function drawRain() {
    const ctx = contexts.rain;
    ctx.clearRect(0, 0, canvases.rain.width, canvases.rain.height);
    
    if (rainIntensity > 0) {
        rainDrops.forEach(drop => {
            ctx.strokeStyle = `rgba(173, 216, 230, ${drop.opacity * rainIntensity})`;
            ctx.lineWidth = drop.size;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x + drop.wind * 3, drop.y + drop.size * 8);
            ctx.stroke();
            
            drop.y += drop.speed * rainIntensity;
            drop.x += drop.wind * 0.5;
            
            if (drop.y > canvases.rain.height) {
                drop.y = -20;
                drop.x = Math.random() * canvases.rain.width;
            }
        });
    }
    
    requestAnimationFrame(drawRain);
}

// Lightning system
const lightningBolts = [];

function createLightning() {
    if (currentWeatherState === 'storm' && Math.random() < 0.005) {
        const startX = Math.random() * canvases.lightning.width;
        const segments = [];
        let currentX = startX;
        let currentY = 0;
        
        while (currentY < canvases.lightning.height) {
            const nextX = currentX + (Math.random() - 0.5) * 100;
            const nextY = currentY + Math.random() * 50 + 30;
            
            segments.push({
                x1: currentX,
                y1: currentY,
                x2: nextX,
                y2: nextY
            });
            
            currentX = nextX;
            currentY = nextY;
        }
        
        lightningBolts.push({
            segments: segments,
            life: 30,
            maxLife: 30,
            intensity: Math.random() * 0.5 + 0.5
        });
        
        // Thunder flash
        document.getElementById('thunderFlash').classList.add('active');
        setTimeout(() => {
            document.getElementById('thunderFlash').classList.remove('active');
        }, 200);
    }
}

function drawLightning() {
    const ctx = contexts.lightning;
    ctx.clearRect(0, 0, canvases.lightning.width, canvases.lightning.height);
    
    lightningBolts.forEach((bolt, index) => {
        if (bolt.life > 0) {
            const alpha = (bolt.life / bolt.maxLife) * bolt.intensity;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 20;
            
            bolt.segments.forEach(segment => {
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();
            });
            
            ctx.shadowBlur = 0;
            bolt.life--;
        } else {
            lightningBolts.splice(index, 1);
        }
    });
    
    createLightning();
    requestAnimationFrame(drawLightning);
}

// Floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Weather state management
function updateWeatherState(prediction, intensity) {
    const weatherIntensity = document.getElementById('weatherIntensity');
    
    if (prediction === 'Yes') {
        if (intensity > 0.7) {
            currentWeatherState = 'storm';
            rainIntensity = 1;
            weatherIntensity.textContent = 'Weather: Storm';
        } else {
            currentWeatherState = 'rain';
            rainIntensity = 0.6;
            weatherIntensity.textContent = 'Weather: Rain';
        }
    } else {
        currentWeatherState = 'calm';
        rainIntensity = 0;
        weatherIntensity.textContent = 'Weather: Calm';
    }
}

// Function to determine rain intensity (adjusted thresholds)
function getRainIntensity(probability) {
    if (probability < 0.2) return 'No Rain';
    else if (probability < 0.5) return 'Slight Rain';
    else if (probability < 0.7) return 'Moderate Rain';
    else return 'Heavy Rain';
}

// Form handling
document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const humidity = document.getElementById('humidity').value;
    const windSpeed = document.getElementById('windSpeed').value;
    const precipitation = document.getElementById('precipitation').value;
    const location = document.getElementById('location').value;

    if (!humidity || !windSpeed || !precipitation || !location) {
        alert('Please fill all fields');
        return;
    }

    const data = {
        humidity: parseFloat(humidity),
        windSpeed: parseFloat(windSpeed),
        precipitation: parseFloat(precipitation),
        location: location
    };

    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result';

    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        
        if (result.error) {
            resultDiv.textContent = `Error: ${result.error}`;
            resultDiv.classList.add('error', 'show');
        } else {
            const rainIntensityText = getRainIntensity(result.probability_yes);
            resultDiv.innerHTML = `
                <div class="result-item"><strong>Forecast:</strong> ${result.prediction}</div>
                <div class="result-item"><strong>Intensity:</strong> <span class="result-intensity ${rainIntensityText.toLowerCase().replace(' ', '-')}">${rainIntensityText}</span></div>
                <div class="result-item"><strong>Confidence:</strong> ${(result.probability_yes * 100).toFixed(1)}%</div>
            `;
            resultDiv.classList.add('success', 'show');
            
            // Update weather state based on intensity
            if (rainIntensityText === 'No Rain') {
                updateWeatherState('No', 0);
            } else if (rainIntensityText === 'Slight Rain') {
                updateWeatherState('Yes', 0.4);
            } else if (rainIntensityText === 'Moderate Rain') {
                updateWeatherState('Yes', 0.7);
            } else { // Heavy Rain
                updateWeatherState('Yes', 1);
            }
        }
    } catch (error) {
        resultDiv.textContent = `Error: Unable to connect to the server. Please ensure the backend is running at http://localhost:5000/predict.`;
        resultDiv.classList.add('error', 'show');
    }
});

// Initialize
createParticles();
drawSky();
drawClouds();
drawRain();
drawLightning();