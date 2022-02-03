from django.shortcuts import render
from django.http import JsonResponse
from .cafes import cafes
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view(["GET"])
def get_routes(request):
    routes = [
        "/api/cafes/",
        "/api/cafes/<id>/",
        "/api/cafes/new/",
        "/api/cafes/update/<id>/",
        "/api/cafes/delete/<id>/",
        "/api/cafes/<id>/reviews/",
    ]
    return Response(routes)


@api_view(["GET"])
def get_cafes(request):
    return Response(cafes)


@api_view(["GET"])
def get_cafe(request, pk):
    cafe = next((i for i in cafes if i["id"] == int(pk)), None)
    return Response(cafe)
