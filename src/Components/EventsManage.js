import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventsManage.css';

const EventsManage = () => {
    const [eventData, setEventData] = useState({
        title: '',
        department: '',
        description: '',
        fullDescription: '',
        guidelines: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        date: '',
        time: '',
        location: '',
        seats: '', // Added seats field
    });

    const [imagePreviews, setImagePreviews] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [fetchedEvents, setFetchedEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation logic for each field
        switch (name) {
            case 'title':
            case 'department':
            case 'description':
            case 'fullDescription':
            case 'guidelines':
                // Allow only letters and spaces
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setEventData((prev) => ({ ...prev, [name]: value }));
                    setFormErrors((prev) => ({ ...prev, [name]: '' }));
                }
                break;

            case 'seats':
                // Allow only numbers
                if (/^\d*$/.test(value)) {
                    setEventData((prev) => ({ ...prev, [name]: value }));
                    setFormErrors((prev) => ({ ...prev, [name]: '' }));
                }
                break;

            default:
                // For other fields (date, time, location), allow any input
                setEventData((prev) => ({ ...prev, [name]: value }));
                setFormErrors((prev) => ({ ...prev, [name]: '' }));
                break;
        }
    };

    // Handle image uploads
    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Check if the file is an image format
            const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']; // You can add more formats here
            if (!allowedFormats.includes(file.type)) {
                alert('Please upload a valid image file (jpg, jpeg, png, gif).');
                // Reset the file input
                e.target.value = '';
                return;
            }

            // If file is valid, proceed with the FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData((prev) => ({ ...prev, [name]: reader.result }));
                setImagePreviews((prev) => ({ ...prev, [name]: reader.result }));
                setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear error if file is valid
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate form fields
    const validateForm = () => {
        const errors = {};
        const lettersOnly = /^[A-Za-z\s]+$/;

        // Title validation
        if (!eventData.title.trim()) errors.title = 'Title is required.';
        else if (!lettersOnly.test(eventData.title)) errors.title = 'Title should contain only letters and spaces.';

        // Department validation
        if (!eventData.department.trim()) errors.department = 'Department is required.';
        else if (!lettersOnly.test(eventData.department)) errors.department = 'Department should contain only letters and spaces.';

        // Description and full description validations
        if (!eventData.description.trim()) errors.description = 'Description is required.';
        if (!eventData.fullDescription.trim()) errors.fullDescription = 'Full description is required.';

        // Seats validation
        if (!eventData.seats || isNaN(eventData.seats) || Number(eventData.seats) <= 0) {
            errors.seats = 'Seats must be a positive number.';
        }

        // Date, Time, and Location validation
        if (!eventData.date) errors.date = 'Date is required.';
        if (!eventData.time) errors.time = 'Time is required.';
        if (!eventData.location.trim()) errors.location = 'Location is required.';

        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            if (editingEventId) {
                // Update existing event
                await axios.put(`http://localhost:8080/api/admin/events/${editingEventId}`, eventData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                alert('Event updated successfully!');
            } else {
                // Add new event
                await axios.post('http://localhost:8080/api/admin/events', eventData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                alert('Event added successfully!');
            }
            fetchEvents();
            resetForm();
        } catch (error) {
            alert('Failed to save event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/events');
            const sortedEvents = response.data.sort((a, b) => b.id - a.id); // Sort by ID in descending order
            setFetchedEvents(sortedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Reset form after submission
    const resetForm = () => {
        setEventData({
            title: '',
            department: '',
            description: '',
            fullDescription: '',
            guidelines: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            date: '',
            time: '',
            location: '',
            seats: '', // Reset seats field
        });
        setImagePreviews({});
        setEditingEventId(null);
    };

    // Edit event
    const handleEditEvent = (event) => {
        setEditingEventId(event.id);
        setEventData(event);
        setImagePreviews({
            image1: event.image1,
            image2: event.image2,
            image3: event.image3,
            image4: event.image4,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Delete event
    const handleDeleteEvent = async (Eventid) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/events/${Eventid}`);
                alert('Event deleted successfully!');
                fetchEvents();
            } catch (error) {
                alert('Failed to delete event. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="eventsman-page">
            <div id="events-manage-container">
                <h2 id="hh">{editingEventId ? 'Edit Event' : 'Add New Venue'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Venue</label>
                    <input type="text" name="title" value={eventData.title} onChange={handleChange} />
                    {formErrors.title && <span className="error">{formErrors.title}</span>}

                    <label>Supervisor</label>
                    <input type="text" name="department" value={eventData.department} onChange={handleChange} />
                    {formErrors.department && <span className="error">{formErrors.department}</span>}

                    <label>Mainly for</label>
                    <textarea name="description" value={eventData.description} onChange={handleChange} />

                    <label>Full Description *</label>
                    <textarea
                        name="fullDescription"
                        value={eventData.fullDescription}
                        onChange={handleChange}
                        maxLength={200} // Set the maximum allowed characters
                    />
                    <span>{eventData.fullDescription.length}/200</span> {/* Show character count */}
                    {formErrors.fullDescription && <span className="error">{formErrors.fullDescription}</span>}

                    <label>Amentities</label>
                    <textarea name="guidelines" value={eventData.guidelines} onChange={handleChange} />

                    <label>Seats</label>
                    <input type="text" name="seats" value={eventData.seats} onChange={handleChange} />
                    {formErrors.seats && <span className="error">{formErrors.seats}</span>}

                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} style={{ marginBottom: '15px' }}>
                            <label>Image {num}</label>
                            <input type="file" name={`image${num}`} onChange={handleImageChange} accept="image/*" />
                            {imagePreviews[`image${num}`] && (
                                <img
                                    src={imagePreviews[`image${num}`]}
                                    alt={`Event ${num}`}
                                    style={{
                                        display: 'block',
                                        marginTop: '10px',
                                        width: '150px',
                                        height: 'auto',
                                        borderRadius: '5px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    <label>Date</label>
                    <input type="date" name="date" value={eventData.date} onChange={handleChange} />
                    {formErrors.date && <span className="error">{formErrors.date}</span>}

                    <label>Time</label>
                    <input type="time" name="time" value={eventData.time} onChange={handleChange} />
                    {formErrors.time && <span className="error">{formErrors.time}</span>}

                    <label>Location</label>
                    <input type="text" name="location" value={eventData.location} onChange={handleChange} />
                    {formErrors.location && <span className="error">{formErrors.location}</span>}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : editingEventId ? 'Update Event' : 'Add Event'}
                    </button>
                </form>

                {/* Event List */}
                <div id="events-list-container" style={{ marginTop: '30px' }}>
                    <h3 id="hhh">Venue List</h3>
                    {fetchedEvents.length > 0 ? (
                        <ul id="events-list" style={{ listStyle: 'none', padding: '0' }}>
                            {fetchedEvents.map((event) => (
                                <li
                                    key={event.id}
                                    id={`event-${event.id}`}
                                    style={{
                                        marginBottom: '20px',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        backgroundColor: '#ffffff',
                                        color: '#000000',
                                    }}
                                >
                                    <h4><strong>Venue</strong> {event.title}</h4>
                                    <p><strong>Supervisor</strong> {event.department}</p>
                                    <p><strong>Mainly for</strong> {event.description}</p>
                                    <p><strong>Full Description:</strong> {event.fullDescription}</p>
                                    <p><strong>Amentities:</strong> {event.guidelines}</p>
                                    <p><strong>Seats:</strong> {event.seats}</p>
                                    <p><strong>Date:</strong> {event.date}</p>
                                    <p><strong>Time:</strong> {event.time}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        {[event.image1, event.image2, event.image3, event.image4].map((image, i) =>
                                            image ? (
                                                <img
                                                    key={i}
                                                    src={image}
                                                    alt={`Event ${i + 1}`}
                                                    width="100"
                                                    style={{ borderRadius: '5px', border: '1px solid #ddd' }}
                                                />
                                            ) : null
                                        )}
                                    </div>
                                    <button onClick={() => handleEditEvent(event)} style={{ marginTop: '10px' }}>Edit</button>
                                    <button onClick={() => handleDeleteEvent(event.id)} style={{ marginLeft: '10px', color: 'red' }}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p id="no-events-msg">No Venues available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsManage;