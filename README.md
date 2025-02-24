# django-react-app

# Django-React Fullstack App 🚀

This is a full-stack web application using **Django (Backend)** and **React (Frontend)**.

## 📁 Project Structure
django-react-app/ │── backend/ # Django Backend │── frontend/ # React Frontend │── .gitignore │── README.md │


## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

2️⃣ Backend Setup (Django)

cd backend
python -m venv myenv && source myenv/bin/activate  # (Windows: myenv\Scripts\activate)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver  # Runs at http://127.0.0.1:8000/
3️⃣ Frontend Setup (React)

cd ../frontend
npm install
npm start  # Runs at http://localhost:3000/
🐳 Docker Setup

docker-compose up --build
🚀 Deployment Options
GitHub Actions for CI/CD
AWS (EC2, RDS, S3, Elastic Beanstalk)
Azure (App Service, Container Instances)

🤝 Contributing
Fork & Clone
Create a feature branch (git checkout -b feature-name)
Commit changes (git commit -m "Added feature")
Push & submit a Pull Request 🚀
docker-compose up --build
To remove builds and clean up your Docker environment, you can follow these steps:
1. Stop Running Containers:

docker-compose down
This will stop and remove all containers defined in the docker-compose.yml file.
2. Remove All Containers (Optional):
If you want to remove all containers, including the ones that were not created by docker-compose, you can run:

docker rm $(docker ps -a -q)
This removes all stopped containers.
3. Remove All Unused Docker Images:
To remove the Docker images that are not being used by any container, you can run:
docker image prune
Or, to remove all images (including unused ones):

docker rmi $(docker images -q)
4. Remove Volumes (Optional):
Volumes can take up significant space. If you want to remove the volumes created by Docker Compose (which are listed in the volumes section of docker-compose.yml), run:

docker-compose down -v
This will stop the containers and remove the associated volumes.
5. Remove Build Cache (Optional):
Docker caches the build process to speed up subsequent builds. To clear the build cache, run:

docker builder prune
This will remove unused build cache.
6. Remove Networks (Optional):
If you want to remove the custom networks created by Docker Compose (e.g., mynetwork in your docker-compose.yml), you can run:

docker network prune
7. Clean Up Dangling Images and Volumes:
To remove any unused, "dangling" images and volumes, you can use:

docker system prune

docker exec -it django-backend python manage.py migrate
docker exec -it django-backend python manage.py createsuperuser
docker exec -it postgres-db psql -U postgres
\c business_db;

📜 License
This project is open-source under the MIT License.

🎉 Happy Coding! If this helped, give a ⭐ on GitHub! 🚀
