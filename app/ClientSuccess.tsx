"use client";

import { ArrowUpRight, BadgeCheck, Quote, Star, TrendingUp } from "lucide-react";

const reviews = [
  {
    title: "Shopify Theme Customizations",
    quote: "If you need stuff done in Shopify, don't look anywhere else. Period!",
    rating: "5.0",
    date: "Sep 27–28, 2024",
    tags: ["Shopify", "Theme Development"],
  },
  {
    title: "Shopify Collection",
    quote: "It was a pleasure to work with Farukh. We will definitely work with him again. Great developer!",
    rating: "5.0",
    date: "Dec 25–28, 2024",
    tags: ["Collaborative", "Shopify"],
  },
  {
    title: "Angular Website Deployment",
    quote: "Pleasure to work with.",
    rating: "5.0",
    date: "Jan 2022–Mar 2026",
    tags: ["Collaborative", "Solution Oriented", "Detail Oriented"],
  },
  {
    title: "Shopify Store Overhaul",
    quote: "Knowledgeable on Shopify systems, app development, and overall e-commerce objectives.",
    rating: "5.0",
    date: "Dec 2025–Feb 2026",
    tags: ["Clear Communicator", "Detail Oriented"],
  },
];

export default function ClientSuccess() {
  return (
    <section id="client-success" className="client-success-section">
      <div className="shell client-success-shell">
        <div className="client-success-head">
          <div>
            <span className="kicker">CLIENT SUCCESS / VERIFIED FEEDBACK</span>
            <h2>Results clients<br />talk about.</h2>
          </div>
          <p>
            Selected feedback from completed Upwork contracts across Shopify,
            ecommerce, custom development and long-term technical partnerships.
          </p>
        </div>

        <div className="client-proof-strip">
          <div><strong>5.0</strong><span>rating across featured contracts</span></div>
          <div><strong>8+ years</strong><span>shipping production systems</span></div>
          <div><strong>Long-term</strong><span>multi-year client relationships</span></div>
          <div><strong>Global</strong><span>remote ecommerce delivery</span></div>
        </div>

        <div className="impact-story">
          <div className="impact-story-copy">
            <span className="impact-label"><TrendingUp size={16} /> Business impact</span>
            <h3>Complex functionality delivered without forcing a costly platform upgrade.</h3>
            <p>
              One client reported that other developers said the required functionality needed
              Shopify&apos;s $2,000/month plan. Their review says Farrukh delivered it on a basic
              subscription and that the business later reached $30K–$40K in monthly revenue.
            </p>
            <div className="impact-tags">
              <span>Committed to Quality</span>
              <span>Solution Oriented</span>
              <span>Collaborative</span>
            </div>
          </div>
          <blockquote>
            <Quote size={32} />
            <p>
              “Brilliant, efficient, and beyond what we thought was even possible.”
            </p>
            <footer>
              <span>Verified Upwork client feedback</span>
              <strong>5.0 / 5</strong>
            </footer>
          </blockquote>
        </div>

        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.title} className="review-card">
              <div className="review-top">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={15} fill="currentColor" />)}
                  <strong>{review.rating}</strong>
                </div>
                <BadgeCheck size={18} />
              </div>
              <span className="review-project">{review.title}</span>
              <p>“{review.quote}”</p>
              <div className="review-meta">
                <span>{review.date}</span>
                <span>Upwork contract</span>
              </div>
              <div className="review-tags">
                {review.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="client-success-cta">
          <div>
            <strong>Need the same level of technical ownership?</strong>
            <span>Share the project, platform and outcome you are targeting.</span>
          </div>
          <a href="#contact">Start a project <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}
