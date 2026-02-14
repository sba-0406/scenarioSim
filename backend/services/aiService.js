const Groq = require('groq-sdk');

// Advanced Prompt Templates
const SUMMARIZE_TEMPLATE = `
Analyze the following professional simulation transcript. 
Extract 3-5 concise, evidence-based bullet points of what the user DID.
Focus on actions, specific decisions, and tone.
Example: 'Used a collaborative tone when unblocking developers.'
Transcript:
`;

const IMPACT_ANALYZE_TEMPLATE = (role) => `
You are a Senior Executive evaluating a ${role}. Analyse the transcript.
Return ONLY a JSON object:
{
  "scores": [
    { "competency": "string", "score": number, "evidence": "string" }
  ],
  "overallFeedback": "string"
}
Transcript:
`;

const extractJSON = (text) => {
    try {
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        let candidate = jsonMatch ? jsonMatch[1] : text;
        candidate = candidate.replace(/\/\/.*$/gm, '');
        candidate = candidate.replace(/\/\*[\s\S]*?\*\//g, '');
        candidate = candidate.trim();

        try {
            return JSON.parse(candidate);
        } catch (parseErr) {
            const start = candidate.indexOf('{') !== -1 ? candidate.indexOf('{') : candidate.indexOf('[');
            const end = candidate.lastIndexOf('}') !== -1 ? candidate.lastIndexOf('}') : candidate.lastIndexOf(']');
            if (start !== -1 && end !== -1) {
                const sliced = candidate.substring(start, end + 1);
                return JSON.parse(sliced);
            }
            throw parseErr;
        }
    } catch (err) {
        console.error("[AI DEBUG] JSON Extraction Failed. Raw Text:", text);
        throw new Error("Invalid AI Response Format");
    }
};

class GroqAIService {
    constructor(apiKey) {
        this.groq = new Groq({ apiKey });
        this.models = [
            "llama-3.3-70b-versatile",
            "llama-3.1-70b-versatile",
            "llama3-70b-8192",
            "mixtral-8x7b-32768",
            "llama-3.1-8b-instant",
            "llama3-8b-8192",
            "gemma2-9b-it"
        ];
        this.currentModelIndex = 0;
        this.activeModel = "None";
    }

    async generateContent(prompt, isJson = false) {
        while (this.currentModelIndex < this.models.length) {
            const modelName = this.models[this.currentModelIndex];
            try {
                const response = await this.groq.chat.completions.create({
                    model: modelName,
                    messages: [{ role: "user", content: prompt }],
                    ...(isJson ? { response_format: { type: "json_object" } } : {})
                });
                this.activeModel = modelName;
                return response.choices[0].message.content;
            } catch (err) {
                if (err.status === 401) throw err;
                console.warn(`[AI SERVICE] Groq Model ${modelName} rate limited or failed. Trying next...`);
                this.currentModelIndex++;
            }
        }
        this.currentModelIndex = 0;
        throw new Error("All Groq models failed");
    }
}

class SmartMockAIService {
    async generateContent(prompt) {
        const lower = prompt.toLowerCase();
        if (lower.includes('scenario titles')) {
            return JSON.stringify({ suggestions: [{ title: "Navigating Conflict", confidence: 0.9 }, { title: "Strategic Shift", confidence: 0.9 }] });
        }
        if (lower.includes('scenario description')) {
            return JSON.stringify({ description: "A complex scenario involving stakeholders and tight deadlines.", confidence: 0.95 });
        }
        if (lower.includes('questions')) {
            return JSON.stringify({ questions: [{ text: "How do you handle the pressure?", confidence: 0.9 }] });
        }
        if (lower.includes('leadership approaches') || lower.includes('mcq options')) {
            return JSON.stringify([
                {
                    text: "I understand your perspective and want to collaborate on a solution.",
                    approach: "Relationship",
                    moodDelta: 10,
                    scores: { competency1: 85, competency2: 80, competency3: 75, competency4: 70, competency5: 80, competency6: 75 }
                },
                {
                    text: "Let's focus on the data and project milestones to resolve this efficiently.",
                    approach: "Results",
                    moodDelta: 5,
                    scores: { competency1: 70, competency2: 85, competency3: 80, competency4: 90, competency5: 75, competency6: 80 }
                },
                {
                    text: "We need to maintain professional standards and clear boundaries in this situation.",
                    approach: "Boundary",
                    moodDelta: 15,
                    scores: { competency1: 75, competency2: 70, competency3: 90, competency4: 80, competency5: 85, competency6: 90 }
                }
            ]);
        }
        return JSON.stringify({
            competency1: 75,
            competency2: 70,
            competency3: 80,
            competency4: 65,
            competency5: 70,
            competency6: 75,
            totalScore: 7,
            reasoning: "Mock evaluation.",
            confidence: 0.8,
            evidence: ["Maintained a constructive tone."],
            overallFeedback: "Solid foundation shown."
        });
    }

    async summarize(text) {
        return ["Communicated clearly with stakeholders.", "Identified root cause effectively.", "Balanced technical needs with business goals."];
    }

    async analyzeImpact(transcript, role) {
        return {
            scores: [
                { competency: "Decision Making", score: 8, evidence: "Promptly chose a path forward." },
                { competency: "Communication", score: 7, evidence: "Professional tone throughout." }
            ],
            overallFeedback: "Strong performance with clear leadership potential."
        };
    }

    async scoreTextResponse(userText, prompt, rubricCriteria) {
        return {
            totalScore: 7,
            confidence: 0.8,
            evidence: ["Demonstrated clarity in communication."],
            breakdown: []
        };
    }
}

class ResilientAIService {
    constructor() {
        this.groqPool = [];
        this.mock = new SmartMockAIService();
        this.extractJSON = extractJSON;
        this.activeSource = { provider: 'Initial Connection...', model: 'Checking...', status: 'Pending' };

        console.log(`[AI DEBUG] GROQ_API_KEY present: ${!!process.env.GROQ_API_KEY}`);

        // Load Groq
        const groqKeys = [process.env.GROQ_API_KEY].filter(k => k && !k.includes('placeholder'));
        groqKeys.forEach(k => this.groqPool.push(new GroqAIService(k)));
        console.log(`[AI INITIALIZE] Groq Keys Loaded: ${this.groqPool.length}`);

        this.resetRotation();
    }

    resetRotation() {
        this.currentGroqIndex = 0;
    }

    getSource() { return this.activeSource; }

    async callAI(fnName, ...args) {
        const prompt = args[0];
        const isJson = args[1] === true;

        this.resetRotation();

        // Try Groq
        while (this.currentGroqIndex < this.groqPool.length) {
            const service = this.groqPool[this.currentGroqIndex];
            try {
                const res = await service.generateContent(prompt, isJson);
                this.activeSource = { provider: 'Groq Cloud', model: service.activeModel, keyIndex: this.currentGroqIndex + 1, status: 'Active (Free)' };
                console.log(`[AI CONNECTED] ${this.activeSource.provider} (${this.activeSource.model})`);
                return res;
            } catch (e) {
                console.warn(`[AI ERROR] Groq Key ${this.currentGroqIndex + 1} Failed:`, e.message);
                this.currentGroqIndex++;
            }
        }

        // Fallback to Mock
        this.activeSource = { provider: 'Smart Mock', model: 'Rule-Based Local Engine', keyIndex: 0, status: 'Fallback' };
        console.log(`[AI CONNECTED] ${this.activeSource.provider}`);
        if (this.mock[fnName]) return await this.mock[fnName](...args);
        return await this.mock.generateContent(prompt);
    }

    async generateContent(prompt, isJson = false) { return this.callAI('generateContent', prompt, isJson); }

    async summarize(text) {
        try {
            const res = await this.generateContent(SUMMARIZE_TEMPLATE + text);
            if (this.activeSource.provider === 'Smart Mock') return this.mock.summarize(text);
            return res.split('\n').filter(l => l.trim().length > 0).map(s => s.replace(/^[- \d.]+/, '').trim());
        } catch (e) { return this.mock.summarize(text); }
    }

    async analyzeImpact(transcript, role) {
        try {
            const res = await this.generateContent(IMPACT_ANALYZE_TEMPLATE(role) + transcript, true);
            if (this.activeSource.provider === 'Smart Mock') return this.mock.analyzeImpact(transcript, role);
            const data = extractJSON(res);
            if (!data.scores) data.scores = [];
            return data;
        } catch (e) { return this.mock.analyzeImpact(transcript, role); }
    }

    async scoreTextResponse(userText, prompt, rubricCriteria) {
        const criteriaText = rubricCriteria.map(c => `- ${c.criterion} (${c.maxPoints} pts)`).join('\n');
        const p = `Score this response:\nPROMPT: ${prompt}\nRESPONSE: ${userText}\nRUBRIC:\n${criteriaText}\nReturn JSON with totalScore, confidence, evidence, breakdown.`;

        try {
            const res = await this.generateContent(p, true);
            if (this.activeSource.provider === 'Smart Mock') return this.mock.scoreTextResponse(userText, prompt, rubricCriteria);
            return extractJSON(res);
        } catch (e) { return this.mock.scoreTextResponse(userText, prompt, rubricCriteria); }
    }
}

const ai = new ResilientAIService();
module.exports = ai;
