from django.shortcuts import render

from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from ..serializers import CafeSerializer, ReviewSerializer
from ..models import Cafe, Review
from ..rand_data import cafes as dummy_cafes
from ..rand_data import comments as dummy_comments
import random


@api_view(["GET"])
def get_cafes(request):
    items_per_page = 5

    query = request.query_params.get("keyword")

    # Default sort by rating
    req_order = "-rating"

    if not query:
        query = ""

    if query == "recent":
        req_order = "-date_edited"

    cafes = Cafe.objects.all().order_by(req_order)

    page = request.query_params.get("page")
    paginator = Paginator(cafes, items_per_page)

    try:
        cafes = paginator.page(page)
    except PageNotAnInteger:
        cafes = paginator.page(1)
    except EmptyPage:
        cafes = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = CafeSerializer(cafes, many=True)

    return Response(
        {"cafes": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_own_cafes(request):
    cafes = Cafe.objects.filter(user=request.user)
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
    cafe.date_edited = timezone.now()
    cafe.save()
    serializer = CafeSerializer(cafe, many=False)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_cafe_review(request, pk):
    user = request.user
    cafe = Cafe.objects.get(id=pk)
    data = request.data
    # 1 - review already exists
    already_exists = cafe.review_set.filter(user=user).exists()
    if already_exists:
        content = {"detail": "Cafe already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - no rating or 0
    elif data["rating"] == 0:
        content = {"detail": "Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - create review
    else:
        review = Review.objects.create(
            user=user,
            cafe=cafe,
            name=user.first_name,
            title=data["title"],
            rating=data["rating"],
            comment=data["comment"],
        )
        reviews = cafe.review_set.all()
        cafe.num_reviews = len(reviews)

        total = sum(r.rating for r in reviews)
        cafe.rating = total / len(reviews)
        cafe.save()

        return Response("Review added")


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_review(request, pk):

    review = Review.objects.get(id=pk)
    cafe = review.cafe

    if (review.user != request.user) and (not request.user.is_staff):
        return Response(
            {"detail": "Current user is not the author of this review nor admin user."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    review.delete()

    reviews = cafe.review_set.all()
    cafe.num_reviews = len(reviews)

    total = sum(r.rating for r in reviews)

    cafe.rating = total / len(reviews)
    cafe.save()

    return Response("Review Deleted")


@api_view(["GET"])
@permission_classes([IsAdminUser])
def load_dummies(request):
    user = User.objects.get(email="iv@dmin.com")
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


@api_view(["GET"])
@permission_classes([IsAdminUser])
def load_dummy_reviews(request):
    users = User.objects.all()
    cafes = Cafe.objects.all()
    user_list = [user.username for user in users]
    for cafe in cafes:
        random.shuffle(user_list)
        for i in range(random.randint(2, len(user_list))):
            # cafe = next((i for i in dummy_cafes if i["id"] == int(pk)), None)
            user = next((u for u in users if u.username == user_list[i]), None)
            if user:
                rev = random.choice(dummy_comments)
                review = Review.objects.create(
                    user=user,
                    cafe=cafe,
                    name=user.first_name,
                    title=rev["title"],
                    rating=rev["rating"],
                    comment=rev["comment"],
                )
        reviews = cafe.review_set.all()
        cafe.num_reviews = len(reviews)

        total = sum(r.rating for r in reviews)
        cafe.rating = total / len(reviews)
        cafe.save()

    return Response("Reviews added")
