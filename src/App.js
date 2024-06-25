import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, List, ListItem, ListItemText, CircularProgress, Grid } from '@mui/material';
import './App.css';

function App() {
    const [question, setQuestion] = useState("");
    const [conversation, setConversation] = useState([
        { role: "assistant", content: "Hi, I'm your health buddy, HealthBuddy! What do you want to ask me today? Here are some areas I can help with:" }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");

    const topics = [
        { name: "Wellness and prevention", description: "Wellness involves making decisions that promote a healthier, more fulfilling life. Prevention in health focuses on proactive measures to maintain health and prevent disease, including regular health screenings, vaccinations, and healthy lifestyle choices." },
        { name: "Everyday care", description: "Everyday care involves routine practices and habits that maintain health and well-being, such as personal hygiene, nutrition, physical activity, sleep, and mental health care." },
        { name: "Chronic conditions", description: "Chronic conditions are long-term health issues that require ongoing management and care, such as diabetes, heart disease, and arthritis. Effective management involves regular medical check-ups, medication, and lifestyle adjustments." },
        { name: "Mental health", description: "Mental health refers to emotional, psychological, and social well-being. Promoting mental health involves practices such as mindfulness, therapy, social connections, and healthy coping strategies." },
        { name: "LGBTQIA+ services", description: "LGBTQIA+ services provide specialized health care and support tailored to the unique needs of LGBTQIA+ individuals, including counseling, sexual health education, hormone therapy, and preventive screenings." },
        { name: "Urgent concerns", description: "Urgent concerns require immediate medical attention to address acute health issues. For urgent concerns, it is crucial to visit an emergency room or urgent care center." },
        { name: "Sexual health", description: "Sexual health encompasses issues related to sexual well-being, including safe sex practices, STI prevention, contraception, and sexual function." },
    ];

    useEffect(() => {
        const savedConversation = localStorage.getItem('conversation');
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('conversation', JSON.stringify(conversation));
    }, [conversation]);

    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const MODEL = "gpt-4"; // 确保使用正确的模型ID

    const askQuestion = async () => {
        setLoading(true);
        setError("");
        const newConversation = [...conversation, { role: "user", content: question }];
        setConversation(newConversation);

        const messages = newConversation.map(entry => ({
            role: entry.role === "user" ? "user" : "assistant",
            content: entry.content
        }));

        try {
            const res = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: MODEL,
                    messages: messages,
                    max_tokens: 150,
                    temperature: 0.7
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    }
                }
            );
            const assistantResponse = res.data.choices[0].message.content.trim();
            setConversation([...newConversation, { role: "assistant", content: assistantResponse }]);
        } catch (error) {
            console.error("Error asking question:", error.response ? error.response.data : error.message);
            setError("Failed to get a response. Please try again.");
        } finally {
            setLoading(false);
            setQuestion(""); // Clear input field after asking
        }
    };

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic.name);
        const responseMessage = `You have selected ${topic.name}. ${topic.description}`;
        setConversation([...conversation, { role: "assistant", content: responseMessage }]);
    };

    return (
        <div className="App app-wrap-container">
            <div className="app-top-parts">
                <Typography variant="h4" gutterBottom>
                    HealthGPT
                </Typography>
                <List className="showing-list-wrap">
                    {conversation.map((entry, index) => (
                        <ListItem key={index} className={entry.role === "user" ? "user-message" : "assistant-message"}>
                            <ListItemText primary={entry.content} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="app-bottom-parts">
                {selectedTopic === "" && (
                    <Grid container spacing={2} className="topics-grid">
                        {topics.map((topic, index) => (
                            <Grid item xs={10} sm={5} key={index}>
                                <div
                                    className="topic-buttons"
                                    onClick={() => handleTopicSelect(topic)}
                                >
                                    {topic.name}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Box display="flex" alignItems="center" mt={2} className="input-box">
                    <TextField
                        className="input-box-body"
                        label="Ask a question..."
                        variant="outlined"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={loading}
                    />
                    <div
                        className="input-submit-button"
                        onClick={askQuestion}
                        style={{ marginLeft: '16px' }}
                    >
                        {loading ? <CircularProgress size={24} /> : "Ask"}
                    </div>
                </Box>
                {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
            </div>
        </div>
    );
}

export default App;
