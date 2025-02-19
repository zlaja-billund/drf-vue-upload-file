from django.urls import path

from .views import FileUploadView

urlpatterns = [
    path('upload', FileUploadView.as_view(), name='file-upload'),
    path('<int:pk>', FileUploadView.as_view(), name='file-delete'),
]