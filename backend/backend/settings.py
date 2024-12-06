import os
from pathlib import Path
from dotenv import load_dotenv  # To load environment variables from .env file
from datetime import timedelta

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_simplejwt',
    'rest_framework',  # REST API framework
    'corsheaders',     # For handling CORS (Cross-Origin Resource Sharing)
    'api',             # Your app (e.g., 'api' where you will define views and models)
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Enable CORS
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database configuration (PostgreSQL with environment variables)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PWD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# JWT Authentication Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # JWT authentication
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',  # Ensure users are authenticated
    ),
}

# OpenAI API Key (loaded from .env)
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# CORS settings (allow requests from your frontend)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Replace with your React app URL
    "http://localhost:8000",
    #"https://your-frontend-domain.com",  # Production frontend URL
]

# CSRF settings
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",  # Development URL
    "http://localhost:8000",
    #"https://your-frontend-domain.com",  # Production URL
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Security settings for production (optional)
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'False').lower() == 'true'
CSRF_COOKIE_SECURE = os.getenv('CSRF_COOKIE_SECURE', 'True').lower() == 'true'
SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'True').lower() == 'true'


# Custom user model (if needed for your app)
AUTH_USER_MODEL = 'auth.User'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),  # Access token expiration
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),  # Refresh token expiration
    'ROTATE_REFRESH_TOKENS': True,  # Allow rotation of refresh tokens
    'BLACKLIST_AFTER_ROTATION': True,  # Blacklist old refresh tokens after rotation
    'AUTH_HEADER_TYPES': ('Bearer',),  # Use Bearer tokens in header
    'ALGORITHM': 'HS256',  # JWT signing algorithm
    'SIGNING_KEY': SECRET_KEY,  # Use the Django SECRET_KEY for signing JWT
    'VERIFYING_KEY': None,  # Optional verifying key if you want to use public/private key pairs
    'USER_ID_FIELD': 'id',  # The field to be used as the user identifier in JWT
    'USER_ID_CLAIM': 'user_id',  # Claim that holds the user ID in the JWT
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'ERROR',  # Log errors and above (you can change to 'DEBUG' for more details)
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',  # Only log errors and above for Django framework
            'propagate': True,
        },
        # Log errors for your specific app 'api'
        'api': {  # Change 'yourapp' to 'api'
            'handlers': ['console'],
            'level': 'DEBUG',  # Log errors and above for your app (can be 'DEBUG' for more info)
            'propagate': True,
        },
    },
}
