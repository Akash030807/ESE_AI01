import "./RecommendationCard.css";

function RecommendationCard({ aiResult }) {

  return (
    <div className="recommendation-card">

      <h2>
        AI Employee Analytics
      </h2>

      <div className="recommendation-content">

        <pre>
          {aiResult}
        </pre>

      </div>

    </div>
  );
}

export default RecommendationCard;