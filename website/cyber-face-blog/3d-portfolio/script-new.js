// ============================================================================
// 3D INTERACTIVE PORTFOLIO - HACKER FACE
// ============================================================================

// Configuration & Constants
const CONFIG = {
    camera: { fov: 75, near: 0.1, far: 1000 },
    model: { scale: 2, posZ: 0, posY: 0 },
    light: { ambient: 0.8, directional: 1 }
};

// Global Variables
let scene, camera, renderer, controls;
let model = null;
let modelLoaded = false;
let raycaster, mouse = new THREE.Vector2();
let currentHotspot = null;

// Portfolio Content Database
const portfolioData = {
    eyes: {
        title: 'Projects',
        icon: '👁️',
        content: `
            <h2>Featured Projects</h2>
            <p>Innovative projects showcasing my expertise in full-stack development and creative problem-solving.</p>
            
            <div class="card">
                <div class="card-title">3D Interactive Portfolio</div>
                <div class="card-subtitle">Three.js • WebGL • JavaScript</div>
                <div class="card-description">An immersive 3D portfolio experience using Three.js with interactive face hotspots for navigation. Features real-time raycasting, smooth animations, and responsive design.</div>
                <div class="tags">
                    <span class="tag">Three.js</span>
                    <span class="tag">WebGL</span>
                    <span class="tag">JavaScript</span>
                </div>
                <a href="#" class="link-button">View Project →</a>
            </div>

            <div class="card">
                <div class="card-title">E-Commerce Platform</div>
                <div class="card-subtitle">React • Node.js • MongoDB</div>
                <div class="card-description">Full-stack e-commerce solution with user authentication, product catalog, shopping cart, and payment integration. Deployed on production with 99.9% uptime.</div>
                <div class="tags">
                    <span class="tag">React</span>
                    <span class="tag">Node.js</span>
                    <span class="tag">MongoDB</span>
                </div>
                <a href="#" class="link-button">View Project →</a>
            </div>

            <div class="card">
                <div class="card-title">Real-Time Chat Application</div>
                <div class="card-subtitle">WebSocket • Express • React</div>
                <div class="card-description">Real-time messaging application with WebSocket support, user presence detection, typing indicators, and message history. Supports multiple concurrent users.</div>
                <div class="tags">
                    <span class="tag">WebSocket</span>
                    <span class="tag">Express</span>
                    <span class="tag">React</span>
                </div>
                <a href="#" class="link-button">View Project →</a>
            </div>

            <div class="card">
                <div class="card-title">AI-Powered Analytics Dashboard</div>
                <div class="card-subtitle">Python • Flask • D3.js</div>
                <div class="card-description">Data visualization dashboard with machine learning integration. Provides real-time insights and predictive analytics for business metrics.</div>
                <div class="tags">
                    <span class="tag">Python</span>
                    <span class="tag">Flask</span>
                    <span class="tag">D3.js</span>
                </div>
                <a href="#" class="link-button">View Project →</a>
            </div>
        `
    },
    
    nose: {
        title: 'Skills & Expertise',
        icon: '👃',
        content: `
            <h2>Technical Skills</h2>
            <p>Proficient in modern web technologies and full-stack development with a focus on performance and user experience.</p>

            <h3>Frontend Development</h3>
            <div class="skill-bar">
                <div class="skill-name">React & React Native</div>
                <div class="skill-level"><div class="skill-fill" style="width: 95%; animation-delay: 0s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">JavaScript & TypeScript</div>
                <div class="skill-level"><div class="skill-fill" style="width: 98%; animation-delay: 0.1s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">HTML5 & CSS3</div>
                <div class="skill-level"><div class="skill-fill" style="width: 99%; animation-delay: 0.2s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">Three.js & WebGL</div>
                <div class="skill-level"><div class="skill-fill" style="width: 85%; animation-delay: 0.3s;"></div></div>
            </div>

            <h3>Backend Development</h3>
            <div class="skill-bar">
                <div class="skill-name">Node.js & Express</div>
                <div class="skill-level"><div class="skill-fill" style="width: 92%; animation-delay: 0.4s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">Python & Django</div>
                <div class="skill-level"><div class="skill-fill" style="width: 88%; animation-delay: 0.5s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">Database Design (SQL/NoSQL)</div>
                <div class="skill-level"><div class="skill-fill" style="width: 90%; animation-delay: 0.6s;"></div></div>
            </div>

            <h3>DevOps & Tools</h3>
            <div class="skill-bar">
                <div class="skill-name">Git & Version Control</div>
                <div class="skill-level"><div class="skill-fill" style="width: 96%; animation-delay: 0.7s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">Docker & Kubernetes</div>
                <div class="skill-level"><div class="skill-fill" style="width: 82%; animation-delay: 0.8s;"></div></div>
            </div>
            <div class="skill-bar">
                <div class="skill-name">AWS & Cloud Deployment</div>
                <div class="skill-level"><div class="skill-fill" style="width: 85%; animation-delay: 0.9s;"></div></div>
            </div>
        `
    },
    
    mouth: {
        title: 'About Me',
        icon: '👄',
        content: `
            <h2>About Me</h2>
            <p>I'm a passionate full-stack developer with 5+ years of experience building scalable web applications and immersive digital experiences. I specialize in creating innovative solutions that combine beautiful design with robust functionality.</p>
            
            <h3>Professional Background</h3>
            <p>With a strong foundation in computer science and a creative mindset, I've worked on diverse projects ranging from enterprise applications to cutting-edge interactive experiences. I'm driven by the challenge of solving complex problems and continuously learning new technologies.</p>
            
            <h3>What I Do</h3>
            <ul>
                <li>Design and develop full-stack web applications</li>
                <li>Create immersive 3D web experiences using Three.js</li>
                <li>Optimize performance and user experience</li>
                <li>Architect scalable backend systems</li>
                <li>Mentor junior developers and contribute to open-source projects</li>
            </ul>

            <h3>Philosophy</h3>
            <p>I believe that great code is not just about functionality—it's about creating delightful user experiences. Every project is an opportunity to push boundaries and explore new possibilities in web development.</p>

            <h3>Beyond Code</h3>
            <p>When I'm not coding, you'll find me exploring new technologies, contributing to open-source communities, or working on personal creative projects. I'm passionate about sharing knowledge and helping others grow in their development journey.</p>

            <div class="social-links">
                <a href="https://github.com" class="social-link" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" class="social-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com" class="social-link" title="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="mailto:anoj@example.com" class="social-link" title="Email">
                    <i class="fas fa-envelope"></i>
                </a>
            </div>
        `
    },
    
    ears: {
        title: 'Contact',
        icon: '👂',
        content: `
            <h2>Get In Touch</h2>
            <p>I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to chat about technology, feel free to reach out.</p>

            <h3>Contact Information</h3>
            <div class="card">
                <div class="card-title">Email</div>
                <div class="card-description">
                    <a href="mailto:anoj@example.com" style="color: #00ff00; text-decoration: none;">anoj@example.com</a>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Phone</div>
                <div class="card-description">
                    <a href="tel:+1234567890" style="color: #00ff00; text-decoration: none;">+1 (234) 567-890</a>
                </div>
            </div>

            <div class="card">
                <div class="card-title">Location</div>
                <div class="card-description">San Francisco, California, USA</div>
            </div>

            <h3>Social Media</h3>
            <p>Connect with me on various platforms:</p>
            <div class="social-links">
                <a href="https://github.com" class="social-link" title="GitHub">
                    <i class="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" class="social-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com" class="social-link" title="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" class="social-link" title="Instagram">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>

            <h3>Quick Message</h3>
            <p style="margin-top: 20px; padding: 15px; background: rgba(0, 255, 0, 0.05); border-left: 3px solid #ff00ff; border-radius: 5px;">
                💡 Have an interesting project? Let's create something amazing together!
            </p>
        `
    },
    
    forehead: {
        title: 'Experience',
        icon: '🧠',
        content: `
            <h2>Professional Experience</h2>

            <div class="card">
                <div class="card-title">Senior Full-Stack Developer</div>
                <div class="card-subtitle">Tech Company Inc. • 2021 - Present</div>
                <div class="card-description">
                    Leading development of scalable web applications using React and Node.js. Mentoring junior developers and architecting microservices infrastructure. Improved application performance by 40% through optimization strategies.
                </div>
                <ul style="margin-top: 10px;">
                    <li>Led migration from monolithic to microservices architecture</li>
                    <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                    <li>Mentored 5 junior developers</li>
                </ul>
            </div>

            <div class="card">
                <div class="card-title">Full-Stack Developer</div>
                <div class="card-subtitle">Digital Agency • 2019 - 2021</div>
                <div class="card-description">
                    Developed full-stack web applications for clients in various industries. Specialized in React frontend development and Node.js backend architecture. Managed project timelines and client relations.
                </div>
                <ul style="margin-top: 10px;">
                    <li>Delivered 20+ successful projects for enterprise clients</li>
                    <li>Implemented responsive design for mobile-first applications</li>
                    <li>Optimized database queries reducing load time by 50%</li>
                </ul>
            </div>

            <div class="card">
                <div class="card-title">Junior Web Developer</div>
                <div class="card-subtitle">StartUp Company • 2017 - 2019</div>
                <div class="card-description">
                    Started my career developing web applications using vanilla JavaScript and jQuery. Progressed to building applications with React and modern frameworks.
                </div>
                <ul style="margin-top: 10px;">
                    <li>Built and maintained 10+ client websites</li>
                    <li>Learned and implemented best practices in code quality</li>
                    <li>Contributed to team projects and code reviews</li>
                </ul>
            </div>

            <h3>Education</h3>
            <div class="card">
                <div class="card-title">Bachelor of Science in Computer Science</div>
                <div class="card-subtitle">University Name • 2017</div>
            </div>
        `
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    // Setup camera
    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.z = 5;
    
    // Setup renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('canvas'), 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Setup raycaster
    raycaster = new THREE.Raycaster();
    
    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, CONFIG.light.ambient);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, CONFIG.light.directional);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Load 3D model
    loadModel();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start animation loop
    animate();
}

