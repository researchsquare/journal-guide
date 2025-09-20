import React from 'react';
import './Footer.scss';

interface FooterProps {
  title: string;
}

interface LinkItem {
  name: string;
  link: string;
}

const LinkList = ({ title, links }: { title?: string; links: LinkItem[] }) => (
  <nav aria-label={title}>
    {title && <h4 className="small fw-bold text-uppercase mb-3 text-light">{title}</h4>}
    <ul className="list-unstyled mb-0">
      {links.map((item, index) => (
        <li key={index} className="mb-3">
          <a
            href={item.link}
            className="text-light text-decoration-none small opacity-75 hover-opacity-100"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = ({ title }: FooterProps) => {
  const footerLinks = {
    // forIndividuals: [
    //   { name: 'FOR INDIVIDUALS', link: '/individuals' },
    //   { name: 'FOR INSTITUTIONS & BUSINESSES', link: '/institutions' },
    //   { name: 'WILEY NETWORK', link: '/network' },
    //   { name: 'NEWSROOM', link: '/newsroom' },
    //   { name: 'CAREERS', link: '/careers' },
    // ],
    // aboutWiley: [
    //   { name: 'Corporate Responsibility', link: '/corporate-responsibility' },
    //   { name: 'Corporate Governance', link: '/corporate-governance' },
    //   { name: 'Leadership Team', link: '/leadership' },
    //   { name: 'Investors', link: '/investors' },
    //   { name: 'Artificial Intelligence', link: '/ai' },
    // ],
    // myAccount: [
    //   { name: 'Help', link: '/help' },
    //   { name: 'Contact Us', link: '/contact' },
    //   { name: 'Cookie Preferences', link: '/cookies' },
    // ],
  };

  const bottomLinks = [
    { name: 'Language/Location', link: '/language' },
    { name: 'Site Map', link: '/sitemap' },
    { name: 'Rights & Permissions', link: '/rights' },
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms of Use', link: '/terms' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter Section */}
      <section className="newsletter-section py-4 px-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h3 className="h4 mb-0 text-light fw-normal">
                Stay up to date with the latest Journal Guide news
              </h3>
            </div>
            <div className="col-md-6">
              <form className="d-flex mb-3">
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email address"
                />
                <button
                  type="submit"
                  className="btn btn-light newsletter-btn text-dark fw-semibold px-3"
                >
                  Get Started
                </button>
              </form>
               
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Links */}
      {/* <section className="bg-dark py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
              <LinkList links={footerLinks.forIndividuals} />
            </div>
            <div className="col-lg-6 col-md-5 mb-4 mb-md-0">
              <LinkList title="ABOUT WILEY" links={footerLinks.aboutWiley} />
            </div>
            <div className="col-lg-3 col-md-3">
              <LinkList title="MY ACCOUNT" links={footerLinks.myAccount} />
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer Bottom */}
      <section className="bg-dark border-top border-secondary py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 mb-2 mb-md-0">
              <p className="small text-light opacity-75 mb-0 lh-sm">
                © 2000–2025 John Wiley & Sons, Inc., or related companies. All rights reserved,
                including rights for text and data mining and training of artificial intelligence
                technologies or similar technologies.
              </p>
            </div>
            <div className="col-md-4">
              <nav aria-label="Footer bottom links">
                <ul className="d-flex flex-wrap justify-content-md-end justify-content-center align-items-center list-unstyled mb-0">
                  {bottomLinks.map((item, index) => (
                    <li key={index} className="d-flex align-items-center">
                      <a
                        href={item.link}
                        className="text-light text-decoration-none small opacity-75 hover-opacity-100"
                      >
                        {item.name}
                      </a>
                      {index < bottomLinks.length - 1 && (
                        <span className="text-light opacity-50 mx-2">|</span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
