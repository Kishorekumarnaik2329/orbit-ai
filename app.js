// Application State
let currentUser = null;
let currentModule = 'dashboard';
let monacoEditor = null;
let isRecording = false;
let recognition = null;
let chatMessages = [];
let aiChatMessages = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing ORBIT AI...');
    
    // Check for existing session (simulate)
    const savedUser = localStorage.getItem('orbitai_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    } else {
        showLogin();
    }
    
    setupEventListeners();
    initializeModules();
}

function setupEventListeners() {
    // Login
    document.getElementById('google-signin-btn').addEventListener('click', handleGoogleSignIn);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const module = e.currentTarget.dataset.module;
            switchModule(module);
        });
    });
    
    // Dashboard cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const module = e.currentTarget.dataset.module;
            switchModule(module);
        });
    });
    
    // Resume Builder
    setupResumeBuilder();
    
    // Portfolio Generator
    setupPortfolioGenerator();
    
    // Document Designer
    setupDocumentDesigner();
    
    // Presentation Designer
    setupPresentationDesigner();
    
    // Invoice Generator
    setupInvoiceGenerator();
    
    // Chat
    setupChat();
    
    // AI Chat
    setupAIChat();
    
    // Code IDE
    setupCodeIDE();
    
    // Voice Assistant
    setupVoiceAssistant();
}

function initializeModules() {
    // Initialize speech recognition
    initializeSpeechRecognition();
}

// Authentication
function handleGoogleSignIn() {
    showLoading('Signing in with Google...');
    
    // Simulate Google OAuth
    setTimeout(() => {
        const mockUser = {
            uid: 'user_' + Math.random().toString(36).substr(2, 9),
            displayName: 'John Doe',
            email: 'john.doe@example.com',
            photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
        };
        
        currentUser = mockUser;
        localStorage.setItem('orbitai_user', JSON.stringify(mockUser));
        
        hideLoading();
        showApp();
    }, 2000);
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('orbitai_user');
    showLogin();
}

function showLogin() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}

function showApp() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    
    // Update user info
    document.getElementById('user-name').textContent = currentUser.displayName;
    document.getElementById('user-avatar').src = currentUser.photoURL;
}

// Navigation
function switchModule(moduleName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-module="${moduleName}"]`).classList.add('active');
    
    // Show selected module
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    document.getElementById(`${moduleName}-module`).classList.add('active');
    
    currentModule = moduleName;
    
    // Initialize Monaco Editor when Code IDE is accessed
    if (moduleName === 'code' && !monacoEditor) {
        setTimeout(initializeMonacoEditor, 100);
    }
}

// Resume Builder
function setupResumeBuilder() {
    let selectedTemplate = 'professional';
    
    // Template selection
    document.querySelectorAll('#resume-module .template-card').forEach(card => {
        card.addEventListener('click', (e) => {
            document.querySelectorAll('#resume-module .template-card').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedTemplate = e.currentTarget.dataset.template;
            updateResumePreview();
        });
    });
    
    // Add experience
    document.getElementById('add-experience').addEventListener('click', () => {
        const experienceList = document.getElementById('experience-list');
        const newExperience = createExperienceItem();
        experienceList.appendChild(newExperience);
    });
    
    // Generate summary
    document.getElementById('generate-summary').addEventListener('click', () => {
        showLoading('Generating summary with AI...');
        setTimeout(() => {
            const summaries = [
                "Results-driven software engineer with 3+ years of experience developing scalable web applications using modern technologies. Passionate about clean code, user experience, and continuous learning.",
                "Creative and detail-oriented developer with expertise in full-stack development. Proven track record of delivering high-quality solutions that drive business growth and improve user engagement.",
                "Innovative problem-solver with strong background in computer science and practical experience building enterprise-level applications. Committed to writing maintainable code and collaborating effectively with cross-functional teams."
            ];
            document.getElementById('resume-summary').value = summaries[Math.floor(Math.random() * summaries.length)];
            hideLoading();
            updateResumePreview();
        }, 1500);
    });
    
    // Generate resume
    document.getElementById('generate-resume').addEventListener('click', generateResume);
    
    // Form inputs
    ['resume-name', 'resume-email', 'resume-phone', 'resume-location', 'resume-summary'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateResumePreview);
        }
    });
    
    // Download resume
    document.getElementById('download-resume').addEventListener('click', downloadResume);
    
    // Save resume
    document.getElementById('save-resume').addEventListener('click', () => {
        showLoading('Saving resume...');
        setTimeout(() => {
            hideLoading();
            alert('Resume saved successfully!');
        }, 1000);
    });
}

function createExperienceItem() {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Job Title</label>
                <input type="text" class="form-control" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label class="form-label">Company</label>
                <input type="text" class="form-control" placeholder="Tech Corp">
            </div>
            <div class="form-group">
                <label class="form-label">Start Date</label>
                <input type="month" class="form-control">
            </div>
            <div class="form-group">
                <label class="form-label">End Date</label>
                <input type="month" class="form-control">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
        </div>
        <button class="btn btn--outline btn--sm" onclick="this.parentElement.remove()">Remove</button>
    `;
    return div;
}

