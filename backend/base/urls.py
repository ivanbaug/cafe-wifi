from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_routes, name="routes"),
    path("cafes/", views.get_cafes, name="cafes"),
    path("cafes/<str:pk>/", views.get_cafe, name="cafe"),
]
