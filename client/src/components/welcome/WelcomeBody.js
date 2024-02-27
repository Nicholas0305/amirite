import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function WelcomeBody() {
  return (
    <div className="welcome-body-container">
      <section className="welcome-section">
        <h1 className="welcome-header">Amirite?</h1>
        <p className="welcome-paragraph">
          Welcome to Amirite, an online debate platform for people with opposing
          viewpoints. Start a public chat room, have a 1v1 debate, or just
          admire the beauty of this website. Amirite welcomes all discourse,
          whether it be social, political, economic, or even simple topics.
        </p>
      </section>
      <section className="welcome-section">
        <h1 className="welcome-header">
          Discuss Issues Important to You <FontAwesomeIcon icon={faRocket} />
        </h1>
        <p className="welcome-paragraph">
          Amirite allows you to put topics out there that are significant to
          you. It could be an argument about Cats vs Dogs. Or a critical modern
          debate on current Foreign Policy around the world. Amirite is
          committed to accepting every view, no matter what side.
        </p>
      </section>
      <section className="welcome-section">
        <h1 className="welcome-header">
          We're Committed to Good Sportsmanship{" "}
          <FontAwesomeIcon icon={faHandshake} />
        </h1>
        <p className="welcome-paragraph">
          While Amirite does encourage discourse of all kinds, we encourage
          respectful behavior from all participants. Have good and tasteful
          debates, but remember to show common respect towards others.
        </p>
      </section>
      <section className="welcome-section">
        <h1 className="welcome-header">
          Developed by One Person <FontAwesomeIcon icon={faUser} />{" "}
        </h1>
        <p className="welcome-paragraph">
          Amirite was devloped soley by me! I'm an asspiring software engineer,
          and this is my first full stack project! You can see my links down
          below, and follow my journey on my quest to land a full time job.
        </p>
      </section>
    </div>
  );
}

export default WelcomeBody;
