from django.urls import path
from base.views import category_views as views



urlpatterns = [

    path('', views.getCategories, name="categpries"),
    path('<str:pk>/', views.getCategory, name="category"),
  

    path('create/category/', views.createCategory, name="create-category"),
    path('update/<str:pk>/', views.updateCategory, name="update-category"),
    path('delete/<str:pk>/', views.deleteCategory, name="delete-category"),
    path('categorylist/<str:pk>/', views.getProductByCategory, name="product-category"),
    path('top/', views.getTopCategories, name="top-categpries"),
    

]   
