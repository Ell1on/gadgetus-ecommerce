from django.urls import path
from base.views import section_views as views



urlpatterns = [

    path('', views.getSections, name="sections"),
    path('<str:pk>/', views.getSection, name="section"),
  

    path('create/section/', views.createSection, name="create-section"),
    path('update/<str:pk>/', views.updateSection, name="update-section"),
    path('delete/<str:pk>/', views.deleteSection, name="delete-section"),
    # path('sectionlist/<str:spk>/', views.getProductBySection, name="product-section"),
    # path('top/', views.getTopCategories, name="top-categpries"),
    

]   
