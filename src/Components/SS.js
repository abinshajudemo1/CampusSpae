import React from 'react';
import { Calendar, Clock, CreditCard, Users } from 'lucide-react';
import './Dashboard.css';

const SS= () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome back, John!</h1>
        <p>Here's what's happening with your bookings.</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <StatCard
          icon={<Calendar className="icon icon-indigo" />}
          title="Active Bookings"
          value="3"
        />
        <StatCard
          icon={<Clock className="icon icon-green" />}
          title="Upcoming Check-ins"
          value="1"
        />
        <StatCard
          icon={<CreditCard className="icon icon-blue" />}
          title="Total Spent"
          value="$1,234"
        />
        <StatCard
          icon={<Users className="icon icon-purple" />}
          title="Guest Count"
          value="8"
        />
      </div>

      {/* Recent Bookings */}
      <div className="recent-bookings">
        <div className="bookings-header">
          <h2>Recent Bookings</h2>
        </div>
        <div className="bookings-list">
          {[1, 2, 3].map((booking) => (
            <div key={booking} className="booking-item">
              <div className="booking-details">
                <h3>Platinum Room {booking}</h3>
                <p>Check-in: March {booking + 10}, 2024</p>
              </div>
              <span className="booking-status">Confirmed</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Rooms */}
      <div className="featured-rooms">
        <FeaturedRoom
          title="Platinum Suite"
          image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
          price="299"
        />
        <FeaturedRoom
          title="Gold Room"
          image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
          price="199"
        />
        <FeaturedRoom
          title="Silver Room"
          image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
          price="149"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-icon">{icon}</div>
        <div className="stat-text">
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

const FeaturedRoom = ({ title, image, price }) => {
  return (
    <div className="featured-room">
      <div className="room-image">
        <img src={image} alt={title} />
      </div>
      <div className="room-details">
        <h3>{title}</h3>
        <p className="room-price">${price}</p>
        <button className="book-button">Book Now</button>
      </div>
    </div>
  );
};

export default SS;