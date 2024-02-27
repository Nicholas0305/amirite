import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faNewspaper,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer id="footer">
      <div id="send-email-container">
        <a href="mailto:your-email@example.com?subject=Hello%20from%20your%20website&body=Hi%20there,">
          Shoot me an email <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
      <div id="footer-list-container">
        <div id="contact-container">
          <h1>Contact Me</h1>
          <ul>
            <li>
              <a href="sms:+1234567890&body=Hello%20there!">
                281-794-8636 <FontAwesomeIcon icon={faPhone} />
              </a>
            </li>
            <li>
              <a href="mailto:najernigin@gmail.com">
                Personal: najernigin@gmail.com{" "}
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
            <li>
              <a href="mailto:jerniginbusiness@gmail.com">
                Business: jerniginbusiness@gmail.com{" "}
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </li>
          </ul>
        </div>
        <div id="socials-container">
          <h1>Socials</h1>
          <ul>
            <li>
              <a className="animated-a" href="https://github.com/Nicholas0305">
                Github <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                className="animated-a"
                href="https://www.linkedin.com/in/nicholas-jernigin-0a46362a2"
              >
                Linkedin <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
        <div id="community-container">
          <h1>Community</h1>
          <ul>
            <li>
              <a className="animated-a" href="https://medium.com/@najernigin">
                Medium <FontAwesomeIcon icon={faNewspaper} />
              </a>
            </li>
            <li>
              <a
                className="animated-a"
                href="https://stackoverflow.com/users/22218567/snackpack"
              >
                Stack overflow <FontAwesomeIcon icon={faComments} />
              </a>
            </li>
            <li>
              <a
                className="animated-a"
                href="https://leetcode.com/Nicholas_05/"
              >
                Leetcode <FontAwesomeIcon icon={faComments} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
