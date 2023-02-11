import "./developerPage.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

const DeveloperPage = ({ setClicked }) => {
  const onBlackClicked = () => {
    setClicked(false);
  };
  return (
    <div className="developer-container" onClick={onBlackClicked}>
      <div className="developer-box">
        <div className="developer1-info-container">
          <img
            class="developer1-picture"
            src={require("../../assets/developer1.PNG")}
            alt="Yoomin Kang's Memoji"
          />
          <div className="developer1-text-container">
            <h2 style={{ marginTop: "0px", marginBottom: "5px" }}>YM Kang</h2>
            <p style={{ marginTop: "0px", marginBottom: "0px" }}>
              고려대학교 건축학과 21
            </p>
          </div>
        </div>
        <div className="developer1-button-container">
          <button
            className="developer1-button-instagram"
            onClick={() => {
              window.open("https://www.instagram.com/u_mini.341/");
            }}
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="instagram-icon"
              size="2x"
            />
            <p>Instagram</p>
          </button>
          <button
            className="developer1-button-github"
            onClick={() => {
              window.open("https://github.com/mintway0341");
            }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="github-icon"
              size="2x"
            />
            <p>GitHub</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
