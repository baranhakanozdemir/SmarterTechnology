import { useState } from "react";
import {
  BULKY_DIMENSION_THRESHOLD,
  BULKY_VOLUME_THRESHOLD,
  HEAVY_MASS_THRESHOLD,
  classifyPackage
} from "./lib/sort";

const initialForm = {
  width: "100",
  height: "80",
  length: "60",
  mass: "10"
};

function parseMeasurement(value) {
  if (value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatVolume(volume) {
  return new Intl.NumberFormat("en-US").format(volume);
}

function App() {
  const [form, setForm] = useState(initialForm);

  const parsedDimensions = {
    width: parseMeasurement(form.width),
    height: parseMeasurement(form.height),
    length: parseMeasurement(form.length),
    mass: parseMeasurement(form.mass)
  };

  const isReady = Object.values(parsedDimensions).every(
    (value) => value !== null && !Number.isNaN(value)
  );

  let result = null;
  let validationMessage = "";

  if (isReady) {
    try {
      result = classifyPackage(
        parsedDimensions.width,
        parsedDimensions.height,
        parsedDimensions.length,
        parsedDimensions.mass
      );
    } catch (error) {
      validationMessage =
        error instanceof Error ? error.message : "Invalid package data.";
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const fields = [
    { name: "width", label: "Width", suffix: "cm" },
    { name: "height", label: "Height", suffix: "cm" },
    { name: "length", label: "Length", suffix: "cm" },
    { name: "mass", label: "Mass", suffix: "kg" }
  ];

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">Core Engineering Technical Screen by Hakan Ozdemir</p>
        <h2>Package sorting logic, implemented in React.</h2>
        <p className="hero-copy">
          This interface evaluates package dimensions and mass, then routes
          each package to <strong>STANDARD</strong>, <strong>SPECIAL</strong>,
          or <strong>REJECTED</strong> based on the challenge rules.
        </p>

        <div className="rules-grid" aria-label="Sorting rules">
          <article className="rule-card">
            <h2>Bulky</h2>
            <p>
              Volume is at least {formatVolume(BULKY_VOLUME_THRESHOLD)} cm
              <sup>3</sup> or any dimension is at least{" "}
              {BULKY_DIMENSION_THRESHOLD} cm.
            </p>
          </article>
          <article className="rule-card">
            <h2>Heavy</h2>
            <p>Mass is at least {HEAVY_MASS_THRESHOLD} kg.</p>
          </article>
          <article className="rule-card">
            <h2>Dispatch</h2>
            <p>
              STANDARD for normal packages, SPECIAL for one flagged condition,
              REJECTED for both.
            </p>
          </article>
        </div>
      </section>

      <section className="workspace-panel">
        <div className="input-panel">
          <h2>Robot arm input</h2>
          <p className="panel-copy">
            Enter package measurements to simulate the dispatch decision.
          </p>

          <form className="package-form">
            {fields.map((field) => (
              <label className="field" htmlFor={field.name} key={field.name}>
                <span>
                  {field.label} ({field.suffix})
                </span>
                <input
                  id={field.name}
                  min="0"
                  name={field.name}
                  onChange={handleChange}
                  step="0.1"
                  type="number"
                  value={form[field.name]}
                />
              </label>
            ))}
          </form>
        </div>

        <div className="result-panel" aria-live="polite">
          <h2>Dispatch verdict</h2>

          {validationMessage ? (
            <p className="status-message error-message">{validationMessage}</p>
          ) : result ? (
            <>
              <p
                className={`stack-pill stack-${result.stack.toLowerCase()}`}
                data-testid="stack-result"
              >
                {result.stack}
              </p>
              <p className="panel-copy">
                Volume: {formatVolume(result.volume)} cm<sup>3</sup>
              </p>
              <div className="signal-row">
                <span className={result.bulky ? "signal on" : "signal"}>
                  Bulky: {result.bulky ? "Yes" : "No"}
                </span>
                <span className={result.heavy ? "signal on" : "signal"}>
                  Heavy: {result.heavy ? "Yes" : "No"}
                </span>
              </div>
              <p className="verdict-copy">{result.reason}</p>
            </>
          ) : (
            <p className="status-message">
              Provide all four measurements to classify the package.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
