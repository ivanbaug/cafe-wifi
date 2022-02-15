from django.shortcuts import render

from django.contrib.auth.models import User
from rest_framework import status
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


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_cafe(request, pk):
    # print(request.user.is_staff)
    cafe = Cafe.objects.get(id=pk)
    if (cafe.user != request.user) and (not request.user.is_staff):
        return Response(
            {"detail": "Current user is not the author of this cafe nor admin user."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    cafe.delete()
    return Response("Cafe Deleted")


@api_view(["GET"])
# @permission_classes([IsAdminUser])
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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def new_cafe(request):

    username = request.user.first_name

    new_cafe = Cafe.objects.create(
        user=request.user,
        name=f"{username}'s New Cafe ",
        map_url="https://www.google.com/maps",
        img_url="https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        location="Cafe street 123",
        seats=0,
        has_toilet=False,
        has_wifi=False,
        has_sockets=False,
        can_take_calls=False,
        coffee_price=0,
        description=f"{username}'s New Cafe detailed description ☕☕☕, check this place out!",
    )
    serializer = CafeSerializer(new_cafe, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_cafe(request, pk):
    data = request.data
    cafe = Cafe.objects.get(id=pk)
    if cafe.user != request.user:
        return Response(
            "Current user is not the author of this cafe.",
            status=status.HTTP_401_UNAUTHORIZED,
        )
    cafe.name = data["name"]
    cafe.map_url = data["map_url"]
    cafe.img_url = data["img_url"]
    cafe.location = data["location"]
    cafe.seats = int("".join(filter(str.isdigit, data["seats"])))
    cafe.has_toilet = data["has_toilet"]
    cafe.has_wifi = data["has_wifi"]
    cafe.has_sockets = data["has_sockets"]
    cafe.can_take_calls = data["can_take_calls"]
    if data["coffee_price"] != "":
        cafe.coffee_price = data["coffee_price"]
    cafe.description = data["description"]

    cafe.save()
    serializer = CafeSerializer(cafe, many=False)

    return Response(serializer.data)
