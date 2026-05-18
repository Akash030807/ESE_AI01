import { useState } from "react";

import Navbar from "../components/Navbar";

import RecommendationCard from "../components/RecommendationCard";

import API from "../services/api";

import "./Recommendations.css";

function Recommendations() {

  const [aiResult, setAiResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const generateRecommendations =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.post(
            "/ai/recommend"
          );

        setAiResult(
          response.data.aiResult
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "AI Recommendation Failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (
    <div>

      <Navbar />

      <div className="recommendations-container">

        <h1>
          AI Employee Recommendations
        </h1>

        <p>
          Generate AI-powered employee
          analytics, rankings, promotion
          suggestions and training advice.
        </p>

        <button
          className="generate-btn"
          onClick={
            generateRecommendations
          }
        >

          {
            loading
            ? "Generating..."
            : "Generate AI Recommendation"
          }

        </button>


        {
          aiResult && (
            <RecommendationCard
              aiResult={aiResult}
            />
          )
        }

      </div>

    </div>
  );
}

export default Recommendations;