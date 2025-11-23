import React from 'react';
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const Support = () => {
    return (
      <div className="py-20 space-y-6 border-b border-dashed border-secondary">
        <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-8 rounded-2xl gap-10 lg:gap-24 shadow-lg transition transform hover:shadow-xl hover:translate-y-1 hover:bg-primary">
          <img src={liveTracking} alt="" />
          <div className="hidden md:block border-l border-dashed border-secondary h-40"></div>
          <div>
            <h3>Live Parcel Tracking</h3>
            <p>
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant status updates for complete peace of mind.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-8 rounded-2xl gap-10 lg:gap-24 shadow-lg transition transform hover:shadow-xl hover:translate-y-1 hover:bg-primary">
          <img src={safeDelivery} alt="" />
          <div className="hidden md:block border-l border-dashed border-secondary h-40"></div>
          <div>
            <h3>100% Safe Delivery</h3>
            <p>
              We ensure your parcels are handled with the utmost care and
              delivered securely to their destination. Our reliable process
              guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-8 rounded-2xl gap-10 lg:gap-24 shadow-lg transition transform hover:shadow-xl hover:translate-y-1 hover:bg-primary">
          <img src={safeDelivery} alt="" />
          <div className="hidden md:block border-l border-dashed border-secondary h-40"></div>
          <div>
            <h3>24/7 Call Center Support</h3>
            <p>
              Our dedicated support team is available around the clock to assist
              you with any questions, updates, or delivery concerns—anytime you
              need us.
            </p>
          </div>
        </div>
      </div>
    );
};

export default Support;