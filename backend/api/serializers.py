from rest_framework import serializers
from .models import Goal, Session
from django.contrib.auth.models import User

# User Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Prevent password from being included in the response

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Goal Serializer
class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'name', 'description', 'target_date', 'target_value', 'current_value', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate(self, data):
        """
        Ensure that target_value is greater than current_value
        """
        if data['target_value'] < data['current_value']:
            raise serializers.ValidationError("Target value must be greater than current value.")
        return data
        
# Session Serializer
class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['id', 'user', 'date', 'emotional_state', 'exercise', 'goal', 'feedback']
        read_only_fields = ['id', 'date', 'user']  # Prevent modification of these fields

# CBT Session Serializer
class CBTSessionSerializer(serializers.Serializer):
    emotional_state = serializers.CharField(max_length=255)  # Required field for input
    session = serializers.JSONField(required=False)  # Optional field for AI response

    def validate_emotional_state(self, value):
        """
        Add validation for emotional_state to ensure it's meaningful.
        """
        if not value.strip():
            raise serializers.ValidationError("Emotional state cannot be empty.")
        return value
