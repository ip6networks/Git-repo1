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
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let modelRotation = { x: 0, y: 0 };

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
    // Try to load external GLTF/GLB model from local assets or internet
    // If fails, use procedural face as fallback
    const loader = new THREE.GLTFLoader();
    
    // Path to your GLB model file
    const modelURL = './assets/models/hacker-mask.glb';
    
    loader.load(
        modelURL,
        function(gltf) {
            // Success: Model loaded
            model = gltf.scene;
            
            // Add to scene
            scene.add(model);
            
            // Calculate and apply auto-scale
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            model.scale.multiplyScalar(scale);
            
            // Center it
            model.position.x -= center.x * scale;
            model.position.y -= center.y * scale;
            model.position.z -= center.z * scale;
            
            modelLoaded = true;
            hideLoadingScreen();
            animate();
        },
        function(progress) {
            // Show loading progress
            if (progress.total > 0) {
                const percent = (progress.loaded / progress.total) * 100;
                const bar = document.querySelector('.loading-progress');
                if (bar) bar.style.width = percent + '%';
            }
        },
        function(error) {
            // Failed to load external model - use procedural face as fallback
            console.log('Could not load model from ' + modelURL + '. Using procedural face.');
            console.log('Error:', error);
            createFace();
            modelLoaded = true;
            hideLoadingScreen();
            animate();
        }
    );
}

