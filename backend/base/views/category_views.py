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
def getCategories(request):
    categories = Category.objects.all()
    
    serializers = CategorySerializer(categories, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(_id=pk)
    serializers = CategorySerializer(category, many=False)

    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCategory(request):
    category = Category.objects.create(
        # product=product,
        category='',
    )
    serializers = CategorySerializer(category, many=False)
    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    category.delete()
    return Response('Category Deleted')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(_id=pk)
    category.category = data['name']
    category.save()
    serializers = CategorySerializer(category, many=False)

    return Response(serializers.data)



# @api_view(['GET'])
# def getProductByCategory(request, pk):
#     data = request.data
#     print(f"DATA {data}")
#     print(f"PK : {pk}")
#     category = Category.objects.get(_id=pk)
#     print(f"CATEGORY : {category}")
#     name = category.category
#     print(f"NAME : {name}")
#     product = Product.objects.filter(categories=name)
#     serializers = ProductSerializer(product, many=True)
#     return Response(serializers.data)
@api_view(['GET'])
def getProductByCategory(request, pk):
    category = Category.objects.get(_id=pk)
    sort = sort = request.GET.get('sort')
    print(f"sort: {sort}")
    if sort == 'reviews':
        products = Product.objects.filter(categories=category).order_by('-rating')
    elif sort == 'highPrice':
        products = Product.objects.filter(categories=category).order_by('-price')
    elif sort == 'lowPrice':
        products = Product.objects.filter(categories=category).order_by('price')
    elif sort == 'numReviews':
        products =Product.objects.filter(categories=category).order_by('-numReviews')
    else:
        products = Product.objects.filter(categories=category)
        
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopCategories(request, pk):
    categories = Category.objects.all()
    
    serializers = CategorySerializer(categories, many=True)
    return Response(serializers.data)









