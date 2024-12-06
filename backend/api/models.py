from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    target_date = models.DateField(null=True, blank=True)
    target_value = models.FloatField()
    current_value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Goal for {self.user.username}: {self.name or self.description}"

    def clean(self):
        # Ensure target_value is not negative
        if self.target_value < 0:
            raise ValidationError("Target value cannot be negative.")
        # Ensure current_value is not negative
        if self.current_value < 0:
            raise ValidationError("Current value cannot be negative.")
        # Ensure target_value is greater than current_value
        if self.target_value < self.current_value:
            raise ValidationError("Target value must be greater than current value.")



# Session model to store CBT sessions and feedback
class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    emotional_state = models.CharField(max_length=100)
    exercise = models.TextField()  # Changed to TextField to store detailed content
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, null=True, blank=True)  # Optional field
    feedback = models.TextField(null=True, blank=True)  # Optional field for user feedback

    class Meta:
        verbose_name = "CBT Session"
        verbose_name_plural = "CBT Sessions"

    def __str__(self):
        return f"Session for {self.user.username} on {self.date}"

    def save(self, *args, **kwargs):
        # Automatically link a default goal if none is provided
        if not self.goal and Goal.objects.filter(user=self.user).exists():
            self.goal = self.get_default_goal()
        super().save(*args, **kwargs)

    def get_default_goal(self):
        # Example logic to return the most relevant goal for the user
        return Goal.objects.filter(user=self.user).order_by('-created_at').first()  # Most recent goal