function createFace() {
    // Create an authentic Mr. Robot-style hacker mask
    const group = new THREE.Group();
    
    // ========== HEAD BASE - SMOOTH SKULL SHAPE ==========
    // Create a smooth, human-like head
    const headGeometry = new THREE.IcosahedronGeometry(0.95, 6);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        roughness: 0.5,
        metalness: 0.3,
        emissive: 0x000000
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);
    
    // ========== CHEEKBONES - ANGULAR DEFINITION ==========
    const cheekGeometry = new THREE.BoxGeometry(1.3, 0.25, 0.4);
    const cheekMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.4,
        metalness: 0.2
    });
    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.5, -0.1, 0.6);
    group.add(leftCheek);
    
    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.5, -0.1, 0.6);
    group.add(rightCheek);
    
    // ========== EYES - MR ROBOT SIGNATURE LOOK ==========
    // Create the iconic piercing eyes with heavy black makeup effect
    
    // Left eye socket - deep and dark (makeup effect)
    const eyeShadowGeom = new THREE.BoxGeometry(0.4, 0.55, 0.15);
    const eyeShadowMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.8,
        metalness: 0
    });
    const leftEyeShadow = new THREE.Mesh(eyeShadowGeom, eyeShadowMat);
    leftEyeShadow.position.set(-0.4, 0.28, 0.75);
    group.add(leftEyeShadow);
    
    const rightEyeShadow = new THREE.Mesh(eyeShadowGeom, eyeShadowMat);
    rightEyeShadow.position.set(0.4, 0.28, 0.75);
    group.add(rightEyeShadow);
    
    // Left eye - white with intense green iris
    const eyeGroupLeft = new THREE.Group();
    eyeGroupLeft.position.set(-0.4, 0.28, 0.85);
    
    // Sclera (white of eye)
    const scleraGeom = new THREE.SphereGeometry(0.13, 16, 16);
    const scleraMat = new THREE.MeshStandardMaterial({
        color: 0xf5f5f5,
        roughness: 0.1,
        metalness: 0.3
    });
    const scleraLeft = new THREE.Mesh(scleraGeom, scleraMat);
    eyeGroupLeft.add(scleraLeft);
    
    // Iris - intense bright green (hacker aesthetic)
    const irisGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const irisMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.8,
        roughness: 0.05,
        metalness: 0.95
    });
    const irisLeft = new THREE.Mesh(irisGeom, irisMat);
    irisLeft.position.z = 0.08;
    eyeGroupLeft.add(irisLeft);
    
    // Pupil - black center
    const pupilGeom = new THREE.SphereGeometry(0.035, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupilLeft = new THREE.Mesh(pupilGeom, pupilMat);
    pupilLeft.position.z = 0.115;
    eyeGroupLeft.add(pupilLeft);
    
    // Bright eye reflection
    const reflectionGeom = new THREE.SphereGeometry(0.015, 8, 8);
    const reflectionMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const reflectionLeft = new THREE.Mesh(reflectionGeom, reflectionMat);
    reflectionLeft.position.set(-0.02, 0.02, 0.125);
    eyeGroupLeft.add(reflectionLeft);
    
    eyeGroupLeft.userData.hotspot = 'eyes';
    group.add(eyeGroupLeft);
    
    // Right eye - mirror of left
    const eyeGroupRight = eyeGroupLeft.clone();
    eyeGroupRight.position.x = 0.4;
    eyeGroupRight.userData.hotspot = 'eyes';
    group.add(eyeGroupRight);
    
    // ========== NOSE - SUBTLE AND DEFINED ==========
    const noseGroup = new THREE.Group();
    noseGroup.position.set(0, 0.05, 0.9);
    
    // Nose bridge
    const noseBridgeGeom = new THREE.BoxGeometry(0.08, 0.35, 0.1);
    const noseMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.6,
        metalness: 0.1
    });
    const noseBridge = new THREE.Mesh(noseBridgeGeom, noseMat);
    noseGroup.add(noseBridge);
    
    // Nose tip - slight cone
    const noseTipGeom = new THREE.ConeGeometry(0.05, 0.12, 6);
    const noseTipMat = new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        roughness: 0.5,
        metalness: 0.2
    });
    const noseTip = new THREE.Mesh(noseTipGeom, noseTipMat);
    noseTip.position.y = -0.2;
    noseTip.rotation.x = Math.PI / 2;
    noseGroup.add(noseTip);
    
    // Nostril accents
    const nostrilGeom = new THREE.SphereGeometry(0.03, 8, 8);
    const nostrilMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.6
    });
    const leftNostril = new THREE.Mesh(nostrilGeom, nostrilMat);
    leftNostril.position.set(-0.05, -0.15, 0.08);
    noseGroup.add(leftNostril);
    const rightNostril = new THREE.Mesh(nostrilGeom, nostrilMat);
    rightNostril.position.set(0.05, -0.15, 0.08);
    noseGroup.add(rightNostril);
    
    noseGroup.userData.hotspot = 'nose';
    group.add(noseGroup);
    
    // ========== MOUTH - MR ROBOT SERIOUS EXPRESSION ==========
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.35, 0.8);
    
    // Mouth outline - serious, straight line
    const mouthOutlineGeom = new THREE.BoxGeometry(0.5, 0.08, 0.08);
    const mouthMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
        metalness: 0.2
    });
    const mouthOutline = new THREE.Mesh(mouthOutlineGeom, mouthMat);
    mouthGroup.add(mouthOutline);
    
    // Mouth glow accent - hacker aesthetic
    const mouthGlowGeom = new THREE.BoxGeometry(0.52, 0.1, 0.02);
    const mouthGlowMat = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.5
    });
    const mouthGlow = new THREE.Mesh(mouthGlowGeom, mouthGlowMat);
    mouthGlow.position.z = 0.06;
    mouthGroup.add(mouthGlow);
    
    // Mouth corners - slight accent
    const cornerGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const cornerMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.7
    });
    const leftCorner = new THREE.Mesh(cornerGeom, cornerMat);
    leftCorner.position.set(-0.27, 0, 0.08);
    mouthGroup.add(leftCorner);
    const rightCorner = new THREE.Mesh(cornerGeom, cornerMat);
    rightCorner.position.set(0.27, 0, 0.08);
    mouthGroup.add(rightCorner);
    
    mouthGroup.userData.hotspot = 'mouth';
    group.add(mouthGroup);
    
    // ========== EARS - SUBTLE TECH ELEMENTS ==========
    // Left ear
    const leftEarGroup = new THREE.Group();
    leftEarGroup.position.set(-0.68, 0.1, 0.4);
    
    const earGeom = new THREE.BoxGeometry(0.08, 0.3, 0.08);
    const earMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
        metalness: 0.3
    });
    const leftEar = new THREE.Mesh(earGeom, earMat);
    leftEarGroup.add(leftEar);
    
    // Ear accent - subtle glow
    const earAccentGeom = new THREE.SphereGeometry(0.05, 8, 8);
    const earAccentMat = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.7
    });
    const leftEarAccent = new THREE.Mesh(earAccentGeom, earAccentMat);
    leftEarAccent.position.z = 0.08;
    leftEarGroup.add(leftEarAccent);
    
    leftEarGroup.userData.hotspot = 'ears';
    group.add(leftEarGroup);
    
    // Right ear - mirror
    const rightEarGroup = new THREE.Group();
    rightEarGroup.position.set(0.68, 0.1, 0.4);
    const rightEar = new THREE.Mesh(earGeom, earMat);
    rightEarGroup.add(rightEar);
    const rightEarAccent = new THREE.Mesh(earAccentGeom, earAccentMat);
    rightEarAccent.position.z = 0.08;
    rightEarGroup.add(rightEarAccent);
    rightEarGroup.userData.hotspot = 'ears';
    group.add(rightEarGroup);
    
    // ========== FOREHEAD/BRAIN - PROCESSING CENTER ==========
    const foreheadGroup = new THREE.Group();
    foreheadGroup.position.set(0, 0.65, 0.5);
    
    // Brain core - representing neural processing
    const brainGeom = new THREE.IcosahedronGeometry(0.25, 5);
    const brainMat = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.85
    });
    const brain = new THREE.Mesh(brainGeom, brainMat);
    foreheadGroup.add(brain);
    
    // Brain glow halo
    const haloGeom = new THREE.TorusGeometry(0.3, 0.05, 8, 32);
    const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.5
    });
    const halo = new THREE.Mesh(haloGeom, haloMat);
    halo.rotation.x = Math.PI / 3;
    foreheadGroup.add(halo);
    
    const halo2 = new THREE.Mesh(haloGeom, haloMat);
    halo2.rotation.y = Math.PI / 3;
    foreheadGroup.add(halo2);
    
    foreheadGroup.userData.hotspot = 'forehead';
    group.add(foreheadGroup);
    
    // ========== FINALIZE ==========
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

function loadModel() {
    // Try to load external GLTF/GLB model from internet
    // If fails, use procedural face
    const loader = new THREE.GLTFLoader();
    
    // Example: Try to load a skull model (you can change this URL)
    // Popular sources: Sketchfab, Three.js examples, CDN services
    const modelURL = './assets/models/hacker-mask.glb';
    
    loader.load(
        modelURL,
        function(gltf) {
            // Success: Model loaded from internet
            model = gltf.scene;
            
            // Add to scene
            scene.add(model);
            
            // Calculate and apply auto-scale
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            model.scale.multiplyScalar(scale);
            
            // Center it
            model.position.x -= center.x * scale;
            model.position.y -= center.y * scale;
            model.position.z -= center.z * scale;
            
            modelLoaded = true;
            hideLoadingScreen();
            animate();
        },
        function(progress) {
            // Show loading progress
            if (progress.total > 0) {
                const percent = (progress.loaded / progress.total) * 100;
                const bar = document.querySelector('.loading-progress');
                if (bar) bar.style.width = percent + '%';
            }
        },
        function(error) {
            // Failed to load external model - use procedural face as fallback
            console.log('Using procedural hacker face (external model unavailable)');
            createFace();
        }
    );
}

function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
}

function setupEventListeners() {
    // Mouse events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', onMouseClick);
    
    // Close button
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePanel);
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            closePanel();
        });
    }
    
    // Window resize
    window.addEventListener('resize', onWindowResize);
    
    // Hint clicks
    document.querySelectorAll('.hint').forEach(hint => {
        hint.addEventListener('click', (e) => {
            e.stopPropagation();
            const feature = hint.dataset.feature;
            if (feature && portfolioData[feature]) {
                displayContent(feature);
            }
        });
    });
    
    // Panel tabs navigation
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            const feature = tab.dataset.feature;
            displayContent(feature);
        });
    });
    
    // Link handlers - catch ALL links including dynamically injected ones
    document.addEventListener('click', (e) => {
        // Check if clicked element is a link
        const link = e.target.closest('a');
        if (link && link.href) {
            const href = link.getAttribute('href');
            
            // Skip anchor links and empty hrefs
            if (!href || href === '#') return;
            
            // Handle different link types
            if (href.startsWith('http://') || href.startsWith('https://')) {
                e.preventDefault();
                window.open(href, '_blank');
            } else if (href.startsWith('mailto:')) {
                e.preventDefault();
                window.location.href = href;
            } else if (href.startsWith('tel:')) {
                e.preventDefault();
                window.location.href = href;
            }
        }
    }, true); // Use capture phase to catch all clicks
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
    
    // Handle model rotation with mouse drag
    if (isDragging && model) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        
        modelRotation.y += deltaX * 0.01;
        modelRotation.x += deltaY * 0.01;
        
        // Apply rotation
        model.rotation.x = modelRotation.x;
        model.rotation.y = modelRotation.y;
    }
    
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseClick(event) {
    if (!modelLoaded) {
        console.log('Model not loaded yet');
        return;
    }
    
    // Check if clicked on info panel
    if (event.target.closest('.info-panel') && !event.target.closest('.close-btn')) {
        console.log('Clicked on info panel content');
        return;
    }
    
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Get all objects in scene that can be intersected
    const objects = [];
    model.traverse(child => {
        // Include meshes that are part of the model
        if (child.isMesh) {
            objects.push(child);
        }
        // Also include objects with hotspot data (for procedural face)
        if (child.userData.hotspot) {
            objects.push(child);
        }
    });
    
    console.log('Raycasting against', objects.length, 'objects');
    
    // Check intersections
    const intersects = raycaster.intersectObjects(objects, true);
    
    console.log('Intersections found:', intersects.length);
    
    if (intersects.length > 0) {
        // First check if the intersected object has hotspot data directly
        let hotspot = intersects[0].object.userData.hotspot;
        
        // If no hotspot found on intersected object, search parent hierarchy
        if (!hotspot) {
            let parent = intersects[0].object;
            while (parent && !hotspot) {
                hotspot = parent.userData.hotspot;
                parent = parent.parent;
            }
        }
        
        // If still no hotspot, do a proximity-based detection
        // This maps model parts to features based on position
        if (!hotspot) {
            console.log('No hotspot found, using proximity detection at point:', intersects[0].point);
            hotspot = detectHotspotByPosition(intersects[0].point);
        }
        
        console.log('Detected hotspot:', hotspot);
        
        if (hotspot) {
            displayContent(hotspot);
        }
    }
}

