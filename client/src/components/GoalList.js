import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../axios';
import './style.css';
import Navbar from './Navbar';
import GoalForm from './GoalForm';
import GoalCard from './GoalCard';

const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editGoal, setEditGoal] = useState(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    // Fetch goals from the server
    const fetchGoals = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await api.get('/goals/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(response.data);
        } catch (error) {
            console.error('Error fetching goals:', error);
            if (error.response && error.response.status === 401) {
                logout();
                navigate('/login');
            } else {
                alert('There was an error fetching your goals. Please try again later.');
            }
        }
    };

    useEffect(() => {
        fetchGoals();
    }, [token, navigate, logout]);

    // Delete a goal
    const deleteGoal = async (id) => {
        try {
            await api.delete(`/goals/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(goals.filter((goal) => goal.id !== id));
        } catch (error) {
            console.error('Error deleting goal:', error);
            alert('There was an error deleting the goal. Please try again later.');
        }
    };

    // Start editing a goal
    const startEditGoal = (goal) => {
        setIsEditing(true);
        setEditGoal(goal);
    };

    // Function to handle goal update
    const handleGoalUpdate = (updatedGoal) => {
        setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));
        setIsEditing(false);
        setEditGoal(null);
    };

    return (
        <div className="goal-list-container">
            <Navbar />
            <h2>Your Goals</h2>
            <div className="button-container">
                <Link to="/create-goal">
                    <button>Create New Goal</button>
                </Link>
                {/* Create CBT Session Button */}
                <Link to="/cbt-session">
                    <button>Create CBT Session</button>
                </Link>
            </div>
            {isEditing && editGoal ? (
                <GoalForm
                    goalToEdit={editGoal}
                    onGoalUpdated={handleGoalUpdate} // Pass the update function
                    fetchGoals={fetchGoals} // Pass fetchGoals function to GoalForm
                />
            ) : (
                <div className="goal-list">
                    {goals.length > 0 ? (
                        goals.map((goal) => (
                            <GoalCard
                                key={goal.id}
                                goal={goal}
                                onEdit={startEditGoal}
                                onDelete={deleteGoal}
                            />
                        ))
                    ) : (
                        <p>You don't have any goals yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GoalList;
