from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review, ProductInfo, Brand, Category, ProductImage, Section, Subsection
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.fields import ListField

class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']
    
    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInfo
        fields = '__all__'
    


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

    def get_brand(self, obj):
        brand = obj.brand_set.first()
        return {'id': brand._id, 'brand':brand.brand} if brand else '' 
    
    
class CategorySerializer(serializers.ModelSerializer):
    # brands = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

    def get_category(self, obj):
        category = obj.category_set.first()
        return {'id': category._id, 'category':category.category} if category else ''

class SectionSerializer(serializers.ModelSerializer):
    # brands = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Section
        fields = '__all__'

    def get_section(self, obj):
        section = obj.section_set.first()
        return {'id': section._id, 'section':section.section} if section else ''
    
class SubsectionSerializer(serializers.ModelSerializer):
    # brands = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Subsection
        fields = '__all__'

    def get_subsection(self, obj):
        subsection = obj.subsection_set.first()
        return {'id': subsection._id, 'subsection':subsection.subsection} if subsection else ''
 
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=None, allow_empty_file=False, use_url=False),
        write_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)
    info = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
    
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)
        for image in uploaded_images:
            new_product_image = ProductImage.objects.create(product=product, image=image)
        return product

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializers = ReviewSerializer(reviews, many=True)
        return serializers.data

    def get_info(self, obj):
        info = obj.productinfo_set.all()
        serializers = InfoSerializer(info, many=True)
        return serializers.data


class ShippingAddressSerializer(serializers.ModelSerializer):
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
   
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    ShippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Order
        fields = '__all__'
   
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_ShippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data





