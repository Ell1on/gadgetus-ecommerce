from django.urls import path
from base.views import subsection_views as views



urlpatterns = [

    path('', views.getSubsections, name="subsections"),
    path('<str:pk>/', views.getSubsection, name="subsection"),
  

    path('create/subsection/', views.createSubsection, name="create-subsection"),
    path('update/<str:pk>/', views.updateSubsection, name="update-subsection"),
    path('delete/<str:pk>/', views.deleteSubsection, name="delete-subsection"),
    # path('sectionlist/<str:spk>/', views.getProductBySection, name="product-section"),
    # path('top/', views.getTopCategories, name="top-categpries"),
    

]   
