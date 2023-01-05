import { useEditing, useTimer } from "../hooks/timer";

export function Timer() {
  const {
    timeElapsedMs,
    timeMissingMs,
    timeOverdueMs,
    timeMs,
    timeParts,
    timeElapsedParts,
    timeOverdueParts,
    timeMissingParts,
    running,
    setTimer,
    startTimer,
    resetTimer,
    pauseTimer,
  } = useTimer();

  const { editing, toggleEditing } = useEditing();

  if (editing) {
    return (
      <div>
        <input
          value={timeParts.minutes}
          onChange={(e) => setTimer({ minutes: e.target.value })}
        />
        <input
          value={timeParts.seconds}
          onChange={(e) => setTimer({ seconds: e.target.value })}
        />
        <button onClick={toggleEditing}>Concluir</button>
      </div>
    );
  }

  return (
    <div
      className="temporizador"
      onClick={running ? pauseTimer : startTimer}
      onDoubleClick={resetTimer}
    >
      <div className="topdiv">
        <div></div>
        <div></div>
      </div>
      <div className="bottomdiv">
        <div></div>
        <div></div>
      </div>
      {/* Tempo Decorrido: {JSON.stringify(timeElapsedParts)}(ms:{" "}
        {String(timeElapsedMs)})<br />
        Tempo Definido: {JSON.stringify(timeParts)}(ms: {String(timeMs)})<br />
        Tempo Excedente: {JSON.stringify(timeOverdueParts)}(ms:{" "}
        {String(timeOverdueMs)})<br />
        Tempo Restante: {JSON.stringify(timeMissingParts)}(ms:{" "}
        {String(timeMissingMs)})<br /> */}
      {/* {JSON.stringify(timeMissingParts)} */}
      <h1>
        {timeMissingParts.minutes.toString().padStart(2, "0")}:
        {timeMissingParts.seconds.toString().padStart(2, "0")}
      </h1>
      {timeMissingMs === 0n && (
        <p>
          +{timeOverdueParts.minutes.toString().padStart(2, "0")}:
          {timeOverdueParts.seconds.toString().padStart(2, "0")}
        </p>
      )}
      <Logo percentage={Number(timeElapsedMs) / Number(timeMs)} />
    </div>
  );
}

function Logo({ percentage }) {
  return (
    <div className="logo">
      {/* inf. dir */}
      <svg viewBox="0 0 398.96 400.9">
        <polyline
          points="352.5 0 352.5 352.5 0 352.5"
          fill="none"
          stroke="#fdb900"
          strokeLinejoin="round"
          strokeWidth="100"
          strokeDasharray="705"
          strokeDashoffset={
            percentage < 0.25
              ? 0
              : percentage > 0.5
              ? -705
              : (percentage - 0.25) * 4 * -705
          }
        />
      </svg>

      {/* inf. esq. */}
      <svg viewBox="0 0 403.09 400.9">
        <polyline
          points="403.1 351.25 50.59 351.25 50.59 -1.25"
          fill="none"
          stroke="#00A1F1"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="100"
          strokeDasharray="705"
          strokeDashoffset={
            percentage < 0.5
              ? 0
              : percentage > 0.75
              ? -705
              : (percentage - 0.5) * 4 * -705
          }
        />
      </svg>

      {/* sup. esq */}
      <svg viewBox="0 0 398.96 400.9">
        <polyline
          points="46.46 400.9 46.46 48.4 398.96 48.4"
          fill="none"
          stroke="#F65314"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="100"
          strokeDasharray="705"
          strokeDashoffset={
            percentage < 0.75
              ? 0
              : percentage > 1
              ? -705
              : (percentage - 0.75) * 4 * -705
          }
        />
      </svg>

      {/* sup dir */}
      <svg viewBox="0 0 398.96 400.9">
        <polyline
          points="0 46.65 352.5 46.65 352.5 399.15"
          fill="none"
          stroke="#7cbb00"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="100"
          strokeDasharray="705"
          strokeDashoffset={
            percentage < 0
              ? 0
              : percentage > 0.25
              ? -705
              : percentage * 4 * -705
          }
        />
      </svg>
    </div>
  );
}