function updateResumePreview() {
    const preview = document.getElementById('resume-preview');
    const name = document.getElementById('resume-name').value || 'Your Name';
    const email = document.getElementById('resume-email').value || 'email@example.com';
    const phone = document.getElementById('resume-phone').value || 'Phone Number';
    const location = document.getElementById('resume-location').value || 'Location';
    const summary = document.getElementById('resume-summary').value || 'Professional summary will appear here...';
    
    preview.innerHTML = `
        <div class="resume-content">
            <div class="resume-header">
                <div class="resume-title">${name}</div>
                <div>${email} | ${phone} | ${location}</div>
            </div>
            <div class="resume-section">
                <h3>Professional Summary</h3>
                <p>${summary}</p>
            </div>
            <div class="resume-section">
                <h3>Experience</h3>
                <p>Experience details will appear here based on your input...</p>
            </div>
        </div>
    `;
}

function generateResume() {
    showLoading('Generating resume with AI...');
    
    setTimeout(() => {
        // Populate with mock data
        document.getElementById('resume-name').value = currentUser?.displayName || 'John Doe';
        document.getElementById('resume-email').value = currentUser?.email || 'john.doe@example.com';
        document.getElementById('resume-phone').value = '+1 (555) 123-4567';
        document.getElementById('resume-location').value = 'New York, NY';
        document.getElementById('resume-summary').value = 'Results-driven software engineer with 3+ years of experience developing scalable web applications. Passionate about clean code and continuous learning.';
        
        updateResumePreview();
        hideLoading();
    }, 2000);
}

function downloadResume() {
    showLoading('Generating PDF...');
    
    setTimeout(() => {
        // Simulate PDF download
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKE15IFJlc3VtZSkKL0NyZWF0b3IgKE9SQklUIEFJKQovUHJvZHVjZXIgKE9SQklUIEFJKQo+PgplbmRvYmoKCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzQgMCBSXQo+PgplbmRvYmoKCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAwMDE3OCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMiAwIFIKPj4KJTM0JTU2';
        link.download = 'resume.pdf';
        link.click();
        
        hideLoading();
    }, 1500);
}

// Portfolio Generator
function setupPortfolioGenerator() {
    document.getElementById('add-project').addEventListener('click', () => {
        const projectsList = document.getElementById('projects-list');
        const newProject = createProjectItem();
        projectsList.appendChild(newProject);
    });
    
    document.getElementById('generate-portfolio').addEventListener('click', generatePortfolio);
    document.getElementById('preview-portfolio').addEventListener('click', previewPortfolio);
}

function createProjectItem() {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Project Name</label>
                <input type="text" class="form-control" placeholder="My Awesome Project">
            </div>
            <div class="form-group">
                <label class="form-label">Technologies</label>
                <input type="text" class="form-control" placeholder="React, Node.js, MongoDB">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="3" placeholder="Describe your project..."></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Live URL</label>
            <input type="url" class="form-control" placeholder="https://myproject.com">
        </div>
        <button class="btn btn--outline btn--sm" onclick="this.parentElement.remove()">Remove Project</button>
    `;
    return div;
}

function generatePortfolio() {
    showLoading('Generating portfolio website...');
    
    setTimeout(() => {
        hideLoading();
        alert('Portfolio website generated successfully! Your site is now live at: https://johndoe.orbitai.dev');
    }, 3000);
}

function previewPortfolio() {
    const title = document.getElementById('portfolio-title').value || 'Portfolio Preview';
    const tagline = document.getElementById('portfolio-tagline').value || 'Your tagline here';
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <html>
            <head><title>${title}</title></head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 40px; background: #f8f9fa;">
                <div style="max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h1 style="color: #2c3e50; text-align: center;">${title}</h1>
                    <p style="color: #7f8c8d; text-align: center; font-size: 18px;">${tagline}</p>
                    <h2 style="color: #34495e;">About</h2>
                    <p>This is a preview of your portfolio website. The full version will include all your projects and customizations.</p>
                </div>
            </body>
        </html>
    `);
}

