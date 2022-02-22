from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from base.views import cafe_views as views

urlpatterns = [
    path("", views.get_cafes, name="cafes"),
    path("new/", views.new_cafe, name="cafe-create"),
    path("my_cafes/", views.get_own_cafes, name="my-cafes"),
    # path("load_dummies/", views.load_dummies, name="maketest-cafes"),
    # path("load_comments/", views.load_dummy_reviews, name="maketest-reviews"),
    path("<str:pk>/", views.get_cafe, name="cafe"),
    path("<str:pk>/review/", views.create_cafe_review, name="create-review"),
    path("update/<str:pk>/", views.update_cafe, name="cafe-update"),
    path("delete/<str:pk>/", views.delete_cafe, name="cafe-delete"),
    path("delete_review/<str:pk>/", views.delete_review, name="review-delete"),
]
