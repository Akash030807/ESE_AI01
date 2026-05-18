const axios = require("axios");

const Employee = require("../models/Employee");


const getAIRecommendation = async (req, res) => {

  try {

    const employees = await Employee.find();

    if (employees.length === 0) {
      return res.status(404).json({
        message: "No employees found",
      });
    }


    // FORMAT EMPLOYEE DATA
    const employeeData = employees.map((emp, index) => {
      return `
Employee ${index + 1}

Name: ${emp.name}
Department: ${emp.department}
Skills: ${emp.skills.join(", ")}
Performance Score: ${emp.performanceScore}
Experience: ${emp.experience} years
`;
    }).join("\n");


    // AI PROMPT
    const prompt = `
You are an HR AI Assistant.

Analyze these employees and provide:

1. Promotion recommendations
2. Training suggestions
3. Performance feedback
4. Ranking from best to worst

Employees Data:

${employeeData}

Give the response in clean professional format.
`;


    // OPENROUTER API CALL
    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );


    // AI RESPONSE
    const aiResult = response.data.choices[0].message.content;

    res.status(200).json({
      success: true,
      aiResult,
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "AI recommendation failed",
      error: error.message,
    });
  }
};

module.exports = {
  getAIRecommendation,
};