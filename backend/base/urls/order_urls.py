from django.urls import path
from base.views import order_views as views




urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),

    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='order-delivered'),

    path('', views.getOrders, name='orders')


]   
    