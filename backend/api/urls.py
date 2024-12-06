from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView, GoalListView, GoalDetailView, CBTSessionView

urlpatterns = [
    # User registration route (no authentication needed)
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    
    # User login route (JWT token obtain and refresh views)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh route
    
    # Goals endpoint (GET list of goals)
    path('goals/', GoalListView.as_view(), name='goal-list'),  # List all goals
    
    # Goal detail endpoint (for retrieving, updating, and deleting a goal)
    path('goals/<int:id>/', GoalDetailView.as_view(), name='goal-detail'),  # This handles GET, PUT, DELETE for a goal
    
    # Generate CBT session (Requires authentication)
    path('generate-cbt-session/', CBTSessionView.as_view(), name='generate-cbt-session'),
]
