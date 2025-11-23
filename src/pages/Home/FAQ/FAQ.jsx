import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

const FAQ = () => {
    return (
      <div className="mt-24">
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2>Frequently Asked Question (FAQ)</h2>
          <p className="text-center !color-desc">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
        <div className="space-y-4 mt-10 text-secondary">
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold">
              How does this posture corrector work?
            </summary>
            <div className="collapse-content text-sm">
              <p className="!text-desc">
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here’s how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.
              </p>
            </div>
          </details>
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
          >
            <summary className="collapse-title font-semibold">
              Is it suitable for all ages and body types?
            </summary>
            <div className="collapse-content text-sm">
              <p className="!text-desc">
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here’s how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.
              </p>
            </div>
          </details>
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
          >
            <summary className="collapse-title font-semibold">
              Does it really help with back pain and posture improvement?
            </summary>
            <div className="collapse-content text-sm">
              <p className="!text-desc">
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here’s how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.
              </p>
            </div>
          </details>
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
          >
            <summary className="collapse-title font-semibold">
              Does it have smart features like vibration alerts?
            </summary>
            <div className="collapse-content text-sm">
              <p className="!text-desc">
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here’s how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.
              </p>
            </div>
          </details>
          <details
            className="collapse bg-base-100 border border-base-300"
            name="my-accordion-det-1"
          >
            <summary className="collapse-title font-semibold">
              How will I be notified when the product is back in stock?
            </summary>
            <div className="collapse-content text-sm">
              <p className="!text-desc">
                A posture corrector works by providing support and gentle
                alignment to your shoulders, back, and spine, encouraging you to
                maintain proper posture throughout the day. Here’s how it
                typically functions: A posture corrector works by providing
                support and gentle alignment to your shoulders.
              </p>
            </div>
          </details>
        </div>
        <button className="btn mt-10 bg-primary font-bold text-xl outline-primary text-secondary rounded-full btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl flex items-center gap-2 max-w-fit mx-auto">
          See More FAQ’s
          <FaArrowCircleRight className="hidden lg:block text-2xl -rotate-45" />
        </button>
      </div>
    );
};

export default FAQ;