import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./adminStyle.css";

function AemAdmin() {
  const [ticketData, setTicketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusOptions] = useState(["All", "open", "processing", "closed"]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch('https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/function-2-1');
        const data = await response.json();
        setTicketData(data.tickets);
        setFilteredData(data.tickets);  // Initializing filtered data
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTicketData();
    const interval = setInterval(fetchTicketData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter tickets based on status and date
  useEffect(() => {
    let filteredTickets = ticketData;

    // Filter by status
    if (statusFilter !== "All") {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === statusFilter);
    }

    // Filter by date range
    if (startDate) {
      filteredTickets = filteredTickets.filter(ticket => new Date(ticket.created_at) >= new Date(startDate));
    }
    if (endDate) {
      filteredTickets = filteredTickets.filter(ticket => new Date(ticket.created_at) <= new Date(endDate));
    }

    setFilteredData(filteredTickets);
  }, [statusFilter, startDate, endDate, ticketData]);

  const handleStatusChange = async (ticketId, newStatus) => {
    setTicketData((prevData) =>
      prevData.map((ticket) =>
        ticket.ticket_id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    updateTicket(ticketId, newStatus);
  };

  const updateTicket = (ticket_id, new_status) => {
    fetch('https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/function-3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticket_id: ticket_id,
        new_status: new_status,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.error('Error updating data:', data);
    })
    .catch((error) => {
      console.error('Error updating ticket:', error);
    });
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetail = () => {
    setSelectedTicket(null);
  };

  const getStatusClass = (status) => {
    if (status === "open") return "status-open";
    if (status === "processing") return "status-processing";
    if (status === "closed") return "status-closed";
    return "";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/tickets">Manage Tickets</Link>
          </li>
          <li>
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <div className="admin-main-content">
        <div className="ticket-table-container">
          <h2>Support Tickets</h2>
          <table className="ticket-table">
            {/* Filters Row */}
            <thead>
              <tr className="filter-row">
                <th colSpan="4">
                  <div className="filter-group">
                    <label>Status Filter:</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th colSpan="2">
                  <div className="filter-group">
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </th>
                <th colSpan="2">
                  <div className="filter-group">
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </th>
                <th colSpan="2"></th>
              </tr>
            </thead>

            {/* Table Column Headers */}
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Resolved At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((ticket) => (
                  <tr key={ticket.ticket_id}>
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.user_id}</td>
                    <td>{ticket.user_name}</td>
                    <td>{ticket.user_email}</td>
                    <td>{ticket.issue}</td>
                    <td>
                      <select
                        className={`status-dropdown ${getStatusClass(ticket.status)}`}
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
                      >
                        {statusOptions.slice(1).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(ticket.created_at)}</td>
                    <td>{formatDate(ticket.updated_at)}</td>
                    <td>{ticket.resolved_at ? formatDate(ticket.resolved_at) : 'N/A'}</td>
                    <td>
                      <button
                        className="view-ticket-btn"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No tickets available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedTicket && (
          <div className="ticket-detail-modal">
            <div className="ticket-detail-content">
              <h3>Ticket Details</h3>
              <p>
                <strong>Ticket ID:</strong> {selectedTicket.ticket_id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedTicket.user_id}
              </p>
              <p>
                <strong>User Name:</strong> {selectedTicket.user_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedTicket.user_email}
              </p>
              <p>
                <strong>Issue:</strong> {selectedTicket.issue}
              </p>
              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Created At:</strong> {formatDate(selectedTicket.created_at)}
              </p>
              <p>
                <strong>Updated At:</strong> {formatDate(selectedTicket.updated_at)}</p>
              <p>
                <strong>Resolved At:</strong> {selectedTicket.resolved_at ? formatDate(selectedTicket.resolved_at) : 'N/A'}
              </p>
              <button className="close-btn" onClick={closeTicketDetail}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AemAdmin;