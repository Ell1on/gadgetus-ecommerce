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
    # product.brand = data['brand']
    # product.category = data['category']
    product.countInStock = data['countInStock']
    
    product.description = data['description']
    # product.info.title=data['title']
    # product.info.information=data['information']

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

    #1 - review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No rating or 0

    elif data['rating'] == 0:
        content = {'detail':'please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    #3 - Create review

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

        return Response('Review Added')

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
    # order.isDelivered = True
    # order.deliveredAt = datetime.now()
    # order.save()

    
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

@api_view(['PUT'])
def setProductCategory(request, pk, pk_alt):

    data = request.data
    print(f"data: {data}")
    product = Product.objects.get(_id=pk)
    product.categories = data['category']
    product.save()
    serializers = ProductSerializer(product, many=False)

    return Response(serializers.data)


# @api_view(['GET'])
# def getSortProdByRating(request):
#     products = Product.objects.order_by('-rating')
#     serializers = ProductSerializer(products, many=True)
#     return Response(serializers.data)

# @api_view(['GET'])
# def getHighPriceProduct(request):
#     products = Product.objects.order_by('price')
#     serializers = ProductSerializer(products, many=True)
#     return Response(serializers.data)

# @api_view(['GET'])
# def getLowPriceProduct(request):
#     products = Product.objects.order_by('-price')
#     serializers = ProductSerializer(products, many=True)
#     return Response(serializers.data)

# @api_view(['GET'])
# def getSortProdByComment(request):
#     products = Product.objects.order_by('numReviews')
#     serializers = ProductSerializer(products, many=True)
#     return Response(serializers.data)

# @api_view(['GET'])
# def sort_products(request):
#     sort = request.data
#     print(f"sort: {sort}")
#     if sort == 'reviews':
#         products = Product.objects.all().order_by('-rating')
#     elif sort == 'high_price':
#         products = Product.objects.all().order_by('-price')
#     elif sort == 'low_price':
#         products = Product.objects.all().order_by('price')
#     elif sort == 'num_reviews':
#         products = Product.objects.all().order_by('-num_reviews')
#     else:
#         products = Product.objects.all()
#     # data = {'products': list(products.values())}
#     serializers = ProductSerializer(products, many=False)

#     return Response(serializers.data)