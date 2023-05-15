from django.urls import path
from base.views import category_views as views



urlpatterns = [

    path('', views.getCategories, name="categories"),
    path('<str:pk>/', views.getCategory, name="category"),
  
    path('create/<int:pk>/section/', views.createSection, name="create-section"),
    path('update/<int:pk>/section/update/<int:pk_alt>/', views.updateCategorySection, name="update-section"),


    path('create/category/', views.createCategory, name="create-category"),
    path('update/<str:pk>/', views.updateCategory, name="update-category"),
    path('delete/<str:pk>/', views.deleteCategory, name="delete-category"),
    path('categorylist/<int:pk>/section/<int:pk_alt>/', views.getProductByCategory, name="product-category"),
    path('top/', views.getTopCategories, name="top-categpries"),
    

]   