// Document Designer
function setupDocumentDesigner() {
    document.getElementById('ai-generate-content').addEventListener('click', generateDocumentContent);
    document.getElementById('export-document').addEventListener('click', exportDocument);
    
    // Rich text editing toolbar
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const command = e.currentTarget.dataset.command;
            document.execCommand(command, false, null);
        });
    });
}

function generateDocumentContent() {
    showLoading('Generating content with AI...');
    
    const template = document.getElementById('document-template').value;
    const content = document.getElementById('document-content');
    
    setTimeout(() => {
        let generatedContent = '';
        
        switch(template) {
            case 'report':
                generatedContent = `
                    <h1>Business Report: Q4 Analysis</h1>
                    <h2>Executive Summary</h2>
                    <p>This report provides a comprehensive analysis of our Q4 performance, highlighting key achievements and areas for improvement.</p>
                    <h2>Key Findings</h2>
                    <ul>
                        <li>Revenue increased by 15% compared to Q3</li>
                        <li>Customer satisfaction scores improved significantly</li>
                        <li>Market expansion goals were exceeded</li>
                    </ul>
                    <h2>Recommendations</h2>
                    <p>Based on our analysis, we recommend continuing current strategies while exploring new market opportunities.</p>
                `;
                break;
            case 'essay':
                generatedContent = `
                    <h1>The Impact of Technology on Modern Education</h1>
                    <h2>Introduction</h2>
                    <p>Technology has revolutionized the way we approach education, creating new opportunities for learning and collaboration.</p>
                    <h2>Main Arguments</h2>
                    <p>The integration of digital tools in classrooms has enhanced student engagement and provided personalized learning experiences.</p>
                    <h2>Conclusion</h2>
                    <p>As we move forward, the thoughtful implementation of technology will continue to shape the future of education.</p>
                `;
                break;
            case 'proposal':
                generatedContent = `
                    <h1>Project Proposal: Digital Transformation Initiative</h1>
                    <h2>Project Overview</h2>
                    <p>This proposal outlines our strategy for implementing a comprehensive digital transformation across all business units.</p>
                    <h2>Objectives</h2>
                    <ul>
                        <li>Streamline operations through automation</li>
                        <li>Improve customer experience</li>
                        <li>Increase operational efficiency by 30%</li>
                    </ul>
                    <h2>Timeline & Budget</h2>
                    <p>The project will span 12 months with a total budget of $500,000.</p>
                `;
                break;
        }
        
        content.innerHTML = generatedContent;
        hideLoading();
    }, 2000);
}

function exportDocument() {
    showLoading('Exporting document...');
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJYP3';
        link.download = 'document.pdf';
        link.click();
        
        hideLoading();
    }, 1500);
}

// Presentation Designer
function setupPresentationDesigner() {
    let currentSlide = 1;
    let slides = [{ id: 1, title: 'Your Presentation Title', content: 'Subtitle or brief description' }];
    
    document.getElementById('add-slide').addEventListener('click', () => {
        const slideNumber = slides.length + 1;
        slides.push({ id: slideNumber, title: `Slide ${slideNumber}`, content: 'Content here...' });
        updateSlidesList();
    });
    
    document.getElementById('ai-generate-slides').addEventListener('click', generateSlides);
    document.getElementById('export-presentation').addEventListener('click', exportPresentation);
    document.getElementById('present-mode').addEventListener('click', startPresentationMode);
    
    // Slide thumbnail clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.slide-thumbnail')) {
            const slideId = parseInt(e.target.closest('.slide-thumbnail').dataset.slide);
            switchToSlide(slideId);
        }
    });
}

function updateSlidesList() {
    const slidesList = document.getElementById('slides-list');
    slidesList.innerHTML = slides.map(slide => `
        <div class="slide-thumbnail ${slide.id === currentSlide ? 'active' : ''}" data-slide="${slide.id}">
            <div class="slide-preview">${slide.id}</div>
            <span>Slide ${slide.id}</span>
        </div>
    `).join('');
}

function switchToSlide(slideId) {
    currentSlide = slideId;
    const slide = slides.find(s => s.id === slideId);
    if (slide) {
        document.getElementById('current-slide').innerHTML = `
            <h1 contenteditable="true">${slide.title}</h1>
            <p contenteditable="true">${slide.content}</p>
        `;
    }
    updateSlidesList();
}

