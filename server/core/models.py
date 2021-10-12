from django.db import models

from django.contrib.auth import get_user_model


class Task(models.Model):
    name = models.CharField(max_length=255)
    assigned_to = models.ForeignKey(
        get_user_model(),
        related_name="tasks",
        null=True, blank=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name

    @property
    def assigned_name(self):
        return self.assigned_to.username
