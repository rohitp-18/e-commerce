import "./footer.css";

const footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <div className="commerce">
            <div
              className="hover"
              style={{ fontWeight: "bold", fontSize: "23px" }}
            >
              ECOMMERCE
            </div>
            <div style={{ fontWeight: "200", fontSize: "17px" }}>
              <div>High Quality is our first priority</div>
              <div>Copyrights 2024 &copy The Boss</div>
            </div>
          </div>
        </div>

        <div className="download">
          <div className="">
            <div className="hover">Download our app</div>
            <div className="">
              Download for the Android amd IOS mobile phone
            </div>
          </div>
        </div>

        <div className="social">
          <div className="follow">Follow Us</div>
          <div className="social-link">
            <div className="link hover">Instrgram</div>
            <div className="link hover">Youtube</div>
            <div className="link hover">Facebook</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