function generateSlides() {
    showLoading('Generating presentation with AI...');
    
    setTimeout(() => {
        slides = [
            { id: 1, title: 'ORBIT AI Presentation', content: 'All-in-One Student Productivity Platform' },
            { id: 2, title: 'Problem Statement', content: 'Students need multiple tools for career success' },
            { id: 3, title: 'Our Solution', content: 'Unified platform with AI-powered features' },
            { id: 4, title: 'Key Features', content: '• Resume Builder\n• Code IDE\n• Voice Assistant\n• Collaboration Tools' },
            { id: 5, title: 'Thank You', content: 'Questions & Discussion' }
        ];
        
        currentSlide = 1;
        switchToSlide(1);
        updateSlidesList();
        
        hideLoading();
    }, 2500);
}

function exportPresentation() {
    showLoading('Exporting presentation...');
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,UEsDBA==';
        link.download = 'presentation.pptx';
        link.click();
        
        hideLoading();
    }, 2000);
}

function startPresentationMode() {
    const presentWindow = window.open('', '_blank');
    const slide = slides.find(s => s.id === currentSlide);
    
    presentWindow.document.write(`
        <html>
            <head>
                <title>Presentation Mode</title>
                <style>
                    body { margin: 0; padding: 0; background: #000; color: #fff; font-family: Arial, sans-serif; }
                    .slide { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 40px; box-sizing: border-box; }
                    h1 { font-size: 4rem; margin-bottom: 2rem; }
                    p { font-size: 2rem; line-height: 1.5; white-space: pre-line; }
                </style>
            </head>
            <body>
                <div class="slide">
                    <h1>${slide.title}</h1>
                    <p>${slide.content}</p>
                </div>
                <script>
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape') window.close();
                    });
                </script>
            </body>
        </html>
    `);
}

