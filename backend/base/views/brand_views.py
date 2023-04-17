from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.models import User

from base.models import Product, Review, ProductInfo, OrderItem, Brand, Category

from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, BrandSerializer, CategorySerializer

from rest_framework import status

@api_view(['GET'])
def getBrands(request):

    brands = Brand.objects.all()
    
    serializers = BrandSerializer(brands, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    print(brand)
    serializers = BrandSerializer(brand, many=False)

    return Response(serializers.data)

@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createBrand(request):
    # product = Product.objects.get(_id=pk)
    brand = Brand.objects.create(
        # product=product,
        brand='',
        
        
    )
    serializers = BrandSerializer(brand, many=False)
    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBrand(request, pk):
    data = request.data
    brand = Brand.objects.get(_id=pk)
    print(data)

    brand.brand = data['name']

    brand.save()


    serializers = BrandSerializer(brand, many=False)

    return Response(serializers.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBrand(request, pk):
    brand = Brand.objects.get(_id=pk)
    brand.delete()
    return Response('Brand Deleted')


