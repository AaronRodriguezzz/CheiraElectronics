import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;


export const chat_bot = async (req, res) => {
  try {
    const { prompt } = req.body;

    const systemInstruction = fs.readFileSync(
      path.join(process.cwd(), 'backend/textfile/instruction.txt'),
      'utf8'
    );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction
    });

    const result = await model.generateContentStream(prompt);
    let fullResponse = '';
    for await (const chunk of result.stream) {
      fullResponse += chunk.text();
    }

    fullResponse = fullResponse
    .replace(/```html/gi, "")
    .replace(/```/g, "");

    return res.status(200).json({ message: fullResponse });
  } catch (err) {
    console.error('ChatBot Error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