// Invoice Generator
function setupInvoiceGenerator() {
    let invoiceItems = [];
    
    document.getElementById('add-line-item').addEventListener('click', addLineItem);
    document.getElementById('generate-invoice').addEventListener('click', generateInvoice);
    document.getElementById('download-invoice').addEventListener('click', downloadInvoice);
    
    // Set default date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoice-date').value = today;
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('invoice-due-date').value = dueDate.toISOString().split('T')[0];
    
    // Calculate totals when items change
    document.addEventListener('input', (e) => {
        if (e.target.closest('.item-row')) {
            calculateInvoiceTotal();
        }
    });
    
    // Template selection
    document.querySelectorAll('#invoices-module .template-card').forEach(card => {
        card.addEventListener('click', (e) => {
            document.querySelectorAll('#invoices-module .template-card').forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
    
    // Initial calculation
    calculateInvoiceTotal();
}

function addLineItem() {
    const itemsContainer = document.getElementById('invoice-items');
    const newItem = document.createElement('div');
    newItem.className = 'item-row';
    newItem.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Description</label>
                <input type="text" class="form-control item-description" placeholder="Service description">
            </div>
            <div class="form-group">
                <label class="form-label">Quantity</label>
                <input type="number" class="form-control item-quantity" value="1" min="1">
            </div>
            <div class="form-group">
                <label class="form-label">Rate ($)</label>
                <input type="number" class="form-control item-rate" placeholder="100" min="0" step="0.01">
            </div>
        </div>
        <button class="btn btn--outline btn--sm" onclick="this.parentElement.remove(); calculateInvoiceTotal();">Remove</button>
    `;
    itemsContainer.appendChild(newItem);
}

function calculateInvoiceTotal() {
    let subtotal = 0;
    
    document.querySelectorAll('.item-row').forEach(row => {
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        subtotal += quantity * rate;
    });
    
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    document.getElementById('invoice-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('invoice-tax').textContent = tax.toFixed(2);
    document.getElementById('invoice-total').textContent = total.toFixed(2);
}

function generateInvoice() {
    showLoading('Generating invoice...');
    
    setTimeout(() => {
        // Populate with sample data
        document.getElementById('invoice-from-name').value = currentUser?.displayName || 'John Doe Consulting';
        document.getElementById('invoice-from-email').value = currentUser?.email || 'john@consulting.com';
        document.getElementById('invoice-number').value = 'INV-' + Date.now().toString().slice(-6);
        
        // Add sample line item if none exist
        if (document.querySelectorAll('.item-row').length === 1) {
            const firstItem = document.querySelector('.item-row');
            firstItem.querySelector('.item-description').value = 'Web Development Services';
            firstItem.querySelector('.item-quantity').value = '40';
            firstItem.querySelector('.item-rate').value = '75';
            calculateInvoiceTotal();
        }
        
        hideLoading();
    }, 1500);
}

function downloadInvoice() {
    showLoading('Generating PDF invoice...');
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJcfsIE5V';
        link.download = 'invoice.pdf';
        link.click();
        
        hideLoading();
    }, 2000);
}

// Chat System
function setupChat() {
    let currentRoom = 'general';
    
    document.getElementById('send-message').addEventListener('click', sendMessage);
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    document.getElementById('create-room').addEventListener('click', createChatRoom);
    
    // Room selection
    document.addEventListener('click', (e) => {
        if (e.target.closest('.room-item')) {
            const roomId = e.target.closest('.room-item').dataset.room;
            switchChatRoom(roomId);
        }
    });
    
    // Simulate incoming messages
    setInterval(() => {
        if (currentModule === 'chat' && Math.random() < 0.1) {
            addIncomingMessage();
        }
    }, 10000);
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${currentUser?.displayName || 'You'}</span>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div class="message-text">${message}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    input.value = '';
    
    // Store message
    chatMessages.push({
        author: currentUser?.displayName || 'You',
        text: message,
        time: new Date(),
        room: currentRoom
    });
}

function addIncomingMessage() {
    const sampleMessages = [
        { author: 'Alice', text: 'Has anyone finished the project documentation?' },
        { author: 'Bob', text: 'Just pushed the latest changes to GitHub!' },
        { author: 'Carol', text: 'Great work on the presentation today!' },
        { author: 'David', text: 'Can we schedule a code review for tomorrow?' }
    ];
    
    const message = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    const messagesContainer = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-author">${message.author}</span>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div class="message-text">${message.text}</div>
        </div>
    `;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function switchChatRoom(roomId) {
    currentRoom = roomId;
    
    // Update active room
    document.querySelectorAll('.room-item').forEach(room => {
        room.classList.remove('active');
    });
    document.querySelector(`[data-room="${roomId}"]`).classList.add('active');
    
    // Update chat header
    const roomName = roomId.charAt(0).toUpperCase() + roomId.slice(1).replace('-', ' ');
    document.querySelector('.chat-header h3').textContent = '#' + roomName;
    
    // Clear messages (in real app, would load room messages)
    document.getElementById('chat-messages').innerHTML = '';
}

function createChatRoom() {
    const roomName = prompt('Enter room name:');
    if (!roomName) return;
    
    const roomList = document.getElementById('room-list');
    const roomId = roomName.toLowerCase().replace(/\s+/g, '-');
    const newRoom = document.createElement('div');
    newRoom.className = 'room-item';
    newRoom.dataset.room = roomId;
    newRoom.innerHTML = `
        <div class="room-icon">#</div>
        <div class="room-info">
            <div class="room-name">${roomName}</div>
            <div class="room-members">1 member</div>
        </div>
    `;
    
    roomList.appendChild(newRoom);
}

// AI Chat
function setupAIChat() {
    document.getElementById('send-ai-message').addEventListener('click', sendAIMessage);
    document.getElementById('ai-message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAIMessage();
        }
    });
}

function sendAIMessage() {
    const input = document.getElementById('ai-message-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('ai-chat-messages');
    
    // Add user message
    const userMessageEl = document.createElement('div');
    userMessageEl.className = 'user-message';
    userMessageEl.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <div class="message-text">${message}</div>
        </div>
    `;
    messagesContainer.appendChild(userMessageEl);
    
    input.value = '';
    
    // Show AI typing
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-message';
    typingEl.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-text">AI is typing...</div>
        </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Generate AI response
    setTimeout(() => {
        typingEl.remove();
        
        const aiResponse = generateAIResponse(message);
        const aiMessageEl = document.createElement('div');
        aiMessageEl.className = 'ai-message';
        aiMessageEl.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-text">${aiResponse}</div>
            </div>
        `;
        messagesContainer.appendChild(aiMessageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500 + Math.random() * 1000);
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Resume/Career related
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
        return "I'd be happy to help with your resume! Here are some key tips:<br>• Keep it concise (1-2 pages)<br>• Use action verbs and quantify achievements<br>• Tailor it to each job application<br>• Include relevant keywords from the job description<br><br>Would you like me to help you with any specific section?";
    }
    
    // Coding related
    if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('debug')) {
        return "I can definitely help with coding! Whether you need help with:<br>• Debugging errors<br>• Code optimization<br>• Best practices<br>• Algorithm explanations<br>• Code reviews<br><br>Feel free to share your code and I'll provide specific feedback!";
    }
    
    // Interview related
    if (lowerMessage.includes('interview')) {
        return "Great question about interviews! Here's how to prepare:<br>• Research the company and role thoroughly<br>• Practice common interview questions<br>• Prepare specific examples using the STAR method<br>• Think of thoughtful questions to ask them<br>• Practice your pitch with our Voice Assistant<br><br>Would you like me to suggest some practice questions?";
    }
    
    // General productivity
    if (lowerMessage.includes('productivity') || lowerMessage.includes('organize')) {
        return "Here are some productivity tips for students:<br>• Use the Pomodoro Technique (25min focused work, 5min break)<br>• Create a dedicated workspace<br>• Set specific, measurable goals<br>• Use our document and presentation tools to streamline work<br>• Practice time-blocking for different activities<br><br>What specific productivity challenge are you facing?";
    }
    
    // Default responses
    const defaultResponses = [
        "That's a great question! Can you provide more details so I can give you a more specific answer?",
        "I'm here to help with career development, coding, productivity, and academic success. What would you like assistance with?",
        "Interesting point! Based on what you're asking, I'd suggest exploring our different tools - they might have exactly what you need.",
        "Let me help you with that. Could you be more specific about what you're trying to accomplish?",
        "I understand what you're asking. Here's how I'd approach this problem..."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Code IDE
function setupCodeIDE() {
    document.getElementById('run-code').addEventListener('click', runCode);
    document.getElementById('check-errors').addEventListener('click', checkCodeErrors);
    document.getElementById('ai-fix-code').addEventListener('click', fixCodeWithAI);
    
    // Output tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchOutputTab(tabName);
        });
    });
    
    // Language selection
    document.getElementById('language-select').addEventListener('change', (e) => {
        const language = e.target.value;
        if (monacoEditor) {
            monaco.editor.setModelLanguage(monacoEditor.getModel(), language);
        }
    });
}