function loadModel() {
    // For demo purposes, create a simple 3D face using geometry
    // In production, you would load a GLTF model
    createFace();
}

function createFace() {
    // Create a simple 3D face using Three.js geometry
    const group = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d2d2d,
        roughness: 0.5,
        metalness: 0.1,
        emissive: 0x1a1a1a
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    group.add(head);
    
    // Eyes (hotspot: eyes)
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.35, 0.3, 0.9);
    leftEye.userData.hotspot = 'eyes';
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.35, 0.3, 0.9);
    rightEye.userData.hotspot = 'eyes';
    group.add(rightEye);
    
    // Nose (hotspot: nose)
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.4, 8);
    const noseMaterial = new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 0.3
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0.1, 0.95);
    nose.rotation.x = Math.PI / 2;
    nose.userData.hotspot = 'nose';
    group.add(nose);
    
    // Mouth (hotspot: mouth)
    const mouthGeometry = new THREE.TorusGeometry(0.2, 0.05, 8, 100);
    const mouthMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0080,
        emissive: 0xff0080,
        emissiveIntensity: 0.3
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.3, 0.9);
    mouth.rotation.z = Math.PI / 4;
    mouth.userData.hotspot = 'mouth';
    group.add(mouth);
    
    // Ears (hotspot: ears)
    const earGeometry = new THREE.ConeGeometry(0.15, 0.3, 8);
    const earMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.3
    });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.95, 0.2, 0.3);
    leftEar.rotation.z = Math.PI / 4;
    leftEar.userData.hotspot = 'ears';
    group.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.95, 0.2, 0.3);
    rightEar.rotation.z = -Math.PI / 4;
    rightEar.userData.hotspot = 'ears';
    group.add(rightEar);
    
    // Forehead/Brain (hotspot: forehead)
    const foreheadGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const foreheadMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.3
    });
    const forehead = new THREE.Mesh(foreheadGeometry, foreheadMaterial);
    forehead.position.set(0, 0.6, 0.7);
    forehead.userData.hotspot = 'forehead';
    group.add(forehead);
    
    group.scale.set(CONFIG.model.scale, CONFIG.model.scale, CONFIG.model.scale);
    scene.add(group);
    
    model = group;
    modelLoaded = true;
    
    // Hide loading screen
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
}

