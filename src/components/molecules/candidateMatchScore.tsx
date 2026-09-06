import React from "react";
import {
  MatchScoreBreakdown,
  MatchScoreComponent,
} from "../../interfaces/appInterface";

interface CandidateMatchScoreProps {
  score: number | null;
  status: string;
  breakdown: MatchScoreBreakdown | null;
  scoredAt: string | null;
  version: string | null;
}

const componentLabel = (name: string) =>
  name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const scoreColor = (score: number) => {
  if (score >= 75) return "success";
  if (score >= 50) return "warning";
  return "danger";
};

const SkillBadges = ({ component }: { component: MatchScoreComponent }) => {
  const matched = component.matched || component.matched_terms || [];
  const missing = component.missing || component.missing_terms || [];

  if (matched.length === 0 && missing.length === 0) return null;

  return (
    <div className="mt-2 d-flex flex-wrap gap-1">
      {matched.map((term) => (
        <span key={`matched-${term}`} className="badge bg-success">
          {term}
        </span>
      ))}
      {missing.map((term) => (
        <span key={`missing-${term}`} className="badge bg-danger">
          Missing: {term}
        </span>
      ))}
    </div>
  );
};

const CandidateMatchScore = ({
  score,
  status,
  breakdown,
  scoredAt,
  version,
}: CandidateMatchScoreProps) => {
  const components = Object.entries(breakdown?.components || {});

  return (
    <section className="card bg-light border-0 mt-4" aria-labelledby="candidate-match-heading">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h4 id="candidate-match-heading" className="mb-0">
            Candidate Match Score
          </h4>
          <span className="badge bg-secondary text-capitalize">{status}</span>
        </div>

        {(status === "pending" || status === "processing") && (
          <div className="alert alert-info mt-3 mb-0" role="status">
            {status === "pending"
              ? "This résumé is waiting to be scored."
              : "The résumé is currently being processed."}
          </div>
        )}

        {status === "failed" && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            The match score could not be calculated. The processing job can be retried.
          </div>
        )}

        {status === "completed" && score != null && (
          <>
            <div className="mt-3">
              <div className="d-flex align-items-baseline gap-2">
                <span className={`display-5 fw-bold text-${scoreColor(score)}`}>
                  {score.toFixed(2)}
                </span>
                <span className="text-muted">out of 100</span>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Candidate match score"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`progress-bar bg-${scoreColor(score)}`}
                  style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                />
              </div>
            </div>

            {components.length > 0 && (
              <div className="list-group list-group-flush mt-3">
                {components.map(([name, component]) => (
                  <div key={name} className="list-group-item bg-transparent px-0">
                    <div className="d-flex justify-content-between gap-3">
                      <strong>{componentLabel(name)}</strong>
                      <span>
                        {component.points.toFixed(2)} / {component.maximum} points
                      </span>
                    </div>
                    <div className="small text-muted">
                      {(component.ratio * 100).toFixed(0)}% match
                      {component.reason ? ` · ${component.reason}` : ""}
                    </div>
                    <SkillBadges component={component} />
                  </div>
                ))}
              </div>
            )}

            {breakdown?.excluded_components && breakdown.excluded_components.length > 0 && (
              <p className="small text-muted mt-3 mb-0">
                Not scored: {breakdown.excluded_components.map(componentLabel).join(", ")}.
              </p>
            )}

            <p className="small text-muted mt-2 mb-0">
              Algorithm {version || breakdown?.version || "v1"}
              {scoredAt ? ` · Scored ${new Date(scoredAt).toLocaleString()}` : ""}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default CandidateMatchScore;
