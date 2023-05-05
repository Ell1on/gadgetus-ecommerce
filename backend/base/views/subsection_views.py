from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from base.models import Product, Review, ProductInfo, OrderItem, Brand, Category, Subsection
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, BrandSerializer, SubsectionSerializer
from rest_framework import status
import json
from django.db.models import Q


@api_view(['GET'])
def getSubsections(request):
    subsections = Subsection.objects.all()
    
    serializers = SubsectionSerializer(subsections, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getSubsection(request, pk):
    subsection = Subsection.objects.get(_id=pk)
    serializers = SubsectionSerializer(subsection, many=False)

    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createSubsection(request):
    subsection = Subsection.objects.create(
        # product=product,
        subsection='',
    )
    serializers = SubsectionSerializer(subsection, many=False)
    return Response(serializers.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteSubsection(request, pk):
    subsection = Subsection.objects.get(_id=pk)
    subsection.delete()
    return Response('Subsection Deleted')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateSubsection(request, pk):
    data = request.data
    subsection = Subsection.objects.get(_id=pk)
    subsection.subsection = data['name']
    subsection.save()
    serializers = SubsectionSerializer(subsection, many=False)

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
# @api_view(['GET'])
# def getProductByCategory(request, pk):
#     category = Category.objects.get(_id=pk)
#     sort = request.GET.get('sort')
#     filters = request.GET.get('filter')
#     price = request.GET.get('price')

#     price_list = price.split(',') if price else []
#     if len(price_list) < 2:
#         # присваиваем значения по умолчанию, если отсутствует одно или оба значения
#         min_price, max_price = 0, float('inf')
#     else:
#         min_price, max_price = map(float, price_list)

#     prods = Product.objects.filter(categories=category, price__gte=min_price, price__lte=max_price)

#     if filters:
#         try:
#             filters_list = json.loads(filters)

#             for f in filters_list:
#                 prods = prods.filter(productinfo__title=f['title'], productinfo__information=f['info'])
#                 #  price__gte=f['minPrice'], price__lte=f['maxPrice'])

#             serializer = ProductSerializer(prods, many=True)
#             print(f"filters{filters_list}")

#             return Response(serializer.data)

#         except json.JSONDecodeError as e:
#             # Обработка ошибки декодирования JSON
#             print(f"Ошибка декодирования JSON: {e}")
#             filters_list = []
#     else:
#         filters_list = []

#     if sort == 'reviews':
#         products = prods.order_by('-rating')
#     elif sort == 'highPrice':
#         products = prods.order_by('-price')
#     elif sort == 'lowPrice':
#         products = prods.order_by('price')
#     elif sort == 'numReviews':
#         products = prods.order_by('-numReviews')
#     else:
#         products = prods

#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def getTopCategories(request, pk):
#     categories = Category.objects.all()
    
#     serializers = CategorySerializer(categories, many=True)
#     return Response(serializers.data)








