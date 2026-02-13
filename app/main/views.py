from django.template.response import TemplateResponse

# Create your views here.
def index(request):
    context = {}
    return TemplateResponse(request, 'index.html', context)