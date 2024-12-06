from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, GoalSerializer, CBTSessionSerializer
from .models import Goal, Session
from rest_framework.permissions import IsAuthenticated
from .openai_service import generate_cbt_session  # A custom helper for OpenAI integration
import logging
from rest_framework.generics import ListCreateAPIView
from django.http import Http404

# Logger setup
logger = logging.getLogger(__name__)

class UserRegistrationView(APIView):
    permission_classes = []  # No authentication required

    def post(self, request):
        # Deserialize data
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Save user to the database
            user = serializer.save()
            return Response({
                "message": "User created successfully",
                "user_id": user.id,
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GoalListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    serializer_class = GoalSerializer  # Serializer to convert goal model to/from JSON

    def get_queryset(self):
        """
        Filter goals to only show those that belong to the currently authenticated user.
        """
        return Goal.objects.filter(user=self.request.user)  # Filter by the logged-in user

    def perform_create(self, serializer):
        """
        Automatically set the user to the currently authenticated user when a goal is created.
        """
        serializer.save(user=self.request.user)


class GoalDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id, user):
        try:
            return Goal.objects.get(id=id, user=user)
        except Goal.DoesNotExist:
            raise Http404("Goal not found or access denied.")

    def get(self, request, id):
        """
        Retrieve a goal's details.
        """
        goal = self.get_object(id, request.user)
        return Response(GoalSerializer(goal).data)

    def put(self, request, id):
        """
        Update an existing goal.
        """
        goal = self.get_object(id, request.user)
        if goal.user != request.user:
            logger.error(f"User {request.user} tried to update a goal that doesn't belong to them.")
            return Response({'error': 'You do not have permission to edit this goal.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = GoalSerializer(goal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Goal updated successfully!',
                'goal': serializer.data
            }, status=status.HTTP_200_OK)

        logger.error(f"Invalid data for goal update: {serializer.errors}")
        return Response({
            'error': 'Invalid data provided',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        Delete a goal.
        """
        goal = self.get_object(id, request.user)
        if goal.user != request.user:
            logger.error(f"User {request.user} tried to delete a goal that doesn't belong to them.")
            return Response({'error': 'You do not have permission to delete this goal.'}, status=status.HTTP_403_FORBIDDEN)

        goal.delete()
        return Response({'message': 'Goal deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        
class CBTSessionView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this

    def post(self, request):
        # Deserialize the incoming data
        serializer = CBTSessionSerializer(data=request.data)
        
        if serializer.is_valid():
            emotional_state = serializer.validated_data['emotional_state']
            
            try:
                # Log the emotional state for debugging
                logger.debug(f"Received emotional state: {emotional_state}")

                # Call the OpenAI service to generate the CBT session
                session_data = generate_cbt_session(emotional_state)
                
                if 'error' in session_data:
                    # If an error was returned from the OpenAI service
                    logger.error(f"OpenAI error: {session_data['error']}")
                    return Response({
                        "error": session_data['error']
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Log generated session data for debugging
                logger.debug(f"Generated CBT session data: {session_data}")

                # Save the generated session data to the database
                session = Session.objects.create(
                    user=request.user,
                    emotional_state=emotional_state,  # Save emotional state
                    exercise=session_data['session'],  # Save the CBT exercise
                    feedback=""  # Feedback can be added later or left empty
                )

                # Log the session creation
                logger.debug(f"Created session with ID: {session.id}")

                # Return the session data along with session ID
                return Response({
                    "session": session_data['session'],  # CBT content
                    "session_id": session.id,  # Session ID for reference
                    "summary": session_data.get('summary', "CBT session generated successfully")  # Optional summary
                }, status=status.HTTP_200_OK)

            except Exception as e:
                # Log any error that occurs during the CBT session generation
                logger.error(f"Error generating CBT session: {str(e)}")
                
                # Return a generic error message to the client
                return Response({
                    "error": "Failed to generate CBT session. Please try again later."
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # If the serializer data is invalid, return validation errors
        logger.error(f"Serializer validation failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
