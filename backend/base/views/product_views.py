from django.shortcuts import get_object_or_404, render
from django.http import Http404, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from ..models import Product
from django.contrib.auth.models import User

from base.models import Product, Review, ProductInfo, OrderItem, Brand, Category, ProductImage

from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, BrandSerializer, CategorySerializer
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')

    print('query:', query)
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gt=4).order_by('-rating')[0:5]
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def  getTopReviews(request):
    products = Product.objects.all().order_by('-numReviews')
    result = products.filter(rating__gt=4).order_by('-rating')
    serializers = ProductSerializer(result, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def  getTopSelling(request):
    products = Product.objects.all().order_by('-totalSold')[:10]
    
    serializers = ProductSerializer(products, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)

@api_view(['GET'])
def getInfoByProduct(request, pk):
    info = ProductInfo.objects.all()
    serializers = ProductSerializer(info, many=True)

    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createInfoField(request):
    
    info = ProductInfo.objects.create(
        title='',
        information='',  
    )
    
    serializers = ProductSerializer(info, many=False)
    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    
    product = Product.objects.create(
        user=user,
        name='Sample Product',
        price=0,

        countInStock=0,

        description='',
        
    )

    serializers = ProductSerializer(product, many=False)
    return Response(serializers.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    print(data)
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.save()
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    try:
        data = request.data
        print(f'data: {data}')
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)
        images = request.FILES.getlist('uploaded_images')
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        return Response('Images were uploaded')
    except (KeyError, Product.DoesNotExist, Exception) as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
# def uploadImage(request):
#     data = request.data
    
#     product_id = data['product_id']
#     product = Product.objects.get(_id=product_id)

#     product.image = request.FILES.getlist('image')
#     # for img in product.image:

#     product.save()

#     return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    #1 - Отзыв уже есть
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'Продробнее':'Отзыв уже был оставлен'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #2 - Нет рейтинга или 0
    elif data['rating'] == 0:
        content = {'Подробнее':'Выберите рейтинг'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    #3 - Создать отзыв
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Отзыв добавлен')

@api_view(['POST'])
def createInfo(request, pk):
    product = Product.objects.get(_id=pk)
    data = request.data

    productinfo = ProductInfo.objects.create(
        product=product,
        title='',
        information='',

    )

    return Response('Information Added')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProductInfo(request, pk, pk_alt):
    data = request.data
    product = Product.objects.get(_id=pk)
    info = ProductInfo.objects.get(_id=pk_alt, product=product)
    new_title = data['inputValue']
    new_info = data['inputInfo']
    info.title = new_title
    info.information = new_info
    info.save()


    
    return Response('info was added')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteInfo(request, pk, pk_alt ):
    print(pk)
    print(pk_alt)
    data = request.data
    product = Product.objects.get(_id=pk)
    info = ProductInfo.objects.get(_id=pk_alt, product=product)
    info.delete()
    return Response('Info Deleted')


@api_view(['PUT'])

def setProductBrand(request, pk, pk_alt):

    data = request.data
    print(data)
    brand = Brand.objects.get(_id=pk_alt)
    print(f"brand: {brand}")
    product = Product.objects.get(_id=pk)
    product.brands = data['brand']
    product.save()
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)

import json
@api_view(['PUT'])
def setProductCategory(request, pk, pk_alt):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.categories = data['category']
    # Преобразуем строку в список
    # product.subsections = data['catSec']
    # print(f"CATSEC: {product.subsections}")
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def setProductSection(request, pk, pk_alt):

    data = request.data
    print(f"data: {data}")
    product = Product.objects.get(_id=pk)
    product.sections = data['section']
    product.save()
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)


@api_view(['PUT'])
def setProductSubsection(request, pk, pk_alt):

    data = request.data
    print(f"data: {data}")
    product = Product.objects.get(_id=pk)
    product.subsections = data['subsection']
    product.save()
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)


# from django.shortcuts import render
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# def recommend_similar_products(pk, top_n=5):
#     products = Product.objects.all()
#     product_descriptions = [product.description for product in products]
#     tfidf = TfidfVectorizer(stop_words='english') 
#     tfidf_matrix = tfidf.fit_transform(product_descriptions)
#     similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

#     product_index = pk - 1
#     product_similarity_scores = similarity_matrix[product_index]
#     similar_product_indices = product_similarity_scores.argsort()[-top_n-1:-1][::-1]
    
#     similar_products = [products.filter(_id=index+1).first() for index in similar_product_indices]
    
#     serializer = ProductSerializer(similar_products, many=True)
#     serialized_products = serializer.data
#     return serialized_products

# @api_view(['GET'])
# def recommended_products(request, pk):
#     recommended_products = recommend_similar_products(pk)
#     return Response(recommended_products)