function setupEventListeners() {
    // Mouse events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);
    
    // Close button
    document.getElementById('closeBtn').addEventListener('click', closePanel);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        closePanel();
    });
    
    // Window resize
    window.addEventListener('resize', onWindowResize);
    
    // Hint clicks
    document.querySelectorAll('.hint').forEach(hint => {
        hint.addEventListener('click', () => {
            const feature = hint.dataset.feature;
            if (feature && portfolioData[feature]) {
                displayContent(feature);
            }
        });
    });
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

function onMouseMove(event) {
    // Update mouse position for raycasting
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update cursor glow
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        cursorGlow.style.left = (event.clientX - 15) + 'px';
        cursorGlow.style.top = (event.clientY - 15) + 'px';
    }
}

function onMouseClick(event) {
    if (!modelLoaded) return;
    
    // Check if clicked on info panel
    if (event.target.closest('.info-panel') && !event.target.closest('.close-btn')) {
        return;
    }
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Get all objects in scene
    const objects = [];
    model.traverse(child => {
        if (child.userData.hotspot) {
            objects.push(child);
        }
    });
    
    // Check intersections
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0) {
        const hotspot = intersects[0].object.userData.hotspot;
        if (hotspot) {
            displayContent(hotspot);
        }
    }
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

// ============================================================================
// CONTENT DISPLAY
// ============================================================================

function displayContent(feature) {
    if (!portfolioData[feature]) return;
    
    const data = portfolioData[feature];
    const panel = document.getElementById('infoPanel');
    const content = document.getElementById('infoContent');
    const title = document.getElementById('panelTitle');
    
    // Update content
    title.textContent = data.title;
    content.innerHTML = data.content;
    
    // Show panel with animation
    panel.classList.add('active');
    
    // Add slight tilt to 3D model based on feature
    if (model) {
        model.rotation.x = 0.2;
        model.rotation.y = 0.3;
    }
}

function closePanel() {
    const panel = document.getElementById('infoPanel');
    panel.classList.remove('active');
    
    // Reset model rotation
    if (model) {
        model.rotation.x = 0;
        model.rotation.y = 0;
    }
}

// ============================================================================
// ANIMATION LOOP
// ============================================================================

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate model slightly
    if (model) {
        model.rotation.y += 0.001;
        if (!document.getElementById('infoPanel').classList.contains('active')) {
            model.rotation.x += 0.0005;
        }
    }
    
    renderer.render(scene, camera);
}

// ============================================================================
// START
// ============================================================================

document.addEventListener('DOMContentLoaded', init);