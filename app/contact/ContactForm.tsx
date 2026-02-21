"use client";

import { FormEvent } from "react";

export default function ContactForm() {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('Thank you! We will get back to you within 24–48 hours.');
    };

    return (
        <form className="card p-32" onSubmit={handleSubmit}>
            <h3 className="card-h3">Send a Message</h3>
            <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Jane Smith" required />
            </div>
            <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="jane@example.com" required />
            </div>
            <div className="form-group">
                <label>Subject</label>
                <select>
                    <option>General Question</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Partnership / Advertising</option>
                    <option>Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us how we can help..." required></textarea>
            </div>
            <button type="submit" className="btn-primary">
                Send Message ✉️
            </button>
        </form>
    );
}
