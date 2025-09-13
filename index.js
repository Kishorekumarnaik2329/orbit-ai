const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({origin: true});

// Initialize Firebase Admin
admin.initializeApp();

const HF_API_KEY = functions.config().huggingface?.api_key || process.env.HF_API_KEY;
const HF_BASE_URL = 'https://api-inference.huggingface.co/models';

// Hugging Face API helper
async function callHuggingFace(model, payload, retries = 3) {
  try {
    const response = await axios.post(`${HF_BASE_URL}/${model}`, payload, {
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response?.status === 503) {
      // Model loading, retry after delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return callHuggingFace(model, payload, retries - 1);
    }
    throw error;
  }
}

// AI Resume Generation
exports.generateResume = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {jobDescription, personalInfo, template} = req.body;

      const prompt = `Generate a professional resume for the following job description:

Job: ${jobDescription}

Personal Information:
Name: ${personalInfo.name}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: ${personalInfo.location}

Please generate appropriate sections including:
- Professional Summary
- Work Experience (if applicable)  
- Education
- Skills
- Projects (if applicable)

Format as structured JSON with sections.`;

      const result = await callHuggingFace('microsoft/DialoGPT-large', {
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      });

      // Fallback content if HF fails
      const fallbackContent = {
        summary: `Motivated student with strong analytical and communication skills. Passionate about ${jobDescription.split(' ').slice(0, 3).join(' ')} and eager to contribute to team success.`,
        experience: [],
        education: [{
          degree: "Bachelor's Degree",
          school: "University",
          year: "Expected 2025"
        }],
        skills: ["Problem Solving", "Communication", "Teamwork", "Leadership", "Technical Skills"],
        projects: [{
          name: "Academic Project",
          description: "Completed coursework and projects demonstrating relevant skills."
        }]
      };

      const resumeData = result?.generated_text ? 
        parseResumeFromAI(result.generated_text) : fallbackContent;

      // Save to Firestore
      const resumeDoc = {
        userId: req.body.userId,
        content: resumeData,
        template: template,
        jobDescription: jobDescription,
        personalInfo: personalInfo,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await admin.firestore().collection('resumes').add(resumeDoc);

      res.json({
        success: true,
        resumeId: docRef.id,
        content: resumeData
      });

    } catch (error) {
      console.error('Error generating resume:', error);
      res.status(500).json({error: 'Failed to generate resume'});
    }
  });
});

// AI Document Generation
exports.generateDocument = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {topic, documentType, outline, userId} = req.body;

      const prompt = `Write a ${documentType} about ${topic}.

Outline: ${outline}

Please write a well-structured document with proper headings and content.`;

      const result = await callHuggingFace('microsoft/DialoGPT-large', {
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7
        }
      });

      const content = result?.generated_text || `# ${topic}

## Introduction
This document provides an overview of ${topic} and its key aspects.

## Main Content
[Generated content would appear here based on your outline]

## Conclusion
In summary, this ${documentType} covers the essential elements of ${topic}.`;

      // Save to Firestore
      const docData = {
        userId: userId,
        title: topic,
        type: documentType,
        content: content,
        outline: outline,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await admin.firestore().collection('documents').add(docData);

      res.json({
        success: true,
        documentId: docRef.id,
        content: content
      });

    } catch (error) {
      console.error('Error generating document:', error);
      res.status(500).json({error: 'Failed to generate document'});
    }
  });
});

// AI Presentation Generation
exports.generatePresentation = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {topic, slideCount, audience, userId} = req.body;

      const prompt = `Create a presentation outline for "${topic}" with ${slideCount} slides for ${audience} audience.

Format as JSON with slide titles and content points.`;

      const result = await callHuggingFace('microsoft/DialoGPT-large', {
        inputs: prompt,
        parameters: {
          max_new_tokens: 600,
          temperature: 0.7
        }
      });

      // Fallback presentation structure
      const fallbackSlides = [
        {
          title: topic,
          content: ["Introduction to the topic", "Overview of key points"]
        },
        {
          title: "Main Points",
          content: ["Key concept 1", "Key concept 2", "Key concept 3"]
        },
        {
          title: "Conclusion",
          content: ["Summary of findings", "Next steps", "Questions?"]
        }
      ];

      const slides = result?.generated_text ? 
        parsePresentationFromAI(result.generated_text) : fallbackSlides;

      // Save to Firestore
      const presentationData = {
        userId: userId,
        title: topic,
        slides: slides,
        audience: audience,
        slideCount: slideCount,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await admin.firestore().collection('presentations').add(presentationData);

      res.json({
        success: true,
        presentationId: docRef.id,
        slides: slides
      });

    } catch (error) {
      console.error('Error generating presentation:', error);
      res.status(500).json({error: 'Failed to generate presentation'});
    }
  });
});

// AI Code Fix
exports.fixCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {code, language, error} = req.body;

      const prompt = `Fix this ${language} code that has an error:

Code:
${code}

Error: ${error}

Provide the corrected code and explain the fix.`;

      const result = await callHuggingFace('microsoft/DialoGPT-large', {
        inputs: prompt,
        parameters: {
          max_new_tokens: 400,
          temperature: 0.3
        }
      });

      const response = {
        originalCode: code,
        fixedCode: result?.generated_text || code,
        explanation: result?.generated_text ? 
          "AI suggested fix based on the error." : 
          "Unable to process fix at this time. Please check syntax and try again.",
        suggestions: [
          "Check for syntax errors",
          "Verify variable declarations", 
          "Ensure proper indentation"
        ]
      };

      res.json({
        success: true,
        ...response
      });

    } catch (error) {
      console.error('Error fixing code:', error);
      res.status(500).json({error: 'Failed to fix code'});
    }
  });
});

// AI Chat Response
exports.chatWithAI = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {message, context} = req.body;

      const prompt = `You are an AI assistant helping students with productivity and learning. 

Context: ${context || 'General assistance'}
User: ${message}

Provide a helpful response.`;

      const result = await callHuggingFace('microsoft/DialoGPT-large', {
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.8
        }
      });

      const response = result?.generated_text || 
        "I'm here to help! Could you please provide more details about what you need assistance with?";

      res.json({
        success: true,
        response: response,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in AI chat:', error);
      res.status(500).json({error: 'Failed to get AI response'});
    }
  });
});

// Voice Analysis
exports.analyzeVoice = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
      }

      const {transcript, duration, userId} = req.body;

      // Analyze speech patterns
      const analysis = analyzeTranscript(transcript, duration);

      // Save to Firestore
      const sessionData = {
        userId: userId,
        transcript: transcript,
        duration: duration,
        analysis: analysis,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await admin.firestore().collection('voiceSessions').add(sessionData);

      res.json({
        success: true,
        sessionId: docRef.id,
        analysis: analysis
      });

    } catch (error) {
      console.error('Error analyzing voice:', error);
      res.status(500).json({error: 'Failed to analyze voice'});
    }
  });
});

// Helper Functions
function parseResumeFromAI(text) {
  // Simple parsing logic - in production, use more sophisticated NLP
  return {
    summary: text.substring(0, 200) + "...",
    experience: [],
    education: [{
      degree: "Bachelor's Degree",
      school: "University",
      year: "Expected 2025"
    }],
    skills: ["Communication", "Problem Solving", "Teamwork", "Leadership"],
    projects: []
  };
}

function parsePresentationFromAI(text) {
  // Simple parsing logic
  return [
    {title: "Introduction", content: ["Overview", "Key objectives"]},
    {title: "Main Content", content: ["Point 1", "Point 2", "Point 3"]},
    {title: "Conclusion", content: ["Summary", "Next steps"]}
  ];
}

function analyzeTranscript(transcript, duration) {
  const words = transcript.split(' ');
  const wpm = Math.round((words.length / duration) * 60);

  // Count filler words
  const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'actually'];
  const fillerCount = words.filter(word => 
    fillerWords.includes(word.toLowerCase())).length;

  // Calculate pause detection (simplified)
  const sentences = transcript.split(/[.!?]+/).length;
  const avgWordsPerSentence = words.length / sentences;

  return {
    wpm: wpm,
    fillerWords: fillerCount,
    fillerPercentage: Math.round((fillerCount / words.length) * 100),
    totalWords: words.length,
    avgWordsPerSentence: Math.round(avgWordsPerSentence),
    duration: duration,
    feedback: generateFeedback(wpm, fillerCount, words.length)
  };
}

function generateFeedback(wpm, fillerCount, totalWords) {
  let feedback = [];

  if (wpm < 100) {
    feedback.push("Try speaking a bit faster - aim for 120-150 WPM");
  } else if (wpm > 180) {
    feedback.push("Slow down slightly for better clarity");
  } else {
    feedback.push("Good speaking pace!");
  }

  const fillerPercentage = (fillerCount / totalWords) * 100;
  if (fillerPercentage > 5) {
    feedback.push("Try to reduce filler words - practice pausing instead");
  } else {
    feedback.push("Great job minimizing filler words!");
  }

  return feedback;
}