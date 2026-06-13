FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5001

# CMD without request access logs:
# CMD ["gunicorn", "--bind", "0.0.0.0:5001", "testingFlask:app"]
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--access-logfile", "-", "--error-logfile", "-", "--access-logformat", "%(h)s %(r)s %(s)s %(b)s %(M)sms", "testingFlask:app"]