function initializeMonacoEditor() {
    if (monacoEditor) return; // Already initialized
    
    const container = document.getElementById('monaco-editor');
    if (!container) return;
    
    // Set paths for Monaco loader
    require.config({ 
        paths: { 
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' 
        },
        'vs/nls': {
            availableLanguages: {
                '*': 'en'
            }
        }
    });
    
    require(['vs/editor/editor.main'], function() {
        try {
            monacoEditor = monaco.editor.create(container, {
                value: `// Welcome to ORBIT AI Code IDE
// Start coding here!

function greetUser(name) {
    return "Hello, " + name + "! Welcome to ORBIT AI!";
}

console.log(greetUser("Developer"));

// Try running this code with the Run button!`,
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [80],
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection'
            });

            // Set editor height properly
            container.style.height = '100%';
            
            console.log('Monaco Editor initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Monaco Editor:', error);
            container.innerHTML = '<div style="padding: 20px; color: #666;">Monaco Editor failed to load. Please refresh the page.</div>';
        }
    });
}

function runCode() {
    if (!monacoEditor) {
        console.log('Monaco Editor not initialized');
        return;
    }
    
    const code = monacoEditor.getValue();
    const language = document.getElementById('language-select').value;
    const output = document.getElementById('console-output');
    
    output.innerHTML = '<div class="console-line">Running code...</div>';
    
    setTimeout(() => {
        try {
            if (language === 'javascript') {
                // Capture console.log output
                const originalLog = console.log;
                let consoleOutput = '';
                
                console.log = function(...args) {
                    consoleOutput += args.join(' ') + '\n';
                    originalLog.apply(console, arguments);
                };
                
                // Execute the code
                eval(code);
                
                // Restore console.log
                console.log = originalLog;
                
                if (consoleOutput) {
                    output.innerHTML = `<div class="console-line">${consoleOutput.replace(/\n/g, '</div><div class="console-line">')}</div>`;
                } else {
                    output.innerHTML = '<div class="console-line">Code executed successfully (no output)</div>';
                }
            } else {
                output.innerHTML = `<div class="console-line">Code execution for ${language} is simulated</div><div class="console-line">✓ Code ran successfully</div>`;
            }
        } catch (error) {
            output.innerHTML = `<div class="console-line" style="color: #e74c3c;">Error: ${error.message}</div>`;
        }
    }, 500);
    
    switchOutputTab('console');
}

