from django.urls import path
from base.views import brand_views as views

urlpatterns = [

    path('', views.getBrands, name="brands"),
    path('<str:pk>/', views.getBrand, name="brand"),

    path('create/brand/', views.createBrand, name="create-brand"),
    path('update/<str:pk>/', views.updateBrand, name="update-brand"),
    path('delete/<str:pk>/', views.deleteBrand, name="delete-brand"),


]   
