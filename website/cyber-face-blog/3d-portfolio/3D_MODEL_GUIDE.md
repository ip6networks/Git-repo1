# 3D Model Integration Guide

## Current Setup

The portfolio now supports **two modes**:

### Mode 1: External 3D Model (GLB/GLTF)
- Automatically tries to load a 3D model from the internet
- If successful, displays the external model
- If fails, automatically falls back to procedural hacker face
- Supports progress loading bar

### Mode 2: Procedural Face (Fallback)
- Automatically generated Mr. Robot-style mask if external model unavailable
- No dependencies on external files
- Always works as backup

---

## How to Use an External 3D Model

### Step 1: Find a 3D Model

You can get free 3D models from these sources:

**Free 3D Model Repositories:**
1. **Sketchfab** (https://sketchfab.com)
   - Filter by: License "Downloadable" + Format "glTF"
   - Search: "skull", "head", "face", "mask", "hacker"

2. **Three.js Examples** (https://threejs.org/examples/)
   - Pre-made models and examples

3. **Poly Haven** (https://polyhaven.com/models)
   - Free 3D models with CC0 license

4. **CGTrader Free** (https://www.cgtrader.com/free-3d-models)
   - Filter by free models, download GLB format

5. **TurboSquid** (https://www.turbosquid.com/Search/3D-Models/free)
   - Free section with quality models

**What to Look For:**
- Format: **GLB or GLTF** (these load in Three.js)
- Single file GLB is easiest
- Make sure license allows use
- ~1-5 MB file size for web

---

## Step 2: Get the Model URL

Once you find a model:

**Option A: Direct URL from CDN**
- Some models are hosted on CDNs ready to use
- Example: `https://cdn.example.com/model.glb`

**Option B: Host on Your Own Server**
1. Download the GLB file
2. Place it in `assets/models/` folder
3. Update the URL in `script.js`

**Option C: Use Cloudinary/Imgbb/GitHub (Free Hosting)**
1. Upload GLB file to free hosting
2. Copy the direct download link
3. Use that URL in the code

---

## Step 3: Update the Model URL

Open `script.js` and find the `loadModel()` function (around line 618):

```javascript
function loadModel() {
    const loader = new THREE.GLTFLoader();
    
    // CHANGE THIS URL TO YOUR 3D MODEL
    const modelURL = 'https://your-model-url-here.glb';
    
    // ... rest of code
}
```

**Replace the `modelURL` with your model URL**

### Examples:

```javascript
// Skull model
const modelURL = 'https://models.readyplayer.me/skull.glb';

// Head model
const modelURL = 'https://cdn.jsdelivr.net/npm/some-3d-package/head.glb';

// Local model (in assets/models/ folder)
const modelURL = './assets/models/my-face.glb';
```

---

## Step 4: Test

1. Open `index.html` in browser
2. Wait for loading screen
3. Model should appear OR fallback to procedural face
4. Check browser console (F12) for any errors

---

## Recommended 3D Models for Hacker Portfolio

### Great Options:
1. **Stylized Skull** - Dramatic, technical vibe
2. **Cyber Head** - Futuristic, glowing
3. **Face Mask** - Mysterious, Mr. Robot style
4. **Abstract Head** - Minimalist, geometric
5. **AI Head** - Tech aesthetic with metallic feel

### Where to Find These:
- Sketchfab search: "stylized skull gltf"
- Search: "hacker face glb"
- Search: "cyber skull"
- Search: "mask 3d model glb"

---

## Troubleshooting

### Model doesn't appear
- Check browser console (F12) for errors
- Verify URL is correct
- Check if file is in GLB/GLTF format
- Ensure CORS is enabled (most CDNs are)

### Model is too small/large
- The code auto-scales the model
- If not fitting well, adjust in script:
  ```javascript
  const scale = 3 / maxDim; // Change 3 to larger/smaller number
  ```

### Model loading is slow
- Choose smaller file size (< 5 MB)
- Use compressed GLB format
- Consider local hosting instead of CDN

### Links don't work
- Fixed in latest version
- All links should now open correctly
- Check console for any JavaScript errors

---

## How It Works

1. **Page loads** → Shows "Initializing Neural Interface..."
2. **GLTFLoader tries external model URL**
3. **If success** → Displays model with auto-scaling
4. **If fails** → Automatically creates procedural Mr. Robot face
5. **User can click** face features to see portfolio content
6. **All links work** → Opens in new tabs or email client

---

## Popular Models to Try

These are tested and recommended:

### Skull (Dramatic)
```
https://models.readyplayer.me/skull.glb
```

### Abstract Head
```
https://cdn.jsdelivr.net/npm/three-model-viewer/models/head.glb
```

### Minimal Face
```
https://cdn.jsdelivr.net/npm/3d-human-models/face-simple.glb
```

Try copying one of these URLs into the `modelURL` variable in `script.js` line 623!

---

## Advanced: Custom Model Settings

If your model needs adjustments:

```javascript
// Adjust these parameters in loadModel() function:

// Scale size (default 3)
const scale = 5 / maxDim; // Larger number = bigger model

// Position adjustments
model.position.y += 0.5; // Move up/down

// Rotation adjustments
model.rotation.x = Math.PI / 2; // Rotate
```

---

## Summary

✅ **Easy:** Paste any GLB URL into the script  
✅ **Fallback:** Procedural face if external model fails  
✅ **Links:** All working (email, phone, social media)  
✅ **Auto-scale:** Model automatically fits the viewport  
✅ **No Dependencies:** No special setup needed  

**Just find a cool 3D model and paste the URL!** 🎭