function checkCodeErrors() {
    if (!monacoEditor) return;
    
    const code = monacoEditor.getValue();
    const language = document.getElementById('language-select').value;
    const output = document.getElementById('errors-output');
    
    output.innerHTML = '<div class="console-line">Checking for errors...</div>';
    
    setTimeout(() => {
        const errors = [];
        
        if (language === 'javascript') {
            // Simple JavaScript error detection
            if (!code.trim()) {
                errors.push('Warning: Empty file');
            }
            if (code.includes('var ')) {
                errors.push('Style: Consider using "let" or "const" instead of "var"');
            }
            if (code.includes('==') && !code.includes('===')) {
                errors.push('Style: Consider using "===" for strict equality');
            }
        }
        
        if (errors.length === 0) {
            output.innerHTML = '<div class="console-line" style="color: #27ae60;">✓ No errors found!</div>';
        } else {
            output.innerHTML = errors.map((error, index) => 
                `<div class="console-line" style="color: #f39c12;">Line ${index + 1}: ${error}</div>`
            ).join('');
        }
    }, 1000);
    
    switchOutputTab('errors');
}

function fixCodeWithAI() {
    if (!monacoEditor) return;
    
    const code = monacoEditor.getValue();
    const output = document.getElementById('ai-help-output');
    
    output.innerHTML = '<div class="console-line">AI is analyzing your code...</div>';
    
    setTimeout(() => {
        const suggestions = [
            "✨ AI Suggestions:",
            "• Add error handling with try-catch blocks",
            "• Consider using arrow functions for cleaner syntax",
            "• Add JSDoc comments for better documentation",
            "• Use template literals instead of string concatenation",
            "",
            "💡 Code Quality Tips:",
            "• Follow consistent indentation",
            "• Use meaningful variable names",
            "• Break large functions into smaller ones",
            "• Add input validation where needed"
        ];
        
        output.innerHTML = suggestions.map(suggestion => 
            `<div class="console-line">${suggestion}</div>`
        ).join('');
    }, 2000);
    
    switchOutputTab('ai-help');
}

function switchOutputTab(tabName) {
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Show corresponding panel
    document.querySelectorAll('.output-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`${tabName}-output`).classList.add('active');
}

// Voice Assistant
function setupVoiceAssistant() {
    document.getElementById('record-btn').addEventListener('click', toggleRecording);
    
    // Practice scenarios
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const scenario = e.currentTarget.dataset.scenario;
            startPracticeScenario(scenario);
        });
    });
}

function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            console.log('Speech recognition started');
        };
        
        recognition.onresult = function(event) {
            let finalTranscript = '';
            let interimTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            
            updateTranscript(finalTranscript, interimTranscript);
            if (finalTranscript) {
                analyzeSpeech(finalTranscript);
            }
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            if (isRecording) {
                stopRecording();
            }
        };
        
        recognition.onend = function() {
            if (isRecording) {
                recognition.start(); // Restart if still recording
            }
        };
    } else {
        console.warn('Speech recognition not supported');
    }
}

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    if (!recognition) {
        alert('Speech recognition is not supported in your browser. You can still use the interface to see how it works!');
        // Simulate recording for demo purposes
        simulateRecording();
        return;
    }
    
    isRecording = true;
    recognition.start();
    
    const recordBtn = document.getElementById('record-btn');
    const status = document.getElementById('recording-status');
    
    recordBtn.classList.add('recording');
    recordBtn.querySelector('.record-text').textContent = 'Stop Recording';
    status.textContent = 'Recording... Speak now';
    
    // Clear previous session
    document.getElementById('transcript-box').innerHTML = '<p class="placeholder-text">Listening...</p>';
    resetMetrics();
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
    }
    
    isRecording = false;
    
    const recordBtn = document.getElementById('record-btn');
    const status = document.getElementById('recording-status');
    
    recordBtn.classList.remove('recording');
    recordBtn.querySelector('.record-text').textContent = 'Start Recording';
    status.textContent = 'Recording stopped. Processing...';
    
    setTimeout(() => {
        status.textContent = 'Click to start recording';
        generateVoiceFeedback();
    }, 2000);
}

function simulateRecording() {
    isRecording = true;
    const recordBtn = document.getElementById('record-btn');
    const status = document.getElementById('recording-status');
    
    recordBtn.classList.add('recording');
    recordBtn.querySelector('.record-text').textContent = 'Stop Recording';
    status.textContent = 'Demo mode: Simulating speech recording...';
    
    // Simulate transcript appearing
    const sampleText = "Hello, this is a demonstration of the voice assistant feature. I'm practicing my presentation skills and working on reducing filler words like um and uh while maintaining a good speaking pace.";
    
    document.getElementById('transcript-box').innerHTML = sampleText;
    
    // Simulate analysis
    setTimeout(() => {
        analyzeSpeech(sampleText);
        stopRecording();
    }, 3000);
}

