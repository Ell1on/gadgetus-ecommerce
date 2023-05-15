# Generated by Django 4.1.2 on 2023-05-05 07:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_remove_category_sections_remove_section_subsections_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='sections',
        ),
        migrations.AddField(
            model_name='section',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product'),
        ),
    ]
