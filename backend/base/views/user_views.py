from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Custom claims
        token["username"] = user.username
        token["email"] = user.email
        token["name"] = user.first_name
        token["is_admin"] = user.is_staff

        return token

    # def validate(self, attrs):
    #     data = super().validate(attrs)

    #     serializer = UserSerializerWithToken(self.user).data

    #     for k, v in serializer.items():
    #         data[k] = v

    #     return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def get_tokens_for_user(user):
    refresh = MyTokenObtainPairSerializer.get_token(user=user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def register_user(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )

        tokens = get_tokens_for_user(user)
        return Response(tokens)
    except:
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data

    try:
        user.username = data["email"]
        user.first_name = data["name"]
        user.email = data["email"]

        if data["password"] != "":
            user.password = make_password(data["password"])
        user.save()

        tokens = get_tokens_for_user(user)
        return Response(tokens)
    except:
        message = {"detail": "User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_user_by_id(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def update_user(request, pk):
    user = User.objects.get(id=pk)
    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]

    user.save()

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    user_for_deletion = User.objects.get(id=pk)
    user_for_deletion.delete()
    return Response("User was deleted.")