function updateTranscript(finalText, interimText) {
    const transcriptBox = document.getElementById('transcript-box');
    const displayText = finalText + (interimText ? `<span style="color: #999;">${interimText}</span>` : '');
    
    if (displayText.trim()) {
        transcriptBox.innerHTML = displayText;
    } else {
        transcriptBox.innerHTML = '<p class="placeholder-text">Listening...</p>';
    }
}

function analyzeSpeech(text) {
    if (!text.trim()) return;
    
    const words = text.trim().split(/\s+/);
    const fillerWords = ['um', 'uh', 'like', 'you know', 'actually', 'basically', 'literally'];
    
    // Count filler words
    let fillerCount = 0;
    words.forEach(word => {
        if (fillerWords.includes(word.toLowerCase().replace(/[.,!?]/g, ''))) {
            fillerCount++;
        }
    });
    
    // Calculate WPM (rough estimate)
    const wpm = Math.round(words.length * 2); // Assuming 30-second chunks
    
    // Count pauses (rough estimation based on punctuation)
    const pauseCount = (text.match(/[.,!?]/g) || []).length;
    
    // Calculate clarity (inverse of filler word ratio)
    const clarity = Math.max(0, Math.round((1 - fillerCount / words.length) * 100));
    
    // Update metrics
    document.getElementById('wpm-metric').textContent = wpm;
    document.getElementById('filler-metric').textContent = fillerCount;
    document.getElementById('pause-metric').textContent = pauseCount;
    document.getElementById('clarity-metric').textContent = clarity + '%';
}

function resetMetrics() {
    document.getElementById('wpm-metric').textContent = '0';
    document.getElementById('filler-metric').textContent = '0';
    document.getElementById('pause-metric').textContent = '0';
    document.getElementById('clarity-metric').textContent = '0%';
}

function generateVoiceFeedback() {
    const feedbackBox = document.getElementById('feedback-box');
    const wpm = parseInt(document.getElementById('wpm-metric').textContent);
    const fillerCount = parseInt(document.getElementById('filler-metric').textContent);
    const clarity = parseInt(document.getElementById('clarity-metric').textContent.replace('%', ''));
    
    let feedback = '<strong>🎤 Voice Analysis Complete!</strong><br><br>';
    
    // WPM feedback
    if (wpm < 100) {
        feedback += '📈 <strong>Speaking Pace:</strong> Consider speaking a bit faster to maintain engagement.<br>';
    } else if (wpm > 200) {
        feedback += '⏰ <strong>Speaking Pace:</strong> Try to slow down slightly for better comprehension.<br>';
    } else {
        feedback += '✅ <strong>Speaking Pace:</strong> Great pace! You\'re speaking at an ideal speed.<br>';
    }
    
    // Filler words feedback
    if (fillerCount > 5) {
        feedback += '🎯 <strong>Filler Words:</strong> Try to reduce filler words. Practice pausing instead of saying "um" or "uh".<br>';
    } else if (fillerCount > 0) {
        feedback += '👍 <strong>Filler Words:</strong> Good control of filler words. Keep practicing!<br>';
    } else {
        feedback += '🌟 <strong>Filler Words:</strong> Excellent! No filler words detected.<br>';
    }
    
    // Clarity feedback
    if (clarity < 70) {
        feedback += '💡 <strong>Clarity:</strong> Focus on articulating clearly and organizing your thoughts before speaking.<br>';
    } else if (clarity >= 90) {
        feedback += '🎉 <strong>Clarity:</strong> Outstanding clarity! Your message comes across very clearly.<br>';
    } else {
        feedback += '✨ <strong>Clarity:</strong> Good clarity! Keep working on reducing filler words.<br>';
    }
    
    feedback += '<br><strong>💪 Keep practicing to improve your communication skills!</strong>';
    
    feedbackBox.innerHTML = feedback;
}

function startPracticeScenario(scenario) {
    const prompts = {
        interview: "Let's practice a job interview! I'll ask you some common questions. Start by telling me about yourself.",
        presentation: "Time for presentation practice! Imagine you're presenting your project to stakeholders. Begin with an introduction.",
        pitch: "Let's practice your startup pitch! You have 2 minutes to convince investors. Start with your problem statement."
    };
    
    const feedbackBox = document.getElementById('feedback-box');
    feedbackBox.innerHTML = `
        <strong>🎭 Practice Scenario: ${scenario.charAt(0).toUpperCase() + scenario.slice(1)}</strong><br><br>
        ${prompts[scenario]}<br><br>
        <em>Click "Start Recording" when you're ready to begin!</em>
    `;
}

// Utility Functions
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const text = overlay.querySelector('p');
    text.textContent = message;
    overlay.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}