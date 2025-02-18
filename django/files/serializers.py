from rest_framework import serializers
from .models import FileUpload


class SingleFileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ['file', 'uploaded_at']


class FileUploadSerializer(serializers.Serializer):
    files = serializers.ListField(child=serializers.FileField())

    def create(self, validated_data):
        files = validated_data['files']
        file_objs = [FileUpload.objects.create(file=file) for file in files]
        return file_objs
