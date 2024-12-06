import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const GoalForm = ({ goalToEdit, onGoalUpdated, fetchGoals }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Track loading state
    const [returnLoading, setReturnLoading] = useState(false);  // Track loading state for return button

    // Populate form fields if editing an existing goal
    useEffect(() => {
        if (goalToEdit) {
            setName(goalToEdit.name || '');
            setDescription(goalToEdit.description || '');
            setTargetDate(goalToEdit.target_date || '');
            setTargetValue(goalToEdit.target_value || '');
            setCurrentValue(goalToEdit.current_value || '');
        }
    }, [goalToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        const goalData = {
            name,
            description,
            target_date: targetDate,
            target_value: parseFloat(targetValue),
            current_value: parseFloat(currentValue),
        };

        // Validate values
        if (goalData.target_value < 0 || isNaN(goalData.target_value)) {
            setError("Target value must be a valid non-negative number.");
            return;
        }

        if (goalData.current_value < 0 || isNaN(goalData.current_value)) {
            setError("Current value must be a valid non-negative number.");
            return;
        }

        if (goalData.target_value < goalData.current_value) {
            setError('Target value must be greater than current value');
            return;
        }

        setLoading(true); // Set loading state to true when the form is being submitted

        try {
            const response = goalToEdit
                ? await api.put(`/goals/${goalToEdit.id}/`, goalData, { headers: { Authorization: `Bearer ${token}` } })
                : await api.post('/goals/', goalData, { headers: { Authorization: `Bearer ${token}` } });

            // Update the goal list in the parent component after successful update
            if (onGoalUpdated) {
                onGoalUpdated(response.data.goal);
            }

            // Re-fetch the goal list after the update
            if (fetchGoals) {
                fetchGoals();
            }

            // Navigate back to the goals list after update
            navigate('/goals');  // This might still cause a problem if goals aren't immediately updated, so we rely on fetchGoals now.

            // Reset form and error state
            setName('');
            setDescription('');
            setTargetDate('');
            setTargetValue('');
            setCurrentValue('');
            setError(null);  // Reset error state
        } catch (error) {
            console.error('Error creating/updating goal:', error);
            setError('There was an error creating/updating the goal. Please try again.');
        } finally {
            setLoading(false); // Reset loading state after the request completes
        }
    };

    // Handle return to goals list with a loading state
    const handleReturnToGoals = () => {
        setReturnLoading(true);
        setTimeout(() => {
            navigate('/goals');
        }, 1000); // Simulate loading for 1 second before navigating
    };

    return (
        <div style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <h3>{goalToEdit ? 'Edit Goal' : 'Create Goal'}</h3>
                <input
                    type="text"
                    placeholder="Goal Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}  // Disable form fields while loading
                />
                <textarea
                    placeholder="Goal Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={loading}  // Disable form fields while loading
                />
                <label htmlFor="target-date">By what date do you want to achieve this goal?</label>
                <input
                    id="target-date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    required
                    disabled={loading}  // Disable form fields while loading
                />
                <input
                    type="number"
                    placeholder="Number of days to complete this goal"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    required
                    min="0"
                    disabled={loading}  // Disable form fields while loading
                />
                <input
                    type="number"
                    placeholder="How many days have passed since you thought about this goal"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    required
                    min="0"
                    disabled={loading}  // Disable form fields while loading
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : goalToEdit ? 'Update Goal' : 'Create Goal'}
                </button>  {/* Display 'Saving...' while loading */}
            </form>
            <button
                onClick={handleReturnToGoals}
                style={{ marginTop: '10px' }}
                disabled={loading || returnLoading}
            >
                {returnLoading ? 'Loading...' : 'Return to Goals List'}
            </button>
        </div>
    );
};

export default GoalForm;
