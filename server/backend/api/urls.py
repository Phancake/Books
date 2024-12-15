from django.urls import path
from .views import *


urlpatterns = [
    path('books/', get_books , name='book-list'),
    path('books/add/', add_book, name='book-add'),
]