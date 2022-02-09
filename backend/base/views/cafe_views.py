from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from ..serializers import CafeSerializer
from ..models import Cafe, Review
from ..cafes import cafes as dummy_cafes


@api_view(["GET"])
def get_cafes(request):
    cafes = Cafe.objects.all()
    serializer = CafeSerializer(cafes, many=True)
    return Response(
        {
            "cafes": serializer.data,
        }
    )


@api_view(["GET"])
def get_cafe(request, pk):
    cafe = Cafe.objects.get(id=int(pk))
    # cafe = next((i for i in dummy_cafes if i["id"] == int(pk)), None)
    serializer = CafeSerializer(cafe, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def load_dummies(request):
    user = User.objects.get(email="")
    for cafe in dummy_cafes:
        print(f"loading {cafe['name']}")
        new_cafe = Cafe.objects.create(
            user=user,
            name=cafe["name"],
            map_url=cafe["map_url"],
            img_url=cafe["img_url"],
            location=cafe["location"],
            seats=int("".join(filter(str.isdigit, cafe["seats"]))),
            has_toilet=cafe["has_toilet"],
            has_wifi=cafe["has_wifi"],
            has_sockets=cafe["has_sockets"],
            can_take_calls=cafe["can_take_calls"],
            coffee_price=cafe["coffee_price"],
            description=cafe["description"],
        )

    return Response(dummy_cafes)

