import React from "react";
// import "./Footer.css"; // Assuming you have a CSS file for the footer styles

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>our locations</h3>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> India{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> USA{" "}
          </a>
        </div>

        <div className="box">
          <h3>quick links</h3>
          <a href="/">
            <i className="fas fa-arrow-right"></i> Home{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Featured{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Category{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Reviews{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Feedback{" "}
          </a>
        </div>

        <div className="box">
          <h3>extra links</h3>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Account Info{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Ordered Items{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Privacy Policy{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Payment Method{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> Our Services{" "}
          </a>
        </div>

        <div className="box">
          <h3>contact info</h3>
          <a href="#">
            <i className="fas fa-phone"></i> 9167X XXXXX{" "}
          </a>
          <a href="#">
            <i className="fas fa-phone"></i> 77388 XXXXX{" "}
          </a>
          <a href="mailto: prvnkmrg.47@gmail.com">
            <i className="fas fa-envelope"></i> prvnkmrg.47@gmail.com{" "}
          </a>
          <a href="mailto:pavankumarha72@gmail.com">
            <i className="fas fa-envelope"></i> pavankumarha72@gmail.com{" "}
          </a>
          
        </div>
      </div>

      {/* <div className="share">
        <a href="#" className="fab fa-facebook-f"></a>
        <a
          href="https://twitter.com/priyankakorde"
          className="fab fa-twitter"
        ></a>
        <a href="X" className="fab fa-instagram"></a>
        <a
          href="https://www.linkedin.com/in/priyanka-korde-2029521a1/"
          className="fab fa-linkedin"
        ></a>
        <a
          href="https://www.linkedin.com/in/rohit-m-3494521a2/"
          className="fab fa-linkedin"
        ></a>
      </div> */}

      <div className="credit">
        {" "}
        created by <span>Praveen & Pavan </span> copyright &copy;2024 all rights
        reserved!{" "}
      </div>
    </section>
  );
};

export default Footer;
