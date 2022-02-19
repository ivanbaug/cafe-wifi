from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Cafe(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    map_url = models.CharField(max_length=500, null=True, blank=True)
    img_url = models.CharField(
        max_length=500,
        null=True,
        blank=True,
        default="https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    )
    location = models.CharField(max_length=200, null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True, default=0)
    has_toilet = models.BooleanField(default=False)
    has_wifi = models.BooleanField(default=False)
    has_sockets = models.BooleanField(default=False)
    can_take_calls = models.BooleanField(default=False)
    # TODO: Probably handle exchange price
    coffee_price = models.CharField(max_length=50, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    date_edited = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    cafe = models.ForeignKey(Cafe, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=1)
    comment = models.TextField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    date_edited = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.title)
