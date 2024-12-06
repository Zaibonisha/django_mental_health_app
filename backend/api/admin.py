from django.contrib import admin
from .models import Goal, Session  # Import models to register them

# Register the Goal model
class GoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'description', 'created_at')
    search_fields = ('description',)
    list_filter = ('user',)

admin.site.register(Goal, GoalAdmin)

# Register the Session model
class SessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'emotional_state', 'exercise', 'feedback')
    search_fields = ('emotional_state', 'exercise', 'feedback')
    list_filter = ('user', 'date')

admin.site.register(Session, SessionAdmin)
