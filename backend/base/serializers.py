from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cafe, Review


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    # id = serializers.SerializerMethodField(read_only = True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "name", "is_admin"]

        def get__id(self, obj):
            return obj.id

        def get_is_admin(self, obj):
            return obj.is_staff

        def get_name(self, obj):
            name = obj.first_name
            if name == "":
                name = obj.email
            return name


class CafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cafe
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
