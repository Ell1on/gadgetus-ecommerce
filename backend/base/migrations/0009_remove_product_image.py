# Generated by Django 4.1.4 on 2023-03-30 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
    ]