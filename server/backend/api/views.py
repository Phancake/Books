from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer

# Create your views here.
@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    booksData = BookSerializer(books, many=True)
    return Response(booksData.data)

@api_view(['POST'])
def add_book(request):
    book = BookSerializer(data=request.data)
    if book.is_valid():
        book.save()
        return Response(book.data, status=status.HTTP_201_CREATED)
    return Response(book.errors, status=status.HTTP_400_BAD_REQUEST)
                    
