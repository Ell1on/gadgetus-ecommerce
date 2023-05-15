from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    
    path('top/', views.getTopProducts, name='top-products'),
    path('popular/', views.getTopReviews, name='popular-products'),
    path('selling/', views.getTopSelling, name='selling-products'),


    path('<str:pk>/', views.getProduct, name="product"),
    path('update/<str:pk>/info/', views.createInfo, name="create-info"),

    path('update/<str:pk>/info/update/<str:pk_alt>/', views.updateProductInfo, name="update-info"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('update/<int:pk>/brand/<int:pk_alt>/', views.setProductBrand, name="set-brand"),
    path('update/<int:pk>/category/<int:pk_alt>/', views.setProductCategory, name="set-category"),
    # path('update/<int:pk>/category/<int:pk_alt>/subsection/<int:pk_alt>/', views.setProductSubsection, name="set-subsection"),

    # path('update/<int:pk>/section/<int:pk_alt>/', views.setProductSection, name="set-section"),
    path('update/<int:pk>/subsection/<int:pk_alt>/', views.setProductSubsection, name="set-subsection"),

    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),
    path('delete/<str:pk>/info/delete/<str:pk_alt>/', views.deleteInfo, name="product-delete"),

    # path('rated/', views.getSortProdByRating, name="product-rated"),
    # path('highprice/', views.getHighPriceProduct, name="product-highprice"),
    # path('lowprice/', views.getLowPriceProduct, name="product-lowprice"),
    # path('numreviews/', views.getSortProdByComment, name="product-numreviews"),
    # path('api/products/sort/', views.sort_products, name='sort_products'),

]   
