from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from base.models import Product, Review, ProductInfo, OrderItem, Brand, Category, Section
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, BrandSerializer, CategorySerializer
from rest_framework import status
import json
from django.db.models import Q


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
def getProductByCategory(request, pk, pk_alt):
    category = Category.objects.get(_id=pk)
   
    section = Section.objects.get(_id=pk_alt)
    print(f"PKALT: {section}")
    sort = request.GET.get('sort')
    filters = request.GET.get('filter')
    price = request.GET.get('price')

    price_list = price.split(',') if price else []
    if len(price_list) < 2:
        # присваиваем значения по умолчанию, если отсутствует одно или оба значения
        min_price, max_price = 0, float('inf')
    else:
        min_price, max_price = map(float, price_list)

    prods = Product.objects.filter(categories=category, subsections=section, price__gte=min_price, price__lte=max_price)

    if filters:
        try:
            filters_list = json.loads(filters)

            for f in filters_list:
                prods = prods.filter(productinfo__title=f['title'], productinfo__information=f['info'])
                #  price__gte=f['minPrice'], price__lte=f['maxPrice'])

            serializer = ProductSerializer(prods, many=True)
            print(f"filters{filters_list}")

            return Response(serializer.data)

        except json.JSONDecodeError as e:
            # Обработка ошибки декодирования JSON
            print(f"Ошибка декодирования JSON: {e}")
            filters_list = []
    else:
        filters_list = []

    if sort == 'reviews':
        products = prods.order_by('-rating')
    elif sort == 'highPrice':
        products = prods.order_by('-price')
    elif sort == 'lowPrice':
        products = prods.order_by('price')
    elif sort == 'numReviews':
        products = prods.order_by('-numReviews')
    else:
        products = prods

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopCategories(request):
    categories = Category.objects.all()[:12]  # выбрать первые 10 объектов
    
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createSection(request, pk):
    print(f'PK^{pk}')
    category = Category.objects.get(_id=pk)
    section = Section.objects.create(
        category=category,
        section='',
    )
    return Response('Section created')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCategorySection(request, pk, pk_alt):
    data = request.data
    print(f"UPDATE CATSEC {pk}, {pk_alt}")
    category = Category.objects.get(_id=pk)
    section = Section.objects.get(_id=pk_alt, category=category)
    new_sec = data['name']
    section.section = new_sec
    section.save()
    # order.isDelivered = True
    # order.deliveredAt = datetime.now()
    # order.save()
    return Response('section was added')

# @api_view(['GET'])
# def getSections(request):
#     sections = Section.objects.all()
    
#     serializers = SectionSerializer(sections, many=True)
#     return Response(serializers.data)