function detectHotspotByPosition(point) {
    // Proximity-based hotspot detection for external models
    // Maps click position on model to nearest facial feature
    
    // Get model center
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    
    // Calculate relative position
    const relative = point.clone().sub(center);
    
    // Simple heuristic: upper face = eyes/forehead, middle = nose, lower = mouth, sides = ears
    const x = Math.abs(relative.x);
    const y = relative.y;
    const z = relative.z;
    
    // If click is on upper part of face
    if (y > 0.3) {
        return x > 0.2 ? 'eyes' : 'forehead';
    }
    // Middle part
    else if (y > -0.1) {
        return 'nose';
    }
    // Lower part
    else if (y > -0.4) {
        return 'mouth';
    }
    // Sides
    else if (x > 0.3) {
        return 'ears';
    }
    
    return null;
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

function onMouseDown(event) {
    // Don't drag if clicking on UI elements
    if (event.target.closest('.navbar') || event.target.closest('.info-panel') || 
        event.target.closest('.hints-panel')) {
        return;
    }
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseUp(event) {
    isDragging = false;
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
    const breadcrumb = document.getElementById('panelBreadcrumb');
    
    // Update header
    title.innerHTML = `<span class="panel-icon">${data.icon}</span> ${data.title}`;
    breadcrumb.innerHTML = `${data.icon} ${data.title}`;
    title.dataset.feature = feature;
    content.innerHTML = data.content;
    
    // Update hint indicators
    document.querySelectorAll('.hint').forEach(hint => {
        hint.classList.remove('active');
    });
    const activeHint = document.querySelector(`.hint[data-feature="${feature}"]`);
    if (activeHint) {
        activeHint.classList.add('active');
    }
    
    // Update active tab
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.panel-tab[data-feature="${feature}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
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
        modelRotation = { x: 0, y: 0 };
        model.rotation.x = 0;
        model.rotation.y = 0;
    }
}

// ============================================================================
// ANIMATION LOOP
// ============================================================================

function animate() {
    requestAnimationFrame(animate);
    
    // Mr. Robot aesthetic animations - subtle and intense
    if (model) {
        const time = Date.now() * 0.001;
        
        // Only auto-rotate if not being dragged manually
        if (!isDragging) {
            // Head rotation - extremely slow and controlled
            modelRotation.y += 0.00015;
            modelRotation.x = Math.sin(time * 0.08) * 0.05;
            modelRotation.z = Math.sin(time * 0.06) * 0.02;
            
            model.rotation.x = modelRotation.x;
            model.rotation.y = modelRotation.y;
            model.rotation.z = modelRotation.z;
        }
        
        // Animations only for procedural face (with userData.hotspot)
        // External models don't have these custom properties
        const eyeGroups = model.children.filter(child => child.userData.hotspot === 'eyes');
        if (eyeGroups.length > 0) {
            // This is the procedural face
            eyeGroups.forEach((eyeGroup, idx) => {
                // Subtle eye movement - tracking
                eyeGroup.rotation.z = Math.sin(time * 0.8 + idx * Math.PI) * 0.15;
                // Occasional blink-like effect
                const blink = Math.max(0, Math.sin(time * 2.5 + idx) * 0.3);
                eyeGroup.scale.y = 1 - blink * 0.4;
            });
            
            // Brain animations - neural processing
            const brain = model.children.find(child => child.userData.hotspot === 'forehead');
            if (brain) {
                brain.rotation.x += 0.015;
                brain.rotation.y += 0.02;
                brain.rotation.z += 0.01;
                // Pulsing intensity
                const intensity = Math.sin(time * 2.5) * 0.3 + 0.7;
                brain.traverse(child => {
                    if (child.material && child.material.emissive) {
                        child.material.emissiveIntensity = intensity;
                    }
                });
            }
            
            // Nose slight twitch
            const nose = model.children.find(child => child.userData.hotspot === 'nose');
            if (nose) {
                nose.rotation.x = Math.sin(time * 3) * 0.02;
            }
            
            // Mouth slight movement - serious expression
            const mouth = model.children.find(child => child.userData.hotspot === 'mouth');
            if (mouth) {
                mouth.position.y = -0.35 + Math.sin(time * 2) * 0.01;
            }
        }
        
        // Panel is open - lock head position for focus
        if (document.getElementById('infoPanel').classList.contains('active')) {
            modelRotation.x = 0.1;
            modelRotation.y = 0.15;
            modelRotation.z = 0;
            model.rotation.x = 0.1;
            model.rotation.y = 0.15;
            model.rotation.z = 0;
        }
    }
    
    renderer.render(scene, camera);
}

// ============================================================================
// START
// ============================================================================

document.addEventListener('DOMContentLoaded', init);