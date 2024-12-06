import React from 'react';

const GoalCard = ({ goal, onEdit, onDelete }) => {
    return (
        <div className="goal-card">
            <h3>{goal.name}</h3>
            <p><strong>Description:</strong> {goal.description}</p>
            <p><strong>Target Date:</strong> {goal.target_date || 'N/A'}</p>
            <p><strong>Number of days to complete goal:</strong> {goal.target_value || 'N/A'} | <strong>Number of days since you thought about setting this goal:</strong> {goal.current_value || 'N/A'}</p>
            <div className="goal-card-buttons">
                <button onClick={() => onEdit(goal)}>Edit</button>
                <button onClick={() => onDelete(goal.id)}>Delete</button>
            </div>

            <style jsx>{`
                .goal-card {
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 16px;
                    margin: 16px;
                    text-align: left;
                    transition: transform 0.2s ease;
                }

                .goal-card:hover {
                    transform: translateY(-5px);
                }

                .goal-card h3 {
                    font-size: 1.2em;
                    margin-bottom: 12px;
                }

                .goal-card p {
                    margin: 8px 0;
                }

                .goal-card .goal-card-buttons {
                    margin-top: 12px;
                    display: flex;
                    justify-content: space-between;
                }

                .goal-card button {
                    padding: 8px 12px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .goal-card button:hover {
                    background-color: #0056b3;
                }

                .goal-card button:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
};

export default GoalCard;